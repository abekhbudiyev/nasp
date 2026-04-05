const path = require("path");
const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");
require("dotenv").config();

const app = express();
const port = Number(process.env.PORT || 3000);
const publicDir = __dirname;

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECT_STRING,
};

const stepLabelMap = {
  112: "Yaratildi",
  131: "Ishchi guruh tomonidan ko'rib chiqilmoqda",
  132: "Ishchi guruh tomonidan bekor qilindi",
  133: "Ishchi guruh tomonidan qabul qilindi",
  134: "Komissiya tomonidan ko'rib chiqilmoqda",
  136: "Komissiya ko'rib chiqdi",
  171: "Navbatga tushdi",
  172: "Ro'yxatga olindi",
};

const statusStepSourceMap = {
  "jarayonda": [112, 131, 133, 134],
  "qabul qilingan": [171, 172],
  "rad etilgan": [132, 136],
};

const filterOptions = {
  statuses: [
    { value: "jarayonda", label: "Jarayonda" },
    { value: "qabul qilingan", label: "Qabul qilingan" },
    { value: "rad etilgan", label: "Rad etilgan" },
  ],
  steps: [
    { value: "112", label: "Yaratildi" },
    { value: "131", label: "Ishchi guruh tomonidan ko'rib chiqilmoqda" },
    { value: "132", label: "Ishchi guruh tomonidan bekor qilindi" },
    { value: "133", label: "Ishchi guruh tomonidan qabul qilindi" },
    { value: "134", label: "Komissiya tomonidan ko'rib chiqilmoqda" },
    { value: "136", label: "Komissiya ko'rib chiqdi" },
    { value: "171", label: "Navbatga tushdi" },
    { value: "172", label: "Ro'yxatga olindi" },
  ],
  organizationTypes: [
    { value: "25", label: "Erkaklar" },
    { value: "26", label: "Ayollar" },
    { value: "27", label: "Bolalar" },
  ],
};

const applicationsBaseQuery = `
  select
    a.ID,
    a.CREATED_AT,
    a.REGION_ID,
    a.DISTRICT_ID,
    a.CURRENT_APPLICATION_TYPE_STEP_ID as APP_STEP_ID,
    sr.FULL_NAME,
    sr.PINFL,
    o.ID as ORGANIZATION_ID,
    o.ORGANIZATION_CLASSIFICATION_ID,
    o.SHORT_NAME as ORG,
    orgr.FULL_NAME as ORG_REGION,
    srr.FULL_NAME as ADDRESS_REGION,
    srd.FULL_NAME as ADDRESS_DISTRICT,
    s.FULL_NAME as APP_STEP
  from INS_REG.DOC_MRV_APPLICATION ma
  left join ins_Reg.DOC_APPLICATION a on ma.ID = a.ID
  left join adm_mnl.HL_PERSON sr on a.SERVICE_RECIPIENT_ID = sr.ID
  left join adm_mnl.INFO_ORGANIZATION o on ma.MRV_ORGANIZATION_ID = o.ID
  left join adm_mnl.INFO_REGION orgr on o.REGION_ID = orgr.ID
  left join adm_mnl.INFO_REGION srr on a.REGION_ID = srr.ID
  left join adm_mnl.INFO_DISTRICT srd on a.DISTRICT_ID = srd.ID
  left join ins_adm.ENUM_APPLICATION_TYPE_STEP s on a.CURRENT_APPLICATION_TYPE_STEP_ID = s.ID
  where a.STATUS_ID != 5
`;

const applicationsStatsBaseQuery = `
  select
    count(*) as TOTAL_COUNT,
    sum(
      case
        when a.CURRENT_APPLICATION_TYPE_STEP_ID in (171, 172) then 1
        else 0
      end
    ) as ACCEPTED_COUNT,
    sum(
      case
        when a.CURRENT_APPLICATION_TYPE_STEP_ID in (132, 136) then 1
        else 0
      end
    ) as REJECTED_COUNT,
    sum(
      case
        when a.CURRENT_APPLICATION_TYPE_STEP_ID in (112, 131, 133, 134) then 1
        else 0
      end
    ) as PROCESS_COUNT
  from INS_REG.DOC_MRV_APPLICATION ma
  left join ins_Reg.DOC_APPLICATION a on ma.ID = a.ID
  left join adm_mnl.INFO_ORGANIZATION o on ma.MRV_ORGANIZATION_ID = o.ID
  left join ins_adm.ENUM_APPLICATION_TYPE_STEP s on a.CURRENT_APPLICATION_TYPE_STEP_ID = s.ID
  where a.STATUS_ID != 5
`;

const regionsQuery = `
  select ID, FULL_NAME
  from ADM_MNL.INFO_REGION
  order by ORDER_CODE
`;

const districtsQuery = `
  select ID, REGION_ID, FULL_NAME
  from ADM_MNL.INFO_DISTRICT
  where REGION_ID = :region_id
  order by ORDER_CODE
`;

const organizationsQuery = `
  select o.ID, o.ORGANIZATION_CLASSIFICATION_ID, o.FULL_NAME
  from ADM_MNL.ENUM_ORGANIZATION_CLASSIFICATION e
  left join adm_mnl.INFO_ORGANIZATION o on e.ID = o.ORGANIZATION_CLASSIFICATION_ID
  where e.ID = :organization_type_id
    and o.ID is not null
  order by o.FULL_NAME
`;

function formatOracleDate(value) {
  if (!value) {
    return "";
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
}

function normalizeStep(stepId, stepName = "") {
  const normalizedId = Number(stepId);
  if (Number.isFinite(normalizedId) && stepLabelMap[normalizedId]) {
    return String(normalizedId);
  }

  const normalized = String(stepName).trim().toLowerCase();

  if (normalized === "yaratildi") return "112";
  if (normalized === "ishchi guruh tomonidan ko'rib chiqilmoqda") return "131";
  if (normalized === "ishchi guruh tomonidan bekor qilindi") return "132";
  if (normalized === "ishchi guruh tomonidan qabul qilindi") return "133";
  if (normalized === "komissiya tomonidan tomonidan ko'rib chiqilmoqda" || normalized === "komissiya tomonidan ko'rib chiqilmoqda") return "134";
  if (normalized === "komissiya ko'rib chiqdi") return "136";
  if (normalized === "navbatga tushdi") return "171";
  if (normalized === "ro'yxatga olindi") return "172";

  return "112";
}

function deriveStatus(stepId, stepName = "") {
  const normalizedStepId = normalizeStep(stepId, stepName);

  if (statusStepSourceMap["rad etilgan"].includes(Number(normalizedStepId))) {
    return "Rad etilgan";
  }
  if (statusStepSourceMap["qabul qilingan"].includes(Number(normalizedStepId))) {
    return "Qabul qilingan";
  }

  return "Jarayonda";
}

function buildApplicationsWhereClause(params = {}) {
  const conditions = [];
  const binds = {};

  if (params.regionId) {
    conditions.push("a.REGION_ID = :region_id");
    binds.region_id = Number(params.regionId);
  }

  if (params.districtId) {
    conditions.push("a.DISTRICT_ID = :district_id");
    binds.district_id = Number(params.districtId);
  }

  if (params.organizationId) {
    conditions.push("o.ID = :organization_id");
    binds.organization_id = Number(params.organizationId);
  }

  if (params.organizationTypeId) {
    conditions.push("o.ORGANIZATION_CLASSIFICATION_ID = :organization_type_id");
    binds.organization_type_id = Number(params.organizationTypeId);
  }

  if (params.dateFrom) {
    conditions.push("trunc(a.CREATED_AT) >= to_date(:date_from, 'YYYY-MM-DD')");
    binds.date_from = params.dateFrom;
  }

  if (params.dateTo) {
    conditions.push("trunc(a.CREATED_AT) <= to_date(:date_to, 'YYYY-MM-DD')");
    binds.date_to = params.dateTo;
  }

  if (params.status && statusStepSourceMap[params.status]) {
    const placeholders = statusStepSourceMap[params.status].map((stepId, index) => {
      const key = `status_step_${index}`;
      binds[key] = stepId;
      return `:${key}`;
    });
    conditions.push(`a.CURRENT_APPLICATION_TYPE_STEP_ID in (${placeholders.join(", ")})`);
  }

  if (params.step) {
    const stepId = Number(params.step);
    if (Number.isFinite(stepId)) {
      conditions.push("a.CURRENT_APPLICATION_TYPE_STEP_ID = :step_id");
      binds.step_id = stepId;
    }
  }

  return {
    clause: conditions.length ? ` and ${conditions.join(" and ")}` : "",
    binds,
  };
}

function mapApplicationRow(row) {
  return {
    id: String(row.ID ?? ""),
    date: formatOracleDate(row.CREATED_AT),
    regionId: String(row.REGION_ID ?? ""),
    districtId: String(row.DISTRICT_ID ?? ""),
    appStepId: String(row.APP_STEP_ID ?? ""),
    fullName: String(row.FULL_NAME ?? "").trim() || "-",
    pinfl: String(row.PINFL ?? "").trim() || "-",
    organizationId: String(row.ORGANIZATION_ID ?? ""),
    organizationTypeId: String(row.ORGANIZATION_CLASSIFICATION_ID ?? ""),
    organization: String(row.ORG ?? "").trim() || "-",
    organizationRegion: String(row.ORG_REGION ?? "").trim() || "-",
    regionLabel: String(row.ADDRESS_REGION ?? "").trim() || "-",
    district: String(row.ADDRESS_DISTRICT ?? "").trim() || "-",
    appStep: String(row.APP_STEP ?? "").trim() || stepLabelMap[112],
    step: normalizeStep(row.APP_STEP_ID, row.APP_STEP),
    status: deriveStatus(row.APP_STEP_ID, row.APP_STEP),
  };
}

async function fetchApplications(page = 1, pageSize = 10, appliedFilters = {}) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const offset = Math.max(0, (page - 1) * pageSize);
    const filters = buildApplicationsWhereClause(appliedFilters);
    const pagedQuery = `
      ${applicationsBaseQuery}
      ${filters.clause}
      order by a.ID desc
      offset :offset_rows rows fetch next :page_size rows only
    `;
    const statsQuery = `
      ${applicationsStatsBaseQuery}
      ${filters.clause}
    `;
    const result = await connection.execute(pagedQuery, {
      ...filters.binds,
      offset_rows: offset,
      page_size: pageSize,
    }, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });
    const statsResult = await connection.execute(statsQuery, filters.binds, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    const statsRow = statsResult.rows?.[0] || {};
    return {
      items: (result.rows || []).map(mapApplicationRow),
      totalCount: Number(statsRow.TOTAL_COUNT || 0),
      acceptedCount: Number(statsRow.ACCEPTED_COUNT || 0),
      rejectedCount: Number(statsRow.REJECTED_COUNT || 0),
      processCount: Number(statsRow.PROCESS_COUNT || 0),
    };
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function fetchRegions() {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const regionsResult = await connection.execute(regionsQuery, [], {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    return (regionsResult.rows || []).map((row) => ({
      value: String(row.ID),
      label: String(row.FULL_NAME ?? "").trim(),
    }));
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function fetchDistricts(regionId) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const districtsResult = await connection.execute(districtsQuery, {
      region_id: Number(regionId),
    }, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    return (districtsResult.rows || []).map((row) => ({
      value: String(row.ID),
      regionId: String(row.REGION_ID),
      label: String(row.FULL_NAME ?? "").trim(),
    }));
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

async function fetchOrganizations(organizationTypeId) {
  let connection;

  try {
    connection = await oracledb.getConnection(dbConfig);
    const organizationsResult = await connection.execute(organizationsQuery, {
      organization_type_id: Number(organizationTypeId),
    }, {
      outFormat: oracledb.OUT_FORMAT_OBJECT,
    });

    return (organizationsResult.rows || []).map((row) => ({
      value: String(row.ID),
      organizationTypeId: String(row.ORGANIZATION_CLASSIFICATION_ID),
      label: String(row.FULL_NAME ?? "").trim(),
    }));
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

app.use(cors());
app.use(express.json());
app.use(express.static(publicDir));

app.get("/api/mrv/applications", async (req, res) => {
  try {
    const page = Math.max(1, Number(req.query.page || 1));
    const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize || 10)));
    const data = await fetchApplications(page, pageSize, {
      status: req.query.status,
      step: req.query.step,
      regionId: req.query.regionId,
      districtId: req.query.districtId,
      organizationTypeId: req.query.organizationTypeId,
      organizationId: req.query.organizationId,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
    });
    res.json({
      ok: true,
      page,
      pageSize,
      count: data.items.length,
      totalCount: data.totalCount,
      totalPages: Math.max(1, Math.ceil(data.totalCount / pageSize)),
      stats: {
        total: data.totalCount,
        process: data.processCount,
        accepted: data.acceptedCount,
        rejected: data.rejectedCount,
      },
      items: data.items,
    });
  } catch (error) {
    console.error("Failed to load MRV applications:", error);
    res.status(500).json({
      ok: false,
      error: "Oracle bazadan arizalarni olishda xatolik yuz berdi.",
      detail: error.message,
    });
  }
});

app.get("/api/mrv/filter-options/regions", async (req, res) => {
  try {
    const regions = await fetchRegions();
    res.json({
      ok: true,
      regions,
    });
  } catch (error) {
    console.error("Failed to load MRV region options:", error);
    res.status(500).json({
      ok: false,
      error: "Oracle bazadan regionlarni olishda xatolik yuz berdi.",
      detail: error.message,
    });
  }
});

app.get("/api/mrv/filter-options/districts", async (req, res) => {
  const regionId = Number(req.query.regionId);

  if (!Number.isFinite(regionId) || regionId <= 0) {
    res.status(400).json({
      ok: false,
      error: "Districtlar uchun regionId yuborilishi kerak.",
    });
    return;
  }

  try {
    const districts = await fetchDistricts(regionId);
    res.json({
      ok: true,
      regionId: String(regionId),
      districts,
    });
  } catch (error) {
    console.error("Failed to load MRV district options:", error);
    res.status(500).json({
      ok: false,
      error: "Oracle bazadan districtlarni olishda xatolik yuz berdi.",
      detail: error.message,
    });
  }
});

app.get("/api/mrv/filter-options/organizations", async (req, res) => {
  const organizationTypeId = Number(req.query.organizationTypeId);

  if (!Number.isFinite(organizationTypeId) || organizationTypeId <= 0) {
    res.status(400).json({
      ok: false,
      error: "Organizationlar uchun organizationTypeId yuborilishi kerak.",
    });
    return;
  }

  try {
    const organizations = await fetchOrganizations(organizationTypeId);
    res.json({
      ok: true,
      organizationTypeId: String(organizationTypeId),
      organizations,
    });
  } catch (error) {
    console.error("Failed to load MRV organization options:", error);
    res.status(500).json({
      ok: false,
      error: "Oracle bazadan organizationlarni olishda xatolik yuz berdi.",
      detail: error.message,
    });
  }
});

app.get("/api/health", async (req, res) => {
  try {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      await connection.execute("select 1 as ok from dual", [], {
        outFormat: oracledb.OUT_FORMAT_OBJECT,
      });
    } finally {
      if (connection) {
        await connection.close();
      }
    }

    res.json({ ok: true, database: "connected" });
  } catch (error) {
    res.status(500).json({
      ok: false,
      database: "disconnected",
      error: error.message,
    });
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.listen(port, () => {
  console.log(`NASP server running at http://localhost:${port}`);
});
