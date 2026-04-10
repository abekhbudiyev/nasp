const express = require("express");
const cors = require("cors");
const oracledb = require("oracledb");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);

app.use(cors());
app.use(express.json());

const dbConfig = {
  user: process.env.ORACLE_USER,
  password: process.env.ORACLE_PASSWORD,
  connectString: process.env.ORACLE_CONNECT_STRING,
};

const poolConfig = {
  ...dbConfig,
  poolMin: 1,
  poolMax: 10,
  poolIncrement: 1,
  poolTimeout: 60,
  queueTimeout: 120000,
};

let oraclePoolPromise = null;

async function getOraclePool() {
  if (!oraclePoolPromise) {
    oraclePoolPromise = oracledb.createPool(poolConfig);
  }
  return oraclePoolPromise;
}

async function getOracleConnection() {
  const pool = await getOraclePool();
  return pool.getConnection();
}

function buildApplicationsDataQuery(usage) {
  const disabilitySelect = usage.needsTiek ? "tv.DISABILITY_GROUP_ID" : "cast(null as number) as DISABILITY_GROUP_ID";
  const disabilityJoin = usage.needsTiek
    ? `left join (
        select APPLICANT_PERSON_ID, DISABILITY_GROUP_ID
        from ENB_TIEK.SYS_TIEK_VERIFICATION_MANAGE
        where IS_DELETED != 1
          and CLOSE_ON is null
          and (END_ON is null or END_ON > current_timestamp)
      ) tv on tv.APPLICANT_PERSON_ID = a.APPLICANT_PERSON_ID`
    : "";

  return `
    select
      a.ID,
      a.CREATED_AT,
      a.APPLICANT_PERSON_ID,
      a.REGION_ID,
      a.DISTRICT_ID,
      a.CURRENT_APPLICATION_TYPE_STEP_ID as APP_STEP_ID,
      sr.FULL_NAME,
      sr.PINFL,
      sr.BIRTH_ON,
      sr.GENDER_ID,
      ${disabilitySelect},
      o.ID as ORG_ID,
      o.ORGANIZATION_CLASSIFICATION_ID as ORG_TYPE_ID,
      o.SHORT_NAME as ORG,
      orgr.FULL_NAME as ORG_REGION,
      srr.FULL_NAME as ADDRESS_REGION,
      srd.FULL_NAME as ADDRESS_DISTRICT,
      s.FULL_NAME as APP_STEP
    from INS_REG.DOC_MRV_APPLICATION ma
    left join ins_Reg.DOC_APPLICATION a on ma.ID = a.ID
    left join adm_mnl.HL_PERSON sr on a.SERVICE_RECIPIENT_ID = sr.ID
    ${disabilityJoin}
    left join adm_mnl.INFO_ORGANIZATION o on ma.MRV_ORGANIZATION_ID = o.ID
    left join adm_mnl.INFO_REGION orgr on o.REGION_ID = orgr.ID
    left join adm_mnl.INFO_REGION srr on a.REGION_ID = srr.ID
    left join adm_mnl.INFO_DISTRICT srd on a.DISTRICT_ID = srd.ID
    left join ins_adm.ENUM_APPLICATION_TYPE_STEP s on a.CURRENT_APPLICATION_TYPE_STEP_ID = s.ID
    where a.STATUS_ID != 5
  `;
}

const applicationsStatsBaseQuery = `
  select
    count(*) as TOTAL,
    sum(case when a.CURRENT_APPLICATION_TYPE_STEP_ID in (112, 131, 133) then 1 else 0 end) as PROCESS,
    sum(case when a.CURRENT_APPLICATION_TYPE_STEP_ID in (171, 172) then 1 else 0 end) as ACCEPTED,
    sum(case when a.CURRENT_APPLICATION_TYPE_STEP_ID in (132, 136) then 1 else 0 end) as REJECTED
  from INS_REG.DOC_MRV_APPLICATION ma
  left join ins_Reg.DOC_APPLICATION a on ma.ID = a.ID
  left join adm_mnl.HL_PERSON sr on a.SERVICE_RECIPIENT_ID = sr.ID
  left join (
    select APPLICANT_PERSON_ID, DISABILITY_GROUP_ID
    from ENB_TIEK.SYS_TIEK_VERIFICATION_MANAGE
    where IS_DELETED != 1
      and CLOSE_ON is null
      and (END_ON is null or END_ON > current_timestamp)
  ) tv on tv.APPLICANT_PERSON_ID = a.APPLICANT_PERSON_ID
  left join adm_mnl.INFO_ORGANIZATION o on ma.MRV_ORGANIZATION_ID = o.ID
  left join adm_mnl.INFO_REGION orgr on o.REGION_ID = orgr.ID
  left join adm_mnl.INFO_REGION srr on a.REGION_ID = srr.ID
  left join adm_mnl.INFO_DISTRICT srd on a.DISTRICT_ID = srd.ID
  left join ins_adm.ENUM_APPLICATION_TYPE_STEP s on a.CURRENT_APPLICATION_TYPE_STEP_ID = s.ID
  where a.STATUS_ID != 5
`;

const regionIdMap = new Map([
  ["qoraqalpog'iston r.", "6"],
  ["қорақалпоғистон р.", "6"],
  ["andijon", "3"],
  ["андижон", "3"],
  ["buxoro", "4"],
  ["бухоро", "4"],
  ["jizzax", "5"],
  ["жиззах", "5"],
  ["qashqadaryo", "7"],
  ["қашқадарё", "7"],
  ["navoiy", "8"],
  ["навоий", "8"],
  ["namangan", "9"],
  ["наманган", "9"],
  ["samarqand", "10"],
  ["самарқанд", "10"],
  ["sirdaryo", "12"],
  ["сирдарё", "12"],
  ["surxondaryo", "11"],
  ["сурхондарё", "11"],
  ["toshkent viloyati", "2"],
  ["тошкент вилояти", "2"],
  ["farg'ona", "13"],
  ["фарғона", "13"],
  ["xorazm", "14"],
  ["хоразм", "14"],
  ["toshkent shahri", "1"],
  ["тошкент шаҳри", "1"],
]);

function normalizeLabel(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[’ʻ`´]/g, "'")
    .replace(/\s+/g, " ");
}

function formatDate(value) {
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

function deriveStatus(stepName = "") {
  const normalized = normalizeLabel(stepName);

  if (
    normalized === "ishchi guruh tomonidan bekor qilindi"
    || normalized === "komissiya ko'rib chiqdi"
  ) {
    return "Rad etilgan";
  }

  if (
    normalized === "navbatga tushdi"
    || normalized === "ro'yxatga olindi"
  ) {
    return "Qabul qilingan";
  }

  return "Jarayonda";
}

function deriveGenderValue(genderId) {
  const value = String(genderId || "").trim();
  if (value === "1") {
    return "erkak";
  }
  if (value === "2") {
    return "ayol";
  }
  return "";
}

function deriveDisabilityGroupValue(groupId) {
  const value = String(groupId || "").trim();
  if (["1", "2", "3"].includes(value)) {
    return value;
  }
  if (value === "4") {
    return "4";
  }
  return "";
}

function deriveAgeGroupValue(birthOn, genderId) {
  if (!birthOn) {
    return "";
  }

  const birthDate = birthOn instanceof Date ? birthOn : new Date(birthOn);
  if (Number.isNaN(birthDate.getTime())) {
    return "";
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  if (age < 3) return "0-3";
  if (age < 7) return "3-7";
  if (age < 18) return "7-18";

  const genderValue = deriveGenderValue(genderId);
  if ((genderValue === "ayol" && age < 55) || (genderValue === "erkak" && age < 60)) {
    return "18-55/60";
  }

  return "55/60+";
}

function deriveOrganizationTypeId(organizationName = "") {
  const normalized = normalizeLabel(organizationName);
  if (normalized.includes("erkak")) {
    return "25";
  }
  if (normalized.includes("ayol")) {
    return "26";
  }
  if (normalized.includes("bola")) {
    return "27";
  }
  return "";
}

function parseNumericFilterValue(value) {
  if (value == null) {
    return null;
  }

  const normalized = String(value).trim();
  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function mapApplicationRow(row) {
  const regionLabel = String(row.ADDRESS_REGION || "").trim();
  const organizationLabel = String(row.ORG || "").trim();

  return {
    id: `AR-${String(row.ID).padStart(6, "0")}`,
    date: formatDate(row.CREATED_AT),
    fullName: String(row.FULL_NAME || "").trim(),
    pinfl: String(row.PINFL || "").trim(),
    organization: organizationLabel,
    organizationRegion: String(row.ORG_REGION || "").trim(),
    regionLabel,
    regionId: String(row.REGION_ID || regionIdMap.get(normalizeLabel(regionLabel)) || regionLabel),
    district: String(row.ADDRESS_DISTRICT || "").trim(),
    districtId: String(row.DISTRICT_ID || row.ADDRESS_DISTRICT || "").trim(),
    organizationId: String(row.ORG_ID || organizationLabel),
    organizationTypeId: String(row.ORG_TYPE_ID || deriveOrganizationTypeId(organizationLabel)),
    appStep: String(row.APP_STEP || "").trim(),
    appStepId: String(row.APP_STEP_ID || "").trim(),
    genderValue: deriveGenderValue(row.GENDER_ID),
    disabilityGroupValue: deriveDisabilityGroupValue(row.DISABILITY_GROUP_ID),
    ageGroupValue: deriveAgeGroupValue(row.BIRTH_ON, row.GENDER_ID),
    status: deriveStatus(row.APP_STEP),
  };
}

function buildApplicationsFilterQuery(payload = {}) {
  const filters = payload.filters || {};
  const binds = {};
  const clauses = [];
  const search = String(payload.search || "").trim();
  const usage = {
    needsPerson: Boolean(search || filters.gender || filters.age),
    needsTiek: Boolean(filters.disabilityGroup),
    needsOrganization: Boolean(filters.organizationType || filters.organization || search),
    needsOrganizationRegion: Boolean(search),
    needsAddressRegion: Boolean(search),
    needsDistrictLookup: Boolean(search),
    needsStepLookup: Boolean(search),
  };

  if (filters.status === "1" || filters.status === "jarayonda") {
    clauses.push("a.CURRENT_APPLICATION_TYPE_STEP_ID in (112, 131, 133)");
  } else if (filters.status === "2" || filters.status === "qabul qilingan") {
    clauses.push("a.CURRENT_APPLICATION_TYPE_STEP_ID in (171, 172)");
  } else if (filters.status === "3" || filters.status === "rad etilgan") {
    clauses.push("a.CURRENT_APPLICATION_TYPE_STEP_ID in (132, 136)");
  }

  const stepValue = parseNumericFilterValue(filters.step);
  if (stepValue != null) {
    binds.step = stepValue;
    clauses.push("a.CURRENT_APPLICATION_TYPE_STEP_ID = :step");
  }

  const regionValue = parseNumericFilterValue(filters.region);
  if (regionValue != null) {
    binds.region = regionValue;
    clauses.push("a.REGION_ID = :region");
  }

  const districtValue = parseNumericFilterValue(filters.district);
  if (districtValue != null) {
    binds.district = districtValue;
    clauses.push("a.DISTRICT_ID = :district");
  }

  const organizationTypeValue = parseNumericFilterValue(filters.organizationType);
  if (organizationTypeValue != null) {
    binds.organizationType = organizationTypeValue;
    clauses.push("o.ORGANIZATION_CLASSIFICATION_ID = :organizationType");
  }

  const organizationValue = parseNumericFilterValue(filters.organization);
  if (organizationValue != null) {
    binds.organization = organizationValue;
    clauses.push("o.ID = :organization");
  }

  const disabilityGroupValue = parseNumericFilterValue(filters.disabilityGroup);
  if (disabilityGroupValue != null) {
    binds.disabilityGroup = disabilityGroupValue;
    clauses.push("tv.DISABILITY_GROUP_ID = :disabilityGroup");
  }

  if (filters.gender) {
    const genderValue = parseNumericFilterValue(filters.gender)
      ?? (filters.gender === "erkak" ? 1 : filters.gender === "ayol" ? 2 : null);
    if (genderValue != null) {
      binds.gender = genderValue;
      clauses.push("sr.GENDER_ID = :gender");
    }
  }

  if (filters.age) {
    if (filters.age === "1" || filters.age === "0-3") {
      clauses.push("trunc(months_between(trunc(current_date), trunc(sr.BIRTH_ON)) / 12) < 3");
    } else if (filters.age === "2" || filters.age === "3-7") {
      clauses.push("trunc(months_between(trunc(current_date), trunc(sr.BIRTH_ON)) / 12) between 3 and 6");
    } else if (filters.age === "3" || filters.age === "7-18") {
      clauses.push("trunc(months_between(trunc(current_date), trunc(sr.BIRTH_ON)) / 12) between 7 and 17");
    } else if (filters.age === "4" || filters.age === "18-55/60") {
      clauses.push(`(
        (sr.GENDER_ID = 2 and trunc(months_between(trunc(current_date), trunc(sr.BIRTH_ON)) / 12) between 18 and 54)
        or
        (sr.GENDER_ID = 1 and trunc(months_between(trunc(current_date), trunc(sr.BIRTH_ON)) / 12) between 18 and 59)
      )`);
    } else if (filters.age === "5" || filters.age === "55/60+") {
      clauses.push(`(
        (sr.GENDER_ID = 2 and trunc(months_between(trunc(current_date), trunc(sr.BIRTH_ON)) / 12) >= 55)
        or
        (sr.GENDER_ID = 1 and trunc(months_between(trunc(current_date), trunc(sr.BIRTH_ON)) / 12) >= 60)
      )`);
    }
  }

  if (filters.dateFrom) {
    binds.dateFrom = filters.dateFrom;
    clauses.push("trunc(a.CREATED_AT) >= to_date(:dateFrom, 'YYYY-MM-DD')");
  }

  if (filters.dateTo) {
    binds.dateTo = filters.dateTo;
    clauses.push("trunc(a.CREATED_AT) <= to_date(:dateTo, 'YYYY-MM-DD')");
  }

  if (search) {
    binds.search = `%${search.toUpperCase()}%`;
    clauses.push(`(
      upper(to_char(a.ID)) like :search
      or upper(nvl(sr.FULL_NAME, '')) like :search
      or upper(nvl(sr.PINFL, '')) like :search
      or upper(nvl(o.SHORT_NAME, '')) like :search
      or upper(nvl(orgr.FULL_NAME, '')) like :search
      or upper(nvl(srr.FULL_NAME, '')) like :search
      or upper(nvl(srd.FULL_NAME, '')) like :search
      or upper(nvl(s.FULL_NAME, '')) like :search
    )`);
  }

  return {
    whereSql: clauses.length ? ` and ${clauses.join(" and ")}` : "",
    binds,
    usage,
  };
}

function buildApplicationsStatsQuery(usage) {
  const joins = [];

  if (usage.needsPerson) {
    joins.push("left join adm_mnl.HL_PERSON sr on a.SERVICE_RECIPIENT_ID = sr.ID");
  }

  if (usage.needsTiek) {
    joins.push(`left join (
      select APPLICANT_PERSON_ID, DISABILITY_GROUP_ID
      from ENB_TIEK.SYS_TIEK_VERIFICATION_MANAGE
      where IS_DELETED != 1
        and CLOSE_ON is null
        and (END_ON is null or END_ON > current_timestamp)
    ) tv on tv.APPLICANT_PERSON_ID = a.APPLICANT_PERSON_ID`);
  }

  if (usage.needsOrganization) {
    joins.push("left join adm_mnl.INFO_ORGANIZATION o on ma.MRV_ORGANIZATION_ID = o.ID");
  }

  if (usage.needsOrganizationRegion) {
    joins.push("left join adm_mnl.INFO_REGION orgr on o.REGION_ID = orgr.ID");
  }

  if (usage.needsAddressRegion) {
    joins.push("left join adm_mnl.INFO_REGION srr on a.REGION_ID = srr.ID");
  }

  if (usage.needsDistrictLookup) {
    joins.push("left join adm_mnl.INFO_DISTRICT srd on a.DISTRICT_ID = srd.ID");
  }

  if (usage.needsStepLookup) {
    joins.push("left join ins_adm.ENUM_APPLICATION_TYPE_STEP s on a.CURRENT_APPLICATION_TYPE_STEP_ID = s.ID");
  }

  return `
    select
      count(*) as TOTAL,
      sum(case when a.CURRENT_APPLICATION_TYPE_STEP_ID in (112, 131, 133) then 1 else 0 end) as PROCESS,
      sum(case when a.CURRENT_APPLICATION_TYPE_STEP_ID in (171, 172) then 1 else 0 end) as ACCEPTED,
      sum(case when a.CURRENT_APPLICATION_TYPE_STEP_ID in (132, 136) then 1 else 0 end) as REJECTED
    from INS_REG.DOC_MRV_APPLICATION ma
    left join ins_Reg.DOC_APPLICATION a on ma.ID = a.ID
    ${joins.join("\n")}
    where a.STATUS_ID != 5
  `;
}

app.get("/api/health", async (req, res) => {
  try {
    await getOraclePool();
    res.json({ ok: true });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Oracle connection failed.",
      detail: error.message,
    });
  }
});

app.post("/api/mrv/applications", async (req, res) => {
  let connection;

  try {
    const payload = req.body || {};
    const page = Math.max(Number(payload.page || 1), 1);
    const pageSize = Math.min(Math.max(Number(payload.pageSize || 20), 1), 500);
    const offset = (page - 1) * pageSize;
    const { whereSql, binds, usage } = buildApplicationsFilterQuery(payload);
    connection = await getOracleConnection();

    const result = await connection.execute(
      `${buildApplicationsDataQuery(usage)}
       ${whereSql}
       order by a.ID desc
       offset :offset rows fetch next :pageSize rows only`,
      { ...binds, offset, pageSize },
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );
    const statsResult = await connection.execute(
      `${buildApplicationsStatsQuery(usage)} ${whereSql}`,
      binds,
      { outFormat: oracledb.OUT_FORMAT_OBJECT },
    );

    const statsRow = statsResult.rows?.[0] || {};
    const total = Number(statsRow.TOTAL || 0);
    const items = (result.rows || []).map(mapApplicationRow);
    res.json({
      ok: true,
      items,
      total,
      page,
      pageSize,
      totalPages: Math.max(Math.ceil(total / pageSize), 1),
      stats: {
        total,
        process: Number(statsRow.PROCESS || 0),
        accepted: Number(statsRow.ACCEPTED || 0),
        rejected: Number(statsRow.REJECTED || 0),
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      error: "Oracle bazadan arizalarni olishda xatolik yuz berdi.",
      detail: error.message,
    });
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeError) {
        // No-op: close errors are secondary to the request result.
      }
    }
  }
});

app.listen(port, () => {
  console.log(`NASP local API running at http://localhost:${port}`);
});
