const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const appShell = document.getElementById("appShell");
const loginView = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const loginUsername = document.getElementById("loginUsername");
const loginPassword = document.getElementById("loginPassword");
const loginError = document.getElementById("loginError");
const loginSubmit = document.getElementById("loginSubmit");
const passwordToggle = document.getElementById("passwordToggle");
const capsLockHint = document.getElementById("capsLockHint");
const forgotPasswordButton = document.getElementById("forgotPasswordButton");
const logoutButton = document.getElementById("logoutButton");
const sidebarCollapse = document.getElementById("sidebarCollapse");
const pageBreadcrumb = document.getElementById("pageBreadcrumb");
const pageTitle = document.getElementById("pageTitle");
const themeToggle = document.getElementById("themeToggle");
const themeToggleIcon = themeToggle?.querySelector("svg");
const menuToggles = document.querySelectorAll("[data-menu-toggle]");
const navToggles = document.querySelectorAll(".nav-item--toggle");
const pageLinks = document.querySelectorAll("[data-page-title]");
const applicationSearch = document.getElementById("applicationSearch");
const statusFilter = document.getElementById("statusFilter");
const regionFilter = document.getElementById("regionFilter");
const stepFilter = document.getElementById("stepFilter");
const districtFilter = document.getElementById("districtFilter");
const organizationTypeFilter = document.getElementById("organizationTypeFilter");
const organizationFilter = document.getElementById("organizationFilter");
const dateFromFilter = document.getElementById("dateFromFilter");
const dateToFilter = document.getElementById("dateToFilter");
const applyFilters = document.getElementById("applyFilters");
const resetFilters = document.getElementById("resetFilters");
const rowsPerPage = document.getElementById("rowsPerPage");
const paginationInfo = document.getElementById("paginationInfo");
const totalApplicationsStat = document.getElementById("totalApplicationsStat");
const processApplicationsStat = document.getElementById("processApplicationsStat");
const acceptedApplicationsStat = document.getElementById("acceptedApplicationsStat");
const rejectedApplicationsStat = document.getElementById("rejectedApplicationsStat");
const totalApplicationsShare = document.getElementById("totalApplicationsShare");
const processApplicationsShare = document.getElementById("processApplicationsShare");
const acceptedApplicationsShare = document.getElementById("acceptedApplicationsShare");
const rejectedApplicationsShare = document.getElementById("rejectedApplicationsShare");
const applicationRows = document.querySelectorAll("#applicationsTable tbody tr");
const filterToggle = document.getElementById("filterToggle");
const filterMenu = document.getElementById("filterMenu");
const filterMenuClose = document.getElementById("filterMenuClose");
const rowMenuToggles = document.querySelectorAll(".row-menu__toggle");
const rowsPerPageMenu = document.getElementById("rowsPerPageMenu");
const rowsPerPageTrigger = document.getElementById("rowsPerPageTrigger");
const rowsPerPageLabel = document.getElementById("rowsPerPageLabel");
const rowsPerPageOptions = document.querySelectorAll(".pagination-select__option");
const paginationPrev = document.getElementById("paginationPrev");
const paginationNext = document.getElementById("paginationNext");
const paginationPages = document.getElementById("paginationPages");
const filterActiveCount = document.getElementById("filterActiveCount");
const tableEmptyRow = document.getElementById("tableEmptyRow");
const tableEmptyTitle = document.getElementById("tableEmptyTitle");
const tableEmptyDescription = document.getElementById("tableEmptyDescription");
const tableEmptyAction = document.getElementById("tableEmptyAction");
const downloadActions = document.querySelectorAll(".row-menu__item:last-child");
const customSelects = document.querySelectorAll("[data-custom-select]");
const exportButton = document.getElementById("exportButton");
const reportFilterToggle = document.getElementById("reportFilterToggle");
const reportFilterMenu = document.getElementById("reportFilterMenu");
const reportFilterActiveCount = document.getElementById("reportFilterActiveCount");
const reportColumnsToggle = document.getElementById("reportColumnsToggle");
const reportColumnsMenu = document.getElementById("reportColumnsMenu");
const reportColumnInputs = document.querySelectorAll("[data-report-column-toggle]");
const reportDiagnosisFilter = document.getElementById("reportDiagnosisFilter");
const reportDisabilityGroupFilter = document.getElementById("reportDisabilityGroupFilter");
const reportGenderFilter = document.getElementById("reportGenderFilter");
const reportAgeFilter = document.getElementById("reportAgeFilter");
const reportDateFilter = document.getElementById("reportDateFilter");
const reportApplyFilters = document.getElementById("reportApplyFilters");
const reportDatePicker = document.getElementById("reportDatePicker");
const reportSnapshotDate = document.getElementById("reportSnapshotDate");
const reportSnapshotDateTrigger = document.getElementById("reportSnapshotDateTrigger");
const reportSnapshotDateNative = document.getElementById("reportSnapshotDateNative");
const reportResetFilters = document.getElementById("reportResetFilters");
const reportExportButton = document.getElementById("reportExportButton");
const applicationsListView = document.getElementById("applicationsListView");
const disabilityReportView = document.getElementById("disabilityReportView");
const reportTableWrap = document.getElementById("reportTableWrap");
const reportTableBody = document.getElementById("reportTableBody");
const reportTable = reportTableBody?.closest(".report-table");
const reportScope = document.getElementById("reportScope");
const reportScopeBack = document.getElementById("reportScopeBack");
const reportScopePath = document.getElementById("reportScopePath");
const reportSummaryBar = document.getElementById("reportSummaryBar");
const reportFrozenColumn = document.getElementById("reportFrozenColumn");
const emptyContentView = document.getElementById("emptyContentView");
const emptyViewTitle = document.getElementById("emptyViewTitle");
const emptyViewDescription = document.getElementById("emptyViewDescription");
const contentLoader = document.getElementById("contentLoader");
const dateFields = document.querySelectorAll("[data-date-field]");
const toastStack = document.getElementById("toastStack");
const confirmModal = document.getElementById("confirmModal");
const confirmModalDescription = document.getElementById("confirmModalDescription");
const confirmModalCancel = document.getElementById("confirmModalCancel");
const confirmModalApprove = document.getElementById("confirmModalApprove");
const detailModal = document.getElementById("detailModal");
const detailModalDialog = detailModal?.querySelector(".detail-modal__dialog");
const detailModalClose = document.getElementById("detailModalClose");
const detailModalLoading = document.getElementById("detailModalLoading");
const detailModalBody = document.getElementById("detailModalBody");
const detailContent = document.getElementById("detailContent");
const detailActions = document.getElementById("detailActions");
const detailAcceptButton = document.getElementById("detailAcceptButton");
const detailRejectButton = document.getElementById("detailRejectButton");
const systemTheme = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
const themeStorageKey = "muruvvat-theme";
const calendarMonthNames = ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"];
const calendarWeekdays = ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"];
const tableState = { currentPage: 1, totalPages: 1, filteredRows: [] };
const calendarState = { activeField: null, viewDate: null };
const confirmState = { action: "", applicationId: "" };

const calendarPopover = document.createElement("div");
calendarPopover.className = "calendar-popover";
calendarPopover.id = "calendarPopover";
calendarPopover.hidden = true;
calendarPopover.innerHTML = `
  <div class="calendar-popover__header">
    <div class="calendar-popover__nav-group">
      <button class="calendar-popover__nav" type="button" data-calendar-nav-year="-1" aria-label="Oldingi yil">
        <svg viewBox="0 0 24 24" fill="none"><path d="m16.5 6-6 6 6 6M11.5 6l-6 6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="calendar-popover__nav" type="button" data-calendar-nav="-1" aria-label="Oldingi oy">
        <svg viewBox="0 0 24 24" fill="none"><path d="m14.5 6-6 6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <div class="calendar-popover__title" id="calendarTitle"></div>
    <div class="calendar-popover__nav-group">
      <button class="calendar-popover__nav" type="button" data-calendar-nav="1" aria-label="Keyingi oy">
        <svg viewBox="0 0 24 24" fill="none"><path d="m9.5 6 6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="calendar-popover__nav" type="button" data-calendar-nav-year="1" aria-label="Keyingi yil">
        <svg viewBox="0 0 24 24" fill="none"><path d="m7.5 6 6 6-6 6M12.5 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  </div>
  <div class="calendar-popover__weekdays">${calendarWeekdays.map((day) => `<span class="calendar-popover__weekday">${day}</span>`).join("")}</div>
  <div class="calendar-popover__grid" id="calendarGrid"></div>
  <div class="calendar-popover__footer">
    <button type="button" id="calendarClear">Tozalash</button>
    <button type="button" id="calendarToday">Bugun</button>
  </div>
`;
document.body.append(calendarPopover);
const calendarTitle = document.getElementById("calendarTitle");
const calendarGrid = document.getElementById("calendarGrid");
const calendarClear = document.getElementById("calendarClear");
const calendarToday = document.getElementById("calendarToday");

function sleep(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function showLoginView() {
  loginView?.removeAttribute("hidden");
  appShell?.setAttribute("hidden", "");
  loginError?.setAttribute("hidden", "");
}

function showAppView() {
  loginView?.setAttribute("hidden", "");
  appShell?.removeAttribute("hidden");
}

function syncPasswordToggleUi() {
  if (!passwordToggle || !loginPassword) {
    return;
  }

  const isVisible = loginPassword.type === "text";
  passwordToggle.setAttribute("aria-pressed", String(isVisible));
  passwordToggle.setAttribute("aria-label", isVisible ? "Parolni yashirish" : "Parolni ko'rsatish");
  passwordToggle.innerHTML = isVisible
    ? '<svg viewBox="0 0 24 24" fill="none"><path d="M3 3 21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M10.7 6.25A10.8 10.8 0 0 1 12 6c6 0 9.5 6 9.5 6a17.6 17.6 0 0 1-3.04 3.68M6.2 6.2C3.98 7.73 2.5 10 2.5 10S6 16 12 16a9.9 9.9 0 0 0 3.24-.52M9.88 9.88a3 3 0 1 0 4.24 4.24" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    : '<svg viewBox="0 0 24 24" fill="none"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>';
}

function syncCapsLockState(event) {
  if (!capsLockHint || !event.getModifierState) {
    return;
  }

  capsLockHint.hidden = !event.getModifierState("CapsLock");
}

function formatDateLabel(value) {
  if (!value) {
    return "";
  }

  const [year, month, day] = value.split("-");
  return day && month && year ? `${day}.${month}.${year}` : value;
}

function formatDateValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTypedDate(rawValue) {
  const digits = rawValue.replace(/\D/g, "").slice(0, 8);
  const day = digits.slice(0, 2);
  const month = digits.slice(2, 4);
  const year = digits.slice(4, 8);
  return [day, month, year].filter(Boolean).join(".");
}

function parseTypedDate(value) {
  const [day, month, year] = value.split(".");
  if (!day || !month || !year || year.length !== 4) {
    return "";
  }

  const parsed = new Date(`${year}-${month}-${day}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  if (
    parsed.getDate() !== Number(day) ||
    parsed.getMonth() + 1 !== Number(month) ||
    parsed.getFullYear() !== Number(year)
  ) {
    return "";
  }

  return formatDateValue(parsed);
}

function parseReportNumber(value) {
  return Number(String(value).replace(/[^\d]/g, "")) || 0;
}

function formatReportNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function toRegionKey(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function splitIntegerByRatios(total, ratios) {
  const rawValues = ratios.map((ratio) => total * ratio);
  const floored = rawValues.map((value) => Math.floor(value));
  let remainder = total - floored.reduce((sum, value) => sum + value, 0);
  const indexes = rawValues
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((left, right) => right.fraction - left.fraction);

  for (let index = 0; index < indexes.length && remainder > 0; index += 1) {
    floored[indexes[index].index] += 1;
    remainder -= 1;
  }

  return floored;
}

function extractReportRowData(row, fallbackKey = "") {
  const cells = Array.from(row.querySelectorAll("td"));
  if (!cells.length) {
    return null;
  }

  const name = cells[0].textContent.trim();

  return {
    key: row.getAttribute("data-region") ?? fallbackKey ?? toRegionKey(name),
    name,
    totals: cells.slice(1).map((cell) => parseReportNumber(cell.textContent)),
  };
}

const reportDistrictTemplates = {
  qoraqalpogiston: ["Nukus shahri", "Beruniy tumani", "To'rtko'l tumani"],
  andijon: ["Andijon shahri", "Asaka tumani", "Xo'jaobod tumani"],
  buxoro: ["Buxoro shahri", "G'ijduvon tumani", "Kogon shahri"],
  jizzax: ["Jizzax shahri", "Zomin tumani", "G'allaorol tumani"],
  qashqadaryo: ["Qarshi shahri", "Shahrisabz shahri", "Koson tumani"],
  navoiy: ["Navoiy shahri", "Karmana tumani", "Zarafshon shahri"],
  namangan: ["Namangan shahri", "Chortoq tumani", "Pop tumani"],
  samarqand: ["Samarqand shahri", "Kattaqo'rg'on shahri", "Pastdarg'om tumani"],
  sirdaryo: ["Guliston shahri", "Yangiyer shahri", "Sardoba tumani"],
  surxondaryo: ["Termiz shahri", "Denov tumani", "Jarqo'rg'on tumani"],
  "toshkent-vil": ["Nurafshon shahri", "Chirchiq shahri", "Zangiota tumani"],
  fargona: ["Farg'ona shahri", "Qo'qon shahri", "Marg'ilon shahri"],
  xorazm: ["Urganch shahri", "Xiva shahri", "Hazorasp tumani"],
  "toshkent-sh": ["Yunusobod tumani", "Olmazor tumani", "Chilonzor tumani"],
};

const reportState = {
  level: "region",
  selectedRegionKey: null,
};

const reportDefaultFilters = Object.freeze({
  diagnosis: "all",
  group: "all",
  gender: "all",
  age: "all",
});

const applicationDefaultFilters = Object.freeze({
  status: "all",
  region: "all",
  step: "all",
  district: "all",
  organizationType: "all",
  organization: "all",
  dateFrom: "",
  dateTo: "",
});

let applicationAppliedFilters = { ...applicationDefaultFilters };
let reportAppliedFilters = { ...reportDefaultFilters };

const applicationStepLabels = {
  yangi: "Yangi",
  "ishchi-guruhi-korib-chiqmoqda": "Ishchi guruhi tomonidan ko'rib chiqilmoqda",
  "ishchi-guruhi-qabul-qilgan": "Ishchi guruhi tomonidan qabul qilingan",
  "komissiya-korib-chiqmoqda": "Komissiya tomonidan ko'rib chiqilmoqda",
  "ishchi-guruhi-rad-etgan": "Ishchi guruhi tomonidan rad etilgan",
  "komissiya-rad-etgan": "Komissiya tomonidan rad etilgan",
  "komissiya-qabul-qilgan": "Qabul qilingan",
};

const applicationOrganizationTypeLabels = {
  bolalar: "Bolalar",
  erkaklar: "Erkaklar",
  ayollar: "Ayollar",
};

const applicationRowMetadata = {
  "AR-000124": { step: "yangi" },
  "AR-000123": { step: "ishchi-guruhi-korib-chiqmoqda" },
  "AR-000122": { step: "komissiya-qabul-qilgan" },
  "AR-000121": { step: "ishchi-guruhi-rad-etgan" },
  "AR-000120": { step: "komissiya-qabul-qilgan" },
  "AR-000119": { step: "ishchi-guruhi-qabul-qilgan" },
  "AR-000118": { step: "komissiya-rad-etgan" },
  "AR-000117": { step: "komissiya-qabul-qilgan" },
  "AR-000116": { step: "komissiya-korib-chiqmoqda" },
  "AR-000115": { step: "ishchi-guruhi-rad-etgan" },
  "AR-000114": { step: "komissiya-qabul-qilgan" },
  "AR-000113": { step: "yangi" },
  "AR-000112": { step: "komissiya-rad-etgan" },
};

const reportColumnKeys = [
  "jami",
  "f00f03",
  "f71",
  "f72",
  "f73",
  "group1",
  "group2",
  "group3",
  "nbb",
  "male",
  "female",
  "age0_3",
  "age3_7",
  "age7_18",
  "age18_55_60",
  "age55_60",
];

const reportColumnGroups = {
  diagnosis: ["f00f03", "f71", "f72", "f73"],
  disability: ["group1", "group2", "group3", "nbb"],
  gender: ["male", "female"],
  age: ["age0_3", "age3_7", "age7_18", "age18_55_60", "age55_60"],
};

const reportVisibleColumns = new Set(reportColumnKeys);

const initialReportRows = reportTableBody ? Array.from(reportTableBody.querySelectorAll("tr")) : [];
const reportSummaryData = initialReportRows.length ? extractReportRowData(initialReportRows[0], "summary") : null;
const reportRegionData = initialReportRows.slice(1).map((row, index) => extractReportRowData(row, `region-${index + 1}`)).filter(Boolean);

function generateDistrictRows(region) {
  const names = reportDistrictTemplates[region.key] ?? [
    `${region.name} - 1-hudud`,
    `${region.name} - 2-hudud`,
    `${region.name} - 3-hudud`,
  ];
  const ratios = [0.42, 0.33, 0.25];

  return names.map((name, index) => ({
    key: `${region.key}-${index + 1}`,
    name,
    totals: region.totals.map((total) => splitIntegerByRatios(total, ratios)[index]),
  }));
}

const reportData = reportRegionData.map((region) => ({
  ...region,
  districts: generateDistrictRows(region),
}));

function getSelectedReportRegion() {
  return reportData.find((region) => region.key === reportState.selectedRegionKey) ?? null;
}

function updateReportScope() {
  if (!reportScope || !reportScopePath) {
    return;
  }

  const selectedRegion = getSelectedReportRegion();
  const isDistrictLevel = reportState.level === "district" && selectedRegion;
  reportScope.hidden = !isDistrictLevel;
  reportScopePath.textContent = isDistrictLevel
    ? `Respublika jami / ${selectedRegion.name}`
    : "Respublika jami";
}

function getVisibleReportRows() {
  const diagnosisValue = reportDiagnosisFilter?.value ?? "all";
  const groupValue = reportDisabilityGroupFilter?.value ?? "all";
  const genderValue = reportGenderFilter?.value ?? "all";
  const ageValue = reportAgeFilter?.value ?? "all";
  const columnIndexMap = {
    f00f03: 1,
    f71: 2,
    f72: 3,
    f73: 4,
    "1": 5,
    "2": 6,
    "3": 7,
    nbb: 8,
    erkak: 9,
    ayol: 10,
    "0-3": 11,
    "3-7": 12,
    "7-18": 13,
    "18-55-60": 14,
    "55-60-plus": 15,
  };
  const matchesReportRow = (row) => {
    const diagnosisOk = diagnosisValue === "all" || (row.totals[columnIndexMap[diagnosisValue]] ?? 0) > 0;
    const groupOk = groupValue === "all" || (row.totals[columnIndexMap[groupValue]] ?? 0) > 0;
    const genderOk = genderValue === "all" || (row.totals[columnIndexMap[genderValue]] ?? 0) > 0;
    const ageOk = ageValue === "all" || (row.totals[columnIndexMap[ageValue]] ?? 0) > 0;
    return diagnosisOk && groupOk && genderOk && ageOk;
  };

  if (reportState.level === "district") {
    const selectedRegion = getSelectedReportRegion();
    return (selectedRegion?.districts ?? []).filter(matchesReportRow);
  }

  return reportData.filter(matchesReportRow);
}

function getReportSummarySource() {
  const selectedRegion = getSelectedReportRegion();

  if (reportState.level === "district" && selectedRegion) {
    return { source: selectedRegion, label: `${selectedRegion.name} bo'yicha jami` };
  }

  return { source: reportSummaryData, label: reportSummaryData?.name ?? "Respublika jami" };
}

function syncReportColumnVisibility() {
  if (!reportTable) {
    return;
  }

  reportTable.querySelectorAll("[data-col]").forEach((cell) => {
    const columnKey = cell.getAttribute("data-col");
    const isHidden = columnKey !== "region" && !reportVisibleColumns.has(columnKey);
    cell.toggleAttribute("data-report-hidden", isHidden);
  });

  Object.entries(reportColumnGroups).forEach(([groupKey, columns]) => {
    const groupCell = reportTable.querySelector(`[data-group="${groupKey}"]`);
    if (!(groupCell instanceof HTMLTableCellElement)) {
      return;
    }

    const visibleCount = columns.filter((columnKey) => reportVisibleColumns.has(columnKey)).length;
    groupCell.toggleAttribute("data-report-hidden", visibleCount === 0);
    if (visibleCount > 0) {
      groupCell.colSpan = visibleCount;
    }
  });
}

function renderReportTable() {
  if (!reportTableBody || !reportSummaryData) {
    return;
  }

  const rows = getVisibleReportRows();
  const { source: summarySource, label: summaryLabel } = getReportSummarySource();
  const summaryCells = summarySource.totals
    .map((value, index) => `<td data-col="${reportColumnKeys[index]}">${formatReportNumber(value)}</td>`)
    .join("");
  const bodyMarkup = rows
    .map((row) => {
      const firstCell =
        reportState.level === "region"
          ? `<button class="report-region-button" type="button" data-report-region="${escapeHtml(row.key)}">${escapeHtml(row.name)}</button>`
          : `<span>${escapeHtml(row.name)}</span>`;
      const valueCells = row.totals
        .map((value, index) => `<td data-col="${reportColumnKeys[index]}">${formatReportNumber(value)}</td>`)
        .join("");
      return `<tr data-region="${escapeHtml(row.key)}"><td data-col="region">${firstCell}</td>${valueCells}</tr>`;
    })
    .join("");

  reportTableBody.innerHTML = `
    <tr class="report-table__summary">
      <td data-col="region">${escapeHtml(summaryLabel)}</td>
      ${summaryCells}
    </tr>
    ${bodyMarkup}
  `;

  updateReportScope();
  syncReportColumnVisibility();
}

function showToast(title, description, variant = "success") {
  if (!toastStack) {
    return;
  }

  const duration = 3000;
  let remaining = duration;
  let timerId = null;
  let rafId = null;
  let startedAt = 0;

  const toast = document.createElement("div");
  toast.className = "toast";
  if (variant === "error") {
    toast.classList.add("toast--error");
  }
  toast.innerHTML = `
    <span class="toast__icon" aria-hidden="true">
      ${variant === "error"
        ? '<svg viewBox="0 0 24 24" fill="none"><path d="M12 8v5M12 16h.01" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none"><path d="M6 12.5 10 16l8-9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>'}
    </span>
    <div class="toast__content">
      <strong>${title}</strong>
      <span>${description}</span>
    </div>
    <div class="toast__progress" aria-hidden="true"><div class="toast__progress-bar"></div></div>
  `;
  toastStack.append(toast);

  const progressBar = toast.querySelector(".toast__progress-bar");

  function renderRemaining() {
    if (progressBar) {
      progressBar.style.transform = `scaleX(${Math.max(0, remaining / duration)})`;
    }
  }

  function stopTimers() {
    if (timerId) {
      window.clearTimeout(timerId);
      timerId = null;
    }
    if (rafId) {
      window.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }

  function removeToast() {
    stopTimers();
    toast.remove();
  }

  function tick() {
    const elapsed = Date.now() - startedAt;
    remaining = Math.max(0, duration - elapsed);
    renderRemaining();

    if (remaining > 0) {
      rafId = window.requestAnimationFrame(tick);
    }
  }

  function startTimers() {
    startedAt = Date.now() - (duration - remaining);
    stopTimers();
    timerId = window.setTimeout(removeToast, remaining);
    rafId = window.requestAnimationFrame(tick);
  }

  renderRemaining();
  startTimers();

  toast.addEventListener("mouseenter", () => {
    remaining = Math.max(0, duration - (Date.now() - startedAt));
    renderRemaining();
    stopTimers();
  });

  toast.addEventListener("mouseleave", () => {
    if (remaining > 0) {
      startTimers();
    }
  });
}

function syncDateFieldUi(field) {
  const input = field.querySelector(".custom-date__native");
  const textInput = field.querySelector(".custom-date__text-input");
  const hasValue = Boolean(input?.value);

  if (textInput instanceof HTMLInputElement) {
    textInput.value = formatDateLabel(input?.value ?? "");
  }

  field.classList.toggle("custom-date--filled", hasValue);
}

function closeCalendar() {
  calendarPopover.hidden = true;
  calendarState.activeField = null;
}

function openCalendar(field) {
  const input = field.querySelector(".custom-date__native");
  const currentValue = input instanceof HTMLInputElement ? input.value : "";
  const baseDate = currentValue ? new Date(`${currentValue}T00:00:00`) : new Date();
  calendarState.activeField = field;
  calendarState.viewDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 1);
  field.append(calendarPopover);
  calendarPopover.hidden = false;
  renderCalendar();
}

function renderCalendar() {
  if (!calendarState.activeField || !calendarState.viewDate || !calendarTitle || !calendarGrid) {
    return;
  }

  const input = calendarState.activeField.querySelector(".custom-date__native");
  const selectedValue = input instanceof HTMLInputElement ? input.value : "";
  const now = new Date();
  const year = calendarState.viewDate.getFullYear();
  const month = calendarState.viewDate.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);
  const leadingDays = (monthStart.getDay() + 6) % 7;

  calendarTitle.textContent = `${calendarMonthNames[month]} ${year}`;
  calendarGrid.innerHTML = "";

  for (let index = 0; index < leadingDays; index += 1) {
    const ghost = document.createElement("span");
    ghost.className = "calendar-popover__day--ghost";
    calendarGrid.append(ghost);
  }

  for (let day = 1; day <= monthEnd.getDate(); day += 1) {
    const date = new Date(year, month, day);
    const value = formatDateValue(date);
    const isToday = value === formatDateValue(now);
    const isSelected = value === selectedValue;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "calendar-popover__day";
    if (isToday) {
      button.classList.add("calendar-popover__day--today");
    }
    if (isSelected) {
      button.classList.add("calendar-popover__day--selected");
    }
    button.dataset.value = value;
    button.textContent = String(day);
    calendarGrid.append(button);
  }
}

function setDateFieldValue(field, value) {
  const input = field.querySelector(".custom-date__native");
  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  input.value = value;
  if (input.id === "reportSnapshotDateNative") {
    reportSnapshotDate.value = value ? formatDateLabel(value) : "";
    return;
  }

  syncDateFieldUi(field);

  if (input.id === "reportDateFilter") {
    applyReportFilters();
    return;
  }

  applyTableFilters();
}

function openConfirmModal(action, applicationId) {
  confirmState.action = action;
  confirmState.applicationId = applicationId;
  confirmModal?.classList.toggle("confirm-modal--accept", action === "Qabul qilish");
  if (confirmModalDescription) {
    confirmModalDescription.textContent = `${applicationId} arizasi uchun "${action}" amalini bajarishni tasdiqlaysizmi?`;
  }
  if (confirmModalApprove) {
    confirmModalApprove.textContent = action;
  }
  confirmModal?.removeAttribute("hidden");
  window.requestAnimationFrame(() => {
    confirmModalApprove?.focus();
  });
}

function closeConfirmModal() {
  confirmModal?.setAttribute("hidden", "");
  confirmModal?.classList.remove("confirm-modal--accept");
  if (confirmModalApprove) {
    confirmModalApprove.disabled = false;
    confirmModalApprove.innerHTML = confirmState.action || "Davom etish";
  }
  confirmModalCancel?.removeAttribute("disabled");
  confirmState.action = "";
  confirmState.applicationId = "";
}

function getStatusBadgeClass(status) {
  const normalized = status.toLowerCase();
  if (normalized === "jarayonda") {
    return "status-badge--process";
  }
  if (normalized === "qabul qilingan" || normalized === "tasdiqlangan") {
    return "status-badge--accepted";
  }
  if (normalized === "rad etilgan") {
    return "status-badge--rejected";
  }
  return "";
}

function getApplicantAvatar(application) {
  const femalePool = ["avatar-1.png", "avatar-3.png", "avatar-6.png"];
  const malePool = ["avatar-2.png", "avatar-4.png", "avatar-5.png"];
  const gender = String(application.gender || "").toLowerCase();
  const avatarPool = gender === "ayol" ? femalePool : malePool;
  const numericSeed = Number(String(application.id).replace(/\D/g, "")) || 0;
  return avatarPool[numericSeed % avatarPool.length];
}

function getStatusBadgeVariant(status) {
  const normalized = status.toLowerCase();
  if (normalized === "jarayonda") {
    return { className: "status-badge--process", label: "Jarayonda" };
  }
  if (normalized === "qabul qilingan") {
    return { className: "status-badge--accepted", label: "Qabul qilingan" };
  }
  if (normalized === "rad etilgan") {
    return { className: "status-badge--rejected", label: "Rad etilgan" };
  }
  return { className: "", label: status };
}

function updateApplicationRowStatus(applicationId, nextStatus) {
  const row = Array.from(applicationRows).find((item) => {
    const id = item.querySelector(".stacked-cell--application strong")?.textContent?.trim();
    return id === applicationId;
  });

  if (!row) {
    return;
  }

  row.setAttribute("data-status", nextStatus);
  const nextStep = getDefaultStepForStatus(nextStatus);
  row.setAttribute("data-step", nextStep);
  const variant = getStatusBadgeVariant(nextStatus);
  const statusCell = row.children[5];
  if (statusCell) {
    statusCell.innerHTML = `<span class="status-badge ${variant.className}">${variant.label}</span>`;
  }

  const dropdown = row.querySelector(".row-menu__dropdown");
  dropdown?.querySelectorAll("[data-process-action]").forEach((button) => {
    button.remove();
  });

  applyTableFilters();
}

function formatReadableDate(value) {
  if (!value || !/^\d{2}\.\d{2}\.\d{4}$/.test(value)) {
    return value || "-";
  }

  const [day, month, year] = value.split(".");
  return `${day}.${month}.${year}`;
}

function formatStatusBadge(status) {
  const statusClass = getStatusBadgeClass(status);
  return `<span class="status-badge ${statusClass}">${status}</span>`;
}

function formatResultBadge(result) {
  const normalized = (result || "").toLowerCase();
  const className = normalized === "ijobiy" ? "status-badge--accepted" : "status-badge--rejected";
  return `<span class="status-badge ${className}">${result || "-"}</span>`;
}

function buildDetailFieldGrid(items) {
  return `
    <div class="detail-field-list">
      ${items
        .map(
          (item) => `
            <div class="detail-field-list__item">
              <span>${item.label}</span>
              <strong>${item.value || "-"}</strong>
            </div>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildDetailPersonCard(person, avatarMarkup = "") {
  return `
    <div class="detail-person-card">
      ${avatarMarkup}
    </div>
  `;
}

function buildDetailTable(columns, rows) {
  return `
    <div class="detail-history-table">
      <table>
        <thead>
          <tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row) => `
                <tr>${row.map((cell) => `<td>${cell || "-"}</td>`).join("")}</tr>
              `,
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
}

function buildDetailRecordList(records) {
  return `
    <div class="detail-records">
      ${records
        .map(
          (record) => `
            <article class="detail-record">
              <div class="detail-record__header">
                <strong>${record.title}</strong>
                ${record.meta ? `<span>${record.meta}</span>` : ""}
              </div>
              <div class="detail-record__fields">
                ${record.fields
                  .map(
                    (field) => `
                      <div class="detail-record__field">
                        <span>${field.label}</span>
                        <strong>${field.value || "-"}</strong>
                      </div>
                    `,
                  )
                  .join("")}
              </div>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildDetailSection(title, content, subtitle = "") {
  return `
    <section class="detail-block">
      <div class="detail-block__header">
        <strong>${title}</strong>
        ${subtitle ? `<span>${subtitle}</span>` : ""}
      </div>
      <div class="detail-block__card">
        ${content}
      </div>
    </section>
  `;
}

function buildDetailAccordion(title, content, subtitle = "", isOpen = false) {
  return `
    <details class="detail-accordion"${isOpen ? " open" : ""}>
      <summary class="detail-accordion__summary">
        <span class="detail-accordion__heading">
          <strong>${title}</strong>
          ${subtitle ? `<small>${subtitle}</small>` : ""}
        </span>
        <span class="detail-accordion__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none"><path d="m7 10 5 5 5-5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </summary>
      <div class="detail-accordion__content">
        ${content}
      </div>
    </details>
  `;
}

function buildDetailDocuments(items) {
  const documentTitles = items.map((item) => item.title).join("|");
  return `
    <div class="detail-documents">
      <div class="detail-documents__toolbar">
        <button
          class="detail-document__download detail-document__download--bulk"
          type="button"
          data-document-download="tibbiy-hujjatlar-toplami.pdf"
          data-document-title="Tibbiy hujjatlar to'plami"
          data-document-bulk="true"
          data-document-lines="${documentTitles}"
        >
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 4v10M8 10l4 4 4-4M5 18h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>Barchasini yuklab olish</span>
        </button>
      </div>
      ${items
        .map(
          (item) => `
            <article class="detail-document">
              <span class="detail-document__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none"><path d="M8 3.5h5.5L18.5 8v11a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6.5 19v-14A1.5 1.5 0 0 1 8 3.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M13.5 3.5V8h5" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 15.5h7M8.5 12.5h5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              </span>
              <div class="detail-document__content">
                <strong>${item.title}</strong>
                <span>PDF hujjat</span>
              </div>
              <button class="detail-document__download" type="button" data-document-download="${item.fileName}" data-document-title="${item.title}">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 4v10M8 10l4 4 4-4M5 18h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>Yuklab olish</span>
              </button>
            </article>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildDetailInlineActions(items) {
  return `
    <div class="detail-inline-actions">
      ${items
        .map(
          (item) => `
            <button class="detail-inline-actions__button" type="button" data-detail-page="${item.pageTitle}">
              <span>${item.label}</span>
              <svg viewBox="0 0 24 24" fill="none"><path d="M9 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          `,
        )
        .join("")}
    </div>
  `;
}

function buildDetailSummaryStrip(items) {
  return `
    <section class="detail-summary-strip">
      ${items
        .map(
          (item) => `
            <article class="detail-summary-chip">
              <span>${item.label}</span>
              <strong>${item.value || "-"}</strong>
            </article>
          `,
        )
        .join("")}
    </section>
  `;
}

function formatPersonName(value) {
  return (value || "-").toLocaleUpperCase("uz-UZ");
}

function sanitizePdfText(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/[()]/g, "")
    .replace(/\r?\n/g, " ");
}

function createPdfBlob(title, lines = []) {
  const pdfLines = [title, ...lines].filter(Boolean);
  const commands = ["BT", "/F1 16 Tf"];
  pdfLines.forEach((line, index) => {
    const y = 780 - index * 22;
    commands.push(`1 0 0 1 50 ${y} Tm (${sanitizePdfText(line)}) Tj`);
  });
  commands.push("ET");
  const stream = commands.join("\n");
  const streamLength = new TextEncoder().encode(stream).length;
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLength} >>
stream
${stream}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000061 00000 n 
0000000120 00000 n 
0000000246 00000 n 
0000000374 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
444
%%EOF`;
  return new Blob([pdfContent], { type: "application/pdf" });
}

function triggerPdfDownload(fileName, title, lines = []) {
  const blob = createPdfBlob(title, lines);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function getOrganizationType(name = "") {
  const normalized = name.toLowerCase();
  if (normalized.includes("(bolalar)")) {
    return "Bolalar uchun";
  }
  if (normalized.includes("(ayollar)")) {
    return "Ayollar uchun";
  }
  if (normalized.includes("(erkaklar)")) {
    return "Erkaklar uchun";
  }
  return "Muruvvat internat uyi";
}

function getApplicationById(applicationId) {
  const row = Array.from(applicationRows).find((item) => {
    const id = item.querySelector(".stacked-cell--application strong")?.textContent?.trim();
    return id === applicationId;
  });

  if (!row) {
    return null;
  }

  const applicationCell = row.querySelector(".stacked-cell--application");
  const applicantCell = row.children[2]?.querySelector(".stacked-cell");
  const organizationCell = row.children[3]?.querySelector(".stacked-cell");
  const addressCell = row.children[4]?.querySelector(".stacked-cell");
  const statusLabel = row.querySelector(".status-badge")?.textContent?.trim() ?? "";
  const numericPart = Number(applicationId.replace(/\D/g, "")) || 0;
  const operator = ["D.Sh. Karimova", "A.B. Xasanov", "N.O. Rasulova"][numericPart % 3];
  const diagnosisCatalog = [
    { code: "F71*", label: "Mo'tadil darajadagi aqliy zaiflik" },
    { code: "F72*", label: "Og'ir darajadagi aqliy zaiflik" },
    { code: "F73*", label: "Chuqur darajadagi aqliy zaiflik" },
    { code: "F00-F03", label: "Demensiya" },
  ];
  const groupCatalog = ["1-guruh", "2-guruh", "3-guruh", "NBB"];
  const diagnosis = diagnosisCatalog[numericPart % diagnosisCatalog.length];
  const disabilityGroup = groupCatalog[numericPart % groupCatalog.length];
  const fullAddress = `${addressCell?.querySelector("strong")?.textContent?.trim() ?? "-"}, ${addressCell?.querySelector("span")?.textContent?.trim() ?? "-"}, Mustaqillik ko'chasi ${10 + (numericPart % 70)}-uy`;
  const birthYear = 1968 + (numericPart % 28);
  const birthMonth = String((numericPart % 12) + 1).padStart(2, "0");
  const birthDay = String((numericPart % 27) + 1).padStart(2, "0");
  const receiver = {
    fullName: formatPersonName(operator),
    pinfl: `50${String(100000000000 + numericPart).slice(-12)}`,
    position: ["Yetakchi mutaxassis", "Bosh inspektor", "Mas'ul kotib"][numericPart % 3],
    address: `${addressCell?.querySelector("strong")?.textContent?.trim() ?? "-"}, ${addressCell?.querySelector("span")?.textContent?.trim() ?? "-"}, IHMA hududiy bo'limi`,
    gender: "Erkak",
    avatar: getApplicantAvatar({ applicantName: formatPersonName(operator), id: `receiver-${applicationId}`, gender: "Erkak" }),
  };
  const representativeName = ["Karimov Ulug'bek Islomovich", "Raximova Dilfuza Abduqodirovna", "Toshpulatov Jamshid Sherzod o'g'li"][numericPart % 3];
  const representativeGender = representativeName.toLowerCase().includes("dilfuza") ? "Ayol" : "Erkak";
  const representative = {
    fullName: formatPersonName(representativeName),
    pinfl: `40${String(200000000000 + numericPart).slice(-12)}`,
    level: ["Ota-onasi", "Vasiy", "Qonuniy vakil"][numericPart % 3],
    address: fullAddress,
    phone: `+998 ${90 + (numericPart % 3)} ${String(1000000 + numericPart).slice(-7).replace(/(\d{3})(\d{2})(\d{2})/, "$1-$2-$3")}`,
    gender: representativeGender,
    avatar: getApplicantAvatar({
      applicantName: formatPersonName(representativeName),
      id: `representative-${applicationId}`,
      gender: representativeGender,
    }),
  };
  const institutions = {
    "toshkent shahri": {
      name: "Toshkent sh. Muruvvat 1 (bolalar)",
      address: "Toshkent shahri, Yunusobod tumani, Bog'ishamol ko'chasi 12-uy",
    },
    "samarqand viloyati": {
      name: "Samarqand viloyat Muruvvat internat uyi",
      address: "Samarqand, Samarqand tumani, Registon ko'chasi 24-uy",
    },
    "farg'ona viloyati": {
      name: "Farg'ona viloyat Muruvvat internat uyi",
      address: "Farg'ona, Farg'ona shahri, Al-Farg'oniy ko'chasi 18-uy",
    },
    "buxoro viloyati": {
      name: "Buxoro viloyat Muruvvat internat uyi",
      address: "Buxoro, Buxoro shahri, Istiqlol ko'chasi 9-uy",
    },
  };
  const institution = institutions[row.getAttribute("data-region") ?? ""] ?? {
    name: "Muruvvat internat uyi",
    address: fullAddress,
  };
  const actResult = statusLabel.toLowerCase() === "rad etilgan" ? "Salbiy" : "Ijobiy";
  const decisionResult = statusLabel.toLowerCase() === "rad etilgan" ? "Rad etish" : "Qabul qilish";
  const actStatus = statusLabel.toLowerCase() === "jarayonda" ? "Jarayonda" : "Tasdiqlangan";
  const decisionStatus = statusLabel.toLowerCase() === "jarayonda" ? "Jarayonda" : "Tasdiqlangan";
  const applicationDate = applicationCell?.querySelector("span")?.textContent?.trim() ?? "-";
  const day = Number(applicationDate.split(".")[0] || 1);
  const month = Number(applicationDate.split(".")[1] || 1);
  const year = Number(applicationDate.split(".")[2] || 2026);

  const disabilityHistory = Array.from({ length: 3 }, (_, index) => {
    const historyDate = `${String(Math.max(1, day - index * 2)).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year - index}`;
    return {
      id: `NG-${numericPart + index + 10}`,
      assignedDate: historyDate,
      validUntil: `${String(Math.max(1, day)).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year - index + 1}`,
      group: groupCatalog[(numericPart + index) % groupCatalog.length],
      diagnosis: diagnosisCatalog[(numericPart + index) % diagnosisCatalog.length].code,
      status: index === 0 ? "Faol" : "Arxiv",
    };
  });

  const conclusionHistory = Array.from({ length: 3 }, (_, index) => ({
    id: `XL-${numericPart + index + 30}`,
    date: `${String(Math.max(1, day - index)).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year - index}`,
    institutionType: ["Maxsus maktab", "Inklyuziv ta'lim", "Uy ta'limi"][index % 3],
    validUntil: `${String(Math.max(1, day)).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year - index + 1}`,
    status: index === 0 ? "Amalda" : "Yakunlangan",
  }));

  const applicationHistory = Array.from({ length: 3 }, (_, index) => ({
    id: `AR-${String(numericPart - index).padStart(6, "0")}`,
    date: `${String(Math.max(1, day - index * 3)).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year - index}`,
    status: index === 0 ? statusLabel : ["Yangi", "Jarayonda", "Qabul qilingan"][index % 3],
  }));

  const documentLogs = [
    { operation: "Ariza yaratildi", date: `${applicationDate} 09:12`, actor: operator },
    { operation: "Dalolatnoma biriktirildi", date: `${applicationDate} 11:40`, actor: receiver.fullName },
    { operation: "Qaror loyihasi shakllantirildi", date: `${applicationDate} 16:05`, actor: "Komissiya kotibi" },
  ];

  const medicalDocuments = [
    "Ambulator kartadan yoki kasallik tarixidan ko'chirma",
    "Nogironligi bo'lgan shaxsni reabilitatsiya qilishning yakka tartibdagi dasturi",
    "Ruhiy-asab kasalliklari dispanseri tibbiy-maslahat komissiyasi xulosasi",
    "Onkologik dispanser xulosasi",
    "OITSga qarshi kurash markazi xulosasi",
    "Teri-tanosil kasalliklari dispanseri xulosasi",
    "Silga qarshi kurashish dispanseri xulosasi",
    "Fuqaroni muomalaga layoqatsiz deb topish to'g'risida sudning hal qiluv qarori",
    "Muomalaga layoqatsiz deb topilgan fuqaroga vasiy tayinlash to'g'risida tuman (shahar) hokimi qarori",
    "Psixologik-tibbiy-pedagogik komissiya xulosasi",
  ].map((title, index) => ({
    title,
    fileName: `tibbiy-hujjat-${numericPart}-${index + 1}.pdf`,
  }));

  return {
    id: applicationCell?.querySelector("strong")?.textContent?.trim() ?? applicationId,
    date: applicationDate,
    status: statusLabel || "-",
    region: addressCell?.querySelector("strong")?.textContent?.trim() ?? "-",
    district: addressCell?.querySelector("span")?.textContent?.trim() ?? "-",
    receiver,
    representative,
    applicant: {
      fullName: formatPersonName(applicantCell?.querySelector("strong")?.textContent?.trim() ?? "-"),
      pinfl: applicantCell?.querySelector("span")?.textContent?.trim() ?? "-",
      birthDate: `${birthDay}.${birthMonth}.${birthYear}`,
      gender: numericPart % 2 === 0 ? "Erkak" : "Ayol",
      disabilityGroup,
      diagnosis: `${diagnosis.label} (${diagnosis.code})`,
      address: fullAddress,
      avatar: getApplicantAvatar({
        applicantName: formatPersonName(applicantCell?.querySelector("strong")?.textContent?.trim() ?? "-"),
        id: applicationId,
        gender: numericPart % 2 === 0 ? "Erkak" : "Ayol",
      }),
      meta: [],
    },
    institution,
    organization: {
      type: getOrganizationType(organizationCell?.querySelector("strong")?.textContent?.trim() ?? institution.name),
      name: organizationCell?.querySelector("strong")?.textContent?.trim() ?? institution.name,
      region: organizationCell?.querySelector("span")?.textContent?.trim() ?? row.getAttribute("data-region") ?? "-",
      address: institution.address,
    },
    act: {
      id: `DL-${numericPart + 500}`,
      date: `${String(Math.max(1, day - 1)).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`,
      result: actResult,
      status: actStatus,
    },
    decision: {
      id: `QR-${numericPart + 900}`,
      date: `${String(Math.max(1, day)).padStart(2, "0")}.${String(month).padStart(2, "0")}.${year}`,
      result: statusLabel.toLowerCase() === "rad etilgan" ? "Salbiy" : "Ijobiy",
      status: decisionStatus,
    },
    medicalDocuments,
    disabilityHistory,
    conclusionHistory,
    applicationHistory,
    documentLogs,
    status: statusLabel || "-",
  };
}

function closeDetailModal() {
  detailModal?.setAttribute("hidden", "");
  detailModalLoading?.setAttribute("hidden", "");
  detailModalBody?.setAttribute("hidden", "");
  if (detailModalDialog) {
    detailModalDialog.scrollTop = 0;
    detailModalDialog.scrollLeft = 0;
  }
  if (detailModalBody) {
    detailModalBody.scrollTop = 0;
    detailModalBody.scrollLeft = 0;
  }
  if (detailContent) {
    detailContent.innerHTML = "";
  }
}

async function openApplicationDetail(applicationId) {
  const application = getApplicationById(applicationId);

  if (!application) {
    showToast("Ariza topilmadi", `${applicationId} bo'yicha ma'lumot topilmadi.`, "error");
    return;
  }

  detailModal?.removeAttribute("hidden");
  detailModalLoading?.removeAttribute("hidden");
  detailModalBody?.setAttribute("hidden", "");
  if (detailModalDialog) {
    detailModalDialog.scrollTop = 0;
    detailModalDialog.scrollLeft = 0;
  }
  if (detailModalBody) {
    detailModalBody.scrollTop = 0;
    detailModalBody.scrollLeft = 0;
  }

  await sleep(200);

  if (detailContent) {
    detailContent.innerHTML = [
      `<div class="detail-section-grid">
        ${buildDetailSection(
          "Ariza ma'lumotlari",
          buildDetailFieldGrid([
            { label: "ID", value: application.id },
            { label: "Sana", value: formatReadableDate(application.date) },
            { label: "Status", value: formatStatusBadge(application.status) },
          ]),
        )}
        ${buildDetailSection(
          "Arizani qabul qiluvchi",
          `<div class="detail-person-layout">
            ${buildDetailPersonCard(
              application.receiver,
              `<img class="detail-person-card__avatar" src="${application.receiver.avatar}" alt="${application.receiver.fullName} rasmi" />`,
            )}
            ${buildDetailFieldGrid([
              { label: "FIO", value: application.receiver.fullName },
              { label: "JSHSHIR", value: application.receiver.pinfl },
              { label: "Lavozim", value: application.receiver.position },
              { label: "Manzil", value: application.receiver.address },
            ])}
          </div>`,
        )}
        ${buildDetailSection(
          "Qonuniy vakil",
          `<div class="detail-person-layout">
            ${buildDetailPersonCard(
              application.representative,
              `<img class="detail-person-card__avatar" src="${application.representative.avatar}" alt="${application.representative.fullName} rasmi" />`,
            )}
            ${buildDetailFieldGrid([
              { label: "FIO", value: application.representative.fullName },
              { label: "JSHSHIR", value: application.representative.pinfl },
              { label: "Vakillik darajasi", value: application.representative.level },
              { label: "Manzil", value: application.representative.address },
              { label: "Telefon raqami", value: application.representative.phone },
            ])}
          </div>`,
        )}
        ${buildDetailSection(
          "Arizachi",
          `<div class="detail-person-layout">
            ${buildDetailPersonCard(application.applicant, `<img class="detail-person-card__avatar" src="${application.applicant.avatar}" alt="${application.applicant.fullName} rasmi" />`)}
            ${buildDetailFieldGrid([
              { label: "FIO", value: application.applicant.fullName },
              { label: "JSHSHIR", value: application.applicant.pinfl },
              { label: "Tug'ilgan sanasi", value: application.applicant.birthDate },
              { label: "Jinsi", value: application.applicant.gender },
              { label: "Nogironlik guruhi", value: application.applicant.disabilityGroup },
              { label: "Tashxisi", value: application.applicant.diagnosis },
              { label: "Manzili", value: application.applicant.address },
            ])}
          </div>`,
        )}
        ${buildDetailSection(
          "Tashkilot",
          buildDetailFieldGrid([
            { label: "Tashkilot turi", value: application.organization.type },
            { label: "Tashkilot nomi", value: application.organization.name },
            { label: "Manzil", value: application.organization.address },
          ]),
        )}
        ${buildDetailSection(
          "Tibbiy hujjatlar",
          buildDetailDocuments(application.medicalDocuments),
        )}
        <div class="detail-section-grid__double">
          ${buildDetailSection(
            "Dalolatnoma",
            buildDetailFieldGrid([
              { label: "ID", value: application.act.id },
              { label: "Sana", value: application.act.date },
              { label: "Natija", value: formatResultBadge(application.act.result) },
              { label: "Status", value: formatStatusBadge(application.act.status) },
            ]) +
              buildDetailInlineActions([{ label: "Dalolatnomaga o'tish", pageTitle: "Arizalar - Dalolatnomalar" }]),
          )}
          ${buildDetailSection(
            "Qaror",
            buildDetailFieldGrid([
              { label: "ID", value: application.decision.id },
              { label: "Sana", value: application.decision.date },
              { label: "Natija", value: formatResultBadge(application.decision.result) },
              { label: "Status", value: formatStatusBadge(application.decision.status) },
            ]) +
              buildDetailInlineActions([{ label: "Qarorga o'tish", pageTitle: "Arizalar - Qarorlar" }]),
          )}
        </div>
      </div>`,
      buildDetailAccordion(
        "Nogironlik tarixi",
        buildDetailRecordList(
          application.disabilityHistory.map((item) => ({
            title: item.id,
            meta: item.assignedDate,
            fields: [
              { label: "Ta'yinlangan sana", value: item.assignedDate },
              { label: "Amal qilish muddati", value: item.validUntil },
              { label: "Nogironlik guruhi", value: item.group },
              { label: "Tashxisi", value: item.diagnosis },
              { label: "Status", value: item.status },
            ],
          })),
        ),
        `${application.disabilityHistory.length} ta yozuv`,
        true,
      ),
      buildDetailAccordion(
        "Xulosalar tarixi",
        buildDetailRecordList(
          application.conclusionHistory.map((item) => ({
            title: item.id,
            meta: item.date,
            fields: [
              { label: "Sana", value: item.date },
              { label: "Ta'lim muassasasi turi", value: item.institutionType },
              { label: "Amal qilish muddati", value: item.validUntil },
              { label: "Status", value: item.status },
            ],
          })),
        ),
        `${application.conclusionHistory.length} ta yozuv`,
      ),
      buildDetailAccordion(
        "Arizalar tarixi",
        buildDetailRecordList(
          application.applicationHistory.map((item) => ({
            title: item.id,
            meta: item.date,
            fields: [
              { label: "Sana", value: item.date },
              { label: "Status", value: item.status },
            ],
          })),
        ),
        `${application.applicationHistory.length} ta yozuv`,
      ),
      buildDetailAccordion(
        "Hujjat tarixi",
        buildDetailRecordList(
          application.documentLogs.map((item) => ({
            title: item.operation,
            meta: item.date,
            fields: [
              { label: "Sana", value: item.date },
              { label: "Amaliyotni bajaruvchi", value: item.actor },
            ],
          })),
        ),
        `${application.documentLogs.length} ta yozuv`,
      ),
    ].join("");
  }

  if (detailActions) {
    detailActions.hidden = application.status.toLowerCase() !== "jarayonda";
  }
  if (detailAcceptButton) {
    detailAcceptButton.dataset.applicationId = application.id;
  }
  if (detailRejectButton) {
    detailRejectButton.dataset.applicationId = application.id;
  }

  detailModalLoading?.setAttribute("hidden", "");
  detailModalBody?.removeAttribute("hidden");
  window.requestAnimationFrame(() => {
    detailModalDialog?.scrollTo(0, 0);
    detailModalBody?.scrollTo(0, 0);
  });
  detailModalClose?.focus();
}

function enhanceProcessRowActions() {
  document.querySelectorAll("#applicationsTable tbody tr[data-status='jarayonda']").forEach((row) => {
    const dropdown = row.querySelector(".row-menu__dropdown");
    const applicationId = row.querySelector(".stacked-cell--application strong")?.textContent?.trim() ?? "Ariza";
    if (!dropdown || dropdown.querySelector("[data-process-action]")) {
      return;
    }

    const approveButton = document.createElement("button");
    approveButton.type = "button";
    approveButton.className = "row-menu__item row-menu__item--accent";
    approveButton.dataset.processAction = "Qabul qilish";
    approveButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M6 12.5l4 4 8-9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Qabul qilish</span>';
    approveButton.addEventListener("click", () => {
      openConfirmModal("Qabul qilish", applicationId);
    });

    const rejectButton = document.createElement("button");
    rejectButton.type = "button";
    rejectButton.className = "row-menu__item row-menu__item--danger";
    rejectButton.dataset.processAction = "Rad etish";
    rejectButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none"><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><span>Rad etish</span>';
    rejectButton.addEventListener("click", () => {
      openConfirmModal("Rad etish", applicationId);
    });

    const editButton = dropdown.querySelector(".row-menu__item:nth-child(2)");
    editButton?.insertAdjacentElement("afterend", approveButton);
    approveButton.insertAdjacentElement("afterend", rejectButton);
  });
}

function enhanceApplicationViewActions() {
  applicationRows.forEach((row) => {
    const applicationId = row.querySelector(".stacked-cell--application strong")?.textContent?.trim();
    const viewButton = row.querySelector(".row-menu__dropdown .row-menu__item");
    const applicationLink = row.querySelector(".stacked-cell--application strong");

    if (!applicationId) {
      return;
    }

    if (viewButton && !viewButton.dataset.detailBound) {
      viewButton.dataset.detailBound = "true";
      viewButton.addEventListener("click", () => {
        openApplicationDetail(applicationId);
      });
    }

    if (applicationLink && !applicationLink.dataset.detailBound) {
      applicationLink.dataset.detailBound = "true";
      applicationLink.tabIndex = 0;
      applicationLink.setAttribute("role", "button");
      applicationLink.setAttribute("aria-label", `${applicationId} ariza tafsilotlarini ochish`);
      applicationLink.style.cursor = "pointer";
      applicationLink.addEventListener("click", () => {
        openApplicationDetail(applicationId);
      });
      applicationLink.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openApplicationDetail(applicationId);
        }
      });
    }
  });
}

function renderPagination(totalPages) {
  if (!paginationPages || !paginationPrev || !paginationNext) {
    return;
  }

  paginationPages.innerHTML = "";
  tableState.totalPages = Math.max(totalPages, 1);
  paginationPrev.disabled = tableState.currentPage <= 1;
  paginationNext.disabled = tableState.currentPage >= tableState.totalPages;

  const pages = [];
  const { currentPage } = tableState;

  if (tableState.totalPages <= 5) {
    for (let page = 1; page <= tableState.totalPages; page += 1) {
      pages.push(page);
    }
  } else {
    pages.push(1);
    if (currentPage > 3) {
      pages.push("ellipsis-start");
    }
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(tableState.totalPages - 1, currentPage + 1);
    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }
    if (currentPage < tableState.totalPages - 2) {
      pages.push("ellipsis-end");
    }
    pages.push(tableState.totalPages);
  }

  pages.forEach((item) => {
    if (typeof item !== "number") {
      const ellipsis = document.createElement("span");
      ellipsis.className = "pagination__ellipsis";
      ellipsis.setAttribute("aria-hidden", "true");
      ellipsis.textContent = "...";
      paginationPages.append(ellipsis);
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "pagination__button";
    if (item === currentPage) {
      button.classList.add("pagination__button--active");
      button.setAttribute("aria-current", "page");
    }
    button.dataset.page = String(item);
    button.textContent = String(item);
    paginationPages.append(button);
  });
}

function setIconButtonLoadingState(button, isLoading, defaultIconMarkup, defaultLabel, loadingLabel) {
  if (!button) {
    return;
  }

  const icon = button.querySelector("svg");
  const label = button.querySelector(".sr-only");

  if (!icon || !label) {
    return;
  }

  if (isLoading) {
    button.classList.add("table-action--loading");
    icon.innerHTML = '<circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.6" opacity="0.25"/><path d="M19 12a7 7 0 0 0-7-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';
    label.textContent = loadingLabel;
    return;
  }

  button.classList.remove("table-action--loading");
  icon.innerHTML = defaultIconMarkup;
  label.textContent = defaultLabel;
}

function setExportLoadingState(isLoading) {
  setIconButtonLoadingState(
    exportButton,
    isLoading,
    '<path d="M12 4v10M8 10l4 4 4-4M5 18h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    "Eksport",
    "Yuklanmoqda...",
  );
}

function setReportExportLoadingState(isLoading) {
  setIconButtonLoadingState(
    reportExportButton,
    isLoading,
    '<path d="M12 4v10M8 10l4 4 4-4M5 18h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    "Hisobotni yuklab olish",
    "Yuklanmoqda...",
  );
}

function showApplicationsView() {
  applicationsListView?.removeAttribute("hidden");
  disabilityReportView?.setAttribute("hidden", "");
  emptyContentView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
}

function showDisabilityReportView() {
  applicationsListView?.setAttribute("hidden", "");
  disabilityReportView?.removeAttribute("hidden");
  emptyContentView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
}

function showEmptyView(title) {
  applicationsListView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
  emptyContentView?.removeAttribute("hidden");
  if (emptyViewTitle) {
    emptyViewTitle.textContent = title;
  }
  if (emptyViewDescription) {
    emptyViewDescription.textContent = `"${title}" bo'limi uchun kontent hali tayyorlanmagan.`;
  }
}

async function navigateToView(title) {
  const isApplicationsList = title === "Arizalar - Arizalar ro'yxati";
  const isDisabilityReport = title === "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot";

  if (!isApplicationsList && !isDisabilityReport) {
    showEmptyView(title.split(" - ").pop() ?? title);
    return;
  }

  emptyContentView?.setAttribute("hidden", "");
  applicationsListView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  contentLoader?.removeAttribute("hidden");
  await sleep(200);

  if (isApplicationsList) {
    showApplicationsView();
    applyTableFilters();
    return;
  }

  showDisabilityReportView();
}

function getHashForTitle(title) {
  if (title === "Arizalar - Arizalar ro'yxati") {
    return "#applications";
  }

  if (title === "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot") {
    return "#/reports/disabilityinfo";
  }

  return "";
}

function getTitleFromHash(hashValue) {
  if (hashValue === "#applications") {
    return "Arizalar - Arizalar ro'yxati";
  }

  if (hashValue === "#/reports/disabilityinfo") {
    return "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot";
  }

  return "";
}

function getReportFilterValues() {
  return {
    diagnosis: reportDiagnosisFilter?.value ?? "all",
    group: reportDisabilityGroupFilter?.value ?? "all",
    gender: reportGenderFilter?.value ?? "all",
    age: reportAgeFilter?.value ?? "all",
  };
}

function getApplicationRegionLabel(value) {
  const row = Array.from(applicationRows).find((item) => (item.getAttribute("data-region") ?? "") === value);
  return row?.querySelector("td:nth-child(5) strong")?.textContent?.trim() ?? value;
}

function getApplicationStepLabel(value) {
  return applicationStepLabels[value] ?? value;
}

function getDefaultStepForStatus(status) {
  const normalized = status.toLowerCase();
  if (normalized === "jarayonda") {
    return "komissiya-korib-chiqmoqda";
  }
  if (normalized === "qabul qilingan") {
    return "komissiya-qabul-qilgan";
  }
  if (normalized === "rad etilgan") {
    return "komissiya-rad-etgan";
  }
  return "";
}

function getApplicationOrganizationTypeLabel(value) {
  return applicationOrganizationTypeLabels[value] ?? value;
}

function getApplicationSelectLabel(select) {
  if (!select) {
    return "";
  }

  const option = select.options[select.selectedIndex];
  return option?.textContent?.trim() ?? "";
}

function setCustomSelectOptions(select, values, getLabel) {
  if (!select) {
    return;
  }

  const menu = select.closest("[data-custom-select]");
  const dropdown = menu?.querySelector(".custom-select__dropdown");
  if (!dropdown) {
    return;
  }

  const previousValue = select.value;
  const normalizedValues = Array.from(new Set(values.filter(Boolean)));
  const nextValue = normalizedValues.includes(previousValue) ? previousValue : "all";

  dropdown.innerHTML = "";
  select.innerHTML = "";

  const allOption = document.createElement("button");
  allOption.type = "button";
  allOption.className = "custom-select__option";
  allOption.setAttribute("role", "option");
  allOption.setAttribute("data-value", "all");
  allOption.textContent = "Barchasi";
  dropdown.append(allOption);

  const allNativeOption = document.createElement("option");
  allNativeOption.value = "all";
  allNativeOption.textContent = "Barchasi";
  select.append(allNativeOption);

  normalizedValues.forEach((value) => {
    const label = getLabel(value);
    const option = document.createElement("button");
    option.type = "button";
    option.className = "custom-select__option";
    option.setAttribute("role", "option");
    option.setAttribute("data-value", value);
    option.textContent = label;
    dropdown.append(option);

    const nativeOption = document.createElement("option");
    nativeOption.value = value;
    nativeOption.textContent = label;
    select.append(nativeOption);
  });

  select.value = nextValue;
  bindCustomSelectOptions(menu);
  syncCustomSelectUi(menu);
}

function setCustomSelectDisabled(select, disabled) {
  if (!select) {
    return;
  }

  const menu = select.closest("[data-custom-select]");
  const trigger = menu?.querySelector(".custom-select__trigger");

  if (disabled) {
    select.value = "all";
    menu?.classList.remove("custom-select--open");
    menu?.classList.add("custom-select--disabled");
    trigger?.setAttribute("disabled", "true");
    trigger?.setAttribute("aria-expanded", "false");
  } else {
    menu?.classList.remove("custom-select--disabled");
    trigger?.removeAttribute("disabled");
  }

  if (menu) {
    syncCustomSelectUi(menu);
  }
}

function enrichApplicationRows() {
  applicationRows.forEach((row) => {
    const applicationId = row.querySelector(".stacked-cell--application strong")?.textContent?.trim() ?? "";
    const metadata = applicationRowMetadata[applicationId] ?? {};
    const organization = row.querySelector("td:nth-child(4) strong")?.textContent?.trim() ?? "";
    const district = row.querySelector("td:nth-child(5) span")?.textContent?.trim() ?? "";
    const status = row.getAttribute("data-status") ?? "";
    const organizationTypeMatch = organization.match(/\(([^)]+)\)\s*$/);
    const organizationType = organizationTypeMatch?.[1]?.trim().toLowerCase() ?? "";
    const stepValue = metadata.step || getDefaultStepForStatus(status);

    if (stepValue) {
      row.setAttribute("data-step", stepValue);
    }
    if (district) {
      row.setAttribute("data-district", district.toLowerCase());
    }
    if (organizationType) {
      row.setAttribute("data-organization-type", organizationType);
    }
    if (organization) {
      row.setAttribute("data-organization", organization.toLowerCase());
      row.setAttribute(
        "data-search",
        `${row.getAttribute("data-search") ?? ""} ${organization.toUpperCase()}`.trim(),
      );
    }

    const statusCell = row.children[5];
    const statusBadge = statusCell?.querySelector(".status-badge");
    if (statusCell && statusBadge && stepValue) {
      const variant = getStatusBadgeVariant(status);
      statusCell.innerHTML = `<span class="status-badge ${variant.className}">${variant.label}</span>`;
    }
  });
}

function updateApplicationFilterOptionSets() {
  const statusValue = statusFilter?.value ?? "all";
  const regionValue = regionFilter?.value ?? "all";
  const stepValue = stepFilter?.value ?? "all";
  const organizationTypeValue = organizationTypeFilter?.value ?? "all";
  const rows = Array.from(applicationRows);

  const stepRows = statusValue === "all"
    ? rows
    : rows.filter((row) => (row.getAttribute("data-status") ?? "") === statusValue);
  const regionRows = regionValue === "all"
    ? rows
    : rows.filter((row) => (row.getAttribute("data-region") ?? "") === regionValue);

  const districtValues = regionRows.map((row) => row.getAttribute("data-district") ?? "");
  const organizationTypeValues = regionRows.map((row) => row.getAttribute("data-organization-type") ?? "");
  const organizationRows = organizationTypeValue === "all"
    ? regionRows
    : regionRows.filter((row) => (row.getAttribute("data-organization-type") ?? "") === organizationTypeValue);
  const organizationValues = organizationRows.map((row) => row.getAttribute("data-organization") ?? "");

  setCustomSelectOptions(
    stepFilter,
    stepRows.map((row) => row.getAttribute("data-step") ?? ""),
    getApplicationStepLabel,
  );
  setCustomSelectOptions(districtFilter, districtValues, (value) => {
    const row = rows.find((item) => (item.getAttribute("data-district") ?? "") === value);
    return row?.querySelector("td:nth-child(5) span")?.textContent?.trim() ?? value;
  });
  setCustomSelectOptions(organizationTypeFilter, organizationTypeValues, getApplicationOrganizationTypeLabel);
  setCustomSelectOptions(organizationFilter, organizationValues, (value) => {
    const row = rows.find((item) => (item.getAttribute("data-organization") ?? "") === value);
    return row?.querySelector("td:nth-child(4) strong")?.textContent?.trim() ?? value;
  });

  setCustomSelectDisabled(stepFilter, statusValue === "all");
  setCustomSelectDisabled(districtFilter, regionValue === "all");
  setCustomSelectDisabled(organizationFilter, organizationTypeValue === "all");

  if (statusValue === "all" && stepFilter) {
    stepFilter.value = "all";
  }
  if (regionValue === "all" && districtFilter) {
    districtFilter.value = "all";
  }
  if (organizationTypeValue === "all" && organizationFilter) {
    organizationFilter.value = "all";
  }
}

function syncTableMenuMaxHeight(toggleButton, menu) {
  if (!toggleButton || !menu) {
    return;
  }

  const rect = toggleButton.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 0;
  const availableHeight = Math.max(260, Math.floor(viewportHeight - rect.bottom - 24));
  menu.style.maxHeight = `${availableHeight}px`;
}

function getApplicationFilterValues() {
  return {
    status: statusFilter?.value ?? "all",
    region: regionFilter?.value ?? "all",
    step: stepFilter?.value ?? "all",
    district: districtFilter?.value ?? "all",
    organizationType: organizationTypeFilter?.value ?? "all",
    organization: organizationFilter?.value ?? "all",
    dateFrom: dateFromFilter?.value ?? "",
    dateTo: dateToFilter?.value ?? "",
  };
}

function getApplicationFilterActiveCount() {
  const values = getApplicationFilterValues();
  return Object.entries(values).reduce((count, [key, value]) => {
    return count + (value !== applicationDefaultFilters[key] ? 1 : 0);
  }, 0);
}

function updateApplicationFilterControls() {
  const activeCount = getApplicationFilterActiveCount();
  const currentFilters = getApplicationFilterValues();
  const hasPendingChanges = Object.keys(applicationDefaultFilters).some(
    (key) => currentFilters[key] !== applicationAppliedFilters[key],
  );
  const hasAppliedFilters = Object.keys(applicationDefaultFilters).some(
    (key) => applicationAppliedFilters[key] !== applicationDefaultFilters[key],
  );

  if (applyFilters) {
    applyFilters.disabled = !hasPendingChanges;
  }

  if (resetFilters) {
    resetFilters.disabled = !hasAppliedFilters;
  }

  if (filterToggle) {
    filterToggle.classList.toggle("table-action--active", activeCount > 0);
  }

  if (filterActiveCount) {
    filterActiveCount.hidden = activeCount === 0;
    filterActiveCount.textContent = String(activeCount);
  }
}

function updateApplicationsEmptyState(matchedRowsCount) {
  if (!tableEmptyRow || !tableEmptyTitle || !tableEmptyDescription || !tableEmptyAction) {
    return;
  }

  const hasSearch = Boolean(applicationSearch?.value.trim());
  const hasAppliedFilters = Object.keys(applicationDefaultFilters).some(
    (key) => applicationAppliedFilters[key] !== applicationDefaultFilters[key],
  );

  tableEmptyRow.hidden = matchedRowsCount !== 0;

  if (matchedRowsCount !== 0) {
    tableEmptyAction.hidden = true;
    return;
  }

  if (hasSearch || hasAppliedFilters) {
    tableEmptyTitle.textContent = "Mos ma'lumot topilmadi";
    tableEmptyDescription.textContent = "Qidiruv yoki tanlangan filterlar bo'yicha hech qanday ariza topilmadi.";
    tableEmptyAction.hidden = false;
    return;
  }

  tableEmptyTitle.textContent = "Hozircha arizalar mavjud emas";
  tableEmptyDescription.textContent = "Ro'yxatga hali arizalar kelib tushmagan yoki ma'lumotlar yuklanmagan.";
  tableEmptyAction.hidden = true;
}

function getReportFilterActiveCount() {
  const values = getReportFilterValues();
  return Object.entries(values).reduce((count, [key, value]) => {
    return count + (value !== reportDefaultFilters[key] ? 1 : 0);
  }, 0);
}

function updateReportFilterControls() {
  const activeCount = getReportFilterActiveCount();
  const currentFilters = getReportFilterValues();
  const hasPendingChanges = Object.keys(reportDefaultFilters).some(
    (key) => currentFilters[key] !== reportAppliedFilters[key],
  );
  const hasAppliedFilters = Object.keys(reportDefaultFilters).some(
    (key) => reportAppliedFilters[key] !== reportDefaultFilters[key],
  );

  if (reportResetFilters) {
    reportResetFilters.disabled = !hasAppliedFilters;
  }

  if (reportApplyFilters) {
    reportApplyFilters.disabled = !hasPendingChanges;
  }

  if (reportFilterToggle) {
    reportFilterToggle.classList.toggle("table-action--active", activeCount > 0);
  }

  if (reportFilterActiveCount) {
    reportFilterActiveCount.hidden = activeCount === 0;
    reportFilterActiveCount.textContent = String(activeCount);
  }
}

function syncInitialRouteView() {
  const routeTitle = getTitleFromHash(window.location.hash);

  if (routeTitle === "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot") {
    showDisabilityReportView();
    return;
  }

  if (routeTitle === "Arizalar - Arizalar ro'yxati") {
    showApplicationsView();
    return;
  }

  showApplicationsView();
}

function applyReportFilters() {
  reportAppliedFilters = { ...getReportFilterValues() };
  updateReportFilterControls();
  renderReportTable();
  syncReportFrozenColumn();
}

function syncReportFrozenColumn() {
  return;
}

function setThemeIcon(isDark) {
  if (!themeToggleIcon) {
    return;
  }

  themeToggleIcon.innerHTML = isDark
    ? '<path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.5"/>'
    : '<path d="M14.5 4.5a7 7 0 1 0 5 12 7.5 7.5 0 1 1-5-12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>';
}

function applyTheme(isDark) {
  document.body.classList.toggle("theme-dark", isDark);
  themeToggle?.setAttribute("aria-pressed", String(isDark));
  setThemeIcon(isDark);
}

function getSavedThemePreference() {
  return window.localStorage.getItem(themeStorageKey);
}

function initializeTheme() {
  const savedTheme = getSavedThemePreference();
  const isDark = savedTheme ? savedTheme === "dark" : Boolean(systemTheme?.matches);
  applyTheme(isDark);
}

if (loginForm && loginUsername && loginPassword && loginSubmit) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();

    loginError?.setAttribute("hidden", "");
    loginSubmit.disabled = true;
    loginSubmit.innerHTML = '<span class="login-submit__spinner" aria-hidden="true"></span><span>Kirilmoqda...</span>';

      await sleep(200);

    if (username === "admin" && password === "muruvvat123") {
      loginSubmit.disabled = false;
      loginSubmit.textContent = "Kirish";
      showAppView();
      syncInitialRouteView();
      applyRouteFromHash();
      showToast("Xush kelibsiz", "Muruvvat moduliga muvaffaqiyatli kirildi.");
      return;
    }

    loginSubmit.disabled = false;
    loginSubmit.textContent = "Kirish";
    loginError?.removeAttribute("hidden");
  });
}

passwordToggle?.addEventListener("click", () => {
  if (!loginPassword) {
    return;
  }

  loginPassword.type = loginPassword.type === "password" ? "text" : "password";
  syncPasswordToggleUi();
});

loginPassword?.addEventListener("keydown", syncCapsLockState);
loginPassword?.addEventListener("keyup", syncCapsLockState);
loginPassword?.addEventListener("blur", () => {
  capsLockHint && (capsLockHint.hidden = true);
});

forgotPasswordButton?.addEventListener("click", () => {
  showToast(
    "Parolni tiklash",
    "Demo rejimda parolni tiklash ulanmagan. Administrator yoki OneID orqali kirishdan foydalaning.",
  );
});

logoutButton?.addEventListener("click", () => {
  showLoginView();
  loginUsername && (loginUsername.value = "");
  loginPassword && (loginPassword.value = "");
  loginSubmit && (loginSubmit.textContent = "Kirish");
});

if (menuToggle && sidebar) {
  menuToggle.addEventListener("click", () => {
    sidebar.classList.toggle("sidebar--open");
  });

  document.addEventListener("click", (event) => {
    const target = event.target;
    if (window.innerWidth > 1180) {
      return;
    }

    if (!(target instanceof Node)) {
      return;
    }

    if (!sidebar.contains(target) && !menuToggle.contains(target)) {
      sidebar.classList.remove("sidebar--open");
    }
  });
}

if (sidebarCollapse && appShell) {
  sidebarCollapse.addEventListener("click", () => {
    const isCollapsed = appShell.classList.toggle("app-shell--collapsed");
    sidebarCollapse.setAttribute("aria-expanded", String(!isCollapsed));
  });
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("theme-dark");
    window.localStorage.setItem(themeStorageKey, isDark ? "dark" : "light");
    applyTheme(isDark);
  });
}

systemTheme?.addEventListener("change", (event) => {
  if (getSavedThemePreference()) {
    return;
  }

  applyTheme(event.matches);
});

menuToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const container = toggle.closest(".header-menu");
    if (!container) {
      return;
    }

    const isOpen = container.classList.contains("header-menu--open");

    document.querySelectorAll(".header-menu").forEach((menu) => {
      menu.classList.remove("header-menu--open");
      const button = menu.querySelector("[data-menu-toggle]");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      container.classList.add("header-menu--open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Node)) {
    return;
  }

  document.querySelectorAll(".header-menu").forEach((menu) => {
    if (!menu.contains(target)) {
      menu.classList.remove("header-menu--open");
      const button = menu.querySelector("[data-menu-toggle]");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    }
  });

  document.querySelectorAll(".row-menu").forEach((menu) => {
    if (!menu.contains(target)) {
      menu.classList.remove("row-menu--open");
      const button = menu.querySelector(".row-menu__toggle");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    }
  });

  if (filterToggle && filterMenu) {
    const filterContainer = filterToggle.closest(".table-menu");
    if (filterContainer && !filterContainer.contains(target)) {
      // Applications filter stays open until user explicitly closes it.
    }
  }

  if (reportFilterToggle && reportFilterMenu) {
    const reportFilterContainer = reportFilterToggle.closest(".table-menu");
    if (reportFilterContainer && !reportFilterContainer.contains(target)) {
      reportFilterContainer.classList.remove("table-menu--open");
      reportFilterToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (reportColumnsToggle && reportColumnsMenu) {
    const reportColumnsContainer = reportColumnsToggle.closest(".table-menu");
    if (reportColumnsContainer && !reportColumnsContainer.contains(target)) {
      reportColumnsContainer.classList.remove("table-menu--open");
      reportColumnsToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (rowsPerPageMenu && !rowsPerPageMenu.contains(target)) {
    rowsPerPageMenu.classList.remove("pagination-select--open");
    rowsPerPageTrigger?.setAttribute("aria-expanded", "false");
  }

  customSelects.forEach((select) => {
    if (!select.contains(target)) {
      select.classList.remove("custom-select--open");
      const trigger = select.querySelector(".custom-select__trigger");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    }
  });

  if (
    calendarState.activeField &&
    !calendarPopover.hidden &&
    !calendarPopover.contains(target) &&
    !calendarState.activeField.contains(target)
  ) {
    closeCalendar();
  }
});

navToggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const group = toggle.closest(".nav-group");
    if (!group) {
      return;
    }

    const isOpen = group.classList.contains("nav-group--open");

    document.querySelectorAll(".nav-group").forEach((item) => {
      item.classList.remove("nav-group--open");
      const button = item.querySelector(".nav-item--toggle");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });

    if (!isOpen) {
      group.classList.add("nav-group--open");
      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

function syncPageHeading(title) {
  if (!pageTitle || !title) {
    return;
  }

  const parts = title.split(" - ");
  pageTitle.textContent = parts[parts.length - 1];
  if (pageBreadcrumb) {
    pageBreadcrumb.textContent = parts.length > 1 ? parts.join(" / ") : "Asosiy menyu";
  }
}

function syncActiveNavigation(link) {
  document.querySelectorAll(".nav-item--active").forEach((item) => {
    item.classList.remove("nav-item--active");
  });

  document.querySelectorAll(".nav-subitem--active").forEach((item) => {
    item.classList.remove("nav-subitem--active");
  });

  if (!link) {
    return;
  }

  if (link.classList.contains("nav-subitem")) {
    link.classList.add("nav-subitem--active");
    const group = link.closest(".nav-group");
    if (group) {
      document.querySelectorAll(".nav-group").forEach((item) => {
        if (item !== group) {
          item.classList.remove("nav-group--open");
          const button = item.querySelector(".nav-item--toggle");
          if (button) {
            button.setAttribute("aria-expanded", "false");
          }
        }
      });

      group.classList.add("nav-group--open");
      const button = group.querySelector(".nav-item--toggle");
      if (button) {
        button.setAttribute("aria-expanded", "true");
      }
    }
  } else {
    link.classList.add("nav-item--active");
  }
}

pageLinks.forEach((link) => {
  link.addEventListener("click", async (event) => {
    event.preventDefault();

    const title = link.getAttribute("data-page-title");
    syncPageHeading(title);
    syncActiveNavigation(link);

    if (window.innerWidth <= 1180) {
      sidebar?.classList.remove("sidebar--open");
    }

    if (title) {
      const nextHash = getHashForTitle(title);
      if (nextHash && window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
      await navigateToView(title);
    }
  });
});

function applyTableFilters() {
  const searchValue = applicationSearch?.value.trim().toUpperCase() ?? "";
  const statusValue = applicationAppliedFilters.status;
  const regionValue = applicationAppliedFilters.region;
  const stepValue = applicationAppliedFilters.step;
  const districtValue = applicationAppliedFilters.district;
  const organizationTypeValue = applicationAppliedFilters.organizationType;
  const organizationValue = applicationAppliedFilters.organization;
  const dateFromValue = applicationAppliedFilters.dateFrom;
  const dateToValue = applicationAppliedFilters.dateTo;
  const limit = Number(rowsPerPage?.value ?? "10");
  const matchedRows = [];
  let processCount = 0;
  let acceptedCount = 0;
  let rejectedCount = 0;

  applicationRows.forEach((row) => {
    const rowStatus = row.getAttribute("data-status") ?? "";
    const rowRegion = row.getAttribute("data-region") ?? "";
    const rowStep = row.getAttribute("data-step") ?? "";
    const rowDistrict = row.getAttribute("data-district") ?? "";
    const rowOrganizationType = row.getAttribute("data-organization-type") ?? "";
    const rowOrganization = row.getAttribute("data-organization") ?? "";
    const rowSearch = row.getAttribute("data-search") ?? "";
    const rowDateText = row.querySelector(".stacked-cell--application span")?.textContent?.trim() ?? "";
    const [day, month, year] = rowDateText.split(".");
    const rowDateValue = day && month && year ? `${year}-${month}-${day}` : "";
    const matchesSearch = !searchValue || rowSearch.includes(searchValue);
    const matchesStatus = statusValue === "all" || rowStatus === statusValue;
    const matchesRegion = regionValue === "all" || rowRegion === regionValue;
    const matchesStep = stepValue === "all" || rowStep === stepValue;
    const matchesDistrict = districtValue === "all" || rowDistrict === districtValue;
    const matchesOrganizationType = organizationTypeValue === "all" || rowOrganizationType === organizationTypeValue;
    const matchesOrganization = organizationValue === "all" || rowOrganization === organizationValue;
    const matchesDateFrom = !dateFromValue || (rowDateValue && rowDateValue >= dateFromValue);
    const matchesDateTo = !dateToValue || (rowDateValue && rowDateValue <= dateToValue);
    const matched = matchesSearch
      && matchesStatus
      && matchesRegion
      && matchesStep
      && matchesDistrict
      && matchesOrganizationType
      && matchesOrganization
      && matchesDateFrom
      && matchesDateTo;

    if (matched) {
      matchedRows.push(row);
      if (rowStatus === "jarayonda") {
        processCount += 1;
      }
      if (rowStatus === "qabul qilingan") {
        acceptedCount += 1;
      }
      if (rowStatus === "rad etilgan") {
        rejectedCount += 1;
      }
    }

    row.style.display = "none";
  });

  tableState.filteredRows = matchedRows;
  tableState.totalPages = Math.max(1, Math.ceil(matchedRows.length / limit));
  tableState.currentPage = Math.min(tableState.currentPage, tableState.totalPages);

  const startIndex = (tableState.currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  matchedRows.slice(startIndex, endIndex).forEach((row) => {
    row.style.display = "";
  });

  updateApplicationsEmptyState(matchedRows.length);

  const totalBase = matchedRows.length || 1;
  const percent = (value) => `${Math.round((value / totalBase) * 100)}%`;
  if (totalApplicationsStat) {
    totalApplicationsStat.textContent = String(matchedRows.length);
  }
  if (totalApplicationsShare) {
    totalApplicationsShare.textContent = matchedRows.length > 0 ? "100%" : "0%";
  }
  if (processApplicationsStat) {
    processApplicationsStat.textContent = String(processCount);
  }
  if (processApplicationsShare) {
    processApplicationsShare.textContent = matchedRows.length > 0 ? percent(processCount) : "0%";
  }
  if (acceptedApplicationsStat) {
    acceptedApplicationsStat.textContent = String(acceptedCount);
  }
  if (acceptedApplicationsShare) {
    acceptedApplicationsShare.textContent = matchedRows.length > 0 ? percent(acceptedCount) : "0%";
  }
  if (rejectedApplicationsStat) {
    rejectedApplicationsStat.textContent = String(rejectedCount);
  }
  if (rejectedApplicationsShare) {
    rejectedApplicationsShare.textContent = matchedRows.length > 0 ? percent(rejectedCount) : "0%";
  }

  if (paginationInfo) {
    const from = matchedRows.length > 0 ? startIndex + 1 : 0;
    const to = matchedRows.length > 0 ? Math.min(endIndex, matchedRows.length) : 0;
    paginationInfo.textContent = matchedRows.length > 0 ? `${from}-${to} / ${matchedRows.length} ta yozuv` : "0 / 0 ta yozuv";
  }

  renderPagination(tableState.totalPages);
}

function resetAndApplyFilters() {
  tableState.currentPage = 1;
  applyTableFilters();
}

applicationSearch?.addEventListener("input", resetAndApplyFilters);
rowsPerPage?.addEventListener("change", resetAndApplyFilters);

downloadActions.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.classList.contains("row-menu__item--loading")) {
      return;
    }

    button.classList.add("row-menu__item--loading");
    const label = button.querySelector("span");
    const icon = button.querySelector("svg");
    const originalLabel = label?.textContent ?? "";
    const originalIcon = icon?.innerHTML ?? "";

    if (label) {
      label.textContent = "Yuklanmoqda...";
    }
    if (icon) {
      icon.innerHTML = '<circle cx="12" cy="12" r="7" stroke="currentColor" stroke-width="1.6" opacity="0.25"/><path d="M19 12a7 7 0 0 0-7-7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>';
    }

    window.setTimeout(() => {
      button.classList.remove("row-menu__item--loading");
      if (label) {
        label.textContent = originalLabel;
      }
      if (icon) {
        icon.innerHTML = originalIcon;
      }
      showToast("Yuklab olindi", "Ariza fayli tayyor bo'ldi.");
    }, 1000);
  });
});

exportButton?.addEventListener("click", async () => {
  if (exportButton.classList.contains("table-action--loading")) {
    return;
  }

  setExportLoadingState(true);
  await sleep(1000);
  setExportLoadingState(false);
  showToast("Eksport yakunlandi", "Ro'yxat fayl ko'rinishida tayyorlandi.");
});

reportExportButton?.addEventListener("click", async () => {
  if (reportExportButton.classList.contains("table-action--loading")) {
    return;
  }

  setReportExportLoadingState(true);
  await sleep(200);
  setReportExportLoadingState(false);
  showToast("Hisobot yuklandi", "Hisobot fayli tayyor bo'ldi.");
});

function syncRowsPerPageUi() {
  const selectedValue = rowsPerPage?.value ?? "10";

  rowsPerPageOptions.forEach((option) => {
    const isActive = option.getAttribute("data-value") === selectedValue;
    option.classList.toggle("pagination-select__option--active", isActive);
    option.setAttribute("aria-selected", String(isActive));

    if (isActive && rowsPerPageLabel) {
      rowsPerPageLabel.textContent = option.textContent ?? `${selectedValue} ta`;
    }
  });
}

function syncCustomSelectUi(select) {
  const nativeSelect = select.querySelector(".custom-select__native");
  const label = select.querySelector(".custom-select__trigger span");
  const options = select.querySelectorAll(".custom-select__option");
  const selectedValue = nativeSelect?.value ?? "";

  options.forEach((option) => {
    const isActive = option.getAttribute("data-value") === selectedValue;
    option.classList.toggle("custom-select__option--active", isActive);
    option.setAttribute("aria-selected", String(isActive));

    if (isActive && label) {
      label.textContent = option.textContent ?? "";
    }
  });
}

function bindCustomSelectOptions(select) {
  const trigger = select.querySelector(".custom-select__trigger");
  const nativeSelect = select.querySelector(".custom-select__native");
  const options = select.querySelectorAll(".custom-select__option");

  options.forEach((option) => {
    if (option.dataset.bound === "true") {
      return;
    }

    option.dataset.bound = "true";

    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      if (!value || !nativeSelect) {
        return;
      }

      nativeSelect.value = value;
      syncCustomSelectUi(select);
      nativeSelect.dispatchEvent(new Event("change", { bubbles: true }));
      select.classList.remove("custom-select--open");
      trigger?.setAttribute("aria-expanded", "false");
      trigger?.focus();
    });

    option.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        select.classList.remove("custom-select--open");
        trigger?.setAttribute("aria-expanded", "false");
        trigger?.focus();
        return;
      }

      const list = Array.from(select.querySelectorAll(".custom-select__option")).filter(
        (item) => !item.hasAttribute("hidden"),
      );
      const index = list.indexOf(option);
      if (event.key === "ArrowDown") {
        event.preventDefault();
        list[(index + 1) % list.length]?.focus();
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        list[(index - 1 + list.length) % list.length]?.focus();
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        option.click();
      }
    });
  });
}

if (filterToggle && filterMenu) {
  filterToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const filterContainer = filterToggle.closest(".table-menu");
    if (!filterContainer) {
      return;
    }

    const isOpen = filterContainer.classList.contains("table-menu--open");
    filterContainer.classList.toggle("table-menu--open", !isOpen);
    filterToggle.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
      syncTableMenuMaxHeight(filterToggle, filterMenu);
    }
  });
}

[statusFilter, regionFilter, stepFilter, districtFilter, organizationTypeFilter, organizationFilter].forEach((select) => {
  select?.addEventListener("change", () => {
    updateApplicationFilterOptionSets();
    updateApplicationFilterControls();
  });
});

applyFilters?.addEventListener("click", () => {
  applicationAppliedFilters = { ...getApplicationFilterValues() };
  updateApplicationFilterControls();
  tableState.currentPage = 1;
  applyTableFilters();
  filterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
  filterToggle?.setAttribute("aria-expanded", "false");
});

filterMenuClose?.addEventListener("click", () => {
  filterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
  filterToggle?.setAttribute("aria-expanded", "false");
});

if (reportFilterToggle && reportFilterMenu) {
  reportFilterToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const filterContainer = reportFilterToggle.closest(".table-menu");
    if (!filterContainer) {
      return;
    }

    const isOpen = filterContainer.classList.contains("table-menu--open");
    filterContainer.classList.toggle("table-menu--open", !isOpen);
    reportFilterToggle.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
      syncTableMenuMaxHeight(reportFilterToggle, reportFilterMenu);
    }
  });
}

if (reportColumnsToggle && reportColumnsMenu) {
  reportColumnsToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const columnsContainer = reportColumnsToggle.closest(".table-menu");
    if (!columnsContainer) {
      return;
    }

    const isOpen = columnsContainer.classList.contains("table-menu--open");
    columnsContainer.classList.toggle("table-menu--open", !isOpen);
    reportColumnsToggle.setAttribute("aria-expanded", String(!isOpen));
  });
}

if (rowsPerPageMenu && rowsPerPageTrigger && rowsPerPage) {
  rowsPerPageTrigger.addEventListener("click", (event) => {
    event.stopPropagation();
    const isOpen = rowsPerPageMenu.classList.contains("pagination-select--open");
    rowsPerPageMenu.classList.toggle("pagination-select--open", !isOpen);
    rowsPerPageTrigger.setAttribute("aria-expanded", String(!isOpen));
  });

  rowsPerPageOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.getAttribute("data-value");
      if (!value) {
        return;
      }

      rowsPerPage.value = value;
      syncRowsPerPageUi();
      resetAndApplyFilters();
      rowsPerPageMenu.classList.remove("pagination-select--open");
      rowsPerPageTrigger.setAttribute("aria-expanded", "false");
    });
  });
}

customSelects.forEach((select) => {
  const trigger = select.querySelector(".custom-select__trigger");
  const nativeSelect = select.querySelector(".custom-select__native");
  bindCustomSelectOptions(select);

  trigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (trigger.hasAttribute("disabled")) {
      return;
    }
    const isOpen = select.classList.contains("custom-select--open");

    customSelects.forEach((item) => {
      item.classList.remove("custom-select--open");
      const itemTrigger = item.querySelector(".custom-select__trigger");
      if (itemTrigger) {
        itemTrigger.setAttribute("aria-expanded", "false");
      }
    });

    select.classList.toggle("custom-select--open", !isOpen);
    trigger.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
      select.querySelector(".custom-select__option--active")?.focus();
    }
  });

  trigger?.addEventListener("keydown", (event) => {
    if (trigger.hasAttribute("disabled")) {
      return;
    }
    if (!["Enter", " ", "ArrowDown"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    trigger.click();
  });
});

dateFields.forEach((field) => {
  const trigger = field.querySelector(".custom-date__button, .custom-date__trigger");
  const input = field.querySelector(".custom-date__native");
  const textInput = field.querySelector(".custom-date__text-input");

  trigger?.addEventListener("click", (event) => {
    event.stopPropagation();
    if (calendarState.activeField === field && !calendarPopover.hidden) {
      closeCalendar();
      return;
    }
    openCalendar(field);
  });

  input?.addEventListener("change", () => {
    syncDateFieldUi(field);
    if (input.id === "reportDateFilter") {
      applyReportFilters();
      return;
    }
    if (input.id === "dateFromFilter" || input.id === "dateToFilter") {
      updateApplicationFilterControls();
      return;
    }
    resetAndApplyFilters();
  });

  if (textInput instanceof HTMLInputElement) {
    const isApplicationDateField = input?.id === "dateFromFilter" || input?.id === "dateToFilter";

    const enterApplicationDateEditMode = () => {
      if (!isApplicationDateField) {
        return;
      }

      textInput.dataset.previousValue = input.value ?? "";
      if (textInput.value.trim()) {
        textInput.value = "";
      }
    };

    if (input?.id === "dateFromFilter" || input?.id === "dateToFilter") {
      textInput.addEventListener("focus", enterApplicationDateEditMode);
      textInput.addEventListener("click", enterApplicationDateEditMode);
    }

    textInput.addEventListener("input", () => {
      textInput.value = formatTypedDate(textInput.value);
    });

    textInput.addEventListener("blur", () => {
      const parsedValue = parseTypedDate(textInput.value);
      if (parsedValue) {
        input instanceof HTMLInputElement && (input.value = parsedValue);
        syncDateFieldUi(field);
      } else if (!textInput.value.trim()) {
        if ((input?.id === "dateFromFilter" || input?.id === "dateToFilter") && textInput.dataset.previousValue) {
          input instanceof HTMLInputElement && (input.value = textInput.dataset.previousValue);
          syncDateFieldUi(field);
        } else {
          input instanceof HTMLInputElement && (input.value = "");
          syncDateFieldUi(field);
        }
      } else {
        syncDateFieldUi(field);
      }

      delete textInput.dataset.previousValue;

      if (input.id === "dateFromFilter" || input.id === "dateToFilter") {
        updateApplicationFilterControls();
        return;
      }

      resetAndApplyFilters();
    });
  }
});

[
  reportDiagnosisFilter,
  reportDisabilityGroupFilter,
  reportGenderFilter,
  reportAgeFilter,
].forEach((select) => {
  select?.addEventListener("change", updateReportFilterControls);
});

reportDateFilter?.addEventListener("change", applyReportFilters);

reportApplyFilters?.addEventListener("click", () => {
  applyReportFilters();
  reportFilterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
  reportFilterToggle?.setAttribute("aria-expanded", "false");
});

if (reportSnapshotDate && !reportSnapshotDate.value) {
  reportSnapshotDate.value = formatDateLabel(formatDateValue(new Date()));
}

if (reportSnapshotDateNative && !reportSnapshotDateNative.value) {
  reportSnapshotDateNative.value = formatDateValue(new Date());
}

reportSnapshotDate?.addEventListener("input", () => {
  reportSnapshotDate.value = formatTypedDate(reportSnapshotDate.value);
  const parsedValue = parseTypedDate(reportSnapshotDate.value);
  reportSnapshotDateNative.value = parsedValue;
});

reportSnapshotDate?.addEventListener("blur", () => {
  const parsedValue = parseTypedDate(reportSnapshotDate.value);
  if (parsedValue) {
    reportSnapshotDate.value = formatDateLabel(parsedValue);
    reportSnapshotDateNative.value = parsedValue;
  }
});

function openReportSnapshotCalendar() {
  if (!reportDatePicker) {
    return;
  }

  const parsedValue = parseTypedDate(reportSnapshotDate?.value ?? "");
  if (parsedValue) {
    reportSnapshotDateNative.value = parsedValue;
  }

  if (calendarState.activeField === reportDatePicker && !calendarPopover.hidden) {
    closeCalendar();
    return;
  }

  openCalendar(reportDatePicker);
}

reportSnapshotDateTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  openReportSnapshotCalendar();
});

reportSnapshotDate?.addEventListener("click", (event) => {
  event.stopPropagation();
  openReportSnapshotCalendar();
});

reportSnapshotDateNative?.addEventListener("change", () => {
  if (!reportSnapshotDateNative.value) {
    reportSnapshotDate.value = "";
    return;
  }

  reportSnapshotDate.value = formatDateLabel(reportSnapshotDateNative.value);
});

reportResetFilters?.addEventListener("click", () => {
  if (reportDiagnosisFilter) reportDiagnosisFilter.value = "all";
  if (reportDisabilityGroupFilter) reportDisabilityGroupFilter.value = "all";
  if (reportGenderFilter) reportGenderFilter.value = "all";
  if (reportAgeFilter) reportAgeFilter.value = "all";
  if (reportDateFilter) reportDateFilter.value = "";
  reportState.level = "region";
  reportState.selectedRegionKey = null;
  customSelects.forEach(syncCustomSelectUi);
  dateFields.forEach(syncDateFieldUi);
  updateReportFilterControls();
  applyReportFilters();
});

reportScopeBack?.addEventListener("click", () => {
  reportState.level = "region";
  reportState.selectedRegionKey = null;
  renderReportTable();
});

reportColumnInputs.forEach((input) => {
  input.addEventListener("change", () => {
    const columnKey = input.getAttribute("data-report-column-toggle");
    if (!columnKey) {
      return;
    }

    if (input.checked) {
      reportVisibleColumns.add(columnKey);
    } else {
      reportVisibleColumns.delete(columnKey);
    }

    renderReportTable();
  });
});

reportTableBody?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const regionButton = target.closest("[data-report-region]");
  if (!(regionButton instanceof HTMLButtonElement)) {
    return;
  }

  reportState.level = "district";
  reportState.selectedRegionKey = regionButton.dataset.reportRegion ?? null;
  renderReportTable();
});

calendarPopover.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement) || !calendarState.activeField) {
    return;
  }

  const navDelta = target.closest("[data-calendar-nav]")?.getAttribute("data-calendar-nav");
  if (navDelta) {
    calendarState.viewDate = new Date(
      calendarState.viewDate.getFullYear(),
      calendarState.viewDate.getMonth() + Number(navDelta),
      1,
    );
    renderCalendar();
    return;
  }

  const yearDelta = target.closest("[data-calendar-nav-year]")?.getAttribute("data-calendar-nav-year");
  if (yearDelta) {
    calendarState.viewDate = new Date(
      calendarState.viewDate.getFullYear() + Number(yearDelta),
      calendarState.viewDate.getMonth(),
      1,
    );
    renderCalendar();
    return;
  }

  const dayButton = target.closest(".calendar-popover__day");
  if (dayButton instanceof HTMLButtonElement) {
    setDateFieldValue(calendarState.activeField, dayButton.dataset.value ?? "");
    closeCalendar();
  }
});

calendarClear?.addEventListener("click", () => {
  if (!calendarState.activeField) {
    return;
  }
  setDateFieldValue(calendarState.activeField, "");
  closeCalendar();
});

calendarToday?.addEventListener("click", () => {
  if (!calendarState.activeField) {
    return;
  }
  setDateFieldValue(calendarState.activeField, formatDateValue(new Date()));
  closeCalendar();
});

rowMenuToggles.forEach((toggle) => {
  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const menu = toggle.closest(".row-menu");
    if (!menu) {
      return;
    }

    const isOpen = menu.classList.contains("row-menu--open");
    document.querySelectorAll(".row-menu").forEach((item) => {
      item.classList.remove("row-menu--open");
      const button = item.querySelector(".row-menu__toggle");
      if (button) {
        button.setAttribute("aria-expanded", "false");
      }
    });

    menu.classList.toggle("row-menu--open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
      menu.querySelector(".row-menu__item")?.focus();
    }
  });

  toggle.addEventListener("keydown", (event) => {
    if (!["Enter", " ", "ArrowDown"].includes(event.key)) {
      return;
    }
    event.preventDefault();
    toggle.click();
  });
});

confirmModal?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.hasAttribute("data-confirm-close")) {
    closeConfirmModal();
  }
});

confirmModalCancel?.addEventListener("click", () => {
  closeConfirmModal();
});

detailModal?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.hasAttribute("data-detail-close")) {
    closeDetailModal();
  }
});

detailModalClose?.addEventListener("click", () => {
  closeDetailModal();
});

detailContent?.addEventListener("click", (event) => {
  const downloadButton = event.target.closest("[data-document-download]");
  if (downloadButton) {
    const fileName = downloadButton.getAttribute("data-document-download") || "hujjat.pdf";
    const title = downloadButton.getAttribute("data-document-title") || "Tibbiy hujjat";
    const documentLines = (downloadButton.getAttribute("data-document-lines") || "")
      .split("|")
      .map((line) => line.trim())
      .filter(Boolean);
    triggerPdfDownload(fileName, title, documentLines);
    showToast("PDF yuklab olindi", `${title} fayli tayyorlandi.`);
    return;
  }

  const pageButton = event.target.closest("[data-detail-page]");
  if (!pageButton) {
    return;
  }

  const pageTitle = pageButton.getAttribute("data-detail-page");
  const targetLink = pageTitle ? document.querySelector(`[data-page-title="${pageTitle}"]`) : null;
  closeDetailModal();
  targetLink?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
});

detailAcceptButton?.addEventListener("click", () => {
  const applicationId = detailAcceptButton.dataset.applicationId;
  if (!applicationId) {
    return;
  }
  openConfirmModal("Qabul qilish", applicationId);
});

detailRejectButton?.addEventListener("click", () => {
  const applicationId = detailRejectButton.dataset.applicationId;
  if (!applicationId) {
    return;
  }
  openConfirmModal("Rad etish", applicationId);
});

confirmModalApprove?.addEventListener("click", () => {
  if (!confirmState.action || !confirmState.applicationId) {
    return;
  }

  const { action, applicationId } = confirmState;
  confirmModalApprove.disabled = true;
  confirmModalApprove.innerHTML = '<span class="confirm-modal__button-spinner" aria-hidden="true"></span><span>Yuborilmoqda...</span>';
  confirmModalCancel?.setAttribute("disabled", "true");

  window.setTimeout(() => {
    closeConfirmModal();
    closeDetailModal();
    if (applicationId === "AR-000123") {
      updateApplicationRowStatus(applicationId, action === "Qabul qilish" ? "qabul qilingan" : "rad etilgan");
      showToast(
        `${action} muvaffaqiyatli yakunlandi`,
        `${applicationId} arizasi bo'yicha amal muvaffaqiyatli bajarildi.`,
      );
      return;
    }

    showToast(
      `${action} amalga oshmadi`,
      `${applicationId} arizasini ${action.toLowerCase()}da ERR-409 xatoligi kuzatildi. Batafsil ma'lumot uchun qo'llanma yoki bog'lanish bo'limiga murojaat qiling.`,
      "error",
    );
  }, 1000);
});

resetFilters?.addEventListener("click", () => {
  if (statusFilter) {
    statusFilter.value = "all";
  }
  if (regionFilter) {
    regionFilter.value = "all";
  }
  if (stepFilter) {
    stepFilter.value = "all";
  }
  if (districtFilter) {
    districtFilter.value = "all";
  }
  if (organizationTypeFilter) {
    organizationTypeFilter.value = "all";
  }
  if (organizationFilter) {
    organizationFilter.value = "all";
  }
  if (dateFromFilter) {
    dateFromFilter.value = "";
  }
  if (dateToFilter) {
    dateToFilter.value = "";
  }
  applicationAppliedFilters = { ...applicationDefaultFilters };
  updateApplicationFilterOptionSets();
  customSelects.forEach(syncCustomSelectUi);
  dateFields.forEach(syncDateFieldUi);
  tableState.currentPage = 1;
  closeCalendar();
  updateApplicationFilterControls();
  applyTableFilters();
});

tableEmptyAction?.addEventListener("click", () => {
  if (applicationSearch) {
    applicationSearch.value = "";
  }
  resetFilters?.click();
});

paginationPrev?.addEventListener("click", () => {
  tableState.currentPage = Math.max(1, tableState.currentPage - 1);
  applyTableFilters();
});

paginationNext?.addEventListener("click", () => {
  tableState.currentPage = Math.min(tableState.totalPages, tableState.currentPage + 1);
  applyTableFilters();
});

paginationPages?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLButtonElement)) {
    return;
  }

  const page = Number(target.dataset.page);
  if (!page || page === tableState.currentPage) {
    return;
  }

  tableState.currentPage = page;
  applyTableFilters();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".header-menu").forEach((menu) => {
      menu.classList.remove("header-menu--open");
      const button = menu.querySelector("[data-menu-toggle]");
      button?.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".row-menu").forEach((menu) => {
      menu.classList.remove("row-menu--open");
      const button = menu.querySelector(".row-menu__toggle");
      button?.setAttribute("aria-expanded", "false");
    });
    customSelects.forEach((select) => {
      select.classList.remove("custom-select--open");
      select.querySelector(".custom-select__trigger")?.setAttribute("aria-expanded", "false");
    });
    rowsPerPageMenu?.classList.remove("pagination-select--open");
    rowsPerPageTrigger?.setAttribute("aria-expanded", "false");
    filterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
    filterToggle?.setAttribute("aria-expanded", "false");
    reportFilterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
    reportFilterToggle?.setAttribute("aria-expanded", "false");
    closeCalendar();
    closeConfirmModal();
    closeDetailModal();
  }
});

initializeTheme();
showAppView();
syncInitialRouteView();
syncPasswordToggleUi();
enrichApplicationRows();
setCustomSelectOptions(
  regionFilter,
  Array.from(new Set(Array.from(applicationRows).map((row) => row.getAttribute("data-region") ?? "").filter(Boolean))),
  getApplicationRegionLabel,
);
setCustomSelectOptions(
  stepFilter,
  Array.from(new Set(Array.from(applicationRows).map((row) => row.getAttribute("data-step") ?? "").filter(Boolean))),
  getApplicationStepLabel,
);
updateApplicationFilterOptionSets();
updateApplicationFilterControls();
applyTableFilters();
applyReportFilters();
syncReportFrozenColumn();
syncRowsPerPageUi();
customSelects.forEach(syncCustomSelectUi);
dateFields.forEach(syncDateFieldUi);
enhanceProcessRowActions();
enhanceApplicationViewActions();

async function applyRouteFromHash() {
  const routeTitle = getTitleFromHash(window.location.hash);
  if (!routeTitle) {
    syncPageHeading("Arizalar - Arizalar ro'yxati");
    showApplicationsView();
    return;
  }

  const targetLink = document.querySelector(`[data-page-title="${routeTitle}"]`);
  syncPageHeading(routeTitle);
  syncActiveNavigation(targetLink instanceof HTMLElement ? targetLink : null);

  await navigateToView(routeTitle);
}

window.addEventListener("hashchange", () => {
  applyRouteFromHash();
});

window.addEventListener("resize", () => {
  if (filterToggle?.closest(".table-menu")?.classList.contains("table-menu--open")) {
    syncTableMenuMaxHeight(filterToggle, filterMenu);
  }

  if (reportFilterToggle?.closest(".table-menu")?.classList.contains("table-menu--open")) {
    syncTableMenuMaxHeight(reportFilterToggle, reportFilterMenu);
  }
});

applyRouteFromHash();
