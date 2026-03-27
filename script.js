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
const moduleTitle = document.getElementById("moduleTitle");
const languageCurrent = document.getElementById("languageCurrent");
const languageItems = document.querySelectorAll("[data-language-code]");
const themeToggle = document.getElementById("themeToggle");
const themeToggleIcon = themeToggle?.querySelector("svg");
const menuToggles = document.querySelectorAll("[data-menu-toggle]");
const sidebarNav = document.getElementById("sidebarNav");
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
const reportSelectionBar = document.getElementById("reportSelectionBar");
const reportSelectionCount = document.getElementById("reportSelectionCount");
const reportSelectionSum = document.getElementById("reportSelectionSum");
const reportSelectionAvg = document.getElementById("reportSelectionAvg");
const reportSelectionMin = document.getElementById("reportSelectionMin");
const reportSelectionMax = document.getElementById("reportSelectionMax");
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
let currentModule = "muruvvat";
let currentLanguage = "uz";
let currentCanonicalTitle = "";
let currentDetailApplicationId = "";

const sidebarIconMap = {
  dashboard: '<svg viewBox="0 0 24 24" fill="none"><path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" stroke="currentColor" stroke-width="1.5"/></svg>',
  institutions: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 6h10M7 12h10M7 18h10M4 6h.01M4 12h.01M4 18h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  applications: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 4h7l3 3v13H7z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M14 4v4h4M9 12h6M9 16h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  reports: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 19V9M12 19V5M19 19v-7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M4 19h16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  info: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="1.5"/><path d="M12 10v5M12 7.5h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
};

const modulesConfig = {
  muruvvat: {
    label: "Muruvvat moduli",
    defaultHash: "#applications",
    routes: {
      "#applications": "Arizalar - Arizalar ro'yxati",
      "#/reports/disabilityinfo": "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot",
      "#/muruvvat/dashboard": "Dashboard",
      "#/muruvvat/internat/navbat": "Internat uylari - Navbat",
      "#/muruvvat/internat/registered": "Internat uylari - Ro'yxatga olinganlar",
      "#/muruvvat/internat/removed": "Internat uylari - Ro'yxatdan chiqqanlar",
      "#/muruvvat/applications/forms": "Arizalar - So'rovnomalar",
      "#/muruvvat/applications/acts": "Arizalar - Dalolatnomalar",
      "#/muruvvat/applications/decisions": "Arizalar - Qarorlar",
      "#/muruvvat/reports/applications": "Hisobotlar - Arizalar bo'yicha hisobot",
      "#/muruvvat/reports/institutions": "Hisobotlar - Internat uylari bo'yicha hisobot",
      "#/muruvvat/info/1": "Info - Info1",
      "#/muruvvat/info/2": "Info - Info2",
    },
    nav: [
      { type: "link", label: "Dashboard", title: "Dashboard", hash: "#/muruvvat/dashboard", icon: "dashboard" },
      {
        type: "group",
        label: "Internat uylari",
        icon: "institutions",
        children: [
          { label: "Navbat", title: "Internat uylari - Navbat", hash: "#/muruvvat/internat/navbat" },
          { label: "Ro'yxatga olinganlar", title: "Internat uylari - Ro'yxatga olinganlar", hash: "#/muruvvat/internat/registered" },
          { label: "Ro'yxatdan chiqqanlar", title: "Internat uylari - Ro'yxatdan chiqqanlar", hash: "#/muruvvat/internat/removed" },
        ],
      },
      {
        type: "group",
        label: "Arizalar",
        icon: "applications",
        defaultOpen: true,
        children: [
          { label: "Arizalar ro'yxati", title: "Arizalar - Arizalar ro'yxati", hash: "#applications" },
          { label: "So'rovnomalar", title: "Arizalar - So'rovnomalar", hash: "#/muruvvat/applications/forms" },
          { label: "Dalolatnomalar", title: "Arizalar - Dalolatnomalar", hash: "#/muruvvat/applications/acts" },
          { label: "Qarorlar", title: "Arizalar - Qarorlar", hash: "#/muruvvat/applications/decisions" },
        ],
      },
      {
        type: "group",
        label: "Hisobotlar",
        icon: "reports",
        children: [
          { label: "Arizalar bo'yicha hisobot", title: "Hisobotlar - Arizalar bo'yicha hisobot", hash: "#/muruvvat/reports/applications" },
          { label: "Internat uylari bo'yicha hisobot", title: "Hisobotlar - Internat uylari bo'yicha hisobot", hash: "#/muruvvat/reports/institutions" },
          { label: "Nogironligi bo'lgan shaxslar soni bo'yicha hisobot", title: "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot", hash: "#/reports/disabilityinfo" },
        ],
      },
      {
        type: "group",
        label: "Info",
        icon: "info",
        children: [
          { label: "Info1", title: "Info - Info1", hash: "#/muruvvat/info/1" },
          { label: "Info2", title: "Info - Info2", hash: "#/muruvvat/info/2" },
        ],
      },
    ],
  },
  ptpk: {
    label: "PTPK moduli",
    defaultHash: "#/ptpk/dashboard",
    routes: {
      "#/ptpk/dashboard": "Dashboard",
      "#/ptpk/applications": "Arizalar - Arizalar ro'yxati",
      "#/ptpk/applications/plans": "Arizalar - Yig'ilish rejalari",
      "#/ptpk/applications/minutes": "Arizalar - Bayonnomalar",
      "#/ptpk/applications/conclusions": "Arizalar - Xulosalar",
      "#/ptpk/reports": "Hisobotlar",
      "#/ptpk/info/1": "Info - Info 1",
      "#/ptpk/info/2": "Info - Info 2",
    },
    nav: [
      { type: "link", label: "Dashboard", title: "Dashboard", hash: "#/ptpk/dashboard", icon: "dashboard" },
      {
        type: "group",
        label: "Arizalar",
        icon: "applications",
        defaultOpen: true,
        children: [
          { label: "Arizalar ro'yxati", title: "Arizalar - Arizalar ro'yxati", hash: "#/ptpk/applications" },
          { label: "Yig'ilish rejalari", title: "Arizalar - Yig'ilish rejalari", hash: "#/ptpk/applications/plans" },
          { label: "Bayonnomalar", title: "Arizalar - Bayonnomalar", hash: "#/ptpk/applications/minutes" },
          { label: "Xulosalar", title: "Arizalar - Xulosalar", hash: "#/ptpk/applications/conclusions" },
        ],
      },
      { type: "link", label: "Hisobotlar", title: "Hisobotlar", hash: "#/ptpk/reports", icon: "reports" },
      {
        type: "group",
        label: "Info",
        icon: "info",
        children: [
          { label: "Info 1", title: "Info - Info 1", hash: "#/ptpk/info/1" },
          { label: "Info 2", title: "Info - Info 2", hash: "#/ptpk/info/2" },
        ],
      },
    ],
  },
};

const languageStorageKey = "mrv-language";
const languageMeta = {
  uz: { short: "UZ", htmlLang: "uz", label: "O'zbek" },
  "uz-cyrl": { short: "ÐŽÐ—", htmlLang: "uz-Cyrl", label: "ÐŽÐ·Ð±ÐµÐº" },
  kaa: { short: "QQ", htmlLang: "kaa", label: "Qoraqalpoq" },
  "kaa-cyrl": { short: "ÒšÒš", htmlLang: "kaa-Cyrl", label: "ÒšÐ¾Ñ€Ð°Ò›Ð°Ð»Ð¿Ð¾Ò›" },
  ru: { short: "RU", htmlLang: "ru", label: "Ð ÑƒÑÑÐºÐ¸Ð¹" },
  en: { short: "EN", htmlLang: "en", label: "English" },
  i18n: { short: "I18N", htmlLang: "en", label: "i18n keys" },
};

const routeTitleKeys = {
  Dashboard: "nav.dashboard",
  "Internat uylari - Navbat": "page.internatQueue",
  "Internat uylari - Ro'yxatga olinganlar": "page.internatRegistered",
  "Internat uylari - Ro'yxatdan chiqqanlar": "page.internatRemoved",
  "Arizalar - Arizalar ro'yxati": "page.applicationsList",
  "Arizalar - So'rovnomalar": "page.forms",
  "Arizalar - Dalolatnomalar": "page.acts",
  "Arizalar - Qarorlar": "page.decisions",
  "Hisobotlar - Arizalar bo'yicha hisobot": "page.reportApplications",
  "Hisobotlar - Internat uylari bo'yicha hisobot": "page.reportInstitutions",
  "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot": "page.reportDisability",
  "Info - Info1": "page.info1",
  "Info - Info2": "page.info2",
  "Arizalar - Yig'ilish rejalari": "page.meetingPlans",
  "Arizalar - Bayonnomalar": "page.minutes",
  "Arizalar - Xulosalar": "page.conclusions",
  Hisobotlar: "nav.reports",
  "Info - Info 1": "page.info1",
  "Info - Info 2": "page.info2",
  Info: "nav.info",
};

const literalKeyMap = {
  "Muruvvat moduli": "module.muruvvat",
  "PTPK moduli": "module.ptpk",
  Dashboard: "nav.dashboard",
  "Internat uylari": "nav.institutions",
  Navbat: "nav.queue",
  "Ro'yxatga olinganlar": "nav.registered",
  "Ro'yxatdan chiqqanlar": "nav.removed",
  Arizalar: "nav.applications",
  "Arizalar ro'yxati": "nav.applicationsList",
  "So'rovnomalar": "nav.forms",
  Dalolatnomalar: "nav.acts",
  Qarorlar: "nav.decisions",
  Hisobotlar: "nav.reports",
  "Arizalar bo'yicha hisobot": "nav.reportApplications",
  "Internat uylari bo'yicha hisobot": "nav.reportInstitutions",
  "Nogironligi bo'lgan shaxslar soni bo'yicha hisobot": "nav.reportDisability",
  Info: "nav.info",
  Info1: "nav.info1",
  Info2: "nav.info2",
  "Info 1": "nav.info1",
  "Info 2": "nav.info2",
  "Asosiy menyu": "common.mainMenu",
  "Yig'ilish rejalari": "nav.meetingPlans",
  Bayonnomalar: "nav.minutes",
  Xulosalar: "nav.conclusions",
  "Jami arizalar": "applications.total",
  Jarayonda: "status.process",
  "Qabul qilingan": "status.accepted",
  "Rad etilgan": "status.rejected",
  "Ijobiy": "result.positive",
  "Salbiy": "result.negative",
  Status: "common.status",
  Bosqich: "common.step",
  Hudud: "common.region",
  "Tuman (shahar)": "common.district",
  "Tashkilot turi": "common.organizationType",
  Tashkilot: "common.organization",
  Sana: "common.date",
  Manzil: "common.address",
  Lavozim: "common.position",
  "Boshlanish sana": "common.startDate",
  "Tugash sana": "common.endDate",
  Tashxis: "common.diagnosis",
  "Nogironlik guruhi": "common.disabilityGroup",
  Jinsi: "common.gender",
  Yoshi: "common.age",
  "Qo'llash": "common.apply",
  Tozalash: "common.reset",
  Barchasi: "common.all",
  Erkak: "gender.male",
  Ayol: "gender.female",
  Yopish: "common.close",
  "Yetakchi mutaxassis": "value.position.leadingSpecialist",
  "Bosh inspektor": "value.position.chiefInspector",
  "Mas'ul kotib": "value.position.secretary",
  "Ota-onasi": "value.representative.parent",
  Vasiy: "value.representative.guardian",
  "Qonuniy vakil": "value.representative.legalRepresentative",
  "Maxsus maktab": "value.education.specialSchool",
  "Inklyuziv ta'lim": "value.education.inclusiveEducation",
  "Uy ta'limi": "value.education.homeEducation",
  Faol: "value.state.active",
  Arxiv: "value.state.archive",
  Amalda: "value.state.valid",
  Yakunlangan: "value.state.completed",
  Bolalar: "value.organizationType.children",
  Erkaklar: "value.organizationType.men",
  Ayollar: "value.organizationType.women",
  "Ariza yaratildi": "value.log.applicationCreated",
  "Dalolatnoma biriktirildi": "value.log.actAttached",
  "Qaror loyihasi shakllantirildi": "value.log.decisionPrepared",
  "Komissiya kotibi": "value.actor.commissionSecretary",
  "Ambulator kartadan yoki kasallik tarixidan ko'chirma": "value.document.ambulatoryExtract",
  "Nogironligi bo'lgan shaxsni reabilitatsiya qilishning yakka tartibdagi dasturi": "value.document.rehabProgram",
  "Ruhiy-asab kasalliklari dispanseri tibbiy-maslahat komissiyasi xulosasi": "value.document.neuroCommission",
  "Onkologik dispanser xulosasi": "value.document.oncology",
  "OITSga qarshi kurash markazi xulosasi": "value.document.aidsCenter",
  "Teri-tanosil kasalliklari dispanseri xulosasi": "value.document.skinCenter",
  "Silga qarshi kurashish dispanseri xulosasi": "value.document.tuberculosisCenter",
  "Fuqaroni muomalaga layoqatsiz deb topish to'g'risida sudning hal qiluv qarori": "value.document.courtDecision",
  "Muomalaga layoqatsiz deb topilgan fuqaroga vasiy tayinlash to'g'risida tuman (shahar) hokimi qarori": "value.document.guardianDecision",
  "Psixologik-tibbiy-pedagogik komissiya xulosasi": "value.document.ptpkConclusion",
};

const valueTranslations = {
  "uz-cyrl": {
    "value.position.leadingSpecialist": "Ð•Ñ‚Ð°ÐºÑ‡Ð¸ Ð¼ÑƒÑ‚Ð°Ñ…Ð°ÑÑÐ¸Ñ",
    "value.position.chiefInspector": "Ð‘Ð¾Ñˆ Ð¸Ð½ÑÐ¿ÐµÐºÑ‚Ð¾Ñ€",
    "value.position.secretary": "ÐœÐ°ÑÑŠÑƒÐ» ÐºÐ¾Ñ‚Ð¸Ð±",
    "value.representative.parent": "ÐžÑ‚Ð°-Ð¾Ð½Ð°ÑÐ¸",
    "value.representative.guardian": "Ð’Ð°ÑÐ¸Ð¹",
    "value.representative.legalRepresentative": "ÒšÐ¾Ð½ÑƒÐ½Ð¸Ð¹ Ð²Ð°ÐºÐ¸Ð»",
    "value.education.specialSchool": "ÐœÐ°Ñ…ÑÑƒÑ Ð¼Ð°ÐºÑ‚Ð°Ð±",
    "value.education.inclusiveEducation": "Ð˜Ð½ÐºÐ»ÑŽÐ·Ð¸Ð² Ñ‚Ð°ÑŠÐ»Ð¸Ð¼",
    "value.education.homeEducation": "Ð£Ð¹ Ñ‚Ð°ÑŠÐ»Ð¸Ð¼Ð¸",
    "value.state.active": "Ð¤Ð°Ð¾Ð»",
    "value.state.archive": "ÐÑ€Ñ…Ð¸Ð²",
    "value.state.valid": "ÐÐ¼Ð°Ð»Ð´Ð°",
    "value.state.completed": "Ð¯ÐºÑƒÐ½Ð»Ð°Ð½Ð³Ð°Ð½",
    "value.organizationType.children": "Ð‘Ð¾Ð»Ð°Ð»Ð°Ñ€",
    "value.organizationType.men": "Ð­Ñ€ÐºÐ°ÐºÐ»Ð°Ñ€",
    "value.organizationType.women": "ÐÑ‘Ð»Ð»Ð°Ñ€",
    "value.log.applicationCreated": "ÐÑ€Ð¸Ð·Ð° ÑÑ€Ð°Ñ‚Ð¸Ð»Ð´Ð¸",
    "value.log.actAttached": "Ð”Ð°Ð»Ð¾Ð»Ð°Ñ‚Ð½Ð¾Ð¼Ð° Ð±Ð¸Ñ€Ð¸ÐºÑ‚Ð¸Ñ€Ð¸Ð»Ð´Ð¸",
    "value.log.decisionPrepared": "ÒšÐ°Ñ€Ð¾Ñ€ Ð»Ð¾Ð¹Ð¸Ò³Ð°ÑÐ¸ ÑˆÐ°ÐºÐ»Ð»Ð°Ð½Ñ‚Ð¸Ñ€Ð¸Ð»Ð´Ð¸",
    "value.actor.commissionSecretary": "ÐšÐ¾Ð¼Ð¸ÑÑÐ¸Ñ ÐºÐ¾Ñ‚Ð¸Ð±Ð¸",
    "value.document.ambulatoryExtract": "ÐÐ¼Ð±ÑƒÐ»Ð°Ñ‚Ð¾Ñ€ ÐºÐ°Ñ€Ñ‚Ð°ÑÐ¸ Ñ‘ÐºÐ¸ ÐºÐ°ÑÐ°Ð»Ð»Ð¸Ðº Ñ‚Ð°Ñ€Ð¸Ñ…Ð¸Ð´Ð°Ð½ ÐºÑžÑ‡Ð¸Ñ€Ð¼Ð°",
    "value.document.rehabProgram": "ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ð³Ð¸ Ð±ÑžÐ»Ð³Ð°Ð½ ÑˆÐ°Ñ…ÑÐ½Ð¸ Ñ€ÐµÐ°Ð±Ð¸Ð»Ð¸Ñ‚Ð°Ñ†Ð¸Ñ Ò›Ð¸Ð»Ð¸ÑˆÐ½Ð¸Ð½Ð³ ÑÐºÐºÐ° Ñ‚Ð°Ñ€Ñ‚Ð¸Ð±Ð´Ð°Ð³Ð¸ Ð´Ð°ÑÑ‚ÑƒÑ€Ð¸",
    "value.document.neuroCommission": "Ð ÑƒÒ³Ð¸Ð¹-Ð°ÑÐ°Ð± ÐºÐ°ÑÐ°Ð»Ð»Ð¸ÐºÐ»Ð°Ñ€Ð¸ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð¸ Ñ‚Ð¸Ð±Ð±Ð¸Ð¹-Ð¼Ð°ÑÐ»Ð°Ò³Ð°Ñ‚ ÐºÐ¾Ð¼Ð¸ÑÑÐ¸ÑÑÐ¸ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÐ¸",
    "value.document.oncology": "ÐžÐ½ÐºÐ¾Ð»Ð¾Ð³Ð¸Ðº Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÐ¸",
    "value.document.aidsCenter": "ÐžÐ˜Ð¢Ð¡Ð³Ð° Ò›Ð°Ñ€ÑˆÐ¸ ÐºÑƒÑ€Ð°Ñˆ Ð¼Ð°Ñ€ÐºÐ°Ð·Ð¸ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÐ¸",
    "value.document.skinCenter": "Ð¢ÐµÑ€Ð¸-Ñ‚Ð°Ð½Ð¾ÑÐ¸Ð» ÐºÐ°ÑÐ°Ð»Ð»Ð¸ÐºÐ»Ð°Ñ€Ð¸ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð¸ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÐ¸",
    "value.document.tuberculosisCenter": "Ð¡Ð¸Ð»Ð³Ð° Ò›Ð°Ñ€ÑˆÐ¸ ÐºÑƒÑ€Ð°ÑˆÐ¸Ñˆ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð¸ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÐ¸",
    "value.document.courtDecision": "Ð¤ÑƒÒ›Ð°Ñ€Ð¾Ð½Ð¸ Ð¼ÑƒÐ¾Ð¼Ð°Ð»Ð°Ð³Ð° Ð»Ð°Ñ‘Ò›Ð°Ñ‚ÑÐ¸Ð· Ð´ÐµÐ± Ñ‚Ð¾Ð¿Ð¸Ñˆ Ñ‚ÑžÒ“Ñ€Ð¸ÑÐ¸Ð´Ð° ÑÑƒÐ´Ð½Ð¸Ð½Ð³ Ò³Ð°Ð» Ò›Ð¸Ð»ÑƒÐ² Ò›Ð°Ñ€Ð¾Ñ€Ð¸",
    "value.document.guardianDecision": "ÐœÑƒÐ¾Ð¼Ð°Ð»Ð°Ð³Ð° Ð»Ð°Ñ‘Ò›Ð°Ñ‚ÑÐ¸Ð· Ð´ÐµÐ± Ñ‚Ð¾Ð¿Ð¸Ð»Ð³Ð°Ð½ Ñ„ÑƒÒ›Ð°Ñ€Ð¾Ð³Ð° Ð²Ð°ÑÐ¸Ð¹ Ñ‚Ð°Ð¹Ð¸Ð½Ð»Ð°Ñˆ Ñ‚ÑžÒ“Ñ€Ð¸ÑÐ¸Ð´Ð° Ñ‚ÑƒÐ¼Ð°Ð½ (ÑˆÐ°Ò³Ð°Ñ€) Ò³Ð¾ÐºÐ¸Ð¼Ð¸ Ò›Ð°Ñ€Ð¾Ñ€Ð¸",
    "value.document.ptpkConclusion": "ÐŸÑÐ¸Ñ…Ð¾Ð»Ð¾Ð³Ð¸Ðº-Ñ‚Ð¸Ð±Ð±Ð¸Ð¹-Ð¿ÐµÐ´Ð°Ð³Ð¾Ð³Ð¸Ðº ÐºÐ¾Ð¼Ð¸ÑÑÐ¸Ñ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÐ¸",
  },
  kaa: {
    "value.position.leadingSpecialist": "Jetekshi mutaxassis",
    "value.position.chiefInspector": "Bas inspektor",
    "value.position.secretary": "JauaplÄ± katip",
    "value.representative.parent": "Ata-anasÄ±",
    "value.representative.guardian": "Wasiy",
    "value.representative.legalRepresentative": "NÄ±zamÄ±y waki'l",
    "value.education.specialSchool": "ArnawlÄ± mektep",
    "value.education.inclusiveEducation": "Inklyuziv ta'lim",
    "value.education.homeEducation": "U'y ta'limi",
    "value.state.active": "Faol",
    "value.state.archive": "Arxiv",
    "value.state.valid": "A'melde",
    "value.state.completed": "Juwmaqlangan",
    "value.organizationType.children": "Balalar",
    "value.organizationType.men": "Erkakler",
    "value.organizationType.women": "Hayallar",
    "value.log.applicationCreated": "Ariza jaratÄ±ldÄ±",
    "value.log.actAttached": "Dalolatnoma biriktirildi",
    "value.log.decisionPrepared": "Qaror joybarÄ± tayarlandi",
    "value.actor.commissionSecretary": "Komissiya katibi",
    "value.document.ambulatoryExtract": "Ambulator kartadan yaki kesellik tariyxÄ±nan ko'shirme",
    "value.document.rehabProgram": "Nogironligi bolgan shaxsti reabilitatsiya qÄ±lÄ±wnÄ±Å„ jeke da'sturi",
    "value.document.neuroCommission": "Ruxiy-asab kesellikleri dispanseri tibbiy-ma'slahet komissiyasi xulosasi",
    "value.document.oncology": "Onkologiyaliq dispanser xulosasi",
    "value.document.aidsCenter": "OITSqa qarsi gu'res merkeziniÅ„ xulosasi",
    "value.document.skinCenter": "Teri-tanosil kesellikleri dispanseri xulosasi",
    "value.document.tuberculosisCenter": "Silge qarsi gu'resiw dispanseri xulosasi",
    "value.document.courtDecision": "PuqaranÄ± muomalaga layoqatsÄ±z dep tabÄ±w haqqÄ±nda sud qararÄ±",
    "value.document.guardianDecision": "Muomalaga layoqatsÄ±z dep tabÄ±lÇµan puqaraÇµa wasiy tayÄ±nlaw haqqÄ±nda ha'kim qararÄ±",
    "value.document.ptpkConclusion": "PsixologiyalÄ±q-tibbiy-pedagogikalÄ±q komissiya xulosasi",
  },
  "kaa-cyrl": {
    "value.position.leadingSpecialist": "Ð–ÐµÑ‚ÐµÐºÑˆÐ¸ Ð¼ÑƒÑ‚Ð°Ñ…Ð°ÑÑÐ¸Ñ",
    "value.position.chiefInspector": "Ð‘Ð°Ñ Ð¸Ð½ÑÐ¿ÐµÐºÑ‚Ð¾Ñ€",
    "value.position.secretary": "Ð–Ð°ÑƒÐ°Ð¿Ð»Ñ‹ ÐºÐ°Ñ‚Ð¸Ð¿",
    "value.representative.parent": "ÐÑ‚Ð°-Ð°Ð½Ð°ÑÑ‹",
    "value.representative.guardian": "ÐŽÐ°ÑÐ¸Ð¹",
    "value.representative.legalRepresentative": "ÐÑ‹Ð·Ð°Ð¼Ñ‹Ð¹ ÑžÓ™ÐºÐ¸Ð»",
    "value.education.specialSchool": "ÐÑ€Ð½Ð°ÑžÐ»Ñ‹ Ð¼ÐµÐºÑ‚ÐµÐ¿",
    "value.education.inclusiveEducation": "Ð˜Ð½ÐºÐ»ÑŽÐ·Ð¸Ð² Ñ‚Ó™Ð»Ð¸Ð¼",
    "value.education.homeEducation": "Ò®Ð¹ Ñ‚Ó™Ð»Ð¸Ð¼Ð¸",
    "value.state.active": "Ð¤Ð°Ð¾Ð»",
    "value.state.archive": "ÐÑ€Ñ…Ð¸Ð²",
    "value.state.valid": "Ó˜Ð¼ÐµÐ»Ð´Ðµ",
    "value.state.completed": "Ð–ÑƒÑžÐ¼Ð°Ò›Ð»Ð°Ð½Ò“Ð°Ð½",
    "value.organizationType.children": "Ð‘Ð°Ð»Ð°Ð»Ð°Ñ€",
    "value.organizationType.men": "Ð•Ñ€ÐºÐ°ÐºÐ»ÐµÑ€",
    "value.organizationType.women": "Ò²Ð°ÑÐ»Ð»Ð°Ñ€",
    "value.log.applicationCreated": "ÐÑ€Ð¸Ð·Ð° Ð¶Ð°Ñ€Ð°Ñ‚Ñ‹Ð»Ð´Ñ‹",
    "value.log.actAttached": "Ð”Ð°Ð»Ð¾Ð»Ð°Ñ‚Ð½Ð¾Ð¼Ð° Ð±Ð¸Ñ€Ð¸ÐºÑ‚Ð¸Ñ€Ð¸Ð»Ð´Ð¸",
    "value.log.decisionPrepared": "ÒšÐ°Ñ€Ð¾Ñ€ Ð¶Ð¾Ð±Ð°Ñ€Ñ‹ Ñ‚Ð°ÑÑ€Ð»Ð°Ð½Ð´Ñ‹",
    "value.actor.commissionSecretary": "ÐšÐ¾Ð¼Ð¸ÑÑÐ¸Ñ ÐºÐ°Ñ‚Ð¸Ð±Ð¸",
    "value.document.ambulatoryExtract": "ÐÐ¼Ð±ÑƒÐ»Ð°Ñ‚Ð¾Ñ€ ÐºÐ°Ñ€Ñ‚Ð°ÑÑ‹Ð½Ð°Ð½ ÑÐºÐ¸ ÐºÐµÑÐµÐ»Ð»Ð¸Ðº Ñ‚Ð°Ñ€Ð¸Ð¹Ñ…Ñ‹Ð½Ð°Ð½ ÐºÓ©ÑˆÐ¸Ñ€Ð¼Ðµ",
    "value.document.rehabProgram": "ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ð³Ð¸ Ð±Ð¾Ð»Ò“Ð°Ð½ ÑˆÐ°Ñ…ÑÑ‚Ñ‹ Ñ€ÐµÐ°Ð±Ð¸Ð»Ð¸Ñ‚Ð°Ñ†Ð¸Ñ Ò›Ñ‹Ð»Ñ‹ÑžÐ´Ñ‹Ò£ Ð¶ÐµÐºÐµ Ð´Ó™ÑÑ‚ÑƒÑ€Ð¸",
    "value.document.neuroCommission": "Ð ÑƒÒ³Ð¸Ð¹-Ð°ÑÐ°Ð± ÐºÐµÑÐµÐ»Ð»Ð¸ÐºÐ»ÐµÑ€Ð¸ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð¸ Ñ‚Ð¸Ð±Ð±Ð¸Ð¹-Ð¼Ó™ÑÐ»Ð°Ò³Ð°Ñ‚ ÐºÐ¾Ð¼Ð¸ÑÑÐ¸ÑÑÑ‹ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÑ‹",
    "value.document.oncology": "ÐžÐ½ÐºÐ¾Ð»Ð¾Ð³Ð¸ÑÐ»Ñ‹Ò› Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÑ‹",
    "value.document.aidsCenter": "ÐžÐ˜Ð¢Ð¡Ò›Ð° Ò›Ð°Ñ€ÑÑ‹ ÐºÒ¯Ñ€ÐµÑ Ð¼Ð°Ñ€ÐºÐ°Ð·Ð¸Ð½Ð¸Ò£ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÑ‹",
    "value.document.skinCenter": "Ð¢ÐµÑ€Ð¸-Ñ‚Ð°Ð½Ð¾ÑÐ¸Ð» ÐºÐµÑÐµÐ»Ð»Ð¸ÐºÐ»ÐµÑ€Ð¸ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð¸ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÑ‹",
    "value.document.tuberculosisCenter": "Ð¡Ð¸Ð»Ð³Ðµ Ò›Ð°Ñ€ÑÑ‹ ÐºÒ¯Ñ€ÐµÑÐ¸Ñž Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð¸ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÑ‹",
    "value.document.courtDecision": "ÐŸÑƒÒ›Ð°Ñ€Ð°Ð½Ñ‹ Ð¼ÑƒÐ¾Ð¼Ð°Ð»Ð°Ò“Ð° Ð»Ð°ÑÒ›Ð°Ñ‚ÑÑ‹Ð· Ð´ÐµÐ¿ Ñ‚Ð°Ð±Ñ‹Ñž Ò³Ð°Ò›Ò›Ñ‹Ð½Ð´Ð° ÑÑƒÐ´ Ò›Ð°Ñ€Ð°Ñ€Ñ‹",
    "value.document.guardianDecision": "ÐœÑƒÐ¾Ð¼Ð°Ð»Ð°Ò“Ð° Ð»Ð°ÑÒ›Ð°Ñ‚ÑÑ‹Ð· Ð´ÐµÐ¿ Ñ‚Ð°Ð±Ñ‹Ð»Ò“Ð°Ð½ Ð¿ÑƒÒ›Ð°Ñ€Ð°Ò“Ð° ÑžÐ°ÑÐ¸Ð¹ Ñ‚Ð°Ð¹Ñ‹Ð½Ð»Ð°Ñž Ò³Ð°Ò›Ò›Ñ‹Ð½Ð´Ð° Ò³Ó™ÐºÐ¸Ð¼ Ò›Ð°Ñ€Ð°Ñ€Ñ‹",
    "value.document.ptpkConclusion": "ÐŸÑÐ¸Ñ…Ð¾Ð»Ð¾Ð³Ð¸ÑÐ»Ñ‹Ò›-Ñ‚Ð¸Ð±Ð±Ð¸Ð¹-Ð¿ÐµÐ´Ð°Ð³Ð¾Ð³Ð¸ÐºÐ°Ð»Ñ‹Ò› ÐºÐ¾Ð¼Ð¸ÑÑÐ¸Ñ Ñ…ÑƒÐ»Ð¾ÑÐ°ÑÑ‹",
  },
  ru: {
    "value.position.leadingSpecialist": "Ð’ÐµÐ´ÑƒÑ‰Ð¸Ð¹ ÑÐ¿ÐµÑ†Ð¸Ð°Ð»Ð¸ÑÑ‚",
    "value.position.chiefInspector": "Ð“Ð»Ð°Ð²Ð½Ñ‹Ð¹ Ð¸Ð½ÑÐ¿ÐµÐºÑ‚Ð¾Ñ€",
    "value.position.secretary": "ÐžÑ‚Ð²ÐµÑ‚ÑÑ‚Ð²ÐµÐ½Ð½Ñ‹Ð¹ ÑÐµÐºÑ€ÐµÑ‚Ð°Ñ€ÑŒ",
    "value.representative.parent": "Ð Ð¾Ð´Ð¸Ñ‚ÐµÐ»ÑŒ",
    "value.representative.guardian": "ÐžÐ¿ÐµÐºÑƒÐ½",
    "value.representative.legalRepresentative": "Ð—Ð°ÐºÐ¾Ð½Ð½Ñ‹Ð¹ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð¸Ñ‚ÐµÐ»ÑŒ",
    "value.education.specialSchool": "Ð¡Ð¿ÐµÑ†Ð¸Ð°Ð»ÑŒÐ½Ð°Ñ ÑˆÐºÐ¾Ð»Ð°",
    "value.education.inclusiveEducation": "Ð˜Ð½ÐºÐ»ÑŽÐ·Ð¸Ð²Ð½Ð¾Ðµ Ð¾Ð±ÑƒÑ‡ÐµÐ½Ð¸Ðµ",
    "value.education.homeEducation": "Ð”Ð¾Ð¼Ð°ÑˆÐ½ÐµÐµ Ð¾Ð±ÑƒÑ‡ÐµÐ½Ð¸Ðµ",
    "value.state.active": "ÐÐºÑ‚Ð¸Ð²Ð½Ð¾",
    "value.state.archive": "ÐÑ€Ñ…Ð¸Ð²",
    "value.state.valid": "Ð”ÐµÐ¹ÑÑ‚Ð²ÑƒÐµÑ‚",
    "value.state.completed": "Ð—Ð°Ð²ÐµÑ€ÑˆÐµÐ½Ð¾",
    "value.organizationType.children": "Ð”ÐµÑ‚Ð¸",
    "value.organizationType.men": "ÐœÑƒÐ¶Ñ‡Ð¸Ð½Ñ‹",
    "value.organizationType.women": "Ð–ÐµÐ½Ñ‰Ð¸Ð½Ñ‹",
    "value.log.applicationCreated": "Ð—Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ðµ ÑÐ¾Ð·Ð´Ð°Ð½Ð¾",
    "value.log.actAttached": "ÐÐºÑ‚ Ð¿Ñ€Ð¸ÐºÑ€ÐµÐ¿Ð»ÐµÐ½",
    "value.log.decisionPrepared": "ÐŸÐ¾Ð´Ð³Ð¾Ñ‚Ð¾Ð²Ð»ÐµÐ½ Ð¿Ñ€Ð¾ÐµÐºÑ‚ Ñ€ÐµÑˆÐµÐ½Ð¸Ñ",
    "value.actor.commissionSecretary": "Ð¡ÐµÐºÑ€ÐµÑ‚Ð°Ñ€ÑŒ ÐºÐ¾Ð¼Ð¸ÑÑÐ¸Ð¸",
    "value.document.ambulatoryExtract": "Ð’Ñ‹Ð¿Ð¸ÑÐºÐ° Ð¸Ð· Ð°Ð¼Ð±ÑƒÐ»Ð°Ñ‚Ð¾Ñ€Ð½Ð¾Ð¹ ÐºÐ°Ñ€Ñ‚Ñ‹ Ð¸Ð»Ð¸ Ð¸ÑÑ‚Ð¾Ñ€Ð¸Ð¸ Ð±Ð¾Ð»ÐµÐ·Ð½Ð¸",
    "value.document.rehabProgram": "Ð˜Ð½Ð´Ð¸Ð²Ð¸Ð´ÑƒÐ°Ð»ÑŒÐ½Ð°Ñ Ð¿Ñ€Ð¾Ð³Ñ€Ð°Ð¼Ð¼Ð° Ñ€ÐµÐ°Ð±Ð¸Ð»Ð¸Ñ‚Ð°Ñ†Ð¸Ð¸ Ð»Ð¸Ñ†Ð° Ñ Ð¸Ð½Ð²Ð°Ð»Ð¸Ð´Ð½Ð¾ÑÑ‚ÑŒÑŽ",
    "value.document.neuroCommission": "Ð—Ð°ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð¼ÐµÐ´Ð¸ÐºÐ¾-ÐºÐ¾Ð½ÑÑƒÐ»ÑŒÑ‚Ð°Ñ‚Ð¸Ð²Ð½Ð¾Ð¹ ÐºÐ¾Ð¼Ð¸ÑÑÐ¸Ð¸ Ð¿ÑÐ¸Ñ…Ð¾Ð½ÐµÐ²Ñ€Ð¾Ð»Ð¾Ð³Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð°",
    "value.document.oncology": "Ð—Ð°ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð¾Ð½ÐºÐ¾Ð»Ð¾Ð³Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð°",
    "value.document.aidsCenter": "Ð—Ð°ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ñ†ÐµÐ½Ñ‚Ñ€Ð° Ð¿Ð¾ Ð±Ð¾Ñ€ÑŒÐ±Ðµ ÑÐ¾ Ð¡ÐŸÐ˜Ð”",
    "value.document.skinCenter": "Ð—Ð°ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ ÐºÐ¾Ð¶Ð½Ð¾-Ð²ÐµÐ½ÐµÑ€Ð¾Ð»Ð¾Ð³Ð¸Ñ‡ÐµÑÐºÐ¾Ð³Ð¾ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð°",
    "value.document.tuberculosisCenter": "Ð—Ð°ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¾Ñ‚Ð¸Ð²Ð¾Ñ‚ÑƒÐ±ÐµÑ€ÐºÑƒÐ»ÐµÐ·Ð½Ð¾Ð³Ð¾ Ð´Ð¸ÑÐ¿Ð°Ð½ÑÐµÑ€Ð°",
    "value.document.courtDecision": "Ð ÐµÑˆÐµÐ½Ð¸Ðµ ÑÑƒÐ´Ð° Ð¾ Ð¿Ñ€Ð¸Ð·Ð½Ð°Ð½Ð¸Ð¸ Ð³Ñ€Ð°Ð¶Ð´Ð°Ð½Ð¸Ð½Ð° Ð½ÐµÐ´ÐµÐµÑÐ¿Ð¾ÑÐ¾Ð±Ð½Ñ‹Ð¼",
    "value.document.guardianDecision": "Ð ÐµÑˆÐµÐ½Ð¸Ðµ Ñ…Ð¾ÐºÐ¸Ð¼Ð° Ñ€Ð°Ð¹Ð¾Ð½Ð° (Ð³Ð¾Ñ€Ð¾Ð´Ð°) Ð¾ Ð½Ð°Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ð¸ Ð¾Ð¿ÐµÐºÑƒÐ½Ð° Ð³Ñ€Ð°Ð¶Ð´Ð°Ð½Ð¸Ð½Ñƒ, Ð¿Ñ€Ð¸Ð·Ð½Ð°Ð½Ð½Ð¾Ð¼Ñƒ Ð½ÐµÐ´ÐµÐµÑÐ¿Ð¾ÑÐ¾Ð±Ð½Ñ‹Ð¼",
    "value.document.ptpkConclusion": "Ð—Ð°ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð¿ÑÐ¸Ñ…Ð¾Ð»Ð¾Ð³Ð¾-Ð¼ÐµÐ´Ð¸ÐºÐ¾-Ð¿ÐµÐ´Ð°Ð³Ð¾Ð³Ð¸Ñ‡ÐµÑÐºÐ¾Ð¹ ÐºÐ¾Ð¼Ð¸ÑÑÐ¸Ð¸",
  },
  en: {
    "value.position.leadingSpecialist": "Lead specialist",
    "value.position.chiefInspector": "Chief inspector",
    "value.position.secretary": "Responsible secretary",
    "value.representative.parent": "Parent",
    "value.representative.guardian": "Guardian",
    "value.representative.legalRepresentative": "Legal representative",
    "value.education.specialSchool": "Special school",
    "value.education.inclusiveEducation": "Inclusive education",
    "value.education.homeEducation": "Home education",
    "value.state.active": "Active",
    "value.state.archive": "Archive",
    "value.state.valid": "Valid",
    "value.state.completed": "Completed",
    "value.organizationType.children": "Children",
    "value.organizationType.men": "Men",
    "value.organizationType.women": "Women",
    "value.log.applicationCreated": "Application created",
    "value.log.actAttached": "Act attached",
    "value.log.decisionPrepared": "Decision draft prepared",
    "value.actor.commissionSecretary": "Commission secretary",
    "value.document.ambulatoryExtract": "Extract from ambulatory card or medical history",
    "value.document.rehabProgram": "Individual rehabilitation program for a person with disability",
    "value.document.neuroCommission": "Conclusion of the medical advisory commission of the neuropsychiatric dispensary",
    "value.document.oncology": "Oncology dispensary conclusion",
    "value.document.aidsCenter": "AIDS prevention center conclusion",
    "value.document.skinCenter": "Dermatovenerologic dispensary conclusion",
    "value.document.tuberculosisCenter": "Tuberculosis dispensary conclusion",
    "value.document.courtDecision": "Court decision on declaring a citizen legally incapacitated",
    "value.document.guardianDecision": "District (city) khokim decision on appointing a guardian for a legally incapacitated citizen",
    "value.document.ptpkConclusion": "Psychological-medical-pedagogical commission conclusion",
  },
};

const translations = {
  uz: {},
  i18n: {},
  "uz-cyrl": {
    "module.muruvvat": "ÐœÑƒÑ€ÑƒÐ²Ð²Ð°Ñ‚ Ð¼Ð¾Ð´ÑƒÐ»Ð¸",
    "module.ptpk": "ÐŸÐ¢ÐŸÐš Ð¼Ð¾Ð´ÑƒÐ»Ð¸",
    "nav.dashboard": "Ð”Ð°ÑˆÐ±Ð¾Ð°Ñ€Ð´",
    "nav.institutions": "Ð˜Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚ ÑƒÐ¹Ð»Ð°Ñ€Ð¸",
    "nav.queue": "ÐÐ°Ð²Ð±Ð°Ñ‚",
    "nav.registered": "Ð ÑžÐ¹Ñ…Ð°Ñ‚Ð³Ð° Ð¾Ð»Ð¸Ð½Ð³Ð°Ð½Ð»Ð°Ñ€",
    "nav.removed": "Ð ÑžÐ¹Ñ…Ð°Ñ‚Ð´Ð°Ð½ Ñ‡Ð¸Ò›Ò›Ð°Ð½Ð»Ð°Ñ€",
    "nav.applications": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€",
    "nav.applicationsList": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ Ñ€ÑžÐ¹Ñ…Ð°Ñ‚Ð¸",
    "nav.forms": "Ð¡ÑžÑ€Ð¾Ð²Ð½Ð¾Ð¼Ð°Ð»Ð°Ñ€",
    "nav.acts": "Ð”Ð°Ð»Ð¾Ð»Ð°Ñ‚Ð½Ð¾Ð¼Ð°Ð»Ð°Ñ€",
    "nav.decisions": "ÒšÐ°Ñ€Ð¾Ñ€Ð»Ð°Ñ€",
    "nav.reports": "Ò²Ð¸ÑÐ¾Ð±Ð¾Ñ‚Ð»Ð°Ñ€",
    "nav.reportApplications": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ Ð±ÑžÐ¹Ð¸Ñ‡Ð° Ò³Ð¸ÑÐ¾Ð±Ð¾Ñ‚",
    "nav.reportInstitutions": "Ð˜Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚ ÑƒÐ¹Ð»Ð°Ñ€Ð¸ Ð±ÑžÐ¹Ð¸Ñ‡Ð° Ò³Ð¸ÑÐ¾Ð±Ð¾Ñ‚",
    "nav.reportDisability": "ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ð³Ð¸ Ð±ÑžÐ»Ð³Ð°Ð½ ÑˆÐ°Ñ…ÑÐ»Ð°Ñ€ ÑÐ¾Ð½Ð¸ Ð±ÑžÐ¹Ð¸Ñ‡Ð° Ò³Ð¸ÑÐ¾Ð±Ð¾Ñ‚",
    "nav.info": "Ð˜Ð½Ñ„Ð¾",
    "nav.info1": "Ð˜Ð½Ñ„Ð¾ 1",
    "nav.info2": "Ð˜Ð½Ñ„Ð¾ 2",
    "nav.meetingPlans": "Ð™Ð¸Ò“Ð¸Ð»Ð¸Ñˆ Ñ€ÐµÐ¶Ð°Ð»Ð°Ñ€Ð¸",
    "nav.minutes": "Ð‘Ð°Ñ‘Ð½Ð½Ð¾Ð¼Ð°Ð»Ð°Ñ€",
    "nav.conclusions": "Ð¥ÑƒÐ»Ð¾ÑÐ°Ð»Ð°Ñ€",
    "page.internatQueue": "Ð˜Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚ ÑƒÐ¹Ð»Ð°Ñ€Ð¸ / ÐÐ°Ð²Ð±Ð°Ñ‚",
    "page.internatRegistered": "Ð˜Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚ ÑƒÐ¹Ð»Ð°Ñ€Ð¸ / Ð ÑžÐ¹Ñ…Ð°Ñ‚Ð³Ð° Ð¾Ð»Ð¸Ð½Ð³Ð°Ð½Ð»Ð°Ñ€",
    "page.internatRemoved": "Ð˜Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚ ÑƒÐ¹Ð»Ð°Ñ€Ð¸ / Ð ÑžÐ¹Ñ…Ð°Ñ‚Ð´Ð°Ð½ Ñ‡Ð¸Ò›Ò›Ð°Ð½Ð»Ð°Ñ€",
    "page.applicationsList": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ / ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ Ñ€ÑžÐ¹Ñ…Ð°Ñ‚Ð¸",
    "page.forms": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ / Ð¡ÑžÑ€Ð¾Ð²Ð½Ð¾Ð¼Ð°Ð»Ð°Ñ€",
    "page.acts": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ / Ð”Ð°Ð»Ð¾Ð»Ð°Ñ‚Ð½Ð¾Ð¼Ð°Ð»Ð°Ñ€",
    "page.decisions": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ / ÒšÐ°Ñ€Ð¾Ñ€Ð»Ð°Ñ€",
    "page.reportApplications": "Ò²Ð¸ÑÐ¾Ð±Ð¾Ñ‚Ð»Ð°Ñ€ / ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ Ð±ÑžÐ¹Ð¸Ñ‡Ð° Ò³Ð¸ÑÐ¾Ð±Ð¾Ñ‚",
    "page.reportInstitutions": "Ò²Ð¸ÑÐ¾Ð±Ð¾Ñ‚Ð»Ð°Ñ€ / Ð˜Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚ ÑƒÐ¹Ð»Ð°Ñ€Ð¸ Ð±ÑžÐ¹Ð¸Ñ‡Ð° Ò³Ð¸ÑÐ¾Ð±Ð¾Ñ‚",
    "page.reportDisability": "Ò²Ð¸ÑÐ¾Ð±Ð¾Ñ‚Ð»Ð°Ñ€ / ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ð³Ð¸ Ð±ÑžÐ»Ð³Ð°Ð½ ÑˆÐ°Ñ…ÑÐ»Ð°Ñ€ ÑÐ¾Ð½Ð¸ Ð±ÑžÐ¹Ð¸Ñ‡Ð° Ò³Ð¸ÑÐ¾Ð±Ð¾Ñ‚",
    "page.info1": "Ð˜Ð½Ñ„Ð¾ / Ð˜Ð½Ñ„Ð¾ 1",
    "page.info2": "Ð˜Ð½Ñ„Ð¾ / Ð˜Ð½Ñ„Ð¾ 2",
    "page.meetingPlans": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ / Ð™Ð¸Ò“Ð¸Ð»Ð¸Ñˆ Ñ€ÐµÐ¶Ð°Ð»Ð°Ñ€Ð¸",
    "page.minutes": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ / Ð‘Ð°Ñ‘Ð½Ð½Ð¾Ð¼Ð°Ð»Ð°Ñ€",
    "page.conclusions": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ / Ð¥ÑƒÐ»Ð¾ÑÐ°Ð»Ð°Ñ€",
    "applications.total": "Ð–Ð°Ð¼Ð¸ Ð°Ñ€Ð¸Ð·Ð°Ð»Ð°Ñ€",
    "status.process": "Ð–Ð°Ñ€Ð°Ñ‘Ð½Ð´Ð°",
    "status.accepted": "ÒšÐ°Ð±ÑƒÐ» Ò›Ð¸Ð»Ð¸Ð½Ð³Ð°Ð½",
    "status.rejected": "Ð Ð°Ð´ ÑÑ‚Ð¸Ð»Ð³Ð°Ð½",
    "status.new": "Ð¯Ð½Ð³Ð¸",
    "result.positive": "Ð˜Ð¶Ð¾Ð±Ð¸Ð¹",
    "result.negative": "Ð¡Ð°Ð»Ð±Ð¸Ð¹",
    "common.status": "Ð¡Ñ‚Ð°Ñ‚ÑƒÑ",
    "common.date": "Ð¡Ð°Ð½Ð°",
    "common.address": "ÐœÐ°Ð½Ð·Ð¸Ð»",
    "common.position": "Ð›Ð°Ð²Ð¾Ð·Ð¸Ð¼",
    "common.step": "Ð‘Ð¾ÑÒ›Ð¸Ñ‡",
    "common.region": "Ò²ÑƒÐ´ÑƒÐ´",
    "common.district": "Ð¢ÑƒÐ¼Ð°Ð½ (ÑˆÐ°Ò³Ð°Ñ€)",
    "common.organizationType": "Ð¢Ð°ÑˆÐºÐ¸Ð»Ð¾Ñ‚ Ñ‚ÑƒÑ€Ð¸",
    "common.organization": "Ð¢Ð°ÑˆÐºÐ¸Ð»Ð¾Ñ‚",
    "common.startDate": "Ð‘Ð¾ÑˆÐ»Ð°Ð½Ð¸Ñˆ ÑÐ°Ð½Ð°",
    "common.endDate": "Ð¢ÑƒÐ³Ð°Ñˆ ÑÐ°Ð½Ð°",
    "common.diagnosis": "Ð¢Ð°ÑˆÑ…Ð¸Ñ",
    "common.disabilityGroup": "ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ðº Ð³ÑƒÑ€ÑƒÒ³Ð¸",
    "common.gender": "Ð–Ð¸Ð½ÑÐ¸",
    "common.age": "ÐÑˆÐ¸",
    "common.apply": "ÒšÑžÐ»Ð»Ð°Ñˆ",
    "common.reset": "Ð¢Ð¾Ð·Ð°Ð»Ð°Ñˆ",
    "common.all": "Ð‘Ð°Ñ€Ñ‡Ð°ÑÐ¸",
    "common.close": "ÐÐ¿Ð¸Ñˆ",
    "common.mainMenu": "ÐÑÐ¾ÑÐ¸Ð¹ Ð¼ÐµÐ½ÑŽ",
    "gender.male": "Ð­Ñ€ÐºÐ°Ðº",
    "gender.female": "ÐÑ‘Ð»",
    "header.administrator": "ÐÐ´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€",
    "header.profile": "ÐŸÑ€Ð¾Ñ„Ð¸Ð»Ð½Ð¸ ÐºÑžÑ€Ð¸Ñˆ",
    "header.settings": "Ð¡Ð¾Ð·Ð»Ð°Ð¼Ð°Ð»Ð°Ñ€",
    "header.logout": "Ð§Ð¸Ò›Ð¸Ñˆ",
    "header.monitoring": "ÐœÐ¾Ð½Ð¸Ñ‚Ð¾Ñ€Ð¸Ð½Ð³ Ð¿Ð°Ð½ÐµÐ»Ð¸",
    "header.reportsCenter": "Ò²Ð¸ÑÐ¾Ð±Ð¾Ñ‚Ð»Ð°Ñ€ Ð¼Ð°Ñ€ÐºÐ°Ð·Ð¸",
    "applications.searchPlaceholder": "ID, Ð¤.Ð˜.Ð¨. Ñ‘ÐºÐ¸ ÐŸÐ˜ÐÐ¤Ð›",
    "applications.actions": "ÐÐ¼Ð°Ð»Ð»Ð°Ñ€",
    "applications.application": "ÐÑ€Ð¸Ð·Ð°",
    "applications.applicant": "Ð¥Ð¸Ð·Ð¼Ð°Ñ‚ Ð¾Ð»ÑƒÐ²Ñ‡Ð¸",
    "applications.address": "ÐœÐ°Ð½Ð·Ð¸Ð»",
    "applications.export": "Ð­ÐºÑÐ¿Ð¾Ñ€Ñ‚",
    "applications.new": "Ð¯Ð½Ð³Ð¸ Ð°Ñ€Ð¸Ð·Ð°",
    "empty.notFound": "ÐœÐ¾Ñ Ð¼Ð°ÑŠÐ»ÑƒÐ¼Ð¾Ñ‚ Ñ‚Ð¾Ð¿Ð¸Ð»Ð¼Ð°Ð´Ð¸",
    "empty.noData": "Ò²Ð¾Ð·Ð¸Ñ€Ñ‡Ð° Ð°Ñ€Ð¸Ð·Ð°Ð»Ð°Ñ€ Ð¼Ð°Ð²Ð¶ÑƒÐ´ ÑÐ¼Ð°Ñ",
    "date.placeholder": "Ð¡Ð°Ð½Ð°Ð½Ð¸ Ñ‚Ð°Ð½Ð»Ð°Ð½Ð³",
    "report.download": "Ò²Ð¸ÑÐ¾Ð±Ð¾Ñ‚Ð½Ð¸ ÑŽÐºÐ»Ð°Ð± Ð¾Ð»Ð¸Ñˆ",
    "report.totalPersons": "Ð–Ð°Ð¼Ð¸ ÐÐ‘Ð¨Ð»Ð°Ñ€ ÑÐ¾Ð½Ð¸",
    "report.byDiagnosis": "Ð¢Ð°ÑˆÑ…Ð¸ÑÐ»Ð°Ñ€Ð¸ Ð±ÑžÐ¹Ð¸Ñ‡Ð°",
    "report.byDisability": "ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ðº Ð³ÑƒÑ€ÑƒÒ³Ð¸",
    "report.scope.back": "ÐžÑ€Ò›Ð°Ð³Ð°",
    "report.summary": "Ð ÐµÑÐ¿ÑƒÐ±Ð»Ð¸ÐºÐ° Ð¶Ð°Ð¼Ð¸",
    "selection.count": "Ð¡Ð¾Ð½Ð¸",
    "selection.sum": "Ð™Ð¸Ò“Ð¸Ð½Ð´Ð¸",
    "selection.avg": "ÐŽÑ€Ñ‚Ð°Ñ‡Ð°",
    "selection.min": "ÐœÐ¸Ð½",
    "selection.max": "ÐœÐ°ÐºÑ",
    "detail.title": "ÐÑ€Ð¸Ð·Ð° Ñ‚Ð°Ñ„ÑÐ¸Ð»Ð¾Ñ‚Ð»Ð°Ñ€Ð¸",
    "detail.loading": "ÐÑ€Ð¸Ð·Ð° Ð¼Ð°ÑŠÐ»ÑƒÐ¼Ð¾Ñ‚Ð»Ð°Ñ€Ð¸ ÑŽÐºÐ»Ð°Ð½Ð¼Ð¾Ò›Ð´Ð°...",
    "detail.accept": "ÒšÐ°Ð±ÑƒÐ» Ò›Ð¸Ð»Ð¸Ñˆ",
    "detail.reject": "Ð Ð°Ð´ ÑÑ‚Ð¸Ñˆ",
    "detail.application": "ÐÑ€Ð¸Ð·Ð° Ð¼Ð°ÑŠÐ»ÑƒÐ¼Ð¾Ñ‚Ð»Ð°Ñ€Ð¸",
    "detail.receiver": "ÐÑ€Ð¸Ð·Ð°Ð½Ð¸ Ò›Ð°Ð±ÑƒÐ» Ò›Ð¸Ð»ÑƒÐ²Ñ‡Ð¸",
    "detail.representative": "ÒšÐ¾Ð½ÑƒÐ½Ð¸Ð¹ Ð²Ð°ÐºÐ¸Ð»",
    "detail.applicant": "Ð¥Ð¸Ð·Ð¼Ð°Ñ‚ Ð¾Ð»ÑƒÐ²Ñ‡Ð¸",
    "detail.medicalDocuments": "Ð¢Ð¸Ð±Ð±Ð¸Ð¹ Ò³ÑƒÐ¶Ð¶Ð°Ñ‚Ð»Ð°Ñ€",
    "detail.result": "ÐÐ°Ñ‚Ð¸Ð¶Ð°",
    "detail.representativeLevel": "Ð’Ð°ÐºÐ¸Ð»Ð»Ð¸Ðº Ð´Ð°Ñ€Ð°Ð¶Ð°ÑÐ¸",
    "detail.phone": "Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½ Ñ€Ð°Ò›Ð°Ð¼Ð¸",
    "detail.birthDate": "Ð¢ÑƒÒ“Ð¸Ð»Ð³Ð°Ð½ ÑÐ°Ð½Ð°ÑÐ¸",
    "detail.diagnosis": "Ð¢Ð°ÑˆÑ…Ð¸ÑÐ¸",
    "detail.address": "ÐœÐ°Ð½Ð·Ð¸Ð»Ð¸",
    "detail.organizationName": "Ð¢Ð°ÑˆÐºÐ¸Ð»Ð¾Ñ‚ Ð½Ð¾Ð¼Ð¸",
    "detail.goToAct": "Ð”Ð°Ð»Ð¾Ð»Ð°Ñ‚Ð½Ð¾Ð¼Ð°Ð³Ð° ÑžÑ‚Ð¸Ñˆ",
    "detail.goToDecision": "ÒšÐ°Ñ€Ð¾Ñ€Ð³Ð° ÑžÑ‚Ð¸Ñˆ",
    "detail.disabilityHistory": "ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ðº Ñ‚Ð°Ñ€Ð¸Ñ…Ð¸",
    "detail.conclusionHistory": "Ð¥ÑƒÐ»Ð¾ÑÐ°Ð»Ð°Ñ€ Ñ‚Ð°Ñ€Ð¸Ñ…Ð¸",
    "detail.applicationsHistory": "ÐÑ€Ð¸Ð·Ð°Ð»Ð°Ñ€ Ñ‚Ð°Ñ€Ð¸Ñ…Ð¸",
    "detail.documentHistory": "Ò²ÑƒÐ¶Ð¶Ð°Ñ‚ Ñ‚Ð°Ñ€Ð¸Ñ…Ð¸",
    "detail.assignedDate": "Ð¢Ð°Ð¹Ð¸Ð½Ð»Ð°Ð½Ð³Ð°Ð½ ÑÐ°Ð½Ð°",
    "detail.validUntil": "ÐÐ¼Ð°Ð» Ò›Ð¸Ð»Ð¸Ñˆ Ð¼ÑƒÐ´Ð´Ð°Ñ‚Ð¸",
    "detail.educationInstitutionType": "Ð¢Ð°ÑŠÐ»Ð¸Ð¼ Ð¼ÑƒÐ°ÑÑÐ°ÑÐ°ÑÐ¸ Ñ‚ÑƒÑ€Ð¸",
    "detail.actor": "ÐÐ¼Ð°Ð»Ð¸Ð¹otni Ð±Ð°Ð¶Ð°Ñ€ÑƒÐ²Ñ‡Ð¸",
    "empty.notReady": "Ð±ÑžÐ»Ð¸Ð¼Ð¸ ÑƒÑ‡ÑƒÐ½ ÐºÐ¾Ð½Ñ‚ÐµÐ½Ñ‚ Ò³Ð°Ð»Ð¸ Ñ‚Ð°Ð¹Ñ‘Ñ€Ð»Ð°Ð½Ð¼Ð°Ð³Ð°Ð½.",
    "common.records": "Ñ‘Ð·ÑƒÐ²",
    "common.loading": "Ð®ÐºÐ»Ð°Ð½Ð¼Ð¾Ò›Ð´Ð°...",
    "common.downloaded": "Ð®ÐºÐ»Ð°Ð± Ð¾Ð»Ð¸Ð½Ð´Ð¸",
    "common.fileReady": "ÐÑ€Ð¸Ð·Ð° Ñ„Ð°Ð¹Ð»Ð¸ Ñ‚Ð°Ð¹Ñ‘Ñ€ Ð±ÑžÐ»Ð´Ð¸.",
    "detail.notFoundTitle": "ÐÑ€Ð¸Ð·Ð° Ñ‚Ð¾Ð¿Ð¸Ð»Ð¼Ð°Ð´Ð¸",
    "detail.notFoundDescription": "Ñ‚Ð°Ð½Ð»Ð°Ð½Ð³Ð°Ð½ Ð°Ñ€Ð¸Ð·Ð° Ð±ÑžÐ¹Ð¸Ñ‡Ð° Ð¼Ð°ÑŠÐ»ÑƒÐ¼Ð¾Ñ‚ Ñ‚Ð¾Ð¿Ð¸Ð»Ð¼Ð°Ð´Ð¸.",
  },
  kaa: {
    "module.muruvvat": "Muruvvat moduli",
    "module.ptpk": "PTPK moduli",
    "nav.dashboard": "Dashboard",
    "nav.institutions": "Internat Ãºyleri",
    "nav.queue": "NÃ¡wbet",
    "nav.registered": "Dizimge alÄ±nganlar",
    "nav.removed": "Dizimnen shÄ±qqanlar",
    "nav.applications": "ArÄ±zalar",
    "nav.applicationsList": "ArÄ±zalar dizimi",
    "nav.forms": "Sorawnamalar",
    "nav.acts": "Dalolatnamalar",
    "nav.decisions": "Qarorlar",
    "nav.reports": "Esabatlar",
    "nav.reportApplications": "ArÄ±zalar boyÄ±nsha esabat",
    "nav.reportInstitutions": "Internat Ãºyleri boyÄ±nsha esabat",
    "nav.reportDisability": "MÃºgÃ©dakligi bar shaxslar sanÄ± boyÄ±nsha esabat",
    "nav.info": "Info",
    "nav.info1": "Info 1",
    "nav.info2": "Info 2",
    "nav.meetingPlans": "Jiynalis rejeleri",
    "nav.minutes": "Bayonnamalar",
    "nav.conclusions": "Xulosalar",
    "applications.total": "Jami arÄ±zalar",
    "status.process": "Jarayonda",
    "status.accepted": "Qabul qilingan",
    "status.rejected": "Rad etilgan",
    "status.new": "JaÅ„a",
    "result.positive": "Ijobiy",
    "result.negative": "Salbiy",
    "common.status": "Status",
    "common.date": "Sana",
    "common.address": "Manzil",
    "common.position": "Lavozim",
    "common.step": "BasqÄ±sh",
    "common.region": "Hudud",
    "common.district": "Tuman (shahar)",
    "common.organizationType": "Tashkilot tÃºri",
    "common.organization": "Tashkilot",
    "common.startDate": "BaslanÄ±w sÃ¡ne",
    "common.endDate": "TawÄ±sÄ±w sÃ¡ne",
    "common.diagnosis": "Tashxis",
    "common.disabilityGroup": "Nogironlik guruhi",
    "common.gender": "JÄ±nsÄ±",
    "common.age": "JasÄ±",
    "common.apply": "Qollaw",
    "common.reset": "Tazalaw",
    "common.all": "BarshasÄ±",
    "common.close": "JabÄ±w",
    "common.mainMenu": "TiykarÇµÄ± menu",
    "gender.male": "Erkek",
    "gender.female": "Ayol",
    "header.administrator": "Administrator",
    "header.profile": "Profilni kÃ³riw",
    "header.settings": "Sazlamalar",
    "header.logout": "ShÄ±ÇµÄ±w",
    "applications.searchPlaceholder": "ID, F.I.Sh. yamasa PINFL",
    "detail.title": "ArÄ±za tafsilotlarÄ±",
    "date.placeholder": "SÃ¡nanÄ± taÅ„laÅ„",
  },
  "kaa-cyrl": {
    "module.muruvvat": "ÐœÑƒÑ€ÑƒÐ²Ð²Ð°Ñ‚ Ð¼Ð¾Ð´ÑƒÐ»Ð¸",
    "module.ptpk": "ÐŸÐ¢ÐŸÐš Ð¼Ð¾Ð´ÑƒÐ»Ð¸",
    "nav.dashboard": "Ð”Ð°ÑˆÐ±Ð¾Ð°Ñ€Ð´",
    "nav.institutions": "Ð˜Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚ Ò¯Ð¹Ð»ÐµÑ€Ð¸",
    "nav.queue": "ÐÓ™ÑžÐ±ÐµÑ‚",
    "nav.registered": "Ð”Ð¸Ð·Ð¸Ð¼Ð³Ðµ Ð°Ð»Ñ‹Ð½Ò“Ð°Ð½Ð»Ð°Ñ€",
    "nav.removed": "Ð”Ð¸Ð·Ð¸Ð¼Ð½ÐµÐ½ ÑˆÑ‹Ò›Ò›Ð°Ð½Ð»Ð°Ñ€",
    "nav.applications": "ÐÑ€Ñ‹Ð·Ð°Ð»Ð°Ñ€",
    "nav.applicationsList": "ÐÑ€Ñ‹Ð·Ð°Ð»Ð°Ñ€ Ð´Ð¸Ð·Ð¸Ð¼Ð¸",
    "nav.forms": "Ð¡Ð¾Ñ€Ð°ÑžÐ½Ð°Ð¼Ð°Ð»Ð°Ñ€",
    "nav.acts": "Ð”Ð°Ð»Ð¾Ð»Ð°Ñ‚Ð½Ð°Ð¼Ð°Ð»Ð°Ñ€",
    "nav.decisions": "ÒšÐ°Ñ€Ð¾Ñ€Ð»Ð°Ñ€",
    "nav.reports": "Ð•ÑÐ°Ð±Ð°Ñ‚Ð»Ð°Ñ€",
    "nav.reportApplications": "ÐÑ€Ñ‹Ð·Ð°Ð»Ð°Ñ€ Ð±Ð¾Ð¹Ñ‹Ð½ÑˆÐ° ÐµÑÐ°Ð±Ð°Ñ‚",
    "nav.reportInstitutions": "Ð˜Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚ Ò¯Ð¹Ð»ÐµÑ€Ð¸ Ð±Ð¾Ð¹Ñ‹Ð½ÑˆÐ° ÐµÑÐ°Ð±Ð°Ñ‚",
    "nav.reportDisability": "ÐœÒ¯Ð³ÐµÐ´Ð°ÐºÐ»Ð¸Ð³Ð¸ Ð±Ð°Ñ€ ÑˆÐ°Ñ…ÑÐ»Ð°Ñ€ ÑÐ°Ð½Ñ‹ Ð±Ð¾Ð¹Ñ‹Ð½ÑˆÐ° ÐµÑÐ°Ð±Ð°Ñ‚",
    "nav.info": "Ð˜Ð½Ñ„Ð¾",
    "nav.info1": "Ð˜Ð½Ñ„Ð¾ 1",
    "nav.info2": "Ð˜Ð½Ñ„Ð¾ 2",
    "nav.meetingPlans": "Ð–Ñ‹Ð¹Ð½Ð°Ð»Ñ‹Ñ Ñ€ÐµÐ¶ÐµÐ»ÐµÑ€Ð¸",
    "nav.minutes": "Ð‘Ð°Ñ‘Ð½Ð½Ð°Ð¼Ð°Ð»Ð°Ñ€",
    "nav.conclusions": "Ð¥ÑƒÐ»Ð¾ÑÐ°Ð»Ð°Ñ€",
    "applications.total": "Ð–Ð°Ð¼Ð¸ Ð°Ñ€Ñ‹Ð·Ð°Ð»Ð°Ñ€",
    "status.process": "Ð–Ð°Ñ€Ð°Ñ‘Ð½Ð´Ð°",
    "status.accepted": "ÒšÐ°Ð±ÑƒÐ» Ò›Ð¸Ð»Ð¸Ð½Ò“Ð°Ð½",
    "status.rejected": "Ð Ð°Ð´ ÑÑ‚Ð¸Ð»Ð³Ð°Ð½",
    "status.new": "Ð–Ð°Ò£Ð°",
    "result.positive": "Ð˜Ð¶Ð¾Ð±Ð¸Ð¹",
    "result.negative": "Ð¡Ð°Ð»Ð±Ð¸Ð¹",
    "common.status": "Ð¡Ñ‚Ð°Ñ‚ÑƒÑ",
    "common.date": "Ð¡Ð°Ð½Ð°",
    "common.address": "ÐœÐ°Ð½Ð·Ð¸Ð»",
    "common.position": "Ð›Ð°Ð²Ð¾Ð·Ð¸Ð¼",
    "common.step": "Ð‘Ð°ÑÒ›Ñ‹Ñˆ",
    "common.region": "Ò²ÑƒÐ´ÑƒÐ´",
    "common.district": "Ð¢ÑƒÐ¼Ð°Ð½ (ÑˆÐ°Ò³Ð°Ñ€)",
    "common.organizationType": "Ð¢Ð°ÑˆÐºÐ¸Ð»Ð¾Ñ‚ Ñ‚ÑƒÑ€Ð¸",
    "common.organization": "Ð¢Ð°ÑˆÐºÐ¸Ð»Ð¾Ñ‚",
    "common.startDate": "Ð‘Ð°ÑÐ»Ð°Ð½Ñ‹Ñž ÑÓ™Ð½Ó™",
    "common.endDate": "Ð¢Ð°ÑžÑ‹ÑÑ‹Ñž ÑÓ™Ð½Ó™",
    "common.diagnosis": "Ð¢Ð°ÑˆÑ…Ð¸Ñ",
    "common.disabilityGroup": "ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ðº Ð³ÑƒÑ€ÑƒÒ³Ð¸",
    "common.gender": "Ð–Ð¸Ð½ÑÑ‹",
    "common.age": "Ð–Ð°ÑÑ‹",
    "common.apply": "ÒšÐ¾Ð»Ð»Ð°Ñž",
    "common.reset": "Ð¢Ð°Ð·Ð°Ð»Ð°Ñž",
    "common.all": "Ð‘Ð°Ñ€ÑˆÐ°ÑÑ‹",
    "common.close": "Ð–Ð°Ð±Ñ‹Ñž",
    "common.mainMenu": "Ð¢Ð¸Ð¹ÐºÐ°Ñ€Ò“Ñ‹ Ð¼ÐµÐ½ÑŽ",
    "gender.male": "Ð•Ñ€ÐºÐ°Ðº",
    "gender.female": "ÐÑ‘Ð»",
    "detail.title": "ÐÑ€Ñ‹Ð·Ð° Ñ‚Ó™Ñ„ÑÐ¸Ð»Ð¾Ñ‚Ð»Ð°Ñ€Ñ‹",
    "date.placeholder": "Ð¡Ó™Ð½Ð°Ð½Ñ‹ Ñ‚Ð°Ò£Ð´Ð°Ò£",
  },
  ru: {
    "module.muruvvat": "ÐœÐ¾Ð´ÑƒÐ»ÑŒ ÐœÑƒÑ€ÑƒÐ²Ð²Ð°Ñ‚",
    "module.ptpk": "ÐœÐ¾Ð´ÑƒÐ»ÑŒ ÐŸÐ¢ÐŸÐš",
    "nav.dashboard": "Ð”Ð°ÑˆÐ±Ð¾Ñ€Ð´",
    "nav.institutions": "Ð”Ð¾Ð¼Ð°-Ð¸Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚Ñ‹",
    "nav.queue": "ÐžÑ‡ÐµÑ€ÐµÐ´ÑŒ",
    "nav.registered": "Ð—Ð°Ñ€ÐµÐ³Ð¸ÑÑ‚Ñ€Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð½Ñ‹Ðµ",
    "nav.removed": "Ð’Ñ‹Ð±Ñ‹Ð²ÑˆÐ¸Ðµ",
    "nav.applications": "Ð—Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ñ",
    "nav.applicationsList": "Ð¡Ð¿Ð¸ÑÐ¾Ðº Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ð¹",
    "nav.forms": "ÐžÐ¿Ñ€Ð¾ÑÐ½Ð¸ÐºÐ¸",
    "nav.acts": "ÐÐºÑ‚Ñ‹",
    "nav.decisions": "Ð ÐµÑˆÐµÐ½Ð¸Ñ",
    "nav.reports": "ÐžÑ‚Ñ‡Ñ‘Ñ‚Ñ‹",
    "nav.reportApplications": "ÐžÑ‚Ñ‡Ñ‘Ñ‚ Ð¿Ð¾ Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸ÑÐ¼",
    "nav.reportInstitutions": "ÐžÑ‚Ñ‡Ñ‘Ñ‚ Ð¿Ð¾ Ð´Ð¾Ð¼Ð°Ð¼-Ð¸Ð½Ñ‚ÐµÑ€Ð½Ð°Ñ‚Ð°Ð¼",
    "nav.reportDisability": "ÐžÑ‚Ñ‡Ñ‘Ñ‚ Ð¿Ð¾ Ñ‡Ð¸ÑÐ»Ñƒ Ð»Ð¸Ñ† Ñ Ð¸Ð½Ð²Ð°Ð»Ð¸Ð´Ð½Ð¾ÑÑ‚ÑŒÑŽ",
    "nav.info": "Ð˜Ð½Ñ„Ð¾",
    "nav.info1": "Ð˜Ð½Ñ„Ð¾ 1",
    "nav.info2": "Ð˜Ð½Ñ„Ð¾ 2",
    "nav.meetingPlans": "ÐŸÐ»Ð°Ð½Ñ‹ Ð·Ð°ÑÐµÐ´Ð°Ð½Ð¸Ð¹",
    "nav.minutes": "ÐŸÑ€Ð¾Ñ‚Ð¾ÐºÐ¾Ð»Ñ‹",
    "nav.conclusions": "Ð—Ð°ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ñ",
    "page.applicationsList": "Ð—Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ñ / Ð¡Ð¿Ð¸ÑÐ¾Ðº Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ð¹",
    "page.reportDisability": "ÐžÑ‚Ñ‡Ñ‘Ñ‚Ñ‹ / ÐžÑ‚Ñ‡Ñ‘Ñ‚ Ð¿Ð¾ Ñ‡Ð¸ÑÐ»Ñƒ Ð»Ð¸Ñ† Ñ Ð¸Ð½Ð²Ð°Ð»Ð¸Ð´Ð½Ð¾ÑÑ‚ÑŒÑŽ",
    "applications.total": "Ð’ÑÐµÐ³Ð¾ Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ð¹",
    "status.process": "Ð’ Ð¿Ñ€Ð¾Ñ†ÐµÑÑÐµ",
    "status.accepted": "ÐŸÑ€Ð¸Ð½ÑÑ‚Ð¾",
    "status.rejected": "ÐžÑ‚ÐºÐ»Ð¾Ð½ÐµÐ½Ð¾",
    "status.new": "ÐÐ¾Ð²Ñ‹Ð¹",
    "result.positive": "ÐŸÐ¾Ð»Ð¾Ð¶Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ð¹",
    "result.negative": "ÐžÑ‚Ñ€Ð¸Ñ†Ð°Ñ‚ÐµÐ»ÑŒÐ½Ñ‹Ð¹",
    "common.status": "Ð¡Ñ‚Ð°Ñ‚ÑƒÑ",
    "common.date": "Ð”Ð°Ñ‚Ð°",
    "common.address": "ÐÐ´Ñ€ÐµÑ",
    "common.position": "Ð”Ð¾Ð»Ð¶Ð½Ð¾ÑÑ‚ÑŒ",
    "common.step": "Ð­Ñ‚Ð°Ð¿",
    "common.region": "Ð ÐµÐ³Ð¸Ð¾Ð½",
    "common.district": "Ð Ð°Ð¹Ð¾Ð½ (Ð³Ð¾Ñ€Ð¾Ð´)",
    "common.organizationType": "Ð¢Ð¸Ð¿ Ð¾Ñ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸Ð¸",
    "common.organization": "ÐžÑ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸Ñ",
    "common.startDate": "Ð”Ð°Ñ‚Ð° Ð½Ð°Ñ‡Ð°Ð»Ð°",
    "common.endDate": "Ð”Ð°Ñ‚Ð° Ð¾ÐºÐ¾Ð½Ñ‡Ð°Ð½Ð¸Ñ",
    "common.diagnosis": "Ð”Ð¸Ð°Ð³Ð½Ð¾Ð·",
    "common.disabilityGroup": "Ð“Ñ€ÑƒÐ¿Ð¿Ð° Ð¸Ð½Ð²Ð°Ð»Ð¸Ð´Ð½Ð¾ÑÑ‚Ð¸",
    "common.gender": "ÐŸÐ¾Ð»",
    "common.age": "Ð’Ð¾Ð·Ñ€Ð°ÑÑ‚",
    "common.apply": "ÐŸÑ€Ð¸Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ",
    "common.reset": "Ð¡Ð±Ñ€Ð¾ÑÐ¸Ñ‚ÑŒ",
    "common.all": "Ð’ÑÐµ",
    "common.close": "Ð—Ð°ÐºÑ€Ñ‹Ñ‚ÑŒ",
    "common.mainMenu": "Ð“Ð»Ð°Ð²Ð½Ð¾Ðµ Ð¼ÐµÐ½ÑŽ",
    "gender.male": "ÐœÑƒÐ¶ÑÐºÐ¾Ð¹",
    "gender.female": "Ð–ÐµÐ½ÑÐºÐ¸Ð¹",
    "header.administrator": "ÐÐ´Ð¼Ð¸Ð½Ð¸ÑÑ‚Ñ€Ð°Ñ‚Ð¾Ñ€",
    "header.profile": "ÐŸÑ€Ð¾Ñ„Ð¸Ð»ÑŒ",
    "header.settings": "ÐÐ°ÑÑ‚Ñ€Ð¾Ð¹ÐºÐ¸",
    "header.logout": "Ð’Ñ‹Ñ…Ð¾Ð´",
    "header.monitoring": "ÐŸÐ°Ð½ÐµÐ»ÑŒ Ð¼Ð¾Ð½Ð¸Ñ‚Ð¾Ñ€Ð¸Ð½Ð³Ð°",
    "header.reportsCenter": "Ð¦ÐµÐ½Ñ‚Ñ€ Ð¾Ñ‚Ñ‡Ñ‘Ñ‚Ð¾Ð²",
    "applications.searchPlaceholder": "ID, Ð¤.Ð˜.Ðž. Ð¸Ð»Ð¸ ÐŸÐ˜ÐÐ¤Ð›",
    "applications.actions": "Ð”ÐµÐ¹ÑÑ‚Ð²Ð¸Ñ",
    "applications.application": "Ð—Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ðµ",
    "applications.applicant": "ÐŸÐ¾Ð»ÑƒÑ‡Ð°Ñ‚ÐµÐ»ÑŒ ÑƒÑÐ»ÑƒÐ³Ð¸",
    "applications.address": "ÐÐ´Ñ€ÐµÑ",
    "applications.export": "Ð­ÐºÑÐ¿Ð¾Ñ€Ñ‚",
    "applications.new": "ÐÐ¾Ð²Ð¾Ðµ Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ðµ",
    "empty.notFound": "Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ñ‹",
    "empty.noData": "ÐŸÐ¾ÐºÐ° Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ð¹ Ð½ÐµÑ‚",
    "date.placeholder": "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ Ð´Ð°Ñ‚Ñƒ",
    "report.download": "Ð¡ÐºÐ°Ñ‡Ð°Ñ‚ÑŒ Ð¾Ñ‚Ñ‡Ñ‘Ñ‚",
    "report.totalPersons": "ÐžÐ±Ñ‰ÐµÐµ Ñ‡Ð¸ÑÐ»Ð¾ Ð›Ð¡Ð˜",
    "report.byDiagnosis": "ÐŸÐ¾ Ð´Ð¸Ð°Ð³Ð½Ð¾Ð·Ð°Ð¼",
    "report.byDisability": "Ð“Ñ€ÑƒÐ¿Ð¿Ð° Ð¸Ð½Ð²Ð°Ð»Ð¸Ð´Ð½Ð¾ÑÑ‚Ð¸",
    "report.scope.back": "ÐÐ°Ð·Ð°Ð´",
    "report.summary": "Ð˜Ñ‚Ð¾Ð³Ð¾ Ð¿Ð¾ Ñ€ÐµÑÐ¿ÑƒÐ±Ð»Ð¸ÐºÐµ",
    "selection.count": "ÐšÐ¾Ð»-Ð²Ð¾",
    "selection.sum": "Ð¡ÑƒÐ¼Ð¼Ð°",
    "selection.avg": "Ð¡Ñ€ÐµÐ´Ð½ÐµÐµ",
    "selection.min": "ÐœÐ¸Ð½",
    "selection.max": "ÐœÐ°ÐºÑ",
    "detail.title": "Ð”ÐµÑ‚Ð°Ð»Ð¸ Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ñ",
    "detail.loading": "Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ° Ð´Ð°Ð½Ð½Ñ‹Ñ… Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ñ...",
    "detail.accept": "ÐŸÑ€Ð¸Ð½ÑÑ‚ÑŒ",
    "detail.reject": "ÐžÑ‚ÐºÐ»Ð¾Ð½Ð¸Ñ‚ÑŒ",
    "detail.application": "Ð”Ð°Ð½Ð½Ñ‹Ðµ Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ñ",
    "detail.receiver": "ÐŸÑ€Ð¸Ð½ÑÐ²ÑˆÐ¸Ð¹ ÑÐ¾Ñ‚Ñ€ÑƒÐ´Ð½Ð¸Ðº",
    "detail.representative": "Ð—Ð°ÐºÐ¾Ð½Ð½Ñ‹Ð¹ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð¸Ñ‚ÐµÐ»ÑŒ",
    "detail.applicant": "ÐŸÐ¾Ð»ÑƒÑ‡Ð°Ñ‚ÐµÐ»ÑŒ ÑƒÑÐ»ÑƒÐ³Ð¸",
    "detail.medicalDocuments": "ÐœÐµÐ´Ð¸Ñ†Ð¸Ð½ÑÐºÐ¸Ðµ Ð´Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ñ‹",
    "detail.result": "Ð ÐµÐ·ÑƒÐ»ÑŒÑ‚Ð°Ñ‚",
    "detail.representativeLevel": "Ð¡Ñ‚ÐµÐ¿ÐµÐ½ÑŒ Ð¿Ñ€ÐµÐ´ÑÑ‚Ð°Ð²Ð¸Ñ‚ÐµÐ»ÑŒÑÑ‚Ð²Ð°",
    "detail.phone": "Ð¢ÐµÐ»ÐµÑ„Ð¾Ð½",
    "detail.birthDate": "Ð”Ð°Ñ‚Ð° Ñ€Ð¾Ð¶Ð´ÐµÐ½Ð¸Ñ",
    "detail.diagnosis": "Ð”Ð¸Ð°Ð³Ð½Ð¾Ð·",
    "detail.address": "ÐÐ´Ñ€ÐµÑ",
    "detail.organizationName": "ÐÐ°Ð·Ð²Ð°Ð½Ð¸Ðµ Ð¾Ñ€Ð³Ð°Ð½Ð¸Ð·Ð°Ñ†Ð¸Ð¸",
    "detail.goToAct": "ÐŸÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ðº Ð°ÐºÑ‚Ñƒ",
    "detail.goToDecision": "ÐŸÐµÑ€ÐµÐ¹Ñ‚Ð¸ Ðº Ñ€ÐµÑˆÐµÐ½Ð¸ÑŽ",
    "detail.disabilityHistory": "Ð˜ÑÑ‚Ð¾Ñ€Ð¸Ñ Ð¸Ð½Ð²Ð°Ð»Ð¸Ð´Ð½Ð¾ÑÑ‚Ð¸",
    "detail.conclusionHistory": "Ð˜ÑÑ‚Ð¾Ñ€Ð¸Ñ Ð·Ð°ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ð¹",
    "detail.applicationsHistory": "Ð˜ÑÑ‚Ð¾Ñ€Ð¸Ñ Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ð¹",
    "detail.documentHistory": "Ð˜ÑÑ‚Ð¾Ñ€Ð¸Ñ Ð´Ð¾ÐºÑƒÐ¼ÐµÐ½Ñ‚Ð¾Ð²",
    "detail.assignedDate": "Ð”Ð°Ñ‚Ð° Ð½Ð°Ð·Ð½Ð°Ñ‡ÐµÐ½Ð¸Ñ",
    "detail.validUntil": "Ð¡Ñ€Ð¾Ðº Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ñ",
    "detail.educationInstitutionType": "Ð¢Ð¸Ð¿ Ð¾Ð±Ñ€Ð°Ð·Ð¾Ð²Ð°Ñ‚ÐµÐ»ÑŒÐ½Ð¾Ð³Ð¾ ÑƒÑ‡Ñ€ÐµÐ¶Ð´ÐµÐ½Ð¸Ñ",
    "detail.actor": "Ð˜ÑÐ¿Ð¾Ð»Ð½Ð¸Ñ‚ÐµÐ»ÑŒ",
    "empty.notReady": "Ñ€Ð°Ð·Ð´ÐµÐ» Ð¿Ð¾ÐºÐ° Ð½Ðµ Ð¿Ð¾Ð´Ð³Ð¾Ñ‚Ð¾Ð²Ð»ÐµÐ½.",
    "common.records": "Ð·Ð°Ð¿Ð¸ÑÐµÐ¹",
    "common.loading": "Ð—Ð°Ð³Ñ€ÑƒÐ·ÐºÐ°...",
    "common.downloaded": "Ð—Ð°Ð³Ñ€ÑƒÐ¶ÐµÐ½Ð¾",
    "common.fileReady": "Ð¤Ð°Ð¹Ð» Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ñ Ð³Ð¾Ñ‚Ð¾Ð².",
    "detail.notFoundTitle": "Ð—Ð°ÑÐ²Ð»ÐµÐ½Ð¸Ðµ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾",
    "detail.notFoundDescription": "Ð´Ð°Ð½Ð½Ñ‹Ðµ Ð¿Ð¾ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ð¾Ð¼Ñƒ Ð·Ð°ÑÐ²Ð»ÐµÐ½Ð¸ÑŽ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ñ‹.",
  },
  en: {
    "module.muruvvat": "Muruvvat module",
    "module.ptpk": "PTPK module",
    "nav.dashboard": "Dashboard",
    "nav.institutions": "Residential homes",
    "nav.queue": "Queue",
    "nav.registered": "Registered",
    "nav.removed": "Removed",
    "nav.applications": "Applications",
    "nav.applicationsList": "Application list",
    "nav.forms": "Forms",
    "nav.acts": "Acts",
    "nav.decisions": "Decisions",
    "nav.reports": "Reports",
    "nav.reportApplications": "Applications report",
    "nav.reportInstitutions": "Residential homes report",
    "nav.reportDisability": "Disability persons report",
    "nav.info": "Info",
    "nav.info1": "Info 1",
    "nav.info2": "Info 2",
    "nav.meetingPlans": "Meeting plans",
    "nav.minutes": "Minutes",
    "nav.conclusions": "Conclusions",
    "page.applicationsList": "Applications / Application list",
    "page.reportDisability": "Reports / Disability persons report",
    "applications.total": "Total applications",
    "status.process": "In progress",
    "status.accepted": "Accepted",
    "status.rejected": "Rejected",
    "status.new": "New",
    "result.positive": "Positive",
    "result.negative": "Negative",
    "common.status": "Status",
    "common.date": "Date",
    "common.address": "Address",
    "common.position": "Position",
    "common.step": "Step",
    "common.region": "Region",
    "common.district": "District (city)",
    "common.organizationType": "Organization type",
    "common.organization": "Organization",
    "common.startDate": "Start date",
    "common.endDate": "End date",
    "common.diagnosis": "Diagnosis",
    "common.disabilityGroup": "Disability group",
    "common.gender": "Gender",
    "common.age": "Age",
    "common.apply": "Apply",
    "common.reset": "Reset",
    "common.all": "All",
    "common.close": "Close",
    "common.mainMenu": "Main menu",
    "gender.male": "Male",
    "gender.female": "Female",
    "header.administrator": "Administrator",
    "header.profile": "View profile",
    "header.settings": "Settings",
    "header.logout": "Logout",
    "header.monitoring": "Monitoring panel",
    "header.reportsCenter": "Reports center",
    "applications.searchPlaceholder": "ID, full name or PINFL",
    "applications.actions": "Actions",
    "applications.application": "Application",
    "applications.applicant": "Service recipient",
    "applications.address": "Address",
    "applications.export": "Export",
    "applications.new": "New application",
    "empty.notFound": "No matching data found",
    "empty.noData": "No applications yet",
    "date.placeholder": "Select date",
    "report.download": "Download report",
    "report.totalPersons": "Total PwD count",
    "report.byDiagnosis": "By diagnosis",
    "report.byDisability": "Disability group",
    "report.scope.back": "Back",
    "report.summary": "Republic total",
    "selection.count": "Count",
    "selection.sum": "Sum",
    "selection.avg": "Average",
    "selection.min": "Min",
    "selection.max": "Max",
    "detail.title": "Application details",
    "detail.loading": "Loading application data...",
    "detail.accept": "Accept",
    "detail.reject": "Reject",
    "detail.application": "Application information",
    "detail.receiver": "Receiving officer",
    "detail.representative": "Legal representative",
    "detail.applicant": "Service recipient",
    "detail.medicalDocuments": "Medical documents",
    "detail.result": "Result",
    "detail.representativeLevel": "Representation level",
    "detail.phone": "Phone number",
    "detail.birthDate": "Birth date",
    "detail.diagnosis": "Diagnosis",
    "detail.address": "Address",
    "detail.organizationName": "Organization name",
    "detail.goToAct": "Go to act",
    "detail.goToDecision": "Go to decision",
    "detail.disabilityHistory": "Disability history",
    "detail.conclusionHistory": "Conclusion history",
    "detail.applicationsHistory": "Application history",
    "detail.documentHistory": "Document history",
    "detail.assignedDate": "Assigned date",
    "detail.validUntil": "Valid until",
    "detail.educationInstitutionType": "Education institution type",
    "detail.actor": "Performed by",
    "detail.downloadAll": "Download all",
    "detail.pdfDocument": "PDF document",
    "common.download": "Download",
    "empty.notReady": "section content is not ready yet.",
    "common.records": "records",
    "common.loading": "Loading...",
    "common.downloaded": "Downloaded",
    "common.fileReady": "The application file is ready.",
    "detail.notFoundTitle": "Application not found",
    "detail.notFoundDescription": "No details were found for the selected application.",
  },
};

function formatRecordCount(count) {
  const safeCount = Number(count) || 0;
  if (currentLanguage === "en") {
    return `${safeCount} ${tr("common.records", "records")}`;
  }
  if (currentLanguage === "ru") {
    return `${safeCount} ${safeCount === 1 ? "Ð·Ð°Ð¿Ð¸ÑÑŒ" : safeCount < 5 ? "Ð·Ð°Ð¿Ð¸ÑÐ¸" : "Ð·Ð°Ð¿Ð¸ÑÐµÐ¹"}`;
  }
  return `${safeCount} ta yozuv`;
}

function formatPaginationInfo(from, to, total) {
  if (currentLanguage === "en") {
    return `${from}-${to} / ${total} ${tr("common.records", "records")}`;
  }
  if (currentLanguage === "ru") {
    return `${from}-${to} / ${total} Ð·Ð°Ð¿Ð¸ÑÐµÐ¹`;
  }
  return `${from}-${to} / ${total} ta yozuv`;
}

function tr(key, fallback = "") {
  if (!key) {
    return fallback;
  }
  if (currentLanguage === "i18n") {
    return key;
  }
  return translations[currentLanguage]?.[key]
    ?? translations.uz?.[key]
    ?? fallback
    ?? key;
}

function tl(literal) {
  return tr(literalKeyMap[literal], literal);
}

function translateValuePart(value) {
  if (typeof value !== "string") return value;
  const trimmed = value.trim();
  if (!trimmed) return value;

  const mappedKey = literalKeyMap[trimmed];
  if (mappedKey) {
    return valueTranslations[currentLanguage]?.[mappedKey] ?? tr(mappedKey, trimmed);
  }

  const diagnosisMatch = trimmed.match(/^(.*)\s\(([^)]+)\)$/);
  if (diagnosisMatch) {
    const baseTranslated = translateValuePart(diagnosisMatch[1]);
    return `${baseTranslated} (${diagnosisMatch[2]})`;
  }

  return trimmed;
}

function translateDisplayValue(value) {
  if (typeof value !== "string") return value;
  if (!value || value === "-" || /<[^>]+>/.test(value)) return value;
  return value.split(",").map((part) => translateValuePart(part)).join(", ");
}

function getTranslatedDownloadLabel() {
  const labels = {
    uz: "Yuklab olish",
    "uz-cyrl": "Юклаб олиш",
    kaa: "Júklep alıw",
    "kaa-cyrl": "Жүклеп алыў",
    ru: "Скачать",
    en: "Download",
    i18n: "common.download",
  };
  return labels[currentLanguage] ?? labels.uz;
}

function getTranslatedDownloadAllLabel() {
  const labels = {
    uz: "Barchasini yuklab olish",
    "uz-cyrl": "Барчасини юклаб олиш",
    kaa: "Barshasın júklep alıw",
    "kaa-cyrl": "Баршасын жүклеп алыў",
    ru: "Скачать все",
    en: "Download all",
    i18n: "detail.downloadAll",
  };
  return labels[currentLanguage] ?? labels.uz;
}

function getTranslatedPdfDocumentLabel() {
  const labels = {
    uz: "PDF hujjat",
    "uz-cyrl": "PDF ҳужжат",
    kaa: "PDF hujjat",
    "kaa-cyrl": "PDF ҳужжат",
    ru: "PDF документ",
    en: "PDF document",
    i18n: "detail.pdfDocument",
  };
  return labels[currentLanguage] ?? labels.uz;
}

function translateRouteTitle(title) {
  const key = routeTitleKeys[title];
  if (!key) {
    return tl(title);
  }
  return tr(key, title);
}

function getRouteParts(title) {
  if (!title) return [];
  if (title.includes(" - ")) {
    return title.split(" - ").map((part) => part.trim()).filter(Boolean);
  }
  if (title.includes(" / ")) {
    return title.split(" / ").map((part) => part.trim()).filter(Boolean);
  }
  return [title.trim()].filter(Boolean);
}

function translateRouteParts(title) {
  return getRouteParts(title).map((part) => tl(part));
}

function getSavedLanguagePreference() {
  return window.localStorage.getItem(languageStorageKey) || "uz";
}

function updateLanguageMenuUi() {
  const meta = languageMeta[currentLanguage] ?? languageMeta.uz;
  if (languageCurrent) {
    languageCurrent.textContent = meta.short;
  }
  document.documentElement.lang = meta.htmlLang;
  languageItems.forEach((button) => {
    button.classList.toggle("header-dropdown__item--active", button.getAttribute("data-language-code") === currentLanguage);
  });
}

function applyStaticTranslations() {
  updateLanguageMenuUi();

  document.title = currentModule === "ptpk" ? tr("module.ptpk", "PTPK moduli") : tr("module.muruvvat", "Muruvvat moduli");

  const loginHeroBadge = document.querySelector(".login-hero__badge");
  if (loginHeroBadge) loginHeroBadge.textContent = tr("module.muruvvat", "Muruvvat moduli");
  const loginHeroTitle = document.querySelector(".login-hero__title");
  if (loginHeroTitle) loginHeroTitle.textContent = tr("login.heroTitle", "Internat uylariga joylashtirish jarayonini yagona oynada boshqaring.");
  const loginHeroText = document.querySelector(".login-hero__text");
  if (loginHeroText) loginHeroText.textContent = tr("login.heroText", "Arizalar, qarorlar, so'rovnomalar va monitoring holatini bitta tizimda yuritish uchun tizimga kiring.");
  const loginStatLabels = document.querySelectorAll(".login-hero__card span");
  if (loginStatLabels[0]) loginStatLabels[0].textContent = tr("login.statProcessed", "Qayta ishlangan arizalar");
  if (loginStatLabels[1]) loginStatLabels[1].textContent = tr("login.statControl", "Markazlashgan nazorat");
  if (loginStatLabels[2]) loginStatLabels[2].textContent = tr("login.statIntegration", "Barcha bo'limlar bilan integratsiya");
  const loginBrandTitle = document.querySelector(".login-card__brand strong");
  if (loginBrandTitle) loginBrandTitle.textContent = tr("module.muruvvat", "Muruvvat moduli");
  const loginBrandSub = document.querySelector(".login-card__brand div span");
  if (loginBrandSub) loginBrandSub.textContent = tr("login.systemAccess", "Tizimga kirish");
  const loginHeading = document.querySelector(".login-card__heading h2");
  if (loginHeading) loginHeading.textContent = tr("login.signIn", "Tizimga kiring");
  const loginHeadingText = document.querySelector(".login-card__heading p");
  if (loginHeadingText) loginHeadingText.textContent = tr("login.signInText", "Login va parol orqali ishchi kabinetga o'ting.");
  const loginFieldLabels = document.querySelectorAll(".login-field > span");
  if (loginFieldLabels[0]) loginFieldLabels[0].textContent = tr("login.username", "Login");
  if (loginFieldLabels[1]) loginFieldLabels[1].textContent = tr("login.password", "Parol");
  if (loginUsername) loginUsername.placeholder = tr("login.usernamePlaceholder", "Loginni kiriting");
  if (loginPassword) loginPassword.placeholder = tr("login.passwordPlaceholder", "Parolni kiriting");
  if (capsLockHint) capsLockHint.textContent = tr("login.caps", "Caps Lock yoqilgan bo'lishi mumkin.");
  const rememberText = document.querySelector(".login-check span");
  if (rememberText) rememberText.textContent = tr("login.remember", "Meni eslab qolish");
  if (forgotPasswordButton) forgotPasswordButton.textContent = tr("login.forgot", "Parolni unutdingizmi?");
  if (loginError) loginError.textContent = tr("login.error", "Login yoki parol noto'g'ri. Demo uchun `admin` / `muruvvat123` dan foydalaning.");
  if (loginSubmit) loginSubmit.textContent = tr("login.submit", "Kirish");
  const loginDivider = document.querySelector(".login-divider span");
  if (loginDivider) loginDivider.textContent = tr("login.otherMethod", "yoki boshqa usul bilan");
  const oneIdTitle = document.querySelector(".login-alt__copy strong");
  if (oneIdTitle) oneIdTitle.textContent = tr("login.oneidTitle", "OneID orqali kirish");
  const oneIdText = document.querySelector(".login-alt__copy span");
  if (oneIdText) oneIdText.textContent = tr("login.oneidText", "Yagona identifikatsiya tizimi bilan xavfsiz autentifikatsiya");
  const loginHintSpan = document.querySelector(".login-card__hint span");
  if (loginHintSpan) loginHintSpan.textContent = tr("login.demo", "Demo kirish:");

  const appMenu = document.querySelector('[data-menu-toggle="applications"]')?.nextElementSibling?.querySelectorAll(".header-dropdown__item");
  if (appMenu?.[0]) appMenu[0].textContent = tr("module.muruvvat", "Muruvvat moduli");
  if (appMenu?.[1]) appMenu[1].textContent = tr("module.ptpk", "PTPK moduli");
  if (appMenu?.[2]) appMenu[2].textContent = tr("header.monitoring", "Monitoring paneli");
  if (appMenu?.[3]) appMenu[3].textContent = tr("header.reportsCenter", "Hisobotlar markazi");
  const accountMeta = document.querySelector(".header-account__meta span");
  if (accountMeta) accountMeta.textContent = tr("header.administrator", "Administrator");
  const accountMenu = document.querySelector('[data-menu-toggle="account"]')?.nextElementSibling?.querySelectorAll(".header-dropdown__item");
  if (accountMenu?.[0]) accountMenu[0].textContent = tr("header.profile", "Profilni ko'rish");
  if (accountMenu?.[1]) accountMenu[1].textContent = tr("header.settings", "Sozlamalar");
  if (accountMenu?.[2]) accountMenu[2].textContent = tr("header.logout", "Chiqish");

  const statLabels = document.querySelectorAll(".stat-card__label");
  if (statLabels[0]) statLabels[0].textContent = tr("applications.total", "Jami arizalar");
  if (statLabels[1]) statLabels[1].textContent = tr("status.process", "Jarayonda");
  if (statLabels[2]) statLabels[2].textContent = tr("status.accepted", "Qabul qilingan");
  if (statLabels[3]) statLabels[3].textContent = tr("status.rejected", "Rad etilgan");

  if (applicationSearch) applicationSearch.placeholder = tr("applications.searchPlaceholder", "ID, F.I.Sh. yoki PINFL");
  const staticSelectTranslations = [
    { select: statusFilter, map: { all: tr("common.all", "Barchasi"), "jarayonda": tr("status.process", "Jarayonda"), "qabul qilingan": tr("status.accepted", "Qabul qilingan"), "rad etilgan": tr("status.rejected", "Rad etilgan") } },
    { select: reportDiagnosisFilter, map: { all: tr("common.all", "Barchasi") } },
    { select: reportDisabilityGroupFilter, map: { all: tr("common.all", "Barchasi") } },
    { select: reportGenderFilter, map: { all: tr("common.all", "Barchasi"), erkak: tr("gender.male", "Erkak"), ayol: tr("gender.female", "Ayol") } },
    { select: reportAgeFilter, map: { all: tr("common.all", "Barchasi") } },
  ];
  staticSelectTranslations.forEach(({ select, map }) => {
    if (!select) return;
    Array.from(select.options).forEach((option) => {
      if (map[option.value]) option.textContent = map[option.value];
    });
    const menu = select.closest("[data-custom-select]");
    menu?.querySelectorAll(".custom-select__option").forEach((option) => {
      const value = option.getAttribute("data-value") || "";
      if (map[value]) option.textContent = map[value];
    });
    if (menu) syncCustomSelectUi(menu);
  });
  const appFilterLabels = {
    'label[for="statusFilter"]': tr("common.status", "Status"),
    'label[for="stepFilter"]': tr("common.step", "Bosqich"),
    'label[for="regionFilter"]': tr("common.region", "Hudud"),
    'label[for="districtFilter"]': tr("common.district", "Tuman (shahar)"),
    'label[for="organizationTypeFilter"]': tr("common.organizationType", "Tashkilot turi"),
    'label[for="organizationFilter"]': tr("common.organization", "Tashkilot"),
    'label[for="dateFromFilter"]': tr("common.startDate", "Boshlanish sana"),
    'label[for="dateToFilter"]': tr("common.endDate", "Tugash sana"),
    'label[for="reportDiagnosisFilter"]': tr("common.diagnosis", "Tashxis"),
    'label[for="reportDisabilityGroupFilter"]': tr("common.disabilityGroup", "Nogironlik guruhi"),
    'label[for="reportGenderFilter"]': tr("common.gender", "Jinsi"),
    'label[for="reportAgeFilter"]': tr("common.age", "Yoshi"),
  };
  Object.entries(appFilterLabels).forEach(([selector, text]) => {
    const element = document.querySelector(selector);
    if (element) element.textContent = text;
  });
  const fromInput = document.getElementById("dateFromInput");
  const toInput = document.getElementById("dateToInput");
  if (fromInput) fromInput.placeholder = tr("date.placeholder", "Sanani tanlang");
  if (toInput) toInput.placeholder = tr("date.placeholder", "Sanani tanlang");
  const appTableHeads = document.querySelectorAll("#applicationsTable thead th");
  if (appTableHeads[0]) appTableHeads[0].textContent = tr("applications.actions", "Amallar");
  if (appTableHeads[1]) appTableHeads[1].textContent = tr("applications.application", "Ariza");
  if (appTableHeads[2]) appTableHeads[2].textContent = tr("applications.applicant", "Xizmat oluvchi");
  if (appTableHeads[3]) appTableHeads[3].textContent = tr("common.organization", "Tashkilot");
  if (appTableHeads[4]) appTableHeads[4].textContent = tr("applications.address", "Manzil");
  if (appTableHeads[5]) appTableHeads[5].textContent = tr("common.status", "Status");
  if (applyFilters) applyFilters.textContent = tr("common.apply", "Qo'llash");
  if (resetFilters) resetFilters.textContent = tr("common.reset", "Tozalash");
  if (exportButton?.querySelector(".sr-only")) exportButton.querySelector(".sr-only").textContent = tr("applications.export", "Eksport");
  if (reportApplyFilters) reportApplyFilters.textContent = tr("common.apply", "Qo'llash");
  if (reportResetFilters) reportResetFilters.textContent = tr("common.reset", "Tozalash");
  if (reportScopeBack) reportScopeBack.textContent = tr("report.scope.back", "Orqaga");
  if (reportExportButton?.querySelector(".sr-only")) reportExportButton.querySelector(".sr-only").textContent = tr("report.download", "Hisobotni yuklab olish");
  const reportHeads = document.querySelectorAll(".report-table thead th");
  if (reportHeads[0]) reportHeads[0].textContent = tr("common.region", "Hudud");
  if (reportHeads[1]) reportHeads[1].textContent = tr("report.totalPersons", "Jami NBSHlar soni");
  if (reportHeads[2]) reportHeads[2].textContent = tr("report.byDiagnosis", "Tashxislari bo'yicha");
  if (reportHeads[3]) reportHeads[3].textContent = tr("report.byDisability", "Nogironlik guruhi");
  if (reportHeads[4]) reportHeads[4].textContent = tr("common.gender", "Jinsi");
  if (reportHeads[5]) reportHeads[5].textContent = tr("common.age", "Yoshi");
  if (reportHeads[12]) reportHeads[12].textContent = tr("gender.male", "Erkak");
  if (reportHeads[13]) reportHeads[13].textContent = tr("gender.female", "Ayol");
  if (tableEmptyAction) tableEmptyAction.textContent = tr("common.reset", "Tozalash");
  if (detailModalTitle) detailModalTitle.textContent = tr("detail.title", "Ariza tafsilotlari");
  if (detailModalLoading?.querySelector("span:last-child")) detailModalLoading.querySelector("span:last-child").textContent = tr("detail.loading", "Ariza ma'lumotlari yuklanmoqda...");
  if (detailAcceptButton) detailAcceptButton.textContent = tr("detail.accept", "Qabul qilish");
  if (detailRejectButton) detailRejectButton.textContent = tr("detail.reject", "Rad etish");
  const reportSelectionLabels = document.querySelectorAll(".report-selection__stat span");
  if (reportSelectionLabels[0]) reportSelectionLabels[0].textContent = tr("selection.count", "Soni");
  if (reportSelectionLabels[1]) reportSelectionLabels[1].textContent = tr("selection.sum", "Yig'indi");
  if (reportSelectionLabels[2]) reportSelectionLabels[2].textContent = tr("selection.avg", "O'rtacha");
  if (reportSelectionLabels[3]) reportSelectionLabels[3].textContent = tr("selection.min", "Min");
  if (reportSelectionLabels[4]) reportSelectionLabels[4].textContent = tr("selection.max", "Max");
}

function applyLanguage(languageCode) {
  currentLanguage = languageMeta[languageCode] ? languageCode : "uz";
  window.localStorage.setItem(languageStorageKey, currentLanguage);
  applyStaticTranslations();
  renderSidebar(currentModule, currentCanonicalTitle || getTitleFromHash(window.location.hash));
  syncPageHeading(currentCanonicalTitle || getTitleFromHash(window.location.hash) || "Arizalar - Arizalar ro'yxati");
  enrichApplicationRows();
  updateApplicationFilterOptionSets();
  updateApplicationFilterControls();
  updateReportFilterControls();
  renderReportTable();
  applyTableFilters();
  if (!detailModal?.hasAttribute("hidden") && currentDetailApplicationId) {
    openApplicationDetail(currentDetailApplicationId);
  }
}

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

function getModuleKeyFromHash(hashValue) {
  return hashValue.startsWith("#/ptpk") ? "ptpk" : "muruvvat";
}

function getModuleConfig(moduleKey = currentModule) {
  return modulesConfig[moduleKey] ?? modulesConfig.muruvvat;
}

function renderSidebar(moduleKey = currentModule, activeTitle = "") {
  const moduleConfig = getModuleConfig(moduleKey);
  currentModule = moduleKey;

  if (moduleTitle) {
    moduleTitle.textContent = tl(moduleConfig.label);
  }

  if (!sidebarNav) {
    return;
  }

  const html = moduleConfig.nav
    .map((item) => {
      const icon = sidebarIconMap[item.icon] ?? sidebarIconMap.info;

      if (item.type === "group") {
        const isOpen = item.children.some((child) => child.title === activeTitle) || Boolean(item.defaultOpen && !activeTitle);
        const children = item.children
          .map((child) => `
            <a class="nav-subitem${child.title === activeTitle ? " nav-subitem--active" : ""}" href="${child.hash}" data-page-title="${escapeHtml(child.title)}">
              ${escapeHtml(tl(child.label))}
            </a>
          `)
          .join("");

        return `
          <div class="nav-group${isOpen ? " nav-group--open" : ""}">
            <button class="nav-item nav-item--toggle" type="button" aria-expanded="${isOpen ? "true" : "false"}">
              <span class="nav-item__icon" aria-hidden="true">${icon}</span>
              <span>${escapeHtml(tl(item.label))}</span>
              <span class="nav-caret" aria-hidden="true"></span>
            </button>
            <div class="nav-submenu">
              ${children}
            </div>
          </div>
        `;
      }

      return `
        <a class="nav-item${item.title === activeTitle ? " nav-item--active" : ""}" href="${item.hash}" data-page-title="${escapeHtml(item.title)}">
          <span class="nav-item__icon" aria-hidden="true">${icon}</span>
          <span>${escapeHtml(tl(item.label))}</span>
        </a>
      `;
    })
    .join("");

  sidebarNav.innerHTML = html;
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
const reportSelectedCells = new Set();

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
    ? `${tr("report.summary", "Respublika jami")} / ${selectedRegion.name}`
    : tr("report.summary", "Respublika jami");
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

  return { source: reportSummaryData, label: tr("report.summary", reportSummaryData?.name ?? "Respublika jami") };
}

function parseReportCellValue(value) {
  const normalized = String(value || "").replace(/,/g, "").trim();
  const numeric = Number(normalized);
  return Number.isFinite(numeric) ? numeric : null;
}

function clearReportSelection() {
  reportSelectedCells.forEach((cell) => cell.classList.remove("report-table__cell--selected"));
  reportSelectedCells.clear();
  updateReportSelectionSummary();
}

function updateReportSelectionSummary() {
  if (!reportSelectionBar) {
    return;
  }

  const values = Array.from(reportSelectedCells)
    .map((cell) => parseReportCellValue(cell.textContent))
    .filter((value) => value !== null);

  const hasValues = values.length > 0;
  reportSelectionBar.hidden = !hasValues;

  if (!hasValues) {
    if (reportSelectionCount) reportSelectionCount.textContent = "0";
    if (reportSelectionSum) reportSelectionSum.textContent = "0";
    if (reportSelectionAvg) reportSelectionAvg.textContent = "0";
    if (reportSelectionMin) reportSelectionMin.textContent = "0";
    if (reportSelectionMax) reportSelectionMax.textContent = "0";
    return;
  }

  const sum = values.reduce((total, value) => total + value, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (reportSelectionCount) reportSelectionCount.textContent = formatReportNumber(values.length);
  if (reportSelectionSum) reportSelectionSum.textContent = formatReportNumber(sum);
  if (reportSelectionAvg) reportSelectionAvg.textContent = formatReportNumber(Math.round(avg * 100) / 100);
  if (reportSelectionMin) reportSelectionMin.textContent = formatReportNumber(min);
  if (reportSelectionMax) reportSelectionMax.textContent = formatReportNumber(max);
}

function toggleReportCellSelection(cell, additive = false) {
  if (!(cell instanceof HTMLTableCellElement)) {
    return;
  }

  if (!additive) {
    clearReportSelection();
  }

  if (reportSelectedCells.has(cell)) {
    reportSelectedCells.delete(cell);
    cell.classList.remove("report-table__cell--selected");
  } else {
    reportSelectedCells.add(cell);
    cell.classList.add("report-table__cell--selected");
  }

  updateReportSelectionSummary();
}

function renderReportTable() {
  if (!reportTableBody || !reportSummaryData) {
    return;
  }

  clearReportSelection();

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
  const version = "20260327c";
  return String(application.gender || "").toLowerCase() === "ayol"
    ? `person-girl.png?v=${version}`
    : `person-boy.png?v=${version}`;
}

function getRepresentativeAvatar(gender) {
  const version = "20260327c";
  return String(gender || "").toLowerCase() === "ayol"
    ? `person-woman.png?v=${version}`
    : `person-man.png?v=${version}`;
}

function getReceiverAvatar(gender) {
  const version = "20260327c";
  return String(gender || "").toLowerCase() === "ayol"
    ? `person-operator-female.png?v=${version}`
    : `person-operator-male.png?v=${version}`;
}

function getStatusBadgeVariant(status) {
  const normalized = status.toLowerCase();
  if (normalized === "jarayonda") {
    return { className: "status-badge--process", label: tr("status.process", "Jarayonda") };
  }
  if (normalized === "qabul qilingan" || normalized === "tasdiqlangan") {
    return { className: "status-badge--accepted", label: tr("status.accepted", "Qabul qilingan") };
  }
  if (normalized === "rad etilgan") {
    return { className: "status-badge--rejected", label: tr("status.rejected", "Rad etilgan") };
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
  const variant = getStatusBadgeVariant(status);
  return `<span class="status-badge ${statusClass}">${variant.label}</span>`;
}

function formatResultBadge(result) {
  const normalized = (result || "").toLowerCase();
  const className = normalized === "ijobiy" ? "status-badge--accepted" : "status-badge--rejected";
  const label = normalized === "ijobiy"
    ? tr("result.positive", "Ijobiy")
    : normalized === "salbiy"
      ? tr("result.negative", "Salbiy")
      : (result || "-");
  return `<span class="status-badge ${className}">${label}</span>`;
}

function buildDetailFieldGrid(items) {
  return `
    <div class="detail-field-list">
      ${items
        .map(
          (item) => `
            <div class="detail-field-list__item">
              <span>${item.label}</span>
              <strong>${translateDisplayValue(item.value) || "-"}</strong>
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
                <strong>${translateDisplayValue(record.title)}</strong>
                ${record.meta ? `<span>${translateDisplayValue(record.meta)}</span>` : ""}
              </div>
              <div class="detail-record__fields">
                ${record.fields
                  .map(
                    (field) => `
                      <div class="detail-record__field">
                        <span>${field.label}</span>
                        <strong>${translateDisplayValue(field.value) || "-"}</strong>
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
  const documentTitles = items.map((item) => translateDisplayValue(item.title)).join("|");
  return `
    <div class="detail-documents">
      <div class="detail-documents__toolbar">
        <button
          class="detail-document__download detail-document__download--bulk"
          type="button"
          data-document-download="tibbiy-hujjatlar-toplami.pdf"
          data-document-title="${tr("detail.documentsBundle", "Tibbiy hujjatlar to'plami")}"
          data-document-bulk="true"
          data-document-lines="${documentTitles}"
        >
          <svg viewBox="0 0 24 24" fill="none"><path d="M12 4v10M8 10l4 4 4-4M5 18h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
          <span>${getTranslatedDownloadAllLabel()}</span>
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
                <strong>${translateDisplayValue(item.title)}</strong>
                <span>${getTranslatedPdfDocumentLabel()}</span>
              </div>
              <button class="detail-document__download" type="button" data-document-download="${item.fileName}" data-document-title="${translateDisplayValue(item.title)}">
                <svg viewBox="0 0 24 24" fill="none"><path d="M12 4v10M8 10l4 4 4-4M5 18h14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <span>${getTranslatedDownloadLabel()}</span>
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

function triggerFileDownload(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function sanitizeFileName(value) {
  return String(value || "")
    .trim()
    .replace(/[\\/:*?"<>|]+/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function getReportExportFileName() {
  const dateLabel = sanitizeFileName(reportSnapshotDate?.value || formatDateLabel(formatDateValue(new Date())));
  const scopeLabel = sanitizeFileName(reportScopePath?.textContent || currentCanonicalTitle || "disability-report");
  return `${scopeLabel || "disability-report"}-${dateLabel || "snapshot"}.xls`;
}

function buildReportExportHtml() {
  if (!reportTable) {
    return "";
  }

  const tableClone = reportTable.cloneNode(true);
  tableClone.querySelectorAll("[hidden]").forEach((element) => element.remove());

  const scopeTitle = (reportScopePath?.textContent?.trim() || translateRouteTitle("Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot")).replace(/\s+/g, " ");
  const snapshotLabel = reportSnapshotDate?.value?.trim() || formatDateLabel(formatDateValue(new Date()));

  return `<!DOCTYPE html>
<html lang="${languageMeta[currentLanguage]?.htmlLang ?? "uz"}">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Calibri, Arial, sans-serif; margin: 24px; color: #1d2a1f; }
    h1 { margin: 0 0 8px; font-size: 22px; font-weight: 700; }
    .report-meta { margin: 0 0 16px; font-size: 13px; color: #425443; }
    table { border-collapse: collapse; width: 100%; min-width: 1200px; }
    th, td { border: 1px solid #cfd9cf; padding: 8px 10px; font-size: 12px; line-height: 1.35; text-align: center; vertical-align: middle; }
    thead th { background: #eef4ec; font-weight: 700; }
    tbody td:first-child, thead th:first-child { text-align: left; min-width: 180px; }
    .report-table__summary td { background: #edf6e7; font-weight: 700; }
  </style>
</head>
<body>
  <h1>${scopeTitle}</h1>
  <div class="report-meta">${tr("report.snapshotDate", "Holat sanasi")}: ${snapshotLabel}</div>
  ${tableClone.outerHTML}
</body>
</html>`;
}

function exportCurrentReportToExcel() {
  const html = buildReportExportHtml();
  if (!html) {
    return false;
  }

  const blob = new Blob(["\uFEFF", html], {
    type: "application/vnd.ms-excel;charset=utf-8;",
  });
  triggerFileDownload(blob, getReportExportFileName());
  return true;
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
  const rawStatus = (row.getAttribute("data-status") ?? statusLabel).trim();
  const normalizedRawStatus = rawStatus.toLowerCase();
  const numericPart = Number(applicationId.replace(/\D/g, "")) || 0;
  const operator = [
    "Dilshoda Sharipovna Karimova",
    "Abdurahmon Bunyod o'g'li Xasanov",
    "Nigora Olimovna Rasulova",
  ][numericPart % 3];
  const operatorGender = /dilshoda|nigora/i.test(operator) ? "Ayol" : "Erkak";
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
  const receiver = {
    fullName: formatPersonName(operator),
    pinfl: `50${String(100000000000 + numericPart).slice(-12)}`,
    position: ["Yetakchi mutaxassis", "Bosh inspektor", "Mas'ul kotib"][numericPart % 3],
    address: `${addressCell?.querySelector("strong")?.textContent?.trim() ?? "-"}, ${addressCell?.querySelector("span")?.textContent?.trim() ?? "-"}, IHMA hududiy bo'limi`,
    gender: operatorGender,
    avatar: getReceiverAvatar(operatorGender),
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
    avatar: getRepresentativeAvatar(representativeGender),
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
  const actResult = normalizedRawStatus === "rad etilgan" ? "Salbiy" : "Ijobiy";
  const decisionResult = normalizedRawStatus === "rad etilgan" ? "Rad etish" : "Qabul qilish";
  const actStatus = normalizedRawStatus === "jarayonda" ? "Jarayonda" : "Tasdiqlangan";
  const decisionStatus = normalizedRawStatus === "jarayonda" ? "Jarayonda" : "Tasdiqlangan";
  const applicationDate = applicationCell?.querySelector("span")?.textContent?.trim() ?? "-";
  const day = Number(applicationDate.split(".")[0] || 1);
  const month = Number(applicationDate.split(".")[1] || 1);
  const year = Number(applicationDate.split(".")[2] || 2026);
  const applicantAge = numericPart % 18;
  const birthMonth = String((numericPart % 12) + 1).padStart(2, "0");
  const birthDay = String((numericPart % 27) + 1).padStart(2, "0");
  let birthYear = year - applicantAge;
  if (Number(birthMonth) > month || (Number(birthMonth) === month && Number(birthDay) > day)) {
    birthYear -= 1;
  }

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
    status: index === 0 ? rawStatus : ["Yangi", "Jarayonda", "Qabul qilingan"][index % 3],
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
    status: rawStatus || "-",
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
      result: normalizedRawStatus === "rad etilgan" ? "Salbiy" : "Ijobiy",
      status: decisionStatus,
    },
    medicalDocuments,
    disabilityHistory,
    conclusionHistory,
    applicationHistory,
    documentLogs,
    status: rawStatus || "-",
  };
}

function closeDetailModal() {
  currentDetailApplicationId = "";
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
    showToast(
      tr("detail.notFoundTitle", "Ariza topilmadi"),
      `${applicationId}: ${tr("detail.notFoundDescription", "bo'yicha ma'lumot topilmadi.")}`,
      "error",
    );
    return;
  }

  currentDetailApplicationId = applicationId;

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
          tr("detail.application", "Ariza ma'lumotlari"),
          buildDetailFieldGrid([
            { label: "ID", value: application.id },
            { label: tl("Sana"), value: formatReadableDate(application.date) },
            { label: tl("Status"), value: formatStatusBadge(application.status) },
          ]),
        )}
        ${buildDetailSection(
          tr("detail.receiver", "Arizani qabul qiluvchi"),
          `<div class="detail-person-layout">
            ${buildDetailPersonCard(
              application.receiver,
              `<img class="detail-person-card__avatar" src="${application.receiver.avatar}" alt="${application.receiver.fullName} rasmi" />`,
            )}
            ${buildDetailFieldGrid([
              { label: "FIO", value: application.receiver.fullName },
              { label: "JSHSHIR", value: application.receiver.pinfl },
              { label: tl("Lavozim"), value: application.receiver.position },
              { label: tl("Manzil"), value: application.receiver.address },
            ])}
          </div>`,
        )}
        ${buildDetailSection(
          tr("detail.representative", "Qonuniy vakil"),
          `<div class="detail-person-layout">
            ${buildDetailPersonCard(
              application.representative,
              `<img class="detail-person-card__avatar" src="${application.representative.avatar}" alt="${application.representative.fullName} rasmi" />`,
            )}
            ${buildDetailFieldGrid([
              { label: "FIO", value: application.representative.fullName },
              { label: "JSHSHIR", value: application.representative.pinfl },
              { label: tr("detail.representativeLevel", "Vakillik darajasi"), value: application.representative.level },
              { label: tl("Manzil"), value: application.representative.address },
              { label: tr("detail.phone", "Telefon raqami"), value: application.representative.phone },
            ])}
          </div>`,
        )}
        ${buildDetailSection(
          tr("detail.applicant", "Xizmat oluvchi"),
          `<div class="detail-person-layout">
            ${buildDetailPersonCard(application.applicant, `<img class="detail-person-card__avatar" src="${application.applicant.avatar}" alt="${application.applicant.fullName} rasmi" />`)}
            ${buildDetailFieldGrid([
              { label: "FIO", value: application.applicant.fullName },
              { label: "JSHSHIR", value: application.applicant.pinfl },
              { label: tr("detail.birthDate", "Tug'ilgan sanasi"), value: application.applicant.birthDate },
              { label: tl("Jinsi"), value: tl(application.applicant.gender) },
              { label: tl("Nogironlik guruhi"), value: application.applicant.disabilityGroup },
              { label: tr("detail.diagnosis", "Tashxisi"), value: application.applicant.diagnosis },
              { label: tr("detail.address", "Manzili"), value: application.applicant.address },
            ])}
          </div>`,
        )}
        ${buildDetailSection(
          tl("Tashkilot"),
          buildDetailFieldGrid([
            { label: tl("Tashkilot turi"), value: tl(application.organization.type) },
            { label: tr("detail.organizationName", "Tashkilot nomi"), value: application.organization.name },
            { label: tl("Manzil"), value: application.organization.address },
          ]),
        )}
        ${buildDetailSection(
          tr("detail.medicalDocuments", "Tibbiy hujjatlar"),
          buildDetailDocuments(application.medicalDocuments),
        )}
        <div class="detail-section-grid__double">
          ${buildDetailSection(
            tl("Dalolatnomalar").replace(/lar$/,""),
            buildDetailFieldGrid([
              { label: "ID", value: application.act.id },
              { label: tl("Sana"), value: application.act.date },
              { label: tr("detail.result", "Natija"), value: formatResultBadge(application.act.result) },
              { label: tl("Status"), value: formatStatusBadge(application.act.status) },
            ]) +
              buildDetailInlineActions([{ label: tr("detail.goToAct", "Dalolatnomaga o'tish"), pageTitle: "Arizalar - Dalolatnomalar" }]),
          )}
          ${buildDetailSection(
            tl("Qarorlar").replace(/lar$/,""),
            buildDetailFieldGrid([
              { label: "ID", value: application.decision.id },
              { label: tl("Sana"), value: application.decision.date },
              { label: tr("detail.result", "Natija"), value: formatResultBadge(application.decision.result) },
              { label: tl("Status"), value: formatStatusBadge(application.decision.status) },
            ]) +
              buildDetailInlineActions([{ label: tr("detail.goToDecision", "Qarorga o'tish"), pageTitle: "Arizalar - Qarorlar" }]),
          )}
        </div>
      </div>`,
      buildDetailAccordion(
        tr("detail.disabilityHistory", "Nogironlik tarixi"),
        buildDetailRecordList(
          application.disabilityHistory.map((item) => ({
            title: item.id,
            meta: item.assignedDate,
            fields: [
              { label: tr("detail.assignedDate", "Ta'yinlangan sana"), value: item.assignedDate },
              { label: tr("detail.validUntil", "Amal qilish muddati"), value: item.validUntil },
              { label: tl("Nogironlik guruhi"), value: item.group },
              { label: tr("detail.diagnosis", "Tashxisi"), value: item.diagnosis },
              { label: tl("Status"), value: item.status },
            ],
          })),
        ),
        formatRecordCount(application.disabilityHistory.length),
        true,
      ),
      buildDetailAccordion(
        tr("detail.conclusionHistory", "Xulosalar tarixi"),
        buildDetailRecordList(
          application.conclusionHistory.map((item) => ({
            title: item.id,
            meta: item.date,
            fields: [
              { label: tl("Sana"), value: item.date },
              { label: tr("detail.educationInstitutionType", "Ta'lim muassasasi turi"), value: item.institutionType },
              { label: tr("detail.validUntil", "Amal qilish muddati"), value: item.validUntil },
              { label: tl("Status"), value: item.status },
            ],
          })),
        ),
        formatRecordCount(application.conclusionHistory.length),
      ),
      buildDetailAccordion(
        tr("detail.applicationsHistory", "Arizalar tarixi"),
        buildDetailRecordList(
          application.applicationHistory.map((item) => ({
            title: item.id,
            meta: item.date,
            fields: [
              { label: tl("Sana"), value: item.date },
              { label: tl("Status"), value: item.status },
            ],
          })),
        ),
        formatRecordCount(application.applicationHistory.length),
      ),
      buildDetailAccordion(
        tr("detail.documentHistory", "Hujjat tarixi"),
        buildDetailRecordList(
          application.documentLogs.map((item) => ({
            title: item.operation,
            meta: item.date,
            fields: [
              { label: tl("Sana"), value: item.date },
              { label: tr("detail.actor", "Amaliyotni bajaruvchi"), value: item.actor },
            ],
          })),
        ),
        formatRecordCount(application.documentLogs.length),
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
    emptyViewTitle.textContent = translateRouteTitle(title);
  }
  if (emptyViewDescription) {
    const translatedTitle = translateRouteTitle(title);
    emptyViewDescription.textContent = `"${translatedTitle}" ${tr("empty.notReady", "bo'limi uchun kontent hali tayyorlanmagan.")}`;
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
  const moduleConfig = getModuleConfig();
  const routeEntry = Object.entries(moduleConfig.routes).find(([, routeTitle]) => routeTitle === title);
  return routeEntry?.[0] ?? "";
}

function getTitleFromHash(hashValue) {
  const moduleKey = getModuleKeyFromHash(hashValue);
  return modulesConfig[moduleKey]?.routes?.[hashValue] ?? "";
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
  return tl(applicationStepLabels[value] ?? value);
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
  return tl(applicationOrganizationTypeLabels[value] ?? value);
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
  allOption.textContent = tr("common.all", "Barchasi");
  dropdown.append(allOption);

  const allNativeOption = document.createElement("option");
  allNativeOption.value = "all";
  allNativeOption.textContent = tr("common.all", "Barchasi");
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

  if (routeTitle) {
    showEmptyView(routeTitle.split(" - ").pop() ?? routeTitle);
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

function initializeLanguage() {
  currentLanguage = languageMeta[getSavedLanguagePreference()] ? getSavedLanguagePreference() : "uz";
  applyStaticTranslations();
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
      showToast("Xush kelibsiz", `${getModuleConfig(getModuleKeyFromHash(window.location.hash)).label}ga muvaffaqiyatli kirildi.`);
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

function syncPageHeading(title) {
  if (!pageTitle || !title) {
    return;
  }

  currentCanonicalTitle = title;
  const parts = translateRouteParts(title);
  pageTitle.textContent = parts[parts.length - 1];
  document.title = parts[parts.length - 1];
  if (pageBreadcrumb) {
    pageBreadcrumb.textContent = parts.length > 1 ? parts.join(" / ") : tl("Asosiy menyu");
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

sidebarNav?.addEventListener("click", async (event) => {
  const toggle = event.target.closest(".nav-item--toggle");
  if (toggle instanceof HTMLElement) {
    const group = toggle.closest(".nav-group");
    if (!group) {
      return;
    }

    const isOpen = group.classList.contains("nav-group--open");
    document.querySelectorAll(".nav-group").forEach((item) => {
      if (item !== group) {
        item.classList.remove("nav-group--open");
        item.querySelector(".nav-item--toggle")?.setAttribute("aria-expanded", "false");
      }
    });

    group.classList.toggle("nav-group--open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
    return;
  }

  const link = event.target.closest("[data-page-title]");
  if (!(link instanceof HTMLElement)) {
    return;
  }

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
      return;
    }
    await navigateToView(title);
  }
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
    paginationInfo.textContent = matchedRows.length > 0
      ? formatPaginationInfo(from, to, matchedRows.length)
      : formatPaginationInfo(0, 0, 0);
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
      label.textContent = tr("common.loading", "Yuklanmoqda...");
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
      showToast(
        tr("common.downloaded", "Yuklab olindi"),
        tr("common.fileReady", "Ariza fayli tayyor bo'ldi."),
      );
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
  const exported = exportCurrentReportToExcel();
  setReportExportLoadingState(false);
  if (exported) {
    showToast(tr("common.downloaded", "Yuklab olindi"), tr("report.download", "Hisobotni yuklab olish"));
  } else {
    showToast("Xatolik", "Hisobotni yuklab bo'lmadi.");
  }
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

languageItems.forEach((button) => {
  button.addEventListener("click", () => {
    const nextLanguage = button.getAttribute("data-language-code") || "uz";
    applyLanguage(nextLanguage);
    button.closest(".header-menu")?.classList.remove("header-menu--open");
    const toggle = button.closest(".header-menu")?.querySelector("[data-menu-toggle]");
    toggle?.setAttribute("aria-expanded", "false");
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

reportTableBody?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const valueCell = target.closest('td[data-col]:not([data-col="region"])');
  if (valueCell instanceof HTMLTableCellElement && reportTableBody.contains(valueCell)) {
    toggleReportCellSelection(valueCell, event.ctrlKey || event.metaKey);
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

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && reportSelectedCells.size > 0) {
    clearReportSelection();
  }
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
initializeLanguage();
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
  const moduleKey = getModuleKeyFromHash(window.location.hash);
  const moduleConfig = getModuleConfig(moduleKey);
  const routeTitle = getTitleFromHash(window.location.hash);

  if (!routeTitle) {
    const defaultTitle = getTitleFromHash(moduleConfig.defaultHash) || "Arizalar - Arizalar ro'yxati";
    renderSidebar(moduleKey, defaultTitle);
    syncPageHeading(defaultTitle);
    const targetLink = document.querySelector(`[data-page-title="${defaultTitle}"]`);
    syncActiveNavigation(targetLink instanceof HTMLElement ? targetLink : null);
    await navigateToView(defaultTitle);
    return;
  }

  renderSidebar(moduleKey, routeTitle);
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

