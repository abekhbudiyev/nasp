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
const sidebarHomeButton = document.getElementById("sidebarHomeButton");
const languageCurrent = document.getElementById("languageCurrent");
const languageItems = document.querySelectorAll("[data-language-code]");
const fontCurrent = document.getElementById("fontCurrent");
const fontItems = document.querySelectorAll("[data-font-code]");
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
let applicationRows = Array.from(document.querySelectorAll("#applicationsTable tbody tr"));
const filterToggle = document.getElementById("filterToggle");
const filterMenu = document.getElementById("filterMenu");
const filterMenuClose = document.getElementById("filterMenuClose");
let rowMenuToggles = document.querySelectorAll(".row-menu__toggle");
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
const modulesView = document.getElementById("modulesView");
const cabinetNavigatorView = document.getElementById("cabinetNavigatorView");
const supportView = document.getElementById("supportView");
const supportForm = document.getElementById("supportForm");
const supportCategory = document.getElementById("supportCategory");
const supportPriority = document.getElementById("supportPriority");
const supportApplicationId = document.getElementById("supportApplicationId");
const supportContactMethod = document.getElementById("supportContactMethod");
const supportMessage = document.getElementById("supportMessage");
const supportSubmit = document.getElementById("supportSubmit");
const supportTicketList = document.getElementById("supportTicketList");
const supportGuides = document.querySelectorAll(".support-guide");
const supportGuidePreviewTitle = document.getElementById("supportGuidePreviewTitle");
const supportGuidePreviewText = document.getElementById("supportGuidePreviewText");
const supportGuidePreviewSteps = document.getElementById("supportGuidePreviewSteps");
const reportFilterToggle = document.getElementById("reportFilterToggle");
const reportFilterMenu = document.getElementById("reportFilterMenu");
const reportFilterMenuClose = document.getElementById("reportFilterMenuClose");
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
const applicationsReportView = document.getElementById("applicationsReportView");
const compositionListView = document.getElementById("compositionListView");
const compositionListTitle = document.getElementById("compositionListTitle");
const compositionTableBody = document.getElementById("compositionTableBody");
const compositionFilterButton = document.getElementById("compositionFilterButton");
const compositionCreateButton = document.getElementById("compositionCreateButton");
const applicationsReportSnapshotDate = document.getElementById("applicationsReportSnapshotDate");
const applicationsReportSnapshotDateTrigger = document.getElementById("applicationsReportSnapshotDateTrigger");
const applicationsReportSnapshotDateNative = document.getElementById("applicationsReportSnapshotDateNative");
const applicationsReportFilterToggle = document.getElementById("applicationsReportFilterToggle");
const applicationsReportFilterMenu = document.getElementById("applicationsReportFilterMenu");
const applicationsReportFilterMenuClose = document.getElementById("applicationsReportFilterMenuClose");
const applicationsReportFilterActiveCount = document.getElementById("applicationsReportFilterActiveCount");
const applicationsReportStatusFilter = document.getElementById("applicationsReportStatusFilter");
const applicationsReportStepFilter = document.getElementById("applicationsReportStepFilter");
const applicationsReportGenderFilter = document.getElementById("applicationsReportGenderFilter");
const applicationsReportAgeFilter = document.getElementById("applicationsReportAgeFilter");
const applicationsReportDateFromText = document.getElementById("applicationsReportDateFromText");
const applicationsReportDateFromFilter = document.getElementById("applicationsReportDateFromFilter");
const applicationsReportDateToText = document.getElementById("applicationsReportDateToText");
const applicationsReportDateToFilter = document.getElementById("applicationsReportDateToFilter");
const applicationsReportApplyFilters = document.getElementById("applicationsReportApplyFilters");
const applicationsReportResetFilters = document.getElementById("applicationsReportResetFilters");
const applicationsReportExportButton = document.getElementById("applicationsReportExportButton");
const applicationsReportTableBody = document.getElementById("applicationsReportTableBody");
const applicationsReportTable = document.getElementById("applicationsReportTable");
const applicationsReportScope = document.getElementById("applicationsReportScope");
const applicationsReportScopeBack = document.getElementById("applicationsReportScopeBack");
const applicationsReportScopePath = document.getElementById("applicationsReportScopePath");
const applicationsReportSelectionBar = document.getElementById("applicationsReportSelectionBar");
const applicationsReportSelectionCount = document.getElementById("applicationsReportSelectionCount");
const applicationsReportSelectionSum = document.getElementById("applicationsReportSelectionSum");
const applicationsReportSelectionAvg = document.getElementById("applicationsReportSelectionAvg");
const applicationsReportSelectionMin = document.getElementById("applicationsReportSelectionMin");
const applicationsReportSelectionMax = document.getElementById("applicationsReportSelectionMax");
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
const themeModes = [
  { key: "brand-light", dark: false, label: "Brand day" },
  { key: "brand-dark", dark: true, label: "Brand night" },
];
const fontStorageKey = "mrv-font";
const authStorageKey = "nasp-auth-state";
const rememberedUsernameStorageKey = "nasp-remembered-username";
const routeIntentStorageKey = "nasp-route-intent";
const lastVisitedRouteStorageKey = "nasp-last-route";
const calendarLocaleLabels = {
  uz: {
    months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    weekdays: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"],
  },
  "uz-cyrl": {
    months: ["Январ", "Феврал", "Март", "Апрел", "Май", "Июн", "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр"],
    weekdays: ["Ду", "Се", "Чо", "Па", "Жу", "Ша", "Як"],
  },
  kaa: {
    months: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul", "Avgust", "Sentabr", "Oktabr", "Noyabr", "Dekabr"],
    weekdays: ["Du", "Se", "Shar", "Pay", "Ju", "Sha", "Yak"],
  },
  "kaa-cyrl": {
    months: ["Январ", "Феврал", "Март", "Апрел", "Май", "Июн", "Июл", "Август", "Сентябр", "Октябр", "Ноябр", "Декабр"],
    weekdays: ["Дү", "Се", "Ша", "Па", "Жу", "Ше", "Як"],
  },
  ru: {
    months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
    weekdays: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  },
  en: {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    weekdays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  },
  i18n: {
    months: ["date.month.1", "date.month.2", "date.month.3", "date.month.4", "date.month.5", "date.month.6", "date.month.7", "date.month.8", "date.month.9", "date.month.10", "date.month.11", "date.month.12"],
    weekdays: ["date.week.mo", "date.week.tu", "date.week.we", "date.week.th", "date.week.fr", "date.week.sa", "date.week.su"],
  },
};
const tableState = { currentPage: 1, totalPages: 1, filteredRows: [] };
const calendarState = { activeField: null, viewDate: null };
const confirmState = { action: "", applicationId: "" };
let supportTicketCounter = 1025;
let currentModule = "muruvvat";
let currentLanguage = "uz";
let currentFont = "noto";
let currentCanonicalTitle = "";
let currentDetailApplicationId = "";
const supportGuideMap = {
  "Yangi ariza yaratish": {
    text: "Ariza yuborishdan oldin arizachi ma'lumotlari, hujjatlar va manzil bo'limlarini to'liq tekshiring. Tizimga kiritilgan ma'lumotlar avtomatik validatsiyadan o'tadi.",
    steps: [
      "Arizachi ma'lumotlarini kiriting va PINFL ni tekshiring.",
      "Hudud va internat uyini tanlang.",
      "Kerakli hujjatlarni biriktiring.",
    ],
  },
  "ERR-409 xatoligi": {
    text: "ERR-409 odatda ariza holati bilan bajarilayotgan amal o'rtasida konflikt borligini anglatadi. Avval ariza tarixini va oxirgi yangilanish vaqtini tekshiring.",
    steps: [
      "Ariza detail oynasidan joriy statusni tekshiring.",
      "Biriktirilgan hujjatlar to'liq ekanini tasdiqlang.",
      "Zarurat bo'lsa support ticket yuborib screenshot ilova qiling.",
    ],
  },
  "Qabul qilish va rad etish": {
    text: "Qabul qilish yoki rad etishdan oldin komissiya xulosasi va ilova hujjatlari to'liq ko'rib chiqilishi kerak. Amal bajarilgach status darhol tizimda yangilanadi.",
    steps: [
      "Ariza detail oynasidagi timeline va hujjatlarni tekshiring.",
      "Kerak bo'lsa ichki note va eslatmalarni ko'rib chiqing.",
      "So'ng Qabul qilish yoki Rad etish amalini bajaring.",
    ],
  },
  "OneID orqali kirish": {
    text: "OneID kirishida muammo bo'lsa brauzer sessiyasi, ruxsat oynalari va profilingiz holatini tekshirish tavsiya etiladi.",
    steps: [
      "Brauzer cache va cookie'larni yangilang.",
      "OneID profilingiz faol ekanini tasdiqlang.",
      "Muammo saqlansa supportga ticket yuboring.",
    ],
  },
};

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
    defaultHash: "/mrv/home",
      routes: {
        "/mrv/home": "Home",
        "/mrv": "Home",
        "/mrv/dashboard": "Dashboard",
        "/mrv/internat/queue": "Internat uylari - Navbat",
        "/mrv/internat/registered": "Internat uylari - Ro'yxatga olinganlar",
        "/mrv/internat/removed": "Internat uylari - Ro'yxatdan chiqqanlar",
        "/mrv/applications/applicationList": "Arizalar - Arizalar ro'yxati",
        "/mrv/applications/forms": "Arizalar - So'rovnomalar",
        "/mrv/applications/workingGroup": "Arizalar - Ishchi guruhi tarkibi",
        "/mrv/applications/acts": "Arizalar - Dalolatnomalar",
        "/mrv/applications/commissionMembers": "Arizalar - Komissiya tarkibi",
        "/mrv/applications/decisions": "Arizalar - Qarorlar",
        "/mrv/reports/applications": "Hisobotlar - Arizalar bo'yicha hisobot",
        "/mrv/reports/institutions": "Hisobotlar - Internat uylari bo'yicha hisobot",
        "/mrv/reports/disabilityinfo": "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot",
      },
    nav: [
      { type: "link", label: "Dashboard", title: "Dashboard", hash: "#/mrv/dashboard", icon: "dashboard" },
      {
        type: "group",
        label: "Internat uylari",
        icon: "institutions",
        children: [
          { label: "Navbat", title: "Internat uylari - Navbat", hash: "#/mrv/internat/queue" },
          { label: "Ro'yxatga olinganlar", title: "Internat uylari - Ro'yxatga olinganlar", hash: "#/mrv/internat/registered" },
          { label: "Ro'yxatdan chiqqanlar", title: "Internat uylari - Ro'yxatdan chiqqanlar", hash: "#/mrv/internat/removed" },
        ],
      },
      {
        type: "group",
        label: "Arizalar",
        icon: "applications",
        defaultOpen: true,
          children: [
            { label: "Arizalar ro'yxati", title: "Arizalar - Arizalar ro'yxati", hash: "#/mrv/applications/applicationList" },
            { label: "So'rovnomalar", title: "Arizalar - So'rovnomalar", hash: "#/mrv/applications/forms" },
            { label: "Ishchi guruhi tarkibi", title: "Arizalar - Ishchi guruhi tarkibi", hash: "#/mrv/applications/workingGroup" },
            { label: "Dalolatnomalar", title: "Arizalar - Dalolatnomalar", hash: "#/mrv/applications/acts" },
            { label: "Komissiya tarkibi", title: "Arizalar - Komissiya tarkibi", hash: "#/mrv/applications/commissionMembers" },
            { label: "Qarorlar", title: "Arizalar - Qarorlar", hash: "#/mrv/applications/decisions" },
          ],
        },
      {
        type: "group",
        label: "Hisobotlar",
        icon: "reports",
        children: [
          { label: "Arizalar bo'yicha hisobot", title: "Hisobotlar - Arizalar bo'yicha hisobot", hash: "#/mrv/reports/applications" },
          { label: "Internat uylari bo'yicha hisobot", title: "Hisobotlar - Internat uylari bo'yicha hisobot", hash: "#/mrv/reports/institutions" },
          { label: "Nogironligi bo'lgan shaxslar soni bo'yicha hisobot", title: "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot", hash: "#/mrv/reports/disabilityinfo" },
        ],
      },
    ],
  },
  ptpk: {
    label: "PTPK moduli",
    defaultHash: "/ptpk/home",
    routes: {
      "/ptpk/home": "Home",
      "/ptpk": "Home",
      "/ptpk/dashboard": "Dashboard",
      "/ptpk/applications/applicationList": "Arizalar - Arizalar ro'yxati",
      "/ptpk/applications/meetingPlans": "Arizalar - Yig'ilish rejalari",
      "/ptpk/applications/minutes": "Arizalar - Bayonnomalar",
      "/ptpk/applications/conclusions": "Arizalar - Xulosalar",
      "/ptpk/reports": "Hisobotlar",
    },
    nav: [
      { type: "link", label: "Dashboard", title: "Dashboard", hash: "#/ptpk/dashboard", icon: "dashboard" },
      {
        type: "group",
        label: "Arizalar",
        icon: "applications",
        defaultOpen: true,
        children: [
          { label: "Arizalar ro'yxati", title: "Arizalar - Arizalar ro'yxati", hash: "#/ptpk/applications/applicationList" },
          { label: "Yig'ilish rejalari", title: "Arizalar - Yig'ilish rejalari", hash: "#/ptpk/applications/meetingPlans" },
          { label: "Bayonnomalar", title: "Arizalar - Bayonnomalar", hash: "#/ptpk/applications/minutes" },
          { label: "Xulosalar", title: "Arizalar - Xulosalar", hash: "#/ptpk/applications/conclusions" },
        ],
      },
      { type: "link", label: "Hisobotlar", title: "Hisobotlar", hash: "#/ptpk/reports", icon: "reports" },
    ],
  },
  cabinet: {
    label: "Shaxsiy kabinet",
    defaultHash: "/cabinet/home",
    routes: {
      "/cabinet/home": "Ijtimoiy navigator",
      "/cabinet": "Ijtimoiy navigator",
    },
    nav: [
      { type: "link", label: "Ijtimoiy navigator", title: "Ijtimoiy navigator", hash: "#/cabinet/home", icon: "dashboard" },
    ],
  },
};

const languageStorageKey = "mrv-language";
const fontMeta = {
  inter: { short: "Inter" },
  noto: { short: "Noto" },
  roboto: { short: "Roboto" },
};
const languageMeta = {
  uz: { short: "UZ", htmlLang: "uz", label: "O'zbek" },
  "uz-cyrl": { short: "ЎЗ", htmlLang: "uz-Cyrl", label: "Ўзбек" },
  kaa: { short: "QQ", htmlLang: "kaa", label: "Qoraqalpoq" },
  "kaa-cyrl": { short: "ҚҚ", htmlLang: "kaa-Cyrl", label: "Қорақалпоқ" },
  ru: { short: "RU", htmlLang: "ru", label: "Русский" },
  en: { short: "EN", htmlLang: "en", label: "English" },
  i18n: { short: "I18N", htmlLang: "en", label: "i18n keys" },
};

const routeTitleKeys = {
  Home: "page.home",
  Dashboard: "nav.dashboard",
  "Internat uylari - Navbat": "page.internatQueue",
  "Internat uylari - Ro'yxatga olinganlar": "page.internatRegistered",
  "Internat uylari - Ro'yxatdan chiqqanlar": "page.internatRemoved",
  "Arizalar - Arizalar ro'yxati": "page.applicationsList",
  "Arizalar - So'rovnomalar": "page.forms",
  "Arizalar - Ishchi guruhi tarkibi": "page.workingGroupComposition",
  "Arizalar - Dalolatnomalar": "page.acts",
  "Arizalar - Komissiya tarkibi": "page.commissionComposition",
  "Arizalar - Qarorlar": "page.decisions",
  "Hisobotlar - Arizalar bo'yicha hisobot": "page.reportApplications",
  "Hisobotlar - Internat uylari bo'yicha hisobot": "page.reportInstitutions",
  "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot": "page.reportDisability",
  "Arizalar - Yig'ilish rejalari": "page.meetingPlans",
  "Arizalar - Bayonnomalar": "page.minutes",
  "Arizalar - Xulosalar": "page.conclusions",
  Hisobotlar: "nav.reports",
  "Ijtimoiy navigator": "page.socialNavigator",
};

const literalKeyMap = {
  "Muruvvat moduli": "module.muruvvat",
  "PTPK moduli": "module.ptpk",
  "Shaxsiy kabinet": "module.cabinet",
  Dashboard: "nav.dashboard",
  "Internat uylari": "nav.institutions",
  Navbat: "nav.queue",
  "Ro'yxatga olinganlar": "nav.registered",
  "Ro'yxatdan chiqqanlar": "nav.removed",
  Arizalar: "nav.applications",
  "Arizalar ro'yxati": "nav.applicationsList",
  "So'rovnomalar": "nav.forms",
  "Ishchi guruhi tarkibi": "nav.workingGroupComposition",
  Dalolatnomalar: "nav.acts",
  "Komissiya tarkibi": "nav.commissionComposition",
  Qarorlar: "nav.decisions",
  Hisobotlar: "nav.reports",
  Home: "page.home",
  "Arizalar bo'yicha hisobot": "nav.reportApplications",
  "Internat uylari bo'yicha hisobot": "nav.reportInstitutions",
  "Nogironligi bo'lgan shaxslar soni bo'yicha hisobot": "nav.reportDisability",
  "Asosiy menyu": "common.mainMenu",
  "Yig'ilish rejalari": "nav.meetingPlans",
  Bayonnomalar: "nav.minutes",
  Xulosalar: "nav.conclusions",
  "Ijtimoiy navigator": "nav.socialNavigator",
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
  NBB: "value.group.nbb",
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
  "Qabul qilish": "detail.accept",
  "Rad etish": "detail.reject",
  Kirish: "login.submit",
  "Kirilmoqda...": "login.signingIn",
  "Parolni tiklash": "login.resetPassword",
  "Yuborilmoqda...": "common.submitting",
  "Yuborish": "support.send",
  "Qoraqalpog'iston R.": "value.region.qoraqalpogiston",
  Andijon: "value.region.andijon",
  Buxoro: "value.region.buxoro",
  Jizzax: "value.region.jizzax",
  Qashqadaryo: "value.region.qashqadaryo",
  Navoiy: "value.region.navoiy",
  Namangan: "value.region.namangan",
  Samarqand: "value.region.samarqand",
  Sirdaryo: "value.region.sirdaryo",
  Surxondaryo: "value.region.surxondaryo",
  "Toshkent viloyati": "value.region.toshkentRegion",
  "Farg'ona": "value.region.fargona",
  Xorazm: "value.region.xorazm",
  "Toshkent shahri": "value.region.toshkentCity",
  "Amudaryo tumani": "value.district.amudaryo",
  "Andijon shahri": "value.district.andijonCity",
  "Asaka tumani": "value.district.asaka",
  "Baliqchi tumani": "value.district.baliqchi",
  "Buxoro shahri": "value.district.bukharaCity",
  "Chimboy tumani": "value.district.chimboy",
  "Chortoq tumani": "value.district.chortoq",
  "Denov tumani": "value.district.denov",
  "G'allaorol tumani": "value.district.gallaorol",
  "G'ijduvon tumani": "value.district.gijduvon",
  "Guliston shahri": "value.district.gulistonCity",
  "Jizzax shahri": "value.district.jizzakhCity",
  "Karmana tumani": "value.district.karmana",
  "Kitob tumani": "value.district.kitob",
  "Kogon shahri": "value.district.kogonCity",
  "Koson tumani": "value.district.koson",
  "Kattaqo'rg'on tumani": "value.district.kattaqorgon",
  "Marg'ilon shahri": "value.district.margilanCity",
  "Mirobod tumani": "value.district.mirobod",
  "Mo'ynoq tumani": "value.district.moynaq",
  "Nukus shahri": "value.district.nukusCity",
  "Nurota tumani": "value.district.nurota",
  "Ohangaron tumani": "value.district.ohangaron",
  "Olmazor tumani": "value.district.olmazor",
  "Pop tumani": "value.district.pop",
  "Qarshi shahri": "value.district.qarshiCity",
  "Qo'qon shahri": "value.district.qoqonCity",
  "Qorako'l tumani": "value.district.qorakol",
  "Qumqo'rg'on tumani": "value.district.qumqorgon",
  "Rishton tumani": "value.district.rishton",
  "Sardoba tumani": "value.district.sardoba",
  "Shahrisabz shahri": "value.district.shahrisabzCity",
  "Shahrixon tumani": "value.district.shahrixon",
  "Termiz shahri": "value.district.termizCity",
  "Urgut tumani": "value.district.urgut",
  "Xiva shahri": "value.district.xivaCity",
  "Yangiyer shahri": "value.district.yangiyerCity",
  "Yunusobod tumani": "value.district.yunusobod",
  "Zarbdor tumani": "value.district.zarbdor",
  "Zomin tumani": "value.district.zomin",
  "Nukus Muruvvat (ayollar)": "value.organization.nukusWomen",
  "Chimboy Muruvvat (erkaklar)": "value.organization.chimboyMen",
  "Chuma Muruvvat (ayollar)": "value.organization.chumaWomen",
  "Bo'taqora Muruvvat (erkaklar)": "value.organization.botaqoraMen",
  "Buxoro Muruvvat (bolalar)": "value.organization.buxoroChildren",
  "Buxoro Muruvvat (ayollar)": "value.organization.buxoroWomen",
  "Jizzax Muruvvat (ayollar)": "value.organization.jizzaxWomen",
  "Zomin Muruvvat (ayollar)": "value.organization.zominWomen",
  "Shahrisabz Muruvvat (ayollar)": "value.organization.shahrisabzWomen",
  "Qarshi Muruvvat (bolalar)": "value.organization.qarshiChildren",
  "Nurota Muruvvat (erkaklar)": "value.organization.nurotaMen",
  "Pop Muruvvat (erkaklar)": "value.organization.popMen",
  "Urgut Muruvvat (ayollar)": "value.organization.urgutWomen",
  "Urgut Muruvvat (erkaklar)": "value.organization.urgutMen",
  "Farhod Muruvvat (ayollar)": "value.organization.farhodWomen",
  "Denov Muruvvat (erkaklar)": "value.organization.denovMen",
  "Qumqo'rg'on Muruvvat (bolalar)": "value.organization.qumqorgonChildren",
  "Sirdaryo Muruvvat (ayollar)": "value.organization.sirdaryoWomen",
  "Yangiyer Muruvvat (ayollar)": "value.organization.yangiyerWomen",
  "Ohangaron Muruvvat (erkaklar)": "value.organization.ohangaronMen",
  "Qo'qon Muruvvat (erkaklar)": "value.organization.qoqonMen",
  "Qudash Muruvvat (ayollar)": "value.organization.qudashWomen",
  "Farg'ona Muruvvat (bolalar)": "value.organization.fargonaChildren",
  "Toshkent sh. Muruvvat 1 (bolalar)": "value.organization.toshkentSh1Children",
  "Toshkent sh. Muruvvat 2 (bolalar)": "value.organization.toshkentSh2Children",
  "Toshkent Muruvvat (erkaklar)": "value.organization.toshkentMen",
  "Xiva Muruvvat (erkaklar)": "value.organization.xivaMen",
  "Qorako'l Muruvvat (erkaklar)": "value.organization.qorakolMen",
};

function normalizeLiteralLookup(value) {
  return String(value ?? "")
    .trim()
    .replace(/[’ʻ`´]/g, "'")
    .replace(/\s+/g, " ");
}

const normalizedLiteralKeyMap = Object.fromEntries(
  Object.entries(literalKeyMap).map(([literal, key]) => [normalizeLiteralLookup(literal), key]),
);

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
    "value.group.nbb": "ÐÐ¾Ð³Ð¸Ñ€Ð¾Ð½Ð»Ð¸Ð³Ð¸ Ð±ÑžÐ»Ð³Ð°Ð½ Ð±Ð¾Ð»Ð°",
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
    "value.group.nbb": "Nogironlıǵı bolǵan bala",
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

function looksLikeMojibake(value) {
  return typeof value === "string" && /(?:Ð|Ñ|Ò|Ó|Ã|Â|Ä|Å)/.test(value);
}

function decodeMojibake(value) {
  if (!looksLikeMojibake(value)) {
    return value;
  }

  try {
    return decodeURIComponent(escape(value));
  } catch {
    return value;
  }
}

function decodeLocalizationTree(target) {
  if (!target || typeof target !== "object") {
    return;
  }

  Object.entries(target).forEach(([key, value]) => {
    if (typeof value === "string") {
      target[key] = decodeMojibake(value);
      return;
    }

    if (value && typeof value === "object") {
      decodeLocalizationTree(value);
    }
  });
}

decodeLocalizationTree(languageMeta);
decodeLocalizationTree(valueTranslations);
decodeLocalizationTree(translations);

const translationOverrides = {
  "uz-cyrl": {
    "module.muruvvat": "Мурувват модули",
    "module.ptpk": "ПТПК модули",
    "nav.dashboard": "Дашборд",
    "nav.institutions": "Интернат уйлари",
    "nav.queue": "Навбат",
    "nav.registered": "Рўйхатга олинганлар",
    "nav.removed": "Рўйхатдан чиққанлар",
    "nav.applications": "Аризалар",
    "nav.applicationsList": "Аризалар рўйхати",
    "nav.forms": "Сўровномалар",
    "nav.acts": "Далолатномалар",
    "nav.decisions": "Қарорлар",
    "nav.reports": "Ҳисоботлар",
    "nav.reportApplications": "Аризалар бўйича ҳисобот",
    "nav.reportInstitutions": "Интернат уйлари бўйича ҳисобот",
    "nav.reportDisability": "Ногиронлиги бўлган шахслар сони бўйича ҳисобот",
    "nav.supportCenter": "Суппорт маркази",
    "nav.guides": "Қўлланмалар",
    "nav.info": "Маълумот",
    "nav.info1": "Маълумот 1",
    "nav.info2": "Маълумот 2",
    "nav.meetingPlans": "Йиғилиш режалари",
    "nav.minutes": "Баённомалар",
    "nav.conclusions": "Хулосалар",
    "page.applicationsList": "Аризалар / Аризалар рўйхати",
    "page.supportCenter": "Суппорт / Суппорт маркази",
    "page.guides": "Суппорт / Қўлланмалар",
    "page.reportDisability": "Ҳисоботлар / Ногиронлиги бўлган шахслар сони бўйича ҳисобот",
    "applications.total": "Жами аризалар",
    "applications.searchPlaceholder": "ID, Ф.И.Ш. ёки ПИНФЛ",
    "applications.actions": "Амаллар",
    "applications.application": "Ариза",
    "applications.applicant": "Хизмат олувчи",
    "applications.address": "Манзил",
    "applications.export": "Экспорт",
    "status.process": "Жараёнда",
    "status.accepted": "Қабул қилинган",
    "status.rejected": "Рад этилган",
    "status.new": "Янги",
    "common.status": "Статус",
    "common.date": "Сана",
    "common.address": "Манзил",
    "common.position": "Лавозим",
    "common.step": "Босқич",
    "common.region": "Ҳудуд",
    "common.district": "Туман (шаҳар)",
    "common.organizationType": "Ташкилот тури",
    "common.organization": "Ташкилот",
    "common.startDate": "Бошланиш санаси",
    "common.endDate": "Тугаш санаси",
    "common.diagnosis": "Ташхис",
    "common.disabilityGroup": "Ногиронлик гуруҳи",
    "common.gender": "Жинси",
    "common.age": "Ёши",
    "common.apply": "Қўллаш",
    "common.reset": "Тозалаш",
    "common.all": "Барчаси",
    "common.close": "Ёпиш",
    "common.mainMenu": "Асосий меню",
    "common.records": "ёзув",
    "common.loading": "Юкланмоқда...",
    "gender.male": "Эркак",
    "gender.female": "Аёл",
    "header.administrator": "Администратор",
    "header.profile": "Профилни кўриш",
    "header.settings": "Созламалар",
    "header.logout": "Чиқиш",
    "header.monitoring": "Мониторинг панели",
    "header.reportsCenter": "Ҳисоботлар маркази",
    "date.placeholder": "Санани танланг",
    "report.download": "Ҳисоботни юклаб олиш",
    "report.totalPersons": "Жами НБШлар сони",
    "report.byDiagnosis": "Ташхислари бўйича",
    "report.byDisability": "Ногиронлик гуруҳи",
    "report.scope.back": "Орқага",
    "selection.count": "Сони",
    "selection.sum": "Йиғинди",
    "selection.avg": "Ўртача",
    "selection.min": "Мин",
    "selection.max": "Макс",
    "detail.title": "Ариза тафсилотлари",
    "detail.loading": "Ариза маълумотлари юкланмоқда...",
    "detail.application": "Ариза маълумотлари",
    "detail.receiver": "Аризани қабул қилувчи",
    "detail.representative": "Қонуний вакил",
    "detail.representativeLevel": "Вакиллик даражаси",
    "detail.phone": "Телефон рақами",
    "detail.applicant": "Хизмат олувчи",
    "detail.birthDate": "Туғилган санаси",
    "detail.address": "Манзили",
    "detail.organizationName": "Ташкилот номи",
    "detail.medicalDocuments": "Тиббий ҳужжатлар",
    "detail.result": "Натижа",
    "detail.goToAct": "Далолатномага ўтиш",
    "detail.goToDecision": "Қарорга ўтиш",
    "detail.disabilityHistory": "Ногиронлик тарихи",
    "detail.assignedDate": "Тайинланган сана",
    "detail.validUntil": "Амал қилиш муддати",
    "detail.conclusionHistory": "Хулосалар тарихи",
    "detail.educationInstitutionType": "Таълим муассасаси тури",
    "detail.applicationsHistory": "Аризалар тарихи",
    "detail.documentHistory": "Ҳужжат тарихи",
    "detail.actor": "Амалиётни бажарувчи",
    "detail.documentsBundle": "Тиббий ҳужжатлар тўплами",
    "detail.accept": "Қабул қилиш",
    "detail.reject": "Рад этиш",
    "empty.notFound": "Мос маълумот топилмади",
    "empty.noData": "Ҳозирча аризалар мавжуд эмас",
    "empty.notReady": "бўлими учун контент ҳали тайёрланмаган.",
    "login.systemAccess": "Тизимга кириш",
    "login.signIn": "Тизимга киринг",
    "login.signInText": "Логин ва парол орқали ишчи кабинетга ўтинг.",
    "login.password": "Парол",
    "login.remember": "Мени эслаб қолиш",
    "login.forgot": "Паролни унутдингизми?",
    "login.submit": "Кириш",
    "login.oneidTitle": "OneID орқали кириш",
    "login.oneidText": "Ягона идентификация тизими билан хавфсиз аутентификация",
    "login.demo": "Демо кириш:",
  },
  "kaa-cyrl": {
    "module.muruvvat": "Мурувват модули",
    "module.ptpk": "ПТПК модули",
    "nav.dashboard": "Дашборд",
    "nav.institutions": "Интернат үйleri",
    "nav.queue": "Нәўбет",
    "nav.registered": "Дизимге алынғанлар",
    "nav.removed": "Дизимнен шыққанлар",
    "nav.applications": "Арызалар",
    "nav.applicationsList": "Арызалар дизими",
    "nav.forms": "Сораўнамалар",
    "nav.acts": "Далолатнамалар",
    "nav.decisions": "Қарорлар",
    "nav.reports": "Есабатлар",
    "nav.reportApplications": "Арызалар бойынша есабат",
    "nav.reportInstitutions": "Интернат үйлери бойынша есабат",
    "nav.reportDisability": "Мүгедеклиги бар шахслар саны бойынша есабат",
    "nav.supportCenter": "Суппорт орайы",
    "nav.guides": "Қолланбалар",
    "nav.meetingPlans": "Жыйналыс режелери",
    "nav.minutes": "Баяннамалар",
    "nav.conclusions": "Хулосалар",
    "applications.total": "Жами арызалар",
    "page.supportCenter": "Суппорт / Суппорт орайы",
    "page.guides": "Суппорт / Қолланбалар",
    "applications.searchPlaceholder": "ID, Ф.И.Ш. яки ПИНФЛ",
    "applications.actions": "Әмеллер",
    "applications.application": "Арыза",
    "applications.applicant": "Хызмет алыушы",
    "applications.address": "Манзил",
    "result.positive": "Ижобий",
    "result.negative": "Салбий",
    "status.process": "Жараёнда",
    "status.accepted": "Қабул қылынған",
    "status.rejected": "Рад этилген",
    "status.new": "Жаңа",
    "common.status": "Статус",
    "common.date": "Сана",
    "common.address": "Манзил",
    "common.step": "Басқыш",
    "common.region": "Ҳудуд",
    "common.district": "Туман (шаҳар)",
    "common.organizationType": "Ташкилат түри",
    "common.organization": "Ташкилат",
    "common.startDate": "Басланыў сәнеси",
    "common.endDate": "Таўысыў сәнеси",
    "common.diagnosis": "Ташхис",
    "common.disabilityGroup": "Ногиронлик гуруҳи",
    "common.gender": "Жинси",
    "common.age": "Жасы",
    "common.apply": "Қоллаў",
    "common.reset": "Тазалаў",
    "common.all": "Баршасы",
    "common.close": "Жабыў",
    "common.mainMenu": "Тийкарғы меню",
    "gender.male": "Эркак",
    "gender.female": "Аёл",
    "header.administrator": "Администратор",
    "header.profile": "Профилди көриў",
    "header.settings": "Сазламалар",
    "header.logout": "Шығыў",
    "date.placeholder": "Сәнаны таңдаң",
    "detail.title": "Арыза тәфсилатлары",
    "detail.application": "Арыза мағлыўматлары",
    "detail.receiver": "Арызаны қабыл қылыўшы",
    "detail.representative": "Нызамый ўәкил",
    "detail.representativeLevel": "Ўәкиллик дәрежеси",
    "detail.phone": "Телефон номери",
    "detail.applicant": "Хызмет алыушы",
    "detail.birthDate": "Туўылған сәнеси",
    "detail.address": "Манзили",
    "detail.organizationName": "Ташкилат аты",
    "detail.medicalDocuments": "Тиббий ҳүжжетлер",
    "detail.result": "Нәтийже",
    "detail.goToAct": "Далолатнамаға өтиў",
    "detail.goToDecision": "Қарорға өтиў",
    "detail.disabilityHistory": "Ногиронлик тарийхы",
    "detail.assignedDate": "Тайынланған сәне",
    "detail.validUntil": "Әмел қылыў муҳлати",
    "detail.conclusionHistory": "Хулосалар тарийхы",
    "detail.educationInstitutionType": "Тәлим мәкемеси түри",
    "detail.applicationsHistory": "Арызалар тарийхы",
    "detail.documentHistory": "Ҳүжжет тарийхы",
    "detail.actor": "Әмелди орынлаўшы",
    "detail.documentsBundle": "Тиббий ҳүжжетлер топламы",
    "detail.accept": "Қабул қылыў",
    "detail.reject": "Рад этиў",
    "empty.notReady": "бөлими ушын контент ҳәли тайёрланмаған.",
  },
  ru: {
    "module.muruvvat": "Модуль Мурувват",
    "module.ptpk": "Модуль ПТПК",
    "nav.dashboard": "Дашборд",
    "nav.institutions": "Дома-интернаты",
    "nav.queue": "Очередь",
    "nav.registered": "Зарегистрированные",
    "nav.removed": "Выбывшие",
    "nav.applications": "Заявления",
    "nav.applicationsList": "Список заявлений",
    "nav.forms": "Опросники",
    "nav.acts": "Акты",
    "nav.decisions": "Решения",
    "nav.reports": "Отчёты",
    "nav.reportApplications": "Отчёт по заявлениям",
    "nav.reportInstitutions": "Отчёт по домам-интернатам",
    "nav.reportDisability": "Отчёт по числу лиц с инвалидностью",
    "nav.supportCenter": "Центр поддержки",
    "nav.guides": "Руководства",
    "nav.meetingPlans": "Планы заседаний",
    "nav.minutes": "Протоколы",
    "nav.conclusions": "Заключения",
    "page.applicationsList": "Заявления / Список заявлений",
    "page.supportCenter": "Поддержка / Центр поддержки",
    "page.guides": "Поддержка / Руководства",
    "applications.total": "Всего заявлений",
    "applications.searchPlaceholder": "ID, Ф.И.О. или ПИНФЛ",
    "applications.actions": "Действия",
    "applications.application": "Заявление",
    "applications.applicant": "Получатель услуги",
    "applications.address": "Адрес",
    "applications.export": "Экспорт",
    "status.process": "В процессе",
    "status.accepted": "Принято",
    "status.rejected": "Отклонено",
    "status.new": "Новый",
    "common.status": "Статус",
    "common.date": "Дата",
    "common.address": "Адрес",
    "common.position": "Должность",
    "common.step": "Этап",
    "common.region": "Регион",
    "common.district": "Район (город)",
    "common.organizationType": "Тип организации",
    "common.organization": "Организация",
    "common.startDate": "Дата начала",
    "common.endDate": "Дата окончания",
    "common.diagnosis": "Диагноз",
    "common.disabilityGroup": "Группа инвалидности",
    "common.gender": "Пол",
    "common.age": "Возраст",
    "common.apply": "Применить",
    "common.reset": "Сбросить",
    "common.all": "Все",
    "common.close": "Закрыть",
    "common.mainMenu": "Главное меню",
    "common.records": "записей",
    "common.loading": "Загрузка...",
    "gender.male": "Мужской",
    "gender.female": "Женский",
    "header.administrator": "Администратор",
    "header.profile": "Профиль",
    "header.settings": "Настройки",
    "header.logout": "Выход",
    "header.monitoring": "Панель мониторинга",
    "header.reportsCenter": "Центр отчётов",
    "date.placeholder": "Выберите дату",
    "report.download": "Скачать отчёт",
    "report.totalPersons": "Общее число ЛСИ",
    "report.byDiagnosis": "По диагнозам",
    "report.byDisability": "Группа инвалидности",
    "report.scope.back": "Назад",
    "selection.count": "Кол-во",
    "selection.sum": "Сумма",
    "selection.avg": "Среднее",
    "selection.min": "Мин",
    "selection.max": "Макс",
    "detail.title": "Детали заявления",
    "detail.loading": "Загрузка данных заявления...",
    "detail.application": "Данные заявления",
    "detail.receiver": "Принявший заявление",
    "detail.representative": "Законный представитель",
    "detail.representativeLevel": "Степень представительства",
    "detail.phone": "Номер телефона",
    "detail.applicant": "Получатель услуги",
    "detail.birthDate": "Дата рождения",
    "detail.address": "Адрес",
    "detail.organizationName": "Наименование организации",
    "detail.medicalDocuments": "Медицинские документы",
    "detail.result": "Результат",
    "detail.goToAct": "Перейти к акту",
    "detail.goToDecision": "Перейти к решению",
    "detail.disabilityHistory": "История инвалидности",
    "detail.assignedDate": "Дата назначения",
    "detail.validUntil": "Срок действия",
    "detail.conclusionHistory": "История заключений",
    "detail.educationInstitutionType": "Тип образовательного учреждения",
    "detail.applicationsHistory": "История заявлений",
    "detail.documentHistory": "История документов",
    "detail.actor": "Исполнитель действия",
    "detail.documentsBundle": "Пакет медицинских документов",
    "detail.accept": "Принять",
    "detail.reject": "Отклонить",
    "empty.notFound": "Данные не найдены",
    "empty.noData": "Пока заявлений нет",
    "empty.notReady": "раздел пока не подготовлен.",
    "login.systemAccess": "Вход в систему",
    "login.signIn": "Войдите в систему",
    "login.signInText": "Войдите в рабочий кабинет с помощью логина и пароля.",
    "login.password": "Пароль",
    "login.remember": "Запомнить меня",
    "login.forgot": "Забыли пароль?",
    "login.submit": "Войти",
    "login.oneidTitle": "Вход через OneID",
    "login.oneidText": "Безопасная аутентификация через единую систему идентификации",
    "login.demo": "Демо-вход:",
  },
};

const valueTranslationOverrides = {
  "uz-cyrl": {
    "value.position.leadingSpecialist": "Етакчи мутахассис",
    "value.position.chiefInspector": "Бош инспектор",
    "value.position.secretary": "Масъул котиб",
    "value.representative.parent": "Ота-онаси",
    "value.representative.guardian": "Васий",
    "value.representative.legalRepresentative": "Қонуний вакил",
    "value.education.specialSchool": "Махсус мактаб",
    "value.education.inclusiveEducation": "Инклюзив таълим",
    "value.education.homeEducation": "Уй таълими",
    "value.state.active": "Фаол",
    "value.state.archive": "Архив",
    "value.state.valid": "Амалда",
    "value.state.completed": "Якунланган",
    "value.organizationType.children": "Болалар",
    "value.organizationType.men": "Эркаклар",
    "value.organizationType.women": "Аёллар",
    "value.log.applicationCreated": "Ариза яратилди",
    "value.log.actAttached": "Далолатнома бириктирилди",
    "value.log.decisionPrepared": "Қарор лойиҳаси шакллантирилди",
    "value.actor.commissionSecretary": "Комиссия котиби",
    "value.document.ambulatoryExtract": "Амбулатор картадан ёки касаллик тарихидан кўчирма",
    "value.document.rehabProgram": "Ногиронлиги бўлган шахсни реабилитация қилишнинг якка тартибдаги дастури",
    "value.document.neuroCommission": "Руҳий-асаб касалликлари диспансери тиббий-маслаҳат комиссияси хулосаси",
    "value.document.oncology": "Онкологик диспансер хулосаси",
    "value.document.aidsCenter": "ОИТСга қарши кураш маркази хулосаси",
    "value.document.skinCenter": "Тери-таносил касалликлари диспансери хулосаси",
    "value.document.tuberculosisCenter": "Силга қарши курашиш диспансери хулосаси",
    "value.document.courtDecision": "Фуқарони муомалага лаёқатсиз деб топиш тўғрисида суднинг ҳал қилув қарори",
    "value.document.guardianDecision": "Муомалага лаёқатсиз деб топилган фуқарога васий тайинлаш тўғрисида туман (шаҳар) ҳокими қарори",
    "value.document.ptpkConclusion": "Психологик-тиббий-педагогик комиссия хулосаси",
  },
  "kaa-cyrl": {
    "value.position.leadingSpecialist": "Жетекши мутахассис",
    "value.position.chiefInspector": "Бас инспектор",
    "value.position.secretary": "Жауаплы катип",
    "value.representative.parent": "Ата-анасы",
    "value.representative.guardian": "Ўасий",
    "value.representative.legalRepresentative": "Нызамый ўәкил",
    "value.education.specialSchool": "Арнаўлы мектеп",
    "value.education.inclusiveEducation": "Инклюзив тәлим",
    "value.education.homeEducation": "Үй тәлими",
    "value.state.active": "Фаол",
    "value.state.archive": "Архив",
    "value.state.valid": "Әмелде",
    "value.state.completed": "Жуўмақланған",
    "value.organizationType.children": "Балалар",
    "value.organizationType.men": "Эркаклер",
    "value.organizationType.women": "Ҳаяллар",
    "value.log.applicationCreated": "Арыза жаратылды",
    "value.log.actAttached": "Далолатнама бириктирилди",
    "value.log.decisionPrepared": "Қарор жобары таярланды",
    "value.actor.commissionSecretary": "Комиссия катиби",
    "value.document.ambulatoryExtract": "Амбулатор картасынан яки кеселлик тарийхынан көширме",
    "value.document.rehabProgram": "Ногиронлиги болған шахсты реабилитация қылыўдың жеке дәстури",
    "value.document.neuroCommission": "Руҳий-асаб кеселликлери диспансери тиббий-мәслаҳат комиссиясы хулосасы",
    "value.document.oncology": "Онкологиялық диспансер хулосасы",
    "value.document.aidsCenter": "ОИТСқа қарсы гүрес марказиниң хулосасы",
    "value.document.skinCenter": "Тери-таносил кеселликлери диспансери хулосасы",
    "value.document.tuberculosisCenter": "Силге қарсы гүресиў диспансери хулосасы",
    "value.document.courtDecision": "Пуқараны муомалаға лаяқатсыз деп табыў ҳаққында суд қарары",
    "value.document.guardianDecision": "Муомалаға лаяқатсыз деп табылған пуқараға ўасий тайынлаў ҳаққында ҳәким қарары",
    "value.document.ptpkConclusion": "Психологиялық-тиббий-педагогикалық комиссия хулосасы",
  },
  ru: {
    "value.position.leadingSpecialist": "Ведущий специалист",
    "value.position.chiefInspector": "Главный инспектор",
    "value.position.secretary": "Ответственный секретарь",
    "value.representative.parent": "Родитель",
    "value.representative.guardian": "Опекун",
    "value.representative.legalRepresentative": "Законный представитель",
    "value.education.specialSchool": "Специальная школа",
    "value.education.inclusiveEducation": "Инклюзивное образование",
    "value.education.homeEducation": "Домашнее обучение",
    "value.state.active": "Активно",
    "value.state.archive": "Архив",
    "value.state.valid": "Действует",
    "value.state.completed": "Завершено",
    "value.organizationType.children": "Для детей",
    "value.organizationType.men": "Для мужчин",
    "value.organizationType.women": "Для женщин",
    "value.log.applicationCreated": "Заявление создано",
    "value.log.actAttached": "Акт прикреплён",
    "value.log.decisionPrepared": "Проект решения сформирован",
    "value.actor.commissionSecretary": "Секретарь комиссии",
    "value.document.ambulatoryExtract": "Выписка из амбулаторной карты или истории болезни",
    "value.document.rehabProgram": "Индивидуальная программа реабилитации лица с инвалидностью",
    "value.document.neuroCommission": "Заключение медико-консультативной комиссии психоневрологического диспансера",
    "value.document.oncology": "Заключение онкологического диспансера",
    "value.document.aidsCenter": "Заключение центра по борьбе со СПИДом",
    "value.document.skinCenter": "Заключение кожно-венерологического диспансера",
    "value.document.tuberculosisCenter": "Заключение противотуберкулёзного диспансера",
    "value.document.courtDecision": "Решение суда о признании гражданина недееспособным",
    "value.document.guardianDecision": "Решение хокима о назначении опекуна недееспособному гражданину",
    "value.document.ptpkConclusion": "Заключение психолого-медико-педагогической комиссии",
  },
};

Object.entries(translationOverrides).forEach(([lang, values]) => {
  translations[lang] = { ...(translations[lang] ?? {}), ...values };
});

Object.entries(valueTranslationOverrides).forEach(([lang, values]) => {
  valueTranslations[lang] = { ...(valueTranslations[lang] ?? {}), ...values };
});

const runtimeValueTranslationOverrides = {
  en: {
    "value.region.qoraqalpogiston": "Republic of Karakalpakstan",
    "value.region.andijon": "Andijan",
    "value.region.buxoro": "Bukhara",
    "value.region.jizzax": "Jizzakh",
    "value.region.qashqadaryo": "Kashkadarya",
    "value.region.navoiy": "Navoi",
    "value.region.namangan": "Namangan",
    "value.region.samarqand": "Samarkand",
    "value.region.sirdaryo": "Syrdarya",
    "value.region.surxondaryo": "Surkhandarya",
    "value.region.toshkentRegion": "Tashkent region",
    "value.region.fargona": "Fergana",
    "value.region.xorazm": "Khorezm",
    "value.region.toshkentCity": "Tashkent city",
    "value.district.amudaryo": "Amu Darya district",
    "value.district.andijonCity": "Andijan city",
    "value.district.asaka": "Asaka district",
    "value.district.baliqchi": "Baliqchi district",
    "value.district.bukharaCity": "Bukhara city",
    "value.district.chimboy": "Chimbay district",
    "value.district.chortoq": "Chortoq district",
    "value.district.denov": "Denov district",
    "value.district.gallaorol": "Gallaorol district",
    "value.district.gijduvon": "Gijduvan district",
    "value.district.gulistonCity": "Gulistan city",
    "value.district.jizzakhCity": "Jizzakh city",
    "value.district.karmana": "Karmana district",
    "value.district.kitob": "Kitob district",
    "value.district.kogonCity": "Kagan city",
    "value.district.kattaqorgon": "Kattaqo'rg'on district",
    "value.district.koson": "Koson district",
    "value.district.margilanCity": "Margilan city",
    "value.district.mirobod": "Mirobod district",
    "value.district.moynaq": "Muynak district",
    "value.district.nukusCity": "Nukus city",
    "value.district.nurota": "Nurota district",
    "value.district.ohangaron": "Ohangaron district",
    "value.district.olmazor": "Olmazor district",
    "value.district.pop": "Pop district",
    "value.district.qarshiCity": "Karshi city",
    "value.district.qoqonCity": "Kokand city",
    "value.district.qorakol": "Qorako'l district",
    "value.district.qumqorgon": "Qumqo'rg'on district",
    "value.district.rishton": "Rishtan district",
    "value.district.sardoba": "Sardoba district",
    "value.district.shahrisabzCity": "Shahrisabz city",
    "value.district.shahrixon": "Shahrixon district",
    "value.district.termizCity": "Termez city",
    "value.district.urgut": "Urgut district",
    "value.district.xivaCity": "Khiva city",
    "value.district.yangiyerCity": "Yangiyer city",
    "value.district.yunusobod": "Yunusobod district",
    "value.district.zarbdor": "Zarbdor district",
    "value.district.zomin": "Zomin district",
    "value.organization.nukusWomen": "Nukus Muruvvat (women)",
    "value.organization.chimboyMen": "Chimboy Muruvvat (men)",
    "value.organization.chumaWomen": "Chuma Muruvvat (women)",
    "value.organization.botaqoraMen": "Bo'taqora Muruvvat (men)",
    "value.organization.buxoroChildren": "Bukhara Muruvvat (children)",
    "value.organization.buxoroWomen": "Bukhara Muruvvat (women)",
    "value.organization.jizzaxWomen": "Jizzakh Muruvvat (women)",
    "value.organization.zominWomen": "Zomin Muruvvat (women)",
    "value.organization.shahrisabzWomen": "Shahrisabz Muruvvat (women)",
    "value.organization.qarshiChildren": "Qarshi Muruvvat (children)",
    "value.organization.nurotaMen": "Nurota Muruvvat (men)",
    "value.organization.popMen": "Pop Muruvvat (men)",
    "value.organization.urgutWomen": "Urgut Muruvvat (women)",
    "value.organization.urgutMen": "Urgut Muruvvat (men)",
    "value.organization.farhodWomen": "Farhod Muruvvat (women)",
    "value.organization.denovMen": "Denov Muruvvat (men)",
    "value.organization.qumqorgonChildren": "Qumqo'rg'on Muruvvat (children)",
    "value.organization.sirdaryoWomen": "Syrdarya Muruvvat (women)",
    "value.organization.yangiyerWomen": "Yangiyer Muruvvat (women)",
    "value.organization.ohangaronMen": "Ohangaron Muruvvat (men)",
    "value.organization.qoqonMen": "Qo'qon Muruvvat (men)",
    "value.organization.qudashWomen": "Qudash Muruvvat (women)",
    "value.organization.fargonaChildren": "Fergana Muruvvat (children)",
    "value.organization.toshkentSh1Children": "Tashkent city Muruvvat 1 (children)",
    "value.organization.toshkentSh2Children": "Tashkent city Muruvvat 2 (children)",
    "value.organization.toshkentMen": "Tashkent Muruvvat (men)",
    "value.organization.xivaMen": "Xiva Muruvvat (men)",
    "value.organization.qorakolMen": "Qorako'l Muruvvat (men)",
  },
  ru: {
    "value.region.qoraqalpogiston": "Республика Каракалпакстан",
    "value.region.andijon": "Андижан",
    "value.region.buxoro": "Бухара",
    "value.region.jizzax": "Джизак",
    "value.region.qashqadaryo": "Кашкадарья",
    "value.region.navoiy": "Навои",
    "value.region.namangan": "Наманган",
    "value.region.samarqand": "Самарканд",
    "value.region.sirdaryo": "Сырдарья",
    "value.region.surxondaryo": "Сурхандарья",
    "value.region.toshkentRegion": "Ташкентская область",
    "value.region.fargona": "Фергана",
    "value.region.xorazm": "Хорезм",
    "value.region.toshkentCity": "город Ташкент",
    "value.district.amudaryo": "Амударьинский район",
    "value.district.andijonCity": "город Андижан",
    "value.district.asaka": "Асакинский район",
    "value.district.baliqchi": "Балыкчинский район",
    "value.district.bukharaCity": "город Бухара",
    "value.district.chimboy": "Чимбайский район",
    "value.district.chortoq": "Чартакский район",
    "value.district.denov": "Денауский район",
    "value.district.gallaorol": "Галляаральский район",
    "value.district.gijduvon": "Гиждуванский район",
    "value.district.gulistonCity": "город Гулистан",
    "value.district.jizzakhCity": "город Джизак",
    "value.district.karmana": "Карманинский район",
    "value.district.kitob": "Китабский район",
    "value.district.kogonCity": "город Каган",
    "value.district.kattaqorgon": "Каттакурганский район",
    "value.district.koson": "Касанский район",
    "value.district.margilanCity": "город Маргилан",
    "value.district.mirobod": "Мирабадский район",
    "value.district.moynaq": "Муйнакский район",
    "value.district.nukusCity": "город Нукус",
    "value.district.nurota": "Нуратинский район",
    "value.district.ohangaron": "Ахангаранский район",
    "value.district.olmazor": "Алмазарский район",
    "value.district.pop": "Папский район",
    "value.district.qarshiCity": "город Карши",
    "value.district.qoqonCity": "город Коканд",
    "value.district.qorakol": "Каракульский район",
    "value.district.qumqorgon": "Кумкурганский район",
    "value.district.rishton": "Риштанский район",
    "value.district.sardoba": "Сардобинский район",
    "value.district.shahrisabzCity": "город Шахрисабз",
    "value.district.shahrixon": "Шахриханский район",
    "value.district.termizCity": "город Термез",
    "value.district.urgut": "Ургутский район",
    "value.district.xivaCity": "город Хива",
    "value.district.yangiyerCity": "город Янгиер",
    "value.district.yunusobod": "Юнусабадский район",
    "value.district.zarbdor": "Зарбдорский район",
    "value.district.zomin": "Зааминский район",
    "value.organization.nukusWomen": "Нукусский Мурувват (женщины)",
    "value.organization.chimboyMen": "Чимбайский Мурувват (мужчины)",
    "value.organization.chumaWomen": "Чуминский Мурувват (женщины)",
    "value.organization.botaqoraMen": "Бутакара Мурувват (мужчины)",
    "value.organization.buxoroChildren": "Бухарский Мурувват (дети)",
    "value.organization.buxoroWomen": "Бухарский Мурувват (женщины)",
    "value.organization.jizzaxWomen": "Джизакский Мурувват (женщины)",
    "value.organization.zominWomen": "Заминский Мурувват (женщины)",
    "value.organization.shahrisabzWomen": "Шахрисабзский Мурувват (женщины)",
    "value.organization.qarshiChildren": "Каршинский Мурувват (дети)",
    "value.organization.nurotaMen": "Нурата Мурувват (мужчины)",
    "value.organization.popMen": "Попский Мурувват (мужчины)",
    "value.organization.urgutWomen": "Ургутский Мурувват (женщины)",
    "value.organization.urgutMen": "Ургутский Мурувват (мужчины)",
    "value.organization.farhodWomen": "Фарход Мурувват (женщины)",
    "value.organization.denovMen": "Денауский Мурувват (мужчины)",
    "value.organization.qumqorgonChildren": "Кумкурганский Мурувват (дети)",
    "value.organization.sirdaryoWomen": "Сырдарьинский Мурувват (женщины)",
    "value.organization.yangiyerWomen": "Янгиерский Мурувват (женщины)",
    "value.organization.ohangaronMen": "Ахангаранский Мурувват (мужчины)",
    "value.organization.qoqonMen": "Кокандский Мурувват (мужчины)",
    "value.organization.qudashWomen": "Кудаш Мурувват (женщины)",
    "value.organization.fargonaChildren": "Ферганский Мурувват (дети)",
    "value.organization.toshkentSh1Children": "Ташкентский городской Мурувват 1 (дети)",
    "value.organization.toshkentSh2Children": "Ташкентский городской Мурувват 2 (дети)",
    "value.organization.toshkentMen": "Ташкентский Мурувват (мужчины)",
    "value.organization.xivaMen": "Хивинский Мурувват (мужчины)",
    "value.organization.qorakolMen": "Каракульский Мурувват (мужчины)",
  },
  "uz-cyrl": {
    "value.region.qoraqalpogiston": "Қорақалпоғистон Р.",
    "value.region.andijon": "Андижон",
    "value.region.buxoro": "Бухоро",
    "value.region.jizzax": "Жиззах",
    "value.region.qashqadaryo": "Қашқадарё",
    "value.region.navoiy": "Навоий",
    "value.region.namangan": "Наманган",
    "value.region.samarqand": "Самарқанд",
    "value.region.sirdaryo": "Сирдарё",
    "value.region.surxondaryo": "Сурхондарё",
    "value.region.toshkentRegion": "Тошкент вилояти",
    "value.region.fargona": "Фарғона",
    "value.region.xorazm": "Хоразм",
    "value.region.toshkentCity": "Тошкент шаҳри",
    "value.district.amudaryo": "Амударё тумани",
    "value.district.andijonCity": "Андижон шаҳри",
    "value.district.asaka": "Асака тумани",
    "value.district.baliqchi": "Балиқчи тумани",
    "value.district.bukharaCity": "Бухоро шаҳри",
    "value.district.chimboy": "Чимбой тумани",
    "value.district.chortoq": "Чортоқ тумани",
    "value.district.denov": "Денов тумани",
    "value.district.gallaorol": "Ғаллаорол тумани",
    "value.district.gijduvon": "Ғиждувон тумани",
    "value.district.gulistonCity": "Гулистон шаҳри",
    "value.district.jizzakhCity": "Жиззах шаҳри",
    "value.district.karmana": "Кармана тумани",
    "value.district.kitob": "Китоб тумани",
    "value.district.kogonCity": "Когон шаҳри",
    "value.district.kattaqorgon": "Каттақўрғон тумани",
    "value.district.koson": "Косон тумани",
    "value.district.margilanCity": "Марғилон шаҳри",
    "value.district.mirobod": "Миробод тумани",
    "value.district.moynaq": "Мўйноқ тумани",
    "value.district.nukusCity": "Нукус шаҳри",
    "value.district.nurota": "Нурота тумани",
    "value.district.ohangaron": "Оҳангарон тумани",
    "value.district.olmazor": "Олмазор тумани",
    "value.district.pop": "Поп тумани",
    "value.district.qarshiCity": "Қарши шаҳри",
    "value.district.qoqonCity": "Қўқон шаҳри",
    "value.district.qorakol": "Қоракўл тумани",
    "value.district.qumqorgon": "Қумқўрғон тумани",
    "value.district.rishton": "Риштон тумани",
    "value.district.sardoba": "Сардоба тумани",
    "value.district.shahrisabzCity": "Шаҳрисабз шаҳри",
    "value.district.shahrixon": "Шаҳрихон тумани",
    "value.district.termizCity": "Термиз шаҳри",
    "value.district.urgut": "Ургут тумани",
    "value.district.xivaCity": "Хива шаҳри",
    "value.district.yangiyerCity": "Янгиер шаҳри",
    "value.district.yunusobod": "Юнусобод тумани",
    "value.district.zarbdor": "Зарбдор тумани",
    "value.district.zomin": "Зомин тумани",
    "value.organization.nukusWomen": "Нукус Мурувват (аёллар)",
    "value.organization.chimboyMen": "Чимбой Мурувват (эркаклар)",
    "value.organization.chumaWomen": "Чума Мурувват (аёллар)",
    "value.organization.botaqoraMen": "Бўтақора Мурувват (эркаклар)",
    "value.organization.buxoroChildren": "Бухоро Мурувват (болалар)",
    "value.organization.buxoroWomen": "Бухоро Мурувват (аёллар)",
    "value.organization.jizzaxWomen": "Жиззах Мурувват (аёллар)",
    "value.organization.zominWomen": "Зомин Мурувват (аёллар)",
    "value.organization.shahrisabzWomen": "Шаҳрисабз Мурувват (аёллар)",
    "value.organization.qarshiChildren": "Қарши Мурувват (болалар)",
    "value.organization.nurotaMen": "Нурота Мурувват (эркаклар)",
    "value.organization.popMen": "Поп Мурувват (эркаклар)",
    "value.organization.urgutWomen": "Ургут Мурувват (аёллар)",
    "value.organization.urgutMen": "Ургут Мурувват (эркаклар)",
    "value.organization.farhodWomen": "Фарҳод Мурувват (аёллар)",
    "value.organization.denovMen": "Денов Мурувват (эркаклар)",
    "value.organization.qumqorgonChildren": "Қумқўрғон Мурувват (болалар)",
    "value.organization.sirdaryoWomen": "Сирдарё Мурувват (аёллар)",
    "value.organization.yangiyerWomen": "Янгиер Мурувват (аёллар)",
    "value.organization.ohangaronMen": "Оҳангарон Мурувват (эркаклар)",
    "value.organization.qoqonMen": "Қўқон Мурувват (эркаклар)",
    "value.organization.qudashWomen": "Қудаш Мурувват (аёллар)",
    "value.organization.fargonaChildren": "Фарғона Мурувват (болалар)",
    "value.organization.toshkentSh1Children": "Тошкент ш. Мурувват 1 (болалар)",
    "value.organization.toshkentSh2Children": "Тошкент ш. Мурувват 2 (болалар)",
    "value.organization.toshkentMen": "Тошкент Мурувват (эркаклар)",
    "value.organization.xivaMen": "Хива Мурувват (эркаклар)",
    "value.organization.qorakolMen": "Қоракўл Мурувват (эркаклар)",
  },
  kaa: {
    "value.region.qoraqalpogiston": "Qaraqalpaqstan R.",
    "value.region.andijon": "Andijan",
    "value.region.buxoro": "Buxara",
    "value.region.jizzax": "Jizzax",
    "value.region.qashqadaryo": "Qashqadarya",
    "value.region.navoiy": "Nawayı",
    "value.region.namangan": "Namangan",
    "value.region.samarqand": "Samarqand",
    "value.region.sirdaryo": "Sırdarya",
    "value.region.surxondaryo": "Surxandarya",
    "value.region.toshkentRegion": "Tashkent wálayatı",
    "value.region.fargona": "Farg'ona",
    "value.region.xorazm": "Xorezm",
    "value.region.toshkentCity": "Tashkent qalası",
    "value.district.amudaryo": "Amudárya rayonı",
    "value.district.andijonCity": "Andijan qalası",
    "value.district.asaka": "Asaka rayonı",
    "value.district.baliqchi": "Baliqshi rayonı",
    "value.district.bukharaCity": "Buxara qalası",
    "value.district.chimboy": "Shımbay rayonı",
    "value.district.chortoq": "Chartaq rayonı",
    "value.district.denov": "Denov rayonı",
    "value.district.gallaorol": "G'allaoral rayonı",
    "value.district.gijduvon": "G'ijduwan rayonı",
    "value.district.gulistonCity": "Gulistan qalası",
    "value.district.jizzakhCity": "Jizzax qalası",
    "value.district.karmana": "Karmana rayonı",
    "value.district.kitob": "Kitob rayonı",
    "value.district.kogonCity": "Kogon qalası",
    "value.district.kattaqorgon": "Kattaqo'rg'on rayonı",
    "value.district.koson": "Koson rayonı",
    "value.district.margilanCity": "Marg'ilan qalası",
    "value.district.mirobod": "Mirobod rayonı",
    "value.district.moynaq": "Moynaq rayonı",
    "value.district.nukusCity": "Nókis qalası",
    "value.district.nurota": "Nurota rayonı",
    "value.district.ohangaron": "Ohangaron rayonı",
    "value.district.olmazor": "Olmazor rayonı",
    "value.district.pop": "Pop rayonı",
    "value.district.qarshiCity": "Qarshi qalası",
    "value.district.qoqonCity": "Qo'qon qalası",
    "value.district.qorakol": "Qorako'l rayonı",
    "value.district.qumqorgon": "Qumqo'rg'on rayonı",
    "value.district.rishton": "Rishton rayonı",
    "value.district.sardoba": "Sardoba rayonı",
    "value.district.shahrisabzCity": "Shahrisabz qalası",
    "value.district.shahrixon": "Shahrixan rayonı",
    "value.district.termizCity": "Termiz qalası",
    "value.district.urgut": "Urgut rayonı",
    "value.district.xivaCity": "Xiva qalası",
    "value.district.yangiyerCity": "Yangiyer qalası",
    "value.district.yunusobod": "Yunusobod rayonı",
    "value.district.zarbdor": "Zarbdor rayonı",
    "value.district.zomin": "Zomin rayonı",
    "value.organization.nukusWomen": "Nókis Muruvvat (hayallar)",
    "value.organization.chimboyMen": "Shımbay Muruvvat (erler)",
    "value.organization.chumaWomen": "Chuma Muruvvat (hayallar)",
    "value.organization.botaqoraMen": "Bo'taqora Muruvvat (erler)",
    "value.organization.buxoroChildren": "Buxara Muruvvat (balalar)",
    "value.organization.buxoroWomen": "Buxara Muruvvat (hayallar)",
    "value.organization.jizzaxWomen": "Jizzax Muruvvat (hayallar)",
    "value.organization.zominWomen": "Zomin Muruvvat (hayallar)",
    "value.organization.shahrisabzWomen": "Shahrisabz Muruvvat (hayallar)",
    "value.organization.qarshiChildren": "Qarshi Muruvvat (balalar)",
    "value.organization.nurotaMen": "Nurota Muruvvat (erler)",
    "value.organization.popMen": "Pop Muruvvat (erler)",
    "value.organization.urgutWomen": "Urgut Muruvvat (hayallar)",
    "value.organization.urgutMen": "Urgut Muruvvat (erler)",
    "value.organization.farhodWomen": "Farhod Muruvvat (hayallar)",
    "value.organization.denovMen": "Denov Muruvvat (erler)",
    "value.organization.qumqorgonChildren": "Qumqo'rg'on Muruvvat (balalar)",
    "value.organization.sirdaryoWomen": "Sırdarya Muruvvat (hayallar)",
    "value.organization.yangiyerWomen": "Yangiyer Muruvvat (hayallar)",
    "value.organization.ohangaronMen": "Ohangaron Muruvvat (erler)",
    "value.organization.qoqonMen": "Qo'qon Muruvvat (erler)",
    "value.organization.qudashWomen": "Qudash Muruvvat (hayallar)",
    "value.organization.fargonaChildren": "Farg'ona Muruvvat (balalar)",
    "value.organization.toshkentSh1Children": "Tashkent q. Muruvvat 1 (balalar)",
    "value.organization.toshkentSh2Children": "Tashkent q. Muruvvat 2 (balalar)",
    "value.organization.toshkentMen": "Tashkent Muruvvat (erler)",
    "value.organization.xivaMen": "Xiva Muruvvat (erler)",
    "value.organization.qorakolMen": "Qorako'l Muruvvat (erler)",
  },
  "kaa-cyrl": {
    "value.region.qoraqalpogiston": "Қарақалпақстан Р.",
    "value.region.andijon": "Андижан",
    "value.region.buxoro": "Бухара",
    "value.region.jizzax": "Жиззах",
    "value.region.qashqadaryo": "Қашқадаря",
    "value.region.navoiy": "Наўайы",
    "value.region.namangan": "Наманган",
    "value.region.samarqand": "Самарқанд",
    "value.region.sirdaryo": "Сырдаря",
    "value.region.surxondaryo": "Сурхандаря",
    "value.region.toshkentRegion": "Ташкент ўәлаяты",
    "value.region.fargona": "Фарғона",
    "value.region.xorazm": "Хорезм",
    "value.region.toshkentCity": "Ташкент қаласы",
    "value.district.amudaryo": "Амударья районы",
    "value.district.andijonCity": "Андижан қаласы",
    "value.district.asaka": "Асака районы",
    "value.district.baliqchi": "Балықшы районы",
    "value.district.bukharaCity": "Бухара қаласы",
    "value.district.chimboy": "Шымбай районы",
    "value.district.chortoq": "Чартоқ районы",
    "value.district.denov": "Денов районы",
    "value.district.gallaorol": "Ғаллаорал районы",
    "value.district.gijduvon": "Ғиждуван районы",
    "value.district.gulistonCity": "Гүлистан қаласы",
    "value.district.jizzakhCity": "Жиззах қаласы",
    "value.district.karmana": "Кармана районы",
    "value.district.kitob": "Китоб районы",
    "value.district.kogonCity": "Когон қаласы",
    "value.district.kattaqorgon": "Каттақорғон районы",
    "value.district.koson": "Косон районы",
    "value.district.margilanCity": "Марғилан қаласы",
    "value.district.mirobod": "Миробод районы",
    "value.district.moynaq": "Мойнақ районы",
    "value.district.nukusCity": "Нөкис қаласы",
    "value.district.nurota": "Нурота районы",
    "value.district.ohangaron": "Оҳангарон районы",
    "value.district.olmazor": "Олмазор районы",
    "value.district.pop": "Поп районы",
    "value.district.qarshiCity": "Қарши қаласы",
    "value.district.qoqonCity": "Қўқон қаласы",
    "value.district.qorakol": "Қоракөл районы",
    "value.district.qumqorgon": "Қумқорғон районы",
    "value.district.rishton": "Риштон районы",
    "value.district.sardoba": "Сардоба районы",
    "value.district.shahrisabzCity": "Шаҳрисабз қаласы",
    "value.district.shahrixon": "Шаҳрихан районы",
    "value.district.termizCity": "Термиз қаласы",
    "value.district.urgut": "Ургут районы",
    "value.district.xivaCity": "Хива қаласы",
    "value.district.yangiyerCity": "Янгийер қаласы",
    "value.district.yunusobod": "Юнусобод районы",
    "value.district.zarbdor": "Зарбдор районы",
    "value.district.zomin": "Зомин районы",
    "value.organization.nukusWomen": "Нөкис Мурувват (ҳаяллар)",
    "value.organization.chimboyMen": "Шымбай Мурувват (ерлер)",
    "value.organization.chumaWomen": "Чума Мурувват (ҳаяллар)",
    "value.organization.botaqoraMen": "Бўтақора Мурувват (ерлер)",
    "value.organization.buxoroChildren": "Бухара Мурувват (балалар)",
    "value.organization.buxoroWomen": "Бухара Мурувват (ҳаяллар)",
    "value.organization.jizzaxWomen": "Жиззах Мурувват (ҳаяллар)",
    "value.organization.zominWomen": "Зомин Мурувват (ҳаяллар)",
    "value.organization.shahrisabzWomen": "Шаҳрисабз Мурувват (ҳаяллар)",
    "value.organization.qarshiChildren": "Қарши Мурувват (балалар)",
    "value.organization.nurotaMen": "Нурота Мурувват (ерлер)",
    "value.organization.popMen": "Поп Мурувват (ерлер)",
    "value.organization.urgutWomen": "Ургут Мурувват (ҳаяллар)",
    "value.organization.urgutMen": "Ургут Мурувват (ерлер)",
    "value.organization.farhodWomen": "Фарҳод Мурувват (ҳаяллар)",
    "value.organization.denovMen": "Денов Мурувват (ерлер)",
    "value.organization.qumqorgonChildren": "Қумқўрғон Мурувват (балалар)",
    "value.organization.sirdaryoWomen": "Сырдаря Мурувват (ҳаяллар)",
    "value.organization.yangiyerWomen": "Янгийер Мурувват (ҳаяллар)",
    "value.organization.ohangaronMen": "Оҳангарон Мурувват (ерлер)",
    "value.organization.qoqonMen": "Қўқон Мурувват (ерлер)",
    "value.organization.qudashWomen": "Қудаш Мурувват (ҳаяллар)",
    "value.organization.fargonaChildren": "Фарғона Мурувват (балалар)",
    "value.organization.toshkentSh1Children": "Ташкент қ. Мурувват 1 (балалар)",
    "value.organization.toshkentSh2Children": "Ташкент қ. Мурувват 2 (балалар)",
    "value.organization.toshkentMen": "Ташкент Мурувват (ерлер)",
    "value.organization.xivaMen": "Хива Мурувват (ерлер)",
    "value.organization.qorakolMen": "Қоракөл Мурувват (ерлер)",
  },
};
Object.entries(runtimeValueTranslationOverrides).forEach(([lang, values]) => {
  valueTranslations[lang] = { ...(valueTranslations[lang] ?? {}), ...values };
});

const runtimeTranslationOverrides = {
  "uz-cyrl": {
    "login.signingIn": "Кирилмоқда...",
    "login.welcomeTitle": "Хуш келибсиз",
    "login.welcomeDescription": "{module}га муваффақиятли кирилди.",
    "login.resetPasswordUnavailableTitle": "Паролни тиклаш",
    "login.resetPasswordUnavailableDescription": "Демо режимда паролни тиклаш уланмаган. Администратор ёки OneID орқали киришдан фойдаланинг.",
    "support.guideFallback": "Қўлланма",
    "support.guideOpenedTitle": "{title} очилди",
    "support.guideOpenedDescription": "{title} бўйича йўриқнома демо режимда янги ойнада очилишга тайёр ҳолатда кўрсатилди.",
    "support.descriptionMissingTitle": "Тавсиф киритилмади",
    "support.descriptionMissingDescription": "Мурожаат юбориш учун муаммо тавсифини ёзинг.",
    "support.send": "Юбориш",
    "support.sentTitle": "Мурожаат юборилди",
    "support.sentDescription": "{ticket} рақамли support ticket яратилди. {channel} орқали қайта боғланилади.",
    "applications.exportDoneTitle": "Экспорт якунланди",
    "applications.exportDoneDescription": "Рўйхат файл кўринишида тайёрланди.",
    "report.downloadFailedTitle": "Хатолик",
    "report.downloadFailedDescription": "Ҳисоботни юклаб бўлмади.",
    "detail.pdfDownloadedTitle": "PDF юклаб олинди",
    "detail.pdfDownloadedDescription": "{title} файли тайёрланди.",
    "common.continue": "Давом этиш",
    "confirm.description": "{id} аризаси учун \"{action}\" амалини бажаришни тасдиқлайсизми?",
    "action.completedTitle": "{action} муваффақиятли якунланди",
    "action.completedDescription": "{id} аризаси бўйича амал муваффақиятли бажарилди.",
    "action.failedTitle": "{action} амалга ошмади",
    "action.failedDescription": "{id} аризасини {actionLower}да ERR-409 хатолиги кузатилди. Батафсил маълумот учун қўлланма ёки боғланиш бўлимига мурожаат қилинг.",
    "calendar.today": "Бугун",
    "calendar.prevMonth": "Олдинги ой",
    "calendar.nextMonth": "Кейинги ой",
    "calendar.prevYear": "Олдинги йил",
    "calendar.nextYear": "Кейинги йил",
  },
  kaa: {
    "login.signingIn": "Kirip atır...",
    "login.welcomeTitle": "Xosh kelipsiz",
    "login.welcomeDescription": "{module}ga tabıslı kirildi.",
    "login.resetPasswordUnavailableTitle": "Paroldı qayta tiklew",
    "login.resetPasswordUnavailableDescription": "Demo rejimde paroldı qayta tiklew joq. Administrator yamasa OneID arqalı kiriñ.",
    "support.guideFallback": "Qollanba",
    "support.guideOpenedTitle": "{title} ashıldı",
    "support.guideOpenedDescription": "{title} boyınsha qollanba demo rejimde jaña aynada ashılıwğa tayar túrde kórsetildi.",
    "support.descriptionMissingTitle": "Túsindirme kiritilmedi",
    "support.descriptionMissingDescription": "Múrájat jiberiw ushın problema túsindirmesin jaziñ.",
    "support.send": "Jiberiw",
    "support.sentTitle": "Múrájat jiberildi",
    "support.sentDescription": "{ticket} nomerli support ticket jaratıldı. {channel} arqalı qayta baylanıs jasaladı.",
    "applications.exportDoneTitle": "Eksport juwmaqlanadı",
    "applications.exportDoneDescription": "Dizim fayl kórinisinde tayarlandı.",
    "report.downloadFailedTitle": "Qátelik",
    "report.downloadFailedDescription": "Esabattı júklep bolmadı.",
    "detail.pdfDownloadedTitle": "PDF júklep alındı",
    "detail.pdfDownloadedDescription": "{title} faylı tayarlandı.",
    "common.continue": "Dawam etiw",
    "confirm.description": "{id} arızası ushın \"{action}\" ámelin tasdıqlaysız ba?",
    "action.completedTitle": "{action} tabıslı juwmaqlanadı",
    "action.completedDescription": "{id} arızası boyınsha ámel tabıslı bajarildi.",
    "action.failedTitle": "{action} ámelge aspadı",
    "action.failedDescription": "{id} arızasın {actionLower}da ERR-409 qáteligi júz berdi. Tolıq maǵlıwmat ushın qollanba yamasa baylanıs bólimine múrájat etiñ.",
    "calendar.today": "Búgin",
    "calendar.prevMonth": "Aldıńǵı ay",
    "calendar.nextMonth": "Kelesi ay",
    "calendar.prevYear": "Aldıńǵı jıl",
    "calendar.nextYear": "Kelesi jıl",
  },
  "kaa-cyrl": {
    "login.signingIn": "Кирип атыр...",
    "login.welcomeTitle": "Хош келипсиз",
    "login.welcomeDescription": "{module}ға табыслы кирилди.",
    "login.resetPasswordUnavailableTitle": "Паролды қайта тиклеў",
    "login.resetPasswordUnavailableDescription": "Демо режимде паролды қайта тиклеў жоқ. Администратор ямаса OneID арқалы кириң.",
    "support.guideFallback": "Қолланба",
    "support.guideOpenedTitle": "{title} ашылды",
    "support.guideOpenedDescription": "{title} бойынша қолланба демо режимде жаңа айнада ашылыўға таяр түрде көрсетилди.",
    "support.descriptionMissingTitle": "Түсиндирме киритилмеди",
    "support.descriptionMissingDescription": "Мүражат жибериў ушын проблема түсиндирмесин жазың.",
    "support.send": "Жибериў",
    "support.sentTitle": "Мүражат жиберилди",
    "support.sentDescription": "{ticket} номерли support ticket жаратылды. {channel} арқалы қайта байланыс жасалады.",
    "applications.exportDoneTitle": "Экспорт жуўмақланады",
    "applications.exportDoneDescription": "Дизим файл көрinisинде таярланды.",
    "report.downloadFailedTitle": "Қәтелик",
    "report.downloadFailedDescription": "Есабатты жүклеп болмады.",
    "detail.pdfDownloadedTitle": "PDF жүклеп алынды",
    "detail.pdfDownloadedDescription": "{title} файлы таярланды.",
    "common.continue": "Дәўам етиў",
    "confirm.description": "{id} арызасы ушын \"{action}\" әмелин тасдықлайсыз ба?",
    "action.completedTitle": "{action} табыслы жуўмақланады",
    "action.completedDescription": "{id} арызасы бойынша әмел табыслы бажарилди.",
    "action.failedTitle": "{action} әмелге аспады",
    "action.failedDescription": "{id} арызасын {actionLower}да ERR-409 қәтелиги жүз берди. Толық мағлыўмат ушын қолланба ямаса байланыс бөлимине мүражат етиң.",
    "calendar.today": "Бүгүн",
    "calendar.prevMonth": "Алдыңғы ай",
    "calendar.nextMonth": "Келеси ай",
    "calendar.prevYear": "Алдыңғы жыл",
    "calendar.nextYear": "Келеси жыл",
  },
  en: {
    "login.signingIn": "Signing in...",
    "login.welcomeTitle": "Welcome",
    "login.welcomeDescription": "Successfully signed in to {module}.",
    "login.resetPasswordUnavailableTitle": "Reset password",
    "login.resetPasswordUnavailableDescription": "Password reset is not available in demo mode. Use administrator login or OneID.",
    "support.guideFallback": "Guide",
    "support.guideOpenedTitle": "{title} opened",
    "support.guideOpenedDescription": "The guide for {title} is ready to open in a new window in demo mode.",
  "support.descriptionMissingTitle": "Description missing",
  "support.descriptionMissingDescription": "Enter the issue description to submit a request.",
  "support.send": "Send",
  "support.sentTitle": "Request submitted",
  "support.sentDescription": "Support ticket {ticket} was created. A reply will be sent via {channel}.",
    "applications.exportDoneTitle": "Export completed",
    "applications.exportDoneDescription": "The list was prepared as a file.",
    "report.downloadFailedTitle": "Error",
    "report.downloadFailedDescription": "Failed to download the report.",
  "detail.pdfDownloadedTitle": "PDF downloaded",
  "detail.pdfDownloadedDescription": "{title} file is ready.",
  "common.continue": "Continue",
  "calendar.today": "Today",
  "calendar.prevMonth": "Previous month",
  "calendar.nextMonth": "Next month",
  "calendar.prevYear": "Previous year",
  "calendar.nextYear": "Next year",
    "confirm.description": "Do you confirm the {action} action for application {id}?",
    "action.completedTitle": "{action} completed successfully",
    "action.completedDescription": "The action for application {id} was completed successfully.",
    "action.failedTitle": "{action} failed",
    "action.failedDescription": "ERR-409 occurred while trying to {actionLower} application {id}. Check the guide or contact support.",
  },
  ru: {
    "login.signingIn": "Вход...",
    "login.welcomeTitle": "Добро пожаловать",
    "login.welcomeDescription": "Успешный вход в {module}.",
    "login.resetPasswordUnavailableTitle": "Восстановление пароля",
    "login.resetPasswordUnavailableDescription": "В демо-режиме восстановление пароля недоступно. Используйте вход администратора или OneID.",
    "support.guideFallback": "Инструкция",
    "support.guideOpenedTitle": "Открыто: {title}",
    "support.guideOpenedDescription": "Инструкция по разделу {title} готова к открытию в новом окне в демо-режиме.",
  "support.descriptionMissingTitle": "Описание не введено",
  "support.descriptionMissingDescription": "Введите описание проблемы для отправки обращения.",
  "support.send": "Отправить",
  "support.sentTitle": "Обращение отправлено",
  "support.sentDescription": "Создан тикет поддержки {ticket}. Обратная связь будет направлена через {channel}.",
    "applications.exportDoneTitle": "Экспорт завершён",
    "applications.exportDoneDescription": "Список подготовлен в виде файла.",
    "report.downloadFailedTitle": "Ошибка",
    "report.downloadFailedDescription": "Не удалось скачать отчёт.",
  "detail.pdfDownloadedTitle": "PDF скачан",
  "detail.pdfDownloadedDescription": "Файл {title} готов.",
  "common.continue": "Продолжить",
  "calendar.today": "Сегодня",
  "calendar.prevMonth": "Предыдущий месяц",
  "calendar.nextMonth": "Следующий месяц",
  "calendar.prevYear": "Предыдущий год",
  "calendar.nextYear": "Следующий год",
    "confirm.description": "Подтвердите действие «{action}» для заявления {id}.",
    "action.completedTitle": "Действие «{action}» успешно выполнено",
    "action.completedDescription": "Операция по заявлению {id} выполнена успешно.",
    "action.failedTitle": "Не удалось выполнить действие «{action}»",
    "action.failedDescription": "При попытке {actionLower} заявление {id} возникла ошибка ERR-409. Проверьте инструкцию или обратитесь в поддержку.",
  },
};

Object.entries(runtimeTranslationOverrides).forEach(([lang, values]) => {
  translations[lang] = { ...(translations[lang] ?? {}), ...values };
});

languageMeta["uz-cyrl"] = { ...languageMeta["uz-cyrl"], short: "ЎЗ", label: "Ўзбек" };
languageMeta["kaa-cyrl"] = { ...languageMeta["kaa-cyrl"], short: "ҚҚ", label: "Қорақалпоқ" };
languageMeta.ru = { ...languageMeta.ru, short: "RU", label: "Русский" };

const translationKeyOverrides = {
  uz: {
    "applications.address": "Manzil",
    "detail.result": "Natija",
    "report.summary": "Respublika jami",
    "value.group.nbb": "NBB",
  },
  "uz-cyrl": {
    "applications.address": "Манзил",
    "detail.result": "Натижа",
    "report.summary": "Республика жами",
    "value.group.nbb": "НББ",
    "result.positive": "Ижобий",
    "result.negative": "Салбий",
  },
  kaa: {
    "applications.address": "Manzil",
    "detail.result": "Nátiyje",
    "report.summary": "Respublika jámi",
    "value.group.nbb": "NBB",
  },
  "kaa-cyrl": {
    "applications.address": "Манзил",
    "detail.result": "Нәтийже",
    "report.summary": "Республика жәми",
    "value.group.nbb": "НББ",
    "result.positive": "Ижобий",
    "result.negative": "Салбий",
  },
  ru: {
    "applications.address": "Адрес",
    "detail.result": "Результат",
    "report.summary": "Итого по республике",
    "value.group.nbb": "РИ",
    "result.positive": "Положительный",
    "result.negative": "Отрицательный",
  },
  en: {
    "value.group.nbb": "CWD",
  },
  i18n: {
    "value.group.nbb": "value.group.nbb",
  },
};

Object.entries(translationKeyOverrides).forEach(([lang, values]) => {
  translations[lang] = { ...(translations[lang] ?? {}), ...values };
});

function buildReverseMap(source, predicate = () => true) {
  return Object.entries(source).reduce((accumulator, [literal, key]) => {
    if (predicate(key) && !accumulator[key]) {
      accumulator[key] = literal;
    }
    return accumulator;
  }, {});
}

const uzTranslationDefaults = {
  ...buildReverseMap(literalKeyMap, (key) => !String(key).startsWith("value.")),
  ...Object.entries(routeTitleKeys).reduce((accumulator, [title, key]) => {
    if (!accumulator[key]) {
      accumulator[key] = title.includes(" - ") ? title.replaceAll(" - ", " / ") : title;
    }
    return accumulator;
  }, {}),
  "page.supportCenter": "Support / Support markazi",
  "page.guides": "Support / Qo'llanmalar",
  "header.monitoring": "Monitoring paneli",
  "header.reportsCenter": "Hisobotlar markazi",
  "header.administrator": "Administrator",
  "header.profile": "Profilni ko'rish",
  "header.settings": "Sozlamalar",
  "header.logout": "Chiqish",
  "applications.searchPlaceholder": "ID, F.I.Sh. yoki PINFL",
  "applications.actions": "Amallar",
  "applications.application": "Ariza",
  "applications.applicant": "Xizmat oluvchi",
  "applications.export": "Eksport",
  "applications.new": "Yangi",
  "common.records": "yozuv",
  "common.loading": "Yuklanmoqda...",
  "common.download": "Yuklab olish",
  "report.download": "Hisobotni yuklab olish",
    "report.totalPersons": "Jami NBSHlar",
  "report.byDiagnosis": "Tashxislari bo'yicha",
  "report.byDisability": "Nogironlik guruhi",
  "report.scope.back": "Orqaga",
  "selection.count": "Soni",
  "selection.sum": "Yig'indi",
  "selection.avg": "O'rtacha",
  "selection.min": "Min",
  "selection.max": "Max",
  "detail.title": "Ariza tafsilotlari",
  "detail.loading": "Ariza ma'lumotlari yuklanmoqda...",
  "detail.application": "Ariza ma'lumotlari",
  "detail.receiver": "Arizani qabul qiluvchi",
  "detail.representative": "Qonuniy vakil",
  "detail.representativeLevel": "Vakillik darajasi",
  "detail.phone": "Telefon raqami",
  "detail.applicant": "Xizmat oluvchi",
  "detail.birthDate": "Tug'ilgan sanasi",
  "detail.address": "Manzili",
  "detail.organizationName": "Tashkilot nomi",
  "detail.medicalDocuments": "Tibbiy hujjatlar",
  "detail.result": "Natija",
  "detail.goToAct": "Dalolatnomaga o'tish",
  "detail.goToDecision": "Qarorga o'tish",
  "detail.disabilityHistory": "Nogironlik tarixi",
  "detail.assignedDate": "Ta'yinlangan sana",
  "detail.validUntil": "Amal qilish muddati",
  "detail.conclusionHistory": "Xulosalar tarixi",
  "detail.educationInstitutionType": "Ta'lim muassasasi turi",
  "detail.applicationsHistory": "Arizalar tarixi",
  "detail.documentHistory": "Hujjat tarixi",
  "detail.actor": "Amaliyotni bajaruvchi",
  "detail.documentsBundle": "Tibbiy hujjatlar to'plami",
  "detail.downloadAll": "Barchasini yuklab olish",
  "detail.pdfDocument": "PDF hujjat",
  "detail.accept": "Qabul qilish",
  "detail.reject": "Rad etish",
  "detail.notFoundTitle": "Ariza topilmadi",
  "detail.notFoundDescription": "bo'yicha ma'lumot topilmadi.",
  "empty.notFound": "Mos ma'lumot topilmadi",
  "empty.noData": "Hozircha arizalar mavjud emas",
  "empty.notReady": "bo'limi uchun kontent hali tayyorlanmagan.",
  "result.positive": "Ijobiy",
  "result.negative": "Salbiy",
  "login.systemName": "NASP boshqaruv tizimi",
  "login.heroTitle": "Ijtimoiy himoya axborot tizimlarini yagona oynada boshqaring.",
  "login.heroText": "Arizalar, hisobotlar va ishchi jarayonlarni markazlashgan platformada boshqarish uchun tizimga kiring.",
  "login.statProcessed": "Yagona boshqaruv muhiti",
  "login.statControl": "Markazlashgan boshqaruv",
  "login.statIntegration": "Hududiy integratsiya",
  "login.systemAccess": "Tizimga kirish",
  "login.signIn": "Tizimga kiring",
  "login.signInText": "Login va parol orqali ishchi kabinetga o'ting.",
  "login.username": "Login",
  "login.usernamePlaceholder": "Loginni kiriting",
  "login.password": "Parol",
  "login.passwordPlaceholder": "Parolni kiriting",
  "login.caps": "Caps Lock yoqilgan bo'lishi mumkin.",
  "login.remember": "Meni eslab qolish",
  "login.forgot": "Parolni unutdingizmi?",
  "login.error": "Login yoki parol noto'g'ri. Demo uchun `admin` / `muruvvat123` dan foydalaning.",
  "login.submit": "Kirish",
  "login.otherMethod": "yoki boshqa usul bilan",
  "login.oneidTitle": "OneID orqali kirish",
  "login.oneidText": "Yagona identifikatsiya tizimi bilan xavfsiz autentifikatsiya",
  "login.demo": "Demo kirish:",
  "login.signingIn": "Kirilmoqda...",
  "login.welcomeTitle": "Xush kelibsiz",
  "login.welcomeDescription": "{module}ga muvaffaqiyatli kirildi.",
  "login.resetPasswordUnavailableTitle": "Parolni tiklash",
  "login.resetPasswordUnavailableDescription": "Demo rejimda parolni tiklash ulanmagan. Administrator yoki OneID orqali kirishdan foydalaning.",
  "support.guideFallback": "Qo'llanma",
  "support.guideOpenedTitle": "{title} ochildi",
  "support.guideOpenedDescription": "{title} bo'yicha yo'riqnoma demo rejimda yangi oynada ochilishga tayyor holatda ko'rsatildi.",
  "support.descriptionMissingTitle": "Tavsif kiritilmadi",
  "support.descriptionMissingDescription": "Murojaat yuborish uchun muammo tavsifini yozing.",
  "support.send": "Yuborish",
  "support.sentTitle": "Murojaat yuborildi",
  "support.sentDescription": "{ticket} raqamli support ticket yaratildi. {channel} orqali qayta bog'laniladi.",
  "applications.exportDoneTitle": "Eksport yakunlandi",
  "applications.exportDoneDescription": "Ro'yxat fayl ko'rinishida tayyorlandi.",
  "report.downloadFailedTitle": "Xatolik",
  "report.downloadFailedDescription": "Hisobotni yuklab bo'lmadi.",
  "detail.pdfDownloadedTitle": "PDF yuklab olindi",
  "detail.pdfDownloadedDescription": "{title} fayli tayyorlandi.",
  "common.continue": "Davom etish",
  "confirm.description": "{id} arizasi uchun \"{action}\" amalini bajarishni tasdiqlaysizmi?",
  "action.completedTitle": "{action} muvaffaqiyatli yakunlandi",
  "action.completedDescription": "{id} arizasi bo'yicha amal muvaffaqiyatli bajarildi.",
  "action.failedTitle": "{action} amalga oshmadi",
  "action.failedDescription": "{id} arizasini {actionLower}da ERR-409 xatoligi kuzatildi. Batafsil ma'lumot uchun qo'llanma yoki bog'lanish bo'limiga murojaat qiling.",
  "calendar.today": "Bugun",
  "calendar.prevMonth": "Oldingi oy",
  "calendar.nextMonth": "Keyingi oy",
  "calendar.prevYear": "Oldingi yil",
  "calendar.nextYear": "Keyingi yil",
};

const uzValueTranslationDefaults = buildReverseMap(literalKeyMap, (key) => String(key).startsWith("value."));

function ensureTranslationCoverage() {
  const translationKeys = new Set();
  Object.values(translations).forEach((group) => Object.keys(group || {}).forEach((key) => translationKeys.add(key)));
  Object.values(translationOverrides).forEach((group) => Object.keys(group || {}).forEach((key) => translationKeys.add(key)));

  const valueTranslationKeys = new Set();
  Object.values(valueTranslations).forEach((group) => Object.keys(group || {}).forEach((key) => valueTranslationKeys.add(key)));
  Object.values(valueTranslationOverrides).forEach((group) => Object.keys(group || {}).forEach((key) => valueTranslationKeys.add(key)));

  Object.keys(languageMeta).forEach((languageCode) => {
    translations[languageCode] = translations[languageCode] ?? {};
    valueTranslations[languageCode] = valueTranslations[languageCode] ?? {};

    translationKeys.forEach((key) => {
      if (key in translations[languageCode]) {
        return;
      }

      if (languageCode === "i18n") {
        translations[languageCode][key] = key;
        return;
      }

      translations[languageCode][key] = uzTranslationDefaults[key] ?? translations.uz?.[key] ?? key;
    });

    valueTranslationKeys.forEach((key) => {
      if (key in valueTranslations[languageCode]) {
        return;
      }

      if (languageCode === "i18n") {
        valueTranslations[languageCode][key] = key;
        return;
      }

      valueTranslations[languageCode][key] = uzValueTranslationDefaults[key] ?? key;
    });
  });
}

ensureTranslationCoverage();

function formatRecordCount(count) {
  const safeCount = Number(count) || 0;
  if (currentLanguage === "en") {
    return `${safeCount} ${tr("common.records", "records")}`;
  }
  if (currentLanguage === "ru") {
    return `${safeCount} ${safeCount === 1 ? "запись" : safeCount < 5 ? "записи" : "записей"}`;
  }
  if (currentLanguage === "i18n") {
    return `${safeCount} common.records`;
  }
  return `${safeCount} ta yozuv`;
}

function formatPaginationInfo(from, to, total) {
  if (currentLanguage === "en") {
    return `${from}-${to} / ${total} ${tr("common.records", "records")}`;
  }
  if (currentLanguage === "ru") {
    return `${from}-${to} / ${total} записей`;
  }
  if (currentLanguage === "i18n") {
    return `${from}-${to} / ${total} common.records`;
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
  const overrideValue = translationOverrides[currentLanguage]?.[key];
  if (overrideValue) {
    return overrideValue;
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

  const mappedKey = literalKeyMap[trimmed] ?? normalizedLiteralKeyMap[normalizeLiteralLookup(trimmed)];
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

function getSavedFontPreference() {
  return window.localStorage.getItem(fontStorageKey) || "noto";
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

function updateFontMenuUi() {
  const meta = fontMeta[currentFont] ?? fontMeta.noto;
  if (fontCurrent) {
    fontCurrent.textContent = meta.short;
  }
  document.body.setAttribute("data-font", currentFont);
  fontItems.forEach((button) => {
    button.classList.toggle("header-dropdown__item--active", button.getAttribute("data-font-code") === currentFont);
  });
}

function applyStaticTranslations() {
  updateLanguageMenuUi();
  updateFontMenuUi();

  if (!appShell?.hasAttribute("hidden")) {
    document.title = currentModule === "ptpk" ? "PTPK" : currentModule === "cabinet" ? "KABINET" : "MRV";
  } else {
    syncDocumentTitleForAuth();
  }

  const loginHeroBadge = document.querySelector(".login-hero__badge");
  if (loginHeroBadge) loginHeroBadge.textContent = tr("login.systemName", "NASP boshqaruv tizimi");
  const loginHeroTitle = document.querySelector(".login-hero__title");
  if (loginHeroTitle) loginHeroTitle.textContent = tr("login.heroTitle", "Ijtimoiy himoya axborot tizimlarini yagona oynada boshqaring.");
  const loginHeroText = document.querySelector(".login-hero__text");
  if (loginHeroText) loginHeroText.textContent = tr("login.heroText", "Arizalar, hisobotlar va ishchi jarayonlarni markazlashgan platformada boshqarish uchun tizimga kiring.");
  const loginStatLabels = document.querySelectorAll(".login-hero__card span");
  if (loginStatLabels[0]) loginStatLabels[0].textContent = tr("login.statProcessed", "Yagona boshqaruv muhiti");
  if (loginStatLabels[1]) loginStatLabels[1].textContent = tr("login.statControl", "Markazlashgan boshqaruv");
  if (loginStatLabels[2]) loginStatLabels[2].textContent = tr("login.statIntegration", "Hududiy integratsiya");
  const loginBrandTitle = document.querySelector(".login-card__brand strong");
  if (loginBrandTitle) loginBrandTitle.textContent = tr("login.systemName", "NASP boshqaruv tizimi");
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
  if (appMenu?.[2]) appMenu[2].textContent = tr("module.cabinet", "Shaxsiy kabinet");
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
    { select: reportDisabilityGroupFilter, map: { all: tr("common.all", "Barchasi"), nbb: tr("value.group.nbb", "Nogironligi bo'lgan bola") } },
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
  if (fromInput) fromInput.placeholder = getDateInputPlaceholder();
  if (toInput) toInput.placeholder = getDateInputPlaceholder();
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
  if (applicationsReportScopeBack) applicationsReportScopeBack.textContent = tr("report.scope.back", "Orqaga");
  if (reportExportButton?.querySelector(".sr-only")) reportExportButton.querySelector(".sr-only").textContent = tr("report.download", "Hisobotni yuklab olish");
  const disabilityReportHeadRegion = disabilityReportView?.querySelector('.report-table thead [data-col="region"]');
  const disabilityReportHeadTotal = disabilityReportView?.querySelector('.report-table thead [data-col="jami"]');
  const disabilityReportHeadDiagnosis = disabilityReportView?.querySelector('.report-table thead [data-group="diagnosis"]');
  const disabilityReportHeadDisability = disabilityReportView?.querySelector('.report-table thead [data-group="disability"]');
  const disabilityReportHeadGender = disabilityReportView?.querySelector('.report-table thead [data-group="gender"]');
  const disabilityReportHeadAge = disabilityReportView?.querySelector('.report-table thead [data-group="age"]');
  const reportNbbHead = disabilityReportView?.querySelector('.report-table thead [data-col="nbb"]');
  const reportMaleHead = disabilityReportView?.querySelector('.report-table thead [data-col="male"]');
  const reportFemaleHead = disabilityReportView?.querySelector('.report-table thead [data-col="female"]');
  if (disabilityReportHeadRegion) disabilityReportHeadRegion.textContent = tr("common.region", "Hudud");
  if (disabilityReportHeadTotal) disabilityReportHeadTotal.textContent = tr("report.totalPersons", "Jami NBSHlar");
  if (disabilityReportHeadDiagnosis) disabilityReportHeadDiagnosis.textContent = tr("report.byDiagnosis", "Tashxislari bo'yicha");
  if (disabilityReportHeadDisability) disabilityReportHeadDisability.textContent = tr("report.byDisability", "Nogironlik guruhi");
  if (disabilityReportHeadGender) disabilityReportHeadGender.textContent = tr("common.gender", "Jinsi");
  if (disabilityReportHeadAge) disabilityReportHeadAge.textContent = tr("common.age", "Yoshi");
  if (reportNbbHead) reportNbbHead.textContent = tr("value.group.nbb", "NBB");
  if (reportMaleHead) reportMaleHead.textContent = tr("gender.male", "Erkak");
  if (reportFemaleHead) reportFemaleHead.textContent = tr("gender.female", "Ayol");
  const applicationsReportHeadRegion = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="region"]');
  const applicationsReportHeadTotal = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="total"]');
  const applicationsReportHeadAccepted = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="accepted"]');
  const applicationsReportHeadInProgressGroup = applicationsReportView?.querySelector('#applicationsReportTable thead [data-group="in-progress"]');
  const applicationsReportHeadRejectedGroup = applicationsReportView?.querySelector('#applicationsReportTable thead [data-group="rejected"]');
  const applicationsReportHeadInProgress = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="inProgress"]');
  const applicationsReportHeadWorkingReview = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="workingReview"]');
  const applicationsReportHeadWorkingAccepted = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="workingAccepted"]');
  const applicationsReportHeadCommissionReview = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="commissionReview"]');
  const applicationsReportHeadRejected = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="rejected"]');
  const applicationsReportHeadWorkingRejected = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="workingRejected"]');
  const applicationsReportHeadCommissionRejected = applicationsReportView?.querySelector('#applicationsReportTable thead [data-col="commissionRejected"]');
  if (applicationsReportHeadRegion) applicationsReportHeadRegion.textContent = tr("common.region", "Hudud");
  if (applicationsReportHeadTotal) applicationsReportHeadTotal.textContent = tr("report.totalApplications", "Jami arizalar");
  if (applicationsReportHeadInProgressGroup) applicationsReportHeadInProgressGroup.textContent = tr("report.inProgressApplications", "Jarayondagi arizalar");
  if (applicationsReportHeadRejectedGroup) applicationsReportHeadRejectedGroup.textContent = tr("report.rejectedApplications", "Rad etilgan arizalar");
  if (applicationsReportHeadAccepted) applicationsReportHeadAccepted.textContent = tr("report.acceptedApplications", "Qabul qilingan arizalar");
  if (applicationsReportHeadInProgress) applicationsReportHeadInProgress.textContent = tr("common.total", "Jami");
  if (applicationsReportHeadRejected) applicationsReportHeadRejected.textContent = tr("common.total", "Jami");
  if (applicationsReportHeadWorkingReview) applicationsReportHeadWorkingReview.textContent = tr("step.131", "Ishchi guruhi tomonidan ko'rib chiqilmoqda");
  if (applicationsReportHeadWorkingAccepted) applicationsReportHeadWorkingAccepted.textContent = tr("step.133", "Ishchi guruhi tomonidan qabul qilingan");
  if (applicationsReportHeadCommissionReview) applicationsReportHeadCommissionReview.textContent = tr("step.134", "Komissiya tomonidan ko'rib chiqilmoqda");
  if (applicationsReportHeadWorkingRejected) applicationsReportHeadWorkingRejected.textContent = tr("step.132", "Ishchi guruhidan rad etilgan");
  if (applicationsReportHeadCommissionRejected) applicationsReportHeadCommissionRejected.textContent = tr("step.136", "Komissiyadan rad etilgan");
  if (tableEmptyAction) tableEmptyAction.textContent = tr("common.reset", "Tozalash");
  if (detailModalTitle) detailModalTitle.textContent = tr("detail.title", "Ariza tafsilotlari");
  if (detailModalLoading?.querySelector("span:last-child")) detailModalLoading.querySelector("span:last-child").textContent = tr("detail.loading", "Ariza ma'lumotlari yuklanmoqda...");
  if (detailAcceptButton) detailAcceptButton.textContent = tr("detail.accept", "Qabul qilish");
  if (detailRejectButton) detailRejectButton.textContent = tr("detail.reject", "Rad etish");
  document.querySelectorAll('[data-process-action="accept"] span').forEach((label) => {
    label.textContent = tr("detail.accept", "Qabul qilish");
  });
  document.querySelectorAll('[data-process-action="reject"] span').forEach((label) => {
    label.textContent = tr("detail.reject", "Rad etish");
  });
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
  const currentRouteTitle = currentCanonicalTitle || getTitleFromHash(window.location.pathname);
  renderSidebar(currentModule, currentRouteTitle);
  syncPageHeading(currentRouteTitle || "Arizalar - Arizalar ro'yxati");
  enrichApplicationRows();
  updateApplicationFilterOptionSets();
  updateApplicationFilterControls();
  updateApplicationsReportFilterControls();
  updateReportFilterControls();
  renderReportTable();
  applyTableFilters();
  renderApplicationsReportTable();
  if (!detailModal?.hasAttribute("hidden") && currentDetailApplicationId) {
    openApplicationDetail(currentDetailApplicationId);
  }
}

function applyFont(fontCode) {
  currentFont = fontMeta[fontCode] ? fontCode : "noto";
  window.localStorage.setItem(fontStorageKey, currentFont);
  updateFontMenuUi();
}

const calendarPopover = document.createElement("div");
calendarPopover.className = "calendar-popover";
calendarPopover.id = "calendarPopover";
calendarPopover.hidden = true;
calendarPopover.innerHTML = `
  <div class="calendar-popover__header">
    <div class="calendar-popover__nav-group">
      <button class="calendar-popover__nav" type="button" data-calendar-nav-year="-1" aria-label="${tr("calendar.prevYear", "Oldingi yil")}">
        <svg viewBox="0 0 24 24" fill="none"><path d="m16.5 6-6 6 6 6M11.5 6l-6 6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="calendar-popover__nav" type="button" data-calendar-nav="-1" aria-label="${tr("calendar.prevMonth", "Oldingi oy")}">
        <svg viewBox="0 0 24 24" fill="none"><path d="m14.5 6-6 6 6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <div class="calendar-popover__title" id="calendarTitle"></div>
    <div class="calendar-popover__nav-group">
      <button class="calendar-popover__nav" type="button" data-calendar-nav="1" aria-label="${tr("calendar.nextMonth", "Keyingi oy")}">
        <svg viewBox="0 0 24 24" fill="none"><path d="m9.5 6 6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
      <button class="calendar-popover__nav" type="button" data-calendar-nav-year="1" aria-label="${tr("calendar.nextYear", "Keyingi yil")}">
        <svg viewBox="0 0 24 24" fill="none"><path d="m7.5 6 6 6-6 6M12.5 6l6 6-6 6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  </div>
  <div class="calendar-popover__weekdays">${(calendarLocaleLabels[currentLanguage]?.weekdays ?? calendarLocaleLabels.uz.weekdays).map((day) => `<span class="calendar-popover__weekday">${day}</span>`).join("")}</div>
  <div class="calendar-popover__grid" id="calendarGrid"></div>
  <div class="calendar-popover__footer">
    <button type="button" id="calendarClear">${tr("common.reset", "Tozalash")}</button>
    <button type="button" id="calendarToday">${tr("calendar.today", "Bugun")}</button>
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

function getStoredAuthState() {
  return window.localStorage.getItem(authStorageKey) || window.sessionStorage.getItem(authStorageKey);
}

function isAuthenticated() {
  return getStoredAuthState() === "authenticated";
}

function persistAuthState(shouldRemember = false) {
  window.sessionStorage.removeItem(authStorageKey);
  window.localStorage.removeItem(authStorageKey);
  const storage = shouldRemember ? window.localStorage : window.sessionStorage;
  storage.setItem(authStorageKey, "authenticated");
}

function clearAuthState() {
  window.sessionStorage.removeItem(authStorageKey);
  window.localStorage.removeItem(authStorageKey);
}

function rememberUsername(value) {
  const normalizedValue = String(value ?? "").trim();
  if (normalizedValue) {
    window.localStorage.setItem(rememberedUsernameStorageKey, normalizedValue);
    return;
  }

  window.localStorage.removeItem(rememberedUsernameStorageKey);
}

function getRememberedUsername() {
  return window.localStorage.getItem(rememberedUsernameStorageKey) || "";
}

function storeRouteIntent(path) {
  const normalizedPath = normalizeRoutePath(path);
  if (normalizedPath !== "/auth") {
    window.sessionStorage.setItem(routeIntentStorageKey, normalizedPath);
  }
}

function consumeRouteIntent() {
  const storedPath = window.sessionStorage.getItem(routeIntentStorageKey);
  window.sessionStorage.removeItem(routeIntentStorageKey);
  return storedPath ? normalizeRoutePath(storedPath) : "";
}

function storeLastVisitedRoute(path) {
  const normalizedPath = normalizeRoutePath(path);
  if (normalizedPath !== "/auth" && normalizedPath !== "/apps") {
    window.localStorage.setItem(lastVisitedRouteStorageKey, normalizedPath);
  }
}

function getLastVisitedRoute() {
  const storedPath = window.localStorage.getItem(lastVisitedRouteStorageKey);
  return storedPath ? normalizeRoutePath(storedPath) : "";
}

function resolvePostLoginRoute() {
  return consumeRouteIntent() || getLastVisitedRoute() || "/apps";
}

function showLoginView() {
  loginView?.removeAttribute("hidden");
  appShell?.setAttribute("hidden", "");
  loginError?.setAttribute("hidden", "");
  syncDocumentTitleForAuth();
  if (window.location.hash !== "#/auth") {
    window.location.hash = "/auth";
  }
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

function getDateInputPlaceholder() {
  switch (currentLanguage) {
    case "uz-cyrl":
      return "Санани киритинг";
    case "kaa":
      return "Sánanı kirgiziń";
    case "kaa-cyrl":
      return "Сәнаны киргизиң";
    case "ru":
      return "Введите дату";
    case "en":
      return "Enter date";
    case "i18n":
      return "date.input";
    default:
      return "Sanani kiriting";
  }
}

function getDateInputMask() {
  switch (currentLanguage) {
    case "uz-cyrl":
    case "kaa-cyrl":
    case "ru":
      return "дд.мм.гггг";
    case "kaa":
      return "kk.aa.jjjj";
    case "en":
      return "dd.mm.yyyy";
    case "i18n":
      return "date.mask";
    default:
      return "kk.oo.yyyy";
  }
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

function normalizeRoutePath(pathValue) {
  if (!pathValue || pathValue === "#" || pathValue === "/") {
    return "/auth";
  }

  let normalized = String(pathValue).trim().replace(/^#/, "");
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  const basePath = (() => {
    try {
      const pathname = new URL(document.baseURI).pathname.replace(/\/+$/, "");
      return pathname === "/" ? "" : pathname;
    } catch {
      return "";
    }
  })();

  if (basePath && (normalized === basePath || normalized.startsWith(`${basePath}/`))) {
    normalized = normalized.slice(basePath.length) || "/";
  }

  normalized = normalized.replace(/^\/app(?=\/|$)/, "") || "/";
  normalized = normalized.replace(/\/+$/, "") || "/";

  if (normalized === "/") {
    return "/auth";
  }

  const legacyAliases = {
    "/auth": "/auth",
    "/apps": "/apps",
    "/applications": "/mrv/applications/applicationList",
    "/reports/disabilityinfo": "/mrv/reports/disabilityinfo",
  };

  if (normalized === "/mrv") {
    return "/mrv/home";
  }

  if (normalized === "/ptpk") {
    return "/ptpk/home";
  }

  if (normalized === "/cabinet") {
    return "/cabinet/home";
  }

  return legacyAliases[normalized] ?? normalized;
}

function getCurrentRoutePath() {
  if (window.location.hash) {
    return normalizeRoutePath(window.location.hash);
  }

  return normalizeRoutePath(window.location.pathname);
}

function getModuleKeyFromHash(hashValue) {
  const normalizedPath = normalizeRoutePath(hashValue);
  if (normalizedPath.startsWith("/ptpk")) {
    return "ptpk";
  }
  if (normalizedPath.startsWith("/cabinet")) {
    return "cabinet";
  }
  return "muruvvat";
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
const applicationsReportState = {
  level: "region",
  selectedRegionKey: null,
};
const reportSelectedCells = new Set();
const applicationsReportSelectedCells = new Set();

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
const applicationsReportDefaultFilters = Object.freeze({
  status: "all",
  step: "all",
  gender: "all",
  age: "all",
  dateFrom: "",
  dateTo: formatDateValue(new Date()),
});
let applicationsReportAppliedFilters = { ...applicationsReportDefaultFilters };
let reportAppliedFilters = { ...reportDefaultFilters };

const applicationStepLabels = {
  "112": "Yaratildi",
  "131": "Ishchi guruh tomonidan ko'rib chiqilmoqda",
  "132": "Ishchi guruh tomonidan bekor qilindi",
  "133": "Ishchi guruh tomonidan qabul qilindi",
  "134": "Komissiya tomonidan ko'rib chiqilmoqda",
  "136": "Komissiya ko'rib chiqdi",
  "171": "Navbatga tushdi",
  "172": "Ro'yxatga olindi",
};

const applicationOrganizationTypeLabels = {
  "25": "Erkaklar",
  "26": "Ayollar",
  "27": "Bolalar",
  bolalar: "Bolalar",
  erkaklar: "Erkaklar",
  ayollar: "Ayollar",
};

const applicationStaticFilterOptions = {
  statuses: [
    { value: "jarayonda", label: "Jarayonda" },
    { value: "qabul qilingan", label: "Qabul qilingan" },
    { value: "rad etilgan", label: "Rad etilgan" },
  ],
  regions: [
    { value: "6", label: "Qoraqalpog'iston R." },
    { value: "3", label: "Andijon" },
    { value: "4", label: "Buxoro" },
    { value: "5", label: "Jizzax" },
    { value: "7", label: "Qashqadaryo" },
    { value: "8", label: "Navoiy" },
    { value: "9", label: "Namangan" },
    { value: "10", label: "Samarqand" },
    { value: "12", label: "Sirdaryo" },
    { value: "11", label: "Surxondaryo" },
    { value: "2", label: "Toshkent viloyati" },
    { value: "13", label: "Farg'ona" },
    { value: "14", label: "Xorazm" },
    { value: "1", label: "Toshkent shahri" },
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

const supplementalApplicationRows = [
  { id: "AR-000111", date: "04.03.2026", fullName: "DILAFRUZ SHAVKAT QIZI ORTIQOVA", pinfl: "41204050607081", organization: "Nukus Muruvvat (ayollar)", organizationRegion: "Qoraqalpog'iston R.", regionValue: "qoraqalpog'iston viloyati", regionLabel: "Qoraqalpog'iston R.", district: "Nukus shahri", status: "Jarayonda", step: "ishchi-guruhi-korib-chiqmoqda" },
  { id: "AR-000110", date: "04.03.2026", fullName: "AKMALJON UMID O'G'LI SOBIROV", pinfl: "30909101112131", organization: "Chimboy Muruvvat (erkaklar)", organizationRegion: "Qoraqalpog'iston R.", regionValue: "qoraqalpog'iston viloyati", regionLabel: "Qoraqalpog'iston R.", district: "Chimboy tumani", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000109", date: "03.03.2026", fullName: "MUHAYYO BAXTIYOR QIZI NOSIROVA", pinfl: "49808070605041", organization: "Chuma Muruvvat (ayollar)", organizationRegion: "Andijon", regionValue: "andijon viloyati", regionLabel: "Andijon", district: "Andijon shahri", status: "Jarayonda", step: "yangi" },
  { id: "AR-000108", date: "03.03.2026", fullName: "MURODJON ILHOM O'G'LI YULDASHEV", pinfl: "30202030405061", organization: "Bo'taqora Muruvvat (erkaklar)", organizationRegion: "Andijon", regionValue: "andijon viloyati", regionLabel: "Andijon", district: "Asaka tumani", status: "Rad etilgan", step: "ishchi-guruhi-rad-etgan" },
  { id: "AR-000107", date: "02.03.2026", fullName: "DILNOZA SHERALI QIZI KAMILOVA", pinfl: "51701020304050", organization: "Buxoro Muruvvat (bolalar)", organizationRegion: "Buxoro", regionValue: "buxoro viloyati", regionLabel: "Buxoro", district: "Buxoro shahri", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000106", date: "02.03.2026", fullName: "BOBUR TEMUR O'G'LI NAZAROV", pinfl: "31011121314151", organization: "Buxoro Muruvvat (ayollar)", organizationRegion: "Buxoro", regionValue: "buxoro viloyati", regionLabel: "Buxoro", district: "Qorako'l tumani", status: "Jarayonda", step: "komissiya-korib-chiqmoqda" },
  { id: "AR-000105", date: "01.03.2026", fullName: "GULCHEHRA ORZUBEK QIZI JURAYEVA", pinfl: "50612131415161", organization: "Jizzax Muruvvat (ayollar)", organizationRegion: "Jizzax", regionValue: "jizzax viloyati", regionLabel: "Jizzax", district: "Jizzax shahri", status: "Rad etilgan", step: "komissiya-rad-etgan" },
  { id: "AR-000104", date: "01.03.2026", fullName: "ASILBEK JAHONGIR O'G'LI TOJIBOYEV", pinfl: "30303040506071", organization: "Zomin Muruvvat (ayollar)", organizationRegion: "Jizzax", regionValue: "jizzax viloyati", regionLabel: "Jizzax", district: "Zomin tumani", status: "Jarayonda", step: "ishchi-guruhi-qabul-qilgan" },
  { id: "AR-000103", date: "28.02.2026", fullName: "MUNISA ULUG'BEK QIZI RUZIYEVA", pinfl: "62101010101011", organization: "Shahrisabz Muruvvat (ayollar)", organizationRegion: "Qashqadaryo", regionValue: "qashqadaryo viloyati", regionLabel: "Qashqadaryo", district: "Shahrisabz shahri", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000102", date: "28.02.2026", fullName: "OTABEK SOBIR O'G'LI EGAMOV", pinfl: "31404040404042", organization: "Qarshi Muruvvat (bolalar)", organizationRegion: "Qashqadaryo", regionValue: "qashqadaryo viloyati", regionLabel: "Qashqadaryo", district: "Qarshi shahri", status: "Jarayonda", step: "ishchi-guruhi-korib-chiqmoqda" },
  { id: "AR-000101", date: "27.02.2026", fullName: "NILUFAR AKMAL QIZI SHODIYEVA", pinfl: "42305060708091", organization: "Nurota Muruvvat (erkaklar)", organizationRegion: "Navoiy", regionValue: "navoiy viloyati", regionLabel: "Navoiy", district: "Nurota tumani", status: "Jarayonda", step: "yangi" },
  { id: "AR-000100", date: "27.02.2026", fullName: "SARVAR MIRZOBEK O'G'LI ERGASHEV", pinfl: "31907080910112", organization: "Pop Muruvvat (erkaklar)", organizationRegion: "Namangan", regionValue: "namangan viloyati", regionLabel: "Namangan", district: "Pop tumani", status: "Rad etilgan", step: "komissiya-rad-etgan" },
  { id: "AR-000099", date: "26.02.2026", fullName: "MADINABONU RAVSHAN QIZI TURAYEVA", pinfl: "50808091011121", organization: "Urgut Muruvvat (erkaklar)", organizationRegion: "Samarqand", regionValue: "samarqand viloyati", regionLabel: "Samarqand", district: "Urgut tumani", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000098", date: "26.02.2026", fullName: "HUSAN BOBUR O'G'LI VALIYEV", pinfl: "31111100908076", organization: "Urgut Muruvvat (ayollar)", organizationRegion: "Samarqand", regionValue: "samarqand viloyati", regionLabel: "Samarqand", district: "Urgut tumani", status: "Jarayonda", step: "komissiya-korib-chiqmoqda" },
  { id: "AR-000097", date: "25.02.2026", fullName: "SHAHNOZA DILSHOD QIZI NOSIROVA", pinfl: "52412131415161", organization: "Sirdaryo Muruvvat (ayollar)", organizationRegion: "Sirdaryo", regionValue: "sirdaryo viloyati", regionLabel: "Sirdaryo", district: "Guliston shahri", status: "Jarayonda", step: "ishchi-guruhi-qabul-qilgan" },
  { id: "AR-000096", date: "25.02.2026", fullName: "DAVRON SHERZOD O'G'LI JO'RAYEV", pinfl: "30710111213141", organization: "Yangiyer Muruvvat (ayollar)", organizationRegion: "Sirdaryo", regionValue: "sirdaryo viloyati", regionLabel: "Sirdaryo", district: "Yangiyer shahri", status: "Rad etilgan", step: "ishchi-guruhi-rad-etgan" },
  { id: "AR-000095", date: "24.02.2026", fullName: "MUSLIMA BAXTIYOR QIZI QODIROVA", pinfl: "61411121314151", organization: "Farhod Muruvvat (ayollar)", organizationRegion: "Surxondaryo", regionValue: "surxondaryo viloyati", regionLabel: "Surxondaryo", district: "Termiz shahri", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000094", date: "24.02.2026", fullName: "JAHONGIR ASROR O'G'LI OCHILOV", pinfl: "31605040302010", organization: "Denov Muruvvat (erkaklar)", organizationRegion: "Surxondaryo", regionValue: "surxondaryo viloyati", regionLabel: "Surxondaryo", district: "Denov tumani", status: "Jarayonda", step: "ishchi-guruhi-korib-chiqmoqda" },
  { id: "AR-000093", date: "23.02.2026", fullName: "MEHRINISO OTABEK QIZI JUMAYEVA", pinfl: "50501020304051", organization: "Qumqo'rg'on Muruvvat (bolalar)", organizationRegion: "Surxondaryo", regionValue: "surxondaryo viloyati", regionLabel: "Surxondaryo", district: "Qumqo'rg'on tumani", status: "Jarayonda", step: "yangi" },
  { id: "AR-000092", date: "23.02.2026", fullName: "FARRUX RUSTAM O'G'LI ABDULLAYEV", pinfl: "30207060504031", organization: "Ohangaron Muruvvat (erkaklar)", organizationRegion: "Toshkent viloyati", regionValue: "toshkent viloyati", regionLabel: "Toshkent viloyati", district: "Ohangaron tumani", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000091", date: "22.02.2026", fullName: "ODINA SHAVKAT QIZI ASQAROVA", pinfl: "51102030405061", organization: "Qo'qon Muruvvat (erkaklar)", organizationRegion: "Farg'ona", regionValue: "farg'ona viloyati", regionLabel: "Farg'ona", district: "Qo'qon shahri", status: "Rad etilgan", step: "komissiya-rad-etgan" },
  { id: "AR-000090", date: "22.02.2026", fullName: "ISKANDAR UMID O'G'LI MAHMUDOV", pinfl: "31314151617181", organization: "Qudash Muruvvat (ayollar)", organizationRegion: "Farg'ona", regionValue: "farg'ona viloyati", regionLabel: "Farg'ona", district: "Rishton tumani", status: "Jarayonda", step: "komissiya-korib-chiqmoqda" },
  { id: "AR-000089", date: "21.02.2026", fullName: "NAFOSAT ILHOM QIZI TOSHPO'LATOVA", pinfl: "62001020304052", organization: "Farg'ona Muruvvat (bolalar)", organizationRegion: "Farg'ona", regionValue: "farg'ona viloyati", regionLabel: "Farg'ona", district: "Marg'ilon shahri", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000088", date: "21.02.2026", fullName: "ULUG'BEK ANVAR O'G'LI AZIMOV", pinfl: "31802030405061", organization: "Xiva Muruvvat (erkaklar)", organizationRegion: "Xorazm", regionValue: "xorazm viloyati", regionLabel: "Xorazm", district: "Xiva shahri", status: "Jarayonda", step: "ishchi-guruhi-qabul-qilgan" },
  { id: "AR-000087", date: "20.02.2026", fullName: "ZIYODA RUSTAM QIZI HAMROYEVA", pinfl: "50703040506071", organization: "Nukus Muruvvat (ayollar)", organizationRegion: "Qoraqalpog'iston R.", regionValue: "qoraqalpog'iston viloyati", regionLabel: "Qoraqalpog'iston R.", district: "Amudaryo tumani", status: "Jarayonda", step: "ishchi-guruhi-korib-chiqmoqda" },
  { id: "AR-000086", date: "20.02.2026", fullName: "MIRAZIZ JAMSHID O'G'LI ALIMOV", pinfl: "30001020304050", organization: "Chimboy Muruvvat (erkaklar)", organizationRegion: "Qoraqalpog'iston R.", regionValue: "qoraqalpog'iston viloyati", regionLabel: "Qoraqalpog'iston R.", district: "Mo'ynoq tumani", status: "Rad etilgan", step: "ishchi-guruhi-rad-etgan" },
  { id: "AR-000085", date: "19.02.2026", fullName: "GULRUX SHERALI QIZI QARSHIYEVA", pinfl: "50305060708092", organization: "Chuma Muruvvat (ayollar)", organizationRegion: "Andijon", regionValue: "andijon viloyati", regionLabel: "Andijon", district: "Baliqchi tumani", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000084", date: "19.02.2026", fullName: "BEHZOD AKROM O'G'LI SHOYUSUPOV", pinfl: "31506070809101", organization: "Bo'taqora Muruvvat (erkaklar)", organizationRegion: "Andijon", regionValue: "andijon viloyati", regionLabel: "Andijon", district: "Shahrixon tumani", status: "Jarayonda", step: "komissiya-korib-chiqmoqda" },
  { id: "AR-000083", date: "18.02.2026", fullName: "MAFTUNA ISROIL QIZI JALILOVA", pinfl: "62207080910112", organization: "Buxoro Muruvvat (bolalar)", organizationRegion: "Buxoro", regionValue: "buxoro viloyati", regionLabel: "Buxoro", district: "Kogon shahri", status: "Jarayonda", step: "yangi" },
  { id: "AR-000082", date: "18.02.2026", fullName: "OTABEK NODIR O'G'LI YULDOSHOV", pinfl: "30608091011121", organization: "Qorako'l Muruvvat (erkaklar)", organizationRegion: "Buxoro", regionValue: "buxoro viloyati", regionLabel: "Buxoro", district: "G'ijduvon tumani", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000081", date: "17.02.2026", fullName: "ROBIYA BUNYOD QIZI AKBAROVA", pinfl: "50909101112131", organization: "Jizzax Muruvvat (ayollar)", organizationRegion: "Jizzax", regionValue: "jizzax viloyati", regionLabel: "Jizzax", district: "G'allaorol tumani", status: "Rad etilgan", step: "komissiya-rad-etgan" },
  { id: "AR-000080", date: "17.02.2026", fullName: "SAMANDAR RAVSHAN O'G'LI QOCHQOROV", pinfl: "30110111213141", organization: "Zomin Muruvvat (ayollar)", organizationRegion: "Jizzax", regionValue: "jizzax viloyati", regionLabel: "Jizzax", district: "Zarbdor tumani", status: "Jarayonda", step: "ishchi-guruhi-qabul-qilgan" },
  { id: "AR-000079", date: "16.02.2026", fullName: "MUBINA OTABEK QIZI ABDIYEVA", pinfl: "61412131415161", organization: "Shahrisabz Muruvvat (ayollar)", organizationRegion: "Qashqadaryo", regionValue: "qashqadaryo viloyati", regionLabel: "Qashqadaryo", district: "Kitob tumani", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000078", date: "16.02.2026", fullName: "AZAMAT SHUKUR O'G'LI MAMATOV", pinfl: "30403020100192", organization: "Qarshi Muruvvat (bolalar)", organizationRegion: "Qashqadaryo", regionValue: "qashqadaryo viloyati", regionLabel: "Qashqadaryo", district: "Koson tumani", status: "Jarayonda", step: "ishchi-guruhi-korib-chiqmoqda" },
  { id: "AR-000077", date: "15.02.2026", fullName: "SHAHNOZA AKBAR QIZI IMOMOVA", pinfl: "52001020304056", organization: "Nurota Muruvvat (erkaklar)", organizationRegion: "Navoiy", regionValue: "navoiy viloyati", regionLabel: "Navoiy", district: "Karmana tumani", status: "Rad etilgan", step: "ishchi-guruhi-rad-etgan" },
  { id: "AR-000076", date: "15.02.2026", fullName: "MIRJALOL OYBEK O'G'LI ERGASHEV", pinfl: "30311121314151", organization: "Pop Muruvvat (erkaklar)", organizationRegion: "Namangan", regionValue: "namangan viloyati", regionLabel: "Namangan", district: "Chortoq tumani", status: "Qabul qilingan", step: "komissiya-qabul-qilgan" },
  { id: "AR-000075", date: "14.02.2026", fullName: "SABINA BAXTIYOR QIZI JALOLOVA", pinfl: "51112131415162", organization: "Yangiyer Muruvvat (ayollar)", organizationRegion: "Sirdaryo", regionValue: "sirdaryo viloyati", regionLabel: "Sirdaryo", district: "Sardoba tumani", status: "Jarayonda", step: "yangi" },
];

supplementalApplicationRows.forEach((item) => {
  applicationRowMetadata[item.id] = { step: item.step };
});

const applicationRowMenuMarkup = `<div class="row-menu"><button class="row-menu__toggle" type="button" aria-expanded="false" aria-label="Amallar menyusi"><span></span><span></span><span></span></button><div class="row-menu__dropdown"><button class="row-menu__item" type="button"><svg viewBox="0 0 24 24" fill="none"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg><span>Ko'rish</span></button><button class="row-menu__item" type="button"><svg viewBox="0 0 24 24" fill="none"><path d="m4 15.5 9.75-9.75 3.75 3.75L7.75 19.25H4V15.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M13 6.5 16.5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg><span>Tahrirlash</span></button><button class="row-menu__item" type="button"><svg viewBox="0 0 24 24" fill="none"><path d="M12 4v10M8 10l4 4 4-4M5 18h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><span>Yuklab olish</span></button></div></div>`;
const workingGroupMembersData = [
  { id: "IG-001", date: "07.04.2026", region: "Toshkent shahri", status: "Yangi" },
  { id: "IG-002", date: "06.04.2026", region: "Samarqand", status: "Tahrirlangan" },
  { id: "IG-003", date: "05.04.2026", region: "Farg'ona", status: "Yuborilgan" },
  { id: "IG-004", date: "04.04.2026", region: "Qashqadaryo", status: "Tasdiqlangan" },
  { id: "IG-005", date: "03.04.2026", region: "Buxoro", status: "Rad etilgan" },
  { id: "IG-006", date: "02.04.2026", region: "Andijon", status: "Yangi" },
];
const commissionMembersData = [
  { id: "KM-001", date: "07.04.2026", region: "Toshkent shahri", status: "Tasdiqlangan" },
  { id: "KM-002", date: "06.04.2026", region: "Xorazm", status: "Yuborilgan" },
  { id: "KM-003", date: "05.04.2026", region: "Namangan", status: "Tahrirlangan" },
  { id: "KM-004", date: "04.04.2026", region: "Sirdaryo", status: "Yangi" },
  { id: "KM-005", date: "03.04.2026", region: "Qoraqalpog'iston R.", status: "Rad etilgan" },
];
let currentCompositionType = "workingGroup";

function deriveApplicationStatusLabel(stepName = "") {
  const normalized = String(stepName).trim().toLowerCase();

  if (
    normalized === "ishchi guruh tomonidan bekor qilindi"
    || normalized === "komissiya ko'rib chiqdi"
  ) {
    return "Rad etilgan";
  }
  if (normalized === "navbatga tushdi" || normalized === "ro'yxatga olindi") {
    return "Qabul qilingan";
  }

  return "Jarayonda";
}

function normalizeApplicationStepValue(stepValue = "", stepName = "") {
  const normalizedValue = String(stepValue || "").trim();
  if (applicationStepLabels[normalizedValue]) {
    return normalizedValue;
  }

  const normalizedName = String(stepName || stepValue).trim().toLowerCase();
  if (normalizedName === "yangi" || normalizedName === "yaratildi") return "112";
  if (normalizedName === "ishchi-guruhi-korib-chiqmoqda" || normalizedName === "ishchi guruh tomonidan ko'rib chiqilmoqda") return "131";
  if (normalizedName === "ishchi-guruhi-rad-etgan" || normalizedName === "ishchi guruh tomonidan bekor qilindi") return "132";
  if (normalizedName === "ishchi-guruhi-qabul-qilgan" || normalizedName === "ishchi guruh tomonidan qabul qilindi") return "133";
  if (normalizedName === "komissiya-korib-chiqmoqda" || normalizedName === "komissiya tomonidan ko'rib chiqilmoqda" || normalizedName === "komissiya tomonidan tomonidan ko'rib chiqilmoqda") return "134";
  if (normalizedName === "komissiya-rad-etgan" || normalizedName === "komissiya ko'rib chiqdi") return "136";
  if (normalizedName === "komissiya-qabul-qilgan" || normalizedName === "navbatga tushdi") return "171";
  if (normalizedName === "ro'yxatga olindi") return "172";
  return "112";
}

function getApplicationStepValueFromName(stepName = "") {
  return normalizeApplicationStepValue("", stepName);
}

function buildApplicationTableRow(item) {
  const statusLabel = item.status || deriveApplicationStatusLabel(item.appStep);
  const statusClass = statusLabel === "Qabul qilingan"
    ? "status-badge--accepted"
    : statusLabel === "Rad etilgan"
      ? "status-badge--rejected"
      : "status-badge--process";
  const organizationLabel = item.organization || "-";
  const organizationRegionLabel = item.organizationRegion || "-";
  const regionLabel = item.regionLabel || "-";
  const districtLabel = item.district || "-";
  const stepValue = normalizeApplicationStepValue(item.step || item.appStepId || "", item.appStep);
  const regionValue = String(item.regionId || item.regionValue || regionLabel).trim();
  const districtValue = String(item.districtId || districtLabel).trim();
  const organizationValue = String(item.organizationId || organizationLabel).trim();
  const organizationTypeValue = String(item.organizationTypeId || "").trim();
  const numericSeed = Number.parseInt(String(item.id || "").replace(/\D/g, ""), 10) || 0;
  const genderLabel = inferGenderFromPersonName(item.fullName || "");
  const genderValue = genderLabel.toLowerCase();
  const ageGroupValue = ["0-3", "3-7", "7-18", "18-55/60", "55/60+"][numericSeed % 5];
  const [dayPart = "", monthPart = "", yearPart = ""] = String(item.date || "").split(".");
  const dateIso = dayPart && monthPart && yearPart
    ? `${yearPart}-${monthPart.padStart(2, "0")}-${dayPart.padStart(2, "0")}`
    : "";
  const searchValue = [
    item.id,
    item.fullName,
    item.pinfl,
    regionLabel,
    districtLabel,
    organizationLabel,
    organizationRegionLabel,
    item.appStep,
  ]
    .filter(Boolean)
    .join(" ")
    .toUpperCase();

  applicationRowMetadata[item.id] = { step: stepValue };

  return `
    <tr data-status="${statusLabel.toLowerCase()}" data-region="${escapeHtml(regionValue)}" data-step="${escapeHtml(stepValue)}"
        data-district="${escapeHtml(districtValue)}" data-organization-type="${escapeHtml(organizationTypeValue)}"
        data-organization="${escapeHtml(organizationValue)}" data-search="${escapeHtml(searchValue)}"
        data-gender="${escapeHtml(genderValue)}" data-age-group="${escapeHtml(ageGroupValue)}" data-date-iso="${escapeHtml(dateIso)}"
        data-organization-raw="${escapeHtml(organizationLabel)}"
        data-organization-region-raw="${escapeHtml(organizationRegionLabel)}"
        data-region-label-raw="${escapeHtml(regionLabel)}"
        data-district-raw="${escapeHtml(districtLabel)}">
      <td class="actions-cell">${applicationRowMenuMarkup}</td>
      <td><div class="stacked-cell stacked-cell--application"><strong>${escapeHtml(item.id)}</strong><span>${escapeHtml(item.date || "-")}</span></div></td>
      <td><div class="stacked-cell"><strong>${escapeHtml(item.fullName || "-")}</strong><span>${escapeHtml(item.pinfl || "-")}</span></div></td>
      <td><div class="stacked-cell"><strong data-raw-value="${escapeHtml(organizationLabel)}">${translateDisplayValue(organizationLabel)}</strong><span data-raw-value="${escapeHtml(organizationRegionLabel)}">${translateDisplayValue(organizationRegionLabel)}</span></div></td>
      <td><div class="stacked-cell"><strong data-raw-value="${escapeHtml(regionLabel)}">${translateDisplayValue(regionLabel)}</strong><span data-raw-value="${escapeHtml(districtLabel)}">${translateDisplayValue(districtLabel)}</span></div></td>
      <td><span class="status-badge ${statusClass}">${escapeHtml(statusLabel)}</span></td>
    </tr>
  `;
}

function buildSupplementalApplicationRow(item) {
  return buildApplicationTableRow(item);
}

function ensureApplicationRowsSeeded() {
  const tbody = document.querySelector("#applicationsTable tbody");
  const emptyRow = document.getElementById("tableEmptyRow");
  if (!tbody || !emptyRow || tbody.dataset.seeded === "true") {
    return;
  }

  emptyRow.insertAdjacentHTML("beforebegin", supplementalApplicationRows.map(buildSupplementalApplicationRow).join(""));
  tbody.dataset.seeded = "true";
  applicationRows = Array.from(document.querySelectorAll("#applicationsTable tbody tr:not(.table-empty)"));
  rowMenuToggles = document.querySelectorAll(".row-menu__toggle");
}

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

const applicationsReportDistrictOrderByRegion = {
  qoraqalpogiston: ["Taxiatosh", "Buzatov", "Amudaryo", "Beruniy", "Qonliko'l", "Qorao'zak", "Kegeyli", "Qo'ng'irot", "Mo'ynoq", "Nukus", "Taxtako'pir", "To'rtko'l", "Xo'jayli", "Chimboy", "Shumanay", "Ellikqal'a", "Nukus shahri", "Taxiatosh shahri"],
  andijon: ["Qorasu shahri", "Andijon shahri", "Asaka shahri", "Oltinkul", "Andijon", "Asaka", "Baliqchi", "Buston", "Buloqboshi", "Jalaquduq", "Izboskan", "Qo'rg'ontepa", "Marxamat", "Paxtaobod", "Ulug'nor", "Xo'jaobod", "Xonobod shahri", "Shahrixon"],
  buxoro: ["Buxoro shahri", "Kogon shahri", "Olot", "Buxoro", "Vobkent", "G'ijduvon", "Jondor", "Kogon", "Qorako'l", "Peshku", "Romitan", "Qorovulbozor", "Shofirkon"],
  jizzax: ["Arnasoy", "Yangiobod", "Baxmal", "G'allaorol", "Dustlik", "Paxtakor", "Zomin", "Sharof Rashidov", "Zarbdor", "Zafarobod", "Mirzacho'l", "Forish", "Jizzax shahri"],
  qashqadaryo: ["Kasbi", "Kitob", "Mirishkor", "Muborak", "Nishon", "Chiroqchi", "Shahrisabz", "Yakkabog'", "Qarshi shahri", "Shahrisabz shahri", "Ko'kdala", "G'uzor", "Dehqonobod", "Qamashi", "Qarshi", "Koson"],
  navoiy: ["Konimex", "Qiziltepa", "Navbahor", "Karmana", "Nurota", "Tomdi", "Uchquduq", "Xatirchi", "Zarafshon", "Navoiy shahri", "G'ozg'on shahri"],
  namangan: ["Kosonsoy", "Mingbuloq", "Namangan", "Norin", "Pop", "To'raqo'rg'on", "Uychi", "Uchqo'rg'on", "Chortoq", "Chust", "Yangiqo'rg'on", "Namangan shahri", "Davlatobod", "Yangi Namangan"],
  samarqand: ["Oqdaryo", "Bulung'ur", "Jomboy", "Ishtixon", "Kattaqo'rg'on tumani", "Qo'shrobod", "Narpay", "Nurobod", "Payariq", "Pastdarg'om", "Paxtachi", "Samarqand", "Toyloq", "Urgut", "Kattaqo'rg'on shahri", "Samarqand shahri"],
  sirdaryo: ["Oqoltin", "Boyovut", "Guliston", "Mirzaobod", "Sardoba", "Sayxunobod", "Sirdaryo", "Xovos", "Guliston shahri", "Shirin shahri", "Yangier shahri"],
  surxondaryo: ["Oltinsoy", "Angor", "Boysun", "Bandixon", "Denov", "Jarqo'rg'on", "Qumqo'rg'on", "Qiziriq", "Muzrobod", "Sariosiyo", "Termiz", "Uzun", "Sherobod", "Sho'rchi", "Termiz shahri"],
  "toshkent-viloyati": ["Bo'stonliq", "Oqqo'rg'on", "Oxangaron", "Bekobod", "Buka", "Zangiota", "Qibray", "Quyichirchiq", "Parkent", "Nurafshon shahri", "Pskent", "Toshkent", "O'rtachirchiq", "Chinoz", "Yuqorichirchiq", "Yangiyo'l", "Olmaliq shahri", "Angren shahri", "Oxangaron shahri", "Bekobod shahri", "Chirchiq shahri", "Yangiyo'l shahri"],
  fargona: ["Oltiariq", "Qo'shtepa", "Bog'dod", "Beshariq", "Buvayda", "Dang'ara", "Quva", "Rishton", "So'x", "Toshloq", "O'zbekiston", "Uchko'prik", "Farg'ona", "Furqat", "Yozyovon", "Qo'qon shahri", "Quvasoy shahri", "Marg'ilon shahri", "Farg'ona shahri"],
  xorazm: ["Bog'ot", "Gurlan", "Qoshko'pir", "Urganch shahri", "Xazorasp", "Xonqa", "Xiva", "Shovot", "Yangiariq", "Yangibozor", "Urganch tumani", "Xiva shahri", "Tupraqqal'a"],
  "toshkent-shahri": ["Bektemir", "Yunusobod", "Yakkasaroy", "Mirzo Ulug'bek", "Yangihayot", "Mirobod", "Olmazor", "Sergeli", "Uchtepa", "Yashnobod", "Chilonzor", "Shayxontohur"],
};

function normalizeLocationOrderKey(value = "") {
  return String(value ?? "")
    .toLowerCase()
    .replace(/ʻ|ʼ|`|´/g, "'")
    .replace(/o‘|o'/g, "o'")
    .replace(/g‘|g'/g, "g'")
    .replace(/\s+/g, " ")
    .trim();
}

function getApplicationsReportRegionOrderToken(value = "") {
  const normalized = normalizeLocationOrderKey(value);
  if (normalized.includes("qoraqalpog")) return "qoraqalpogiston";
  if (normalized.includes("toshkent shahri")) return "toshkent-shahri";
  if (normalized.includes("toshkent viloyati")) return "toshkent-viloyati";
  if (normalized.includes("andijon")) return "andijon";
  if (normalized.includes("buxoro")) return "buxoro";
  if (normalized.includes("jizzax")) return "jizzax";
  if (normalized.includes("qashqadaryo")) return "qashqadaryo";
  if (normalized.includes("navoiy")) return "navoiy";
  if (normalized.includes("namangan")) return "namangan";
  if (normalized.includes("samarqand")) return "samarqand";
  if (normalized.includes("sirdaryo")) return "sirdaryo";
  if (normalized.includes("surxondaryo")) return "surxondaryo";
  if (normalized.includes("farg")) return "fargona";
  if (normalized.includes("xorazm")) return "xorazm";
  return normalized;
}

const applicationsReportColumnKeys = [
  "total",
  "inProgress",
  "workingReview",
  "workingAccepted",
  "commissionReview",
  "rejected",
  "workingRejected",
  "commissionRejected",
  "accepted",
];

function getApplicationsReportMetrics(rows) {
  const totals = {
    total: rows.length,
    inProgress: 0,
    workingReview: 0,
    workingAccepted: 0,
    commissionReview: 0,
    rejected: 0,
    workingRejected: 0,
    commissionRejected: 0,
    accepted: 0,
  };

  rows.forEach((row) => {
    const step = String(row.getAttribute("data-step") ?? "").trim();

    if (["112", "131", "133", "134"].includes(step)) totals.inProgress += 1;
    if (step === "131") totals.workingReview += 1;
    if (step === "133") totals.workingAccepted += 1;
    if (step === "134") totals.commissionReview += 1;
    if (["132", "136"].includes(step)) totals.rejected += 1;
    if (step === "132") totals.workingRejected += 1;
    if (step === "136") totals.commissionRejected += 1;
    if (["171", "172"].includes(step)) totals.accepted += 1;
  });

  return applicationsReportColumnKeys.map((key) => totals[key] ?? 0);
}

function getApplicationsReportRegionRows() {
  const regionMap = new Map();
  const regionOrderMap = new Map(reportData.map((region, index) => [String(region.key ?? "").trim(), index]));
  ensureApplicationRowsSeeded();

  applicationRows.forEach((row) => {
    const key = String(row.getAttribute("data-region") ?? "").trim();
    if (!key) return;

    const label = row.getAttribute("data-region-label-raw")
      ?? row.querySelector("td:nth-child(5) strong")?.textContent?.trim()
      ?? key;

    if (!regionMap.has(key)) {
      regionMap.set(key, { key, name: label, allRows: [], rows: [] });
    }

    regionMap.get(key).allRows.push(row);
  });

  getApplicationsReportFilteredRows().forEach((row) => {
    const key = String(row.getAttribute("data-region") ?? "").trim();
    if (!key || !regionMap.has(key)) return;
    regionMap.get(key).rows.push(row);
  });

  return Array.from(regionMap.values())
    .map((entry) => ({
      key: entry.key,
      name: entry.name,
      totals: getApplicationsReportMetrics(entry.rows),
    }))
    .sort((left, right) => {
      const leftIndex = regionOrderMap.get(left.key) ?? Number.MAX_SAFE_INTEGER;
      const rightIndex = regionOrderMap.get(right.key) ?? Number.MAX_SAFE_INTEGER;

      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }

      return left.name.localeCompare(right.name, "uz");
    });
}

function getApplicationsReportDistrictRows(regionKey) {
  const districtMap = new Map();
  const regionToken = getApplicationsReportRegionOrderToken(regionKey);
  const districtOrder = applicationsReportDistrictOrderByRegion[regionToken] ?? [];
  const districtOrderMap = new Map(
    districtOrder.map((name, index) => [normalizeLocationOrderKey(name), index]),
  );
  ensureApplicationRowsSeeded();

  applicationRows
    .filter((row) => String(row.getAttribute("data-region") ?? "").trim() === String(regionKey ?? "").trim())
    .forEach((row) => {
      const key = String(row.getAttribute("data-district") ?? "").trim();
      if (!key) return;

      const label = row.getAttribute("data-district-raw")
        ?? row.querySelector("td:nth-child(5) span")?.textContent?.trim()
        ?? key;

      if (!districtMap.has(key)) {
        districtMap.set(key, { key, name: label, allRows: [], rows: [] });
      }

      districtMap.get(key).allRows.push(row);
    });

  getApplicationsReportFilteredRows()
    .filter((row) => String(row.getAttribute("data-region") ?? "").trim() === String(regionKey ?? "").trim())
    .forEach((row) => {
      const key = String(row.getAttribute("data-district") ?? "").trim();
      if (!key || !districtMap.has(key)) return;
      districtMap.get(key).rows.push(row);
    });

  return Array.from(districtMap.values())
    .map((entry) => ({
      key: entry.key,
      name: entry.name,
      totals: getApplicationsReportMetrics(entry.rows),
    }))
    .sort((left, right) => {
      const leftIndex = districtOrderMap.get(normalizeLocationOrderKey(left.name)) ?? Number.MAX_SAFE_INTEGER;
      const rightIndex = districtOrderMap.get(normalizeLocationOrderKey(right.name)) ?? Number.MAX_SAFE_INTEGER;

      if (leftIndex !== rightIndex) {
        return leftIndex - rightIndex;
      }

      return left.name.localeCompare(right.name, "uz");
    });
}

function getSelectedApplicationsReportRegion() {
  return getApplicationsReportRegionRows().find((region) => region.key === applicationsReportState.selectedRegionKey) ?? null;
}

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
    ? `${tr("report.summary", "Respublika jami")} / ${translateDisplayValue(selectedRegion.name)}`
    : tr("report.summary", "Respublika jami");
}

function updateApplicationsReportScope() {
  if (!applicationsReportScope || !applicationsReportScopePath) {
    return;
  }

  const selectedRegion = getSelectedApplicationsReportRegion();
  const isDistrictLevel = applicationsReportState.level === "district" && selectedRegion;
  applicationsReportScope.hidden = !isDistrictLevel;
  applicationsReportScopePath.textContent = isDistrictLevel
    ? `${tr("report.summary", "Respublika jami")} / ${translateDisplayValue(selectedRegion.name)}`
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
    return { source: selectedRegion, label: `${translateDisplayValue(selectedRegion.name)} bo'yicha jami` };
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

function clearApplicationsReportSelection() {
  applicationsReportSelectedCells.forEach((cell) => cell.classList.remove("report-table__cell--selected"));
  applicationsReportSelectedCells.clear();
  updateApplicationsReportSelectionSummary();
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

function updateApplicationsReportSelectionSummary() {
  if (!applicationsReportSelectionBar) {
    return;
  }

  const values = Array.from(applicationsReportSelectedCells)
    .map((cell) => parseReportCellValue(cell.textContent))
    .filter((value) => value !== null);

  const hasValues = values.length > 0;
  applicationsReportSelectionBar.hidden = !hasValues;

  if (!hasValues) {
    if (applicationsReportSelectionCount) applicationsReportSelectionCount.textContent = "0";
    if (applicationsReportSelectionSum) applicationsReportSelectionSum.textContent = "0";
    if (applicationsReportSelectionAvg) applicationsReportSelectionAvg.textContent = "0";
    if (applicationsReportSelectionMin) applicationsReportSelectionMin.textContent = "0";
    if (applicationsReportSelectionMax) applicationsReportSelectionMax.textContent = "0";
    return;
  }

  const sum = values.reduce((total, value) => total + value, 0);
  const avg = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  if (applicationsReportSelectionCount) applicationsReportSelectionCount.textContent = formatReportNumber(values.length);
  if (applicationsReportSelectionSum) applicationsReportSelectionSum.textContent = formatReportNumber(sum);
  if (applicationsReportSelectionAvg) applicationsReportSelectionAvg.textContent = formatReportNumber(Math.round(avg * 100) / 100);
  if (applicationsReportSelectionMin) applicationsReportSelectionMin.textContent = formatReportNumber(min);
  if (applicationsReportSelectionMax) applicationsReportSelectionMax.textContent = formatReportNumber(max);
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

function toggleApplicationsReportCellSelection(cell, additive = false) {
  if (!(cell instanceof HTMLTableCellElement)) {
    return;
  }

  if (!additive) {
    clearApplicationsReportSelection();
  }

  if (applicationsReportSelectedCells.has(cell)) {
    applicationsReportSelectedCells.delete(cell);
    cell.classList.remove("report-table__cell--selected");
  } else {
    applicationsReportSelectedCells.add(cell);
    cell.classList.add("report-table__cell--selected");
  }

  updateApplicationsReportSelectionSummary();
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
      const rowLabel = translateDisplayValue(row.name);
      const firstCell =
        reportState.level === "region"
          ? `<button class="report-region-button" type="button" data-report-region="${escapeHtml(row.key)}">${escapeHtml(rowLabel)}</button>`
          : `<span>${escapeHtml(rowLabel)}</span>`;
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

function renderApplicationsReportTable() {
  if (!applicationsReportTableBody) {
    return;
  }

  clearApplicationsReportSelection();

  const regionRows = getApplicationsReportRegionRows();
  const selectedRegion = getSelectedApplicationsReportRegion();
  const rows = applicationsReportState.level === "district" && selectedRegion
    ? getApplicationsReportDistrictRows(selectedRegion.key)
    : regionRows;

  const summarySource = applicationsReportState.level === "district" && selectedRegion
    ? selectedRegion
    : {
        key: "summary",
        name: tr("report.summary", "Respublika jami"),
        totals: applicationsReportColumnKeys.map((_, index) =>
          regionRows.reduce((sum, row) => sum + (row.totals[index] ?? 0), 0),
        ),
      };

  const summaryLabel = applicationsReportState.level === "district" && selectedRegion
    ? `${translateDisplayValue(selectedRegion.name)} bo'yicha jami`
    : tr("report.summary", "Respublika jami");

  const summaryCells = summarySource.totals
    .map((value, index) => `<td data-col="${applicationsReportColumnKeys[index]}">${formatReportNumber(value)}</td>`)
    .join("");

  const bodyMarkup = rows
    .map((row) => {
      const rowLabel = translateDisplayValue(row.name);
      const firstCell = applicationsReportState.level === "region"
        ? `<button class="report-region-button" type="button" data-applications-report-region="${escapeHtml(row.key)}">${escapeHtml(rowLabel)}</button>`
        : `<span>${escapeHtml(rowLabel)}</span>`;
      const valueCells = row.totals
        .map((value, index) => `<td data-col="${applicationsReportColumnKeys[index]}">${formatReportNumber(value)}</td>`)
        .join("");
      return `<tr data-region="${escapeHtml(row.key)}"><td data-col="region">${firstCell}</td>${valueCells}</tr>`;
    })
    .join("");

  applicationsReportTableBody.innerHTML = `
    <tr class="report-table__summary">
      <td data-col="region">${escapeHtml(summaryLabel)}</td>
      ${summaryCells}
    </tr>
    ${bodyMarkup}
  `;

  updateApplicationsReportScope();
}

function buildApplicationsReportExportHtml() {
  if (!applicationsReportTable) {
    return "";
  }

  const tableClone = applicationsReportTable.cloneNode(true);
  const snapshotLabel = applicationsReportSnapshotDate?.value?.trim() || formatDateLabel(formatDateValue(new Date()));

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
  <h1>${translateRouteTitle("Hisobotlar - Arizalar bo'yicha hisobot")}</h1>
  <div class="report-meta">${tr("report.snapshotDate", "Holat sanasi")}: ${snapshotLabel}</div>
  ${tableClone.outerHTML}
</body>
</html>`;
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
    textInput.placeholder = hasValue ? getDateInputMask() : getDateInputPlaceholder();
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

  const localizedMonths = calendarLocaleLabels[currentLanguage]?.months ?? calendarLocaleLabels.uz.months;
  calendarTitle.textContent = `${localizedMonths[month]} ${year}`;
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

function getActionLabel(action) {
  return tr(action === "accept" ? "detail.accept" : "detail.reject", action === "accept" ? "Qabul qilish" : "Rad etish");
}

function openConfirmModal(action, applicationId) {
  confirmState.action = action;
  confirmState.applicationId = applicationId;
  const actionLabel = getActionLabel(action);
  confirmModal?.classList.toggle("confirm-modal--accept", action === "accept");
  if (confirmModalDescription) {
    confirmModalDescription.textContent = tformat(
      "confirm.description",
      `${applicationId} arizasi uchun "${actionLabel}" amalini bajarishni tasdiqlaysizmi?`,
      { id: applicationId, action: actionLabel },
    );
  }
  if (confirmModalApprove) {
    confirmModalApprove.textContent = actionLabel;
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
    confirmModalApprove.innerHTML = confirmState.action ? getActionLabel(confirmState.action) : tr("common.continue", "Davom etish");
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
  const resolve = (fileName) => new URL(fileName, document.baseURI).toString();
  return String(application.gender || "").toLowerCase() === "ayol"
    ? resolve(`person-girl.png?v=${version}`)
    : resolve(`person-boy.png?v=${version}`);
}

function inferGenderFromPersonName(fullName) {
  const normalized = String(fullName || "").toLowerCase();
  if (
    normalized.includes(" qizi ") ||
    normalized.endsWith(" qizi") ||
    normalized.includes(" қизи ") ||
    normalized.endsWith(" қизи")
  ) {
    return "Ayol";
  }
  if (
    normalized.includes(" o'g'li ") ||
    normalized.endsWith(" o'g'li") ||
    normalized.includes(" og'li ") ||
    normalized.endsWith(" og'li") ||
    normalized.includes(" ўғли ") ||
    normalized.endsWith(" ўғли")
  ) {
    return "Erkak";
  }
  return "Erkak";
}

function getRepresentativeAvatar(gender) {
  const version = "20260327c";
  const resolve = (fileName) => new URL(fileName, document.baseURI).toString();
  return String(gender || "").toLowerCase() === "ayol"
    ? resolve(`person-woman.png?v=${version}`)
    : resolve(`person-man.png?v=${version}`);
}

function getReceiverAvatar(gender) {
  const version = "20260327c";
  const resolve = (fileName) => new URL(fileName, document.baseURI).toString();
  return String(gender || "").toLowerCase() === "ayol"
    ? resolve(`person-operator-female.png?v=${version}`)
    : resolve(`person-operator-male.png?v=${version}`);
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
    address: `${addressCell?.querySelector("strong")?.textContent?.trim() ?? "-"}, ${addressCell?.querySelector("span")?.textContent?.trim() ?? "-"}, NASP hududiy bo'limi`,
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

  const applicantFullName = formatPersonName(applicantCell?.querySelector("strong")?.textContent?.trim() ?? "-");
  const applicantGender = inferGenderFromPersonName(applicantFullName);

  return {
    id: applicationCell?.querySelector("strong")?.textContent?.trim() ?? applicationId,
    date: applicationDate,
    status: rawStatus || "-",
    region: addressCell?.querySelector("strong")?.textContent?.trim() ?? "-",
    district: addressCell?.querySelector("span")?.textContent?.trim() ?? "-",
    receiver,
    representative,
    applicant: {
      fullName: applicantFullName,
      pinfl: applicantCell?.querySelector("span")?.textContent?.trim() ?? "-",
      birthDate: `${birthDay}.${birthMonth}.${birthYear}`,
      gender: applicantGender,
      disabilityGroup,
      diagnosis: `${diagnosis.label} (${diagnosis.code})`,
      address: fullAddress,
      avatar: getApplicantAvatar({
        applicantName: applicantFullName,
        id: applicationId,
        gender: applicantGender,
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
    approveButton.dataset.processAction = "accept";
    approveButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M6 12.5l4 4 8-9" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg><span>${tr("detail.accept", "Qabul qilish")}</span>`;
    approveButton.addEventListener("click", () => {
      openConfirmModal("accept", applicationId);
    });

    const rejectButton = document.createElement("button");
    rejectButton.type = "button";
    rejectButton.className = "row-menu__item row-menu__item--danger";
    rejectButton.dataset.processAction = "reject";
    rejectButton.innerHTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M8 8l8 8M16 8l-8 8" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg><span>${tr("detail.reject", "Rad etish")}</span>`;
    rejectButton.addEventListener("click", () => {
      openConfirmModal("reject", applicationId);
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

  if (tableState.totalPages <= 1) {
    pages.push(1);
  } else {
    const pageSet = new Set([1, tableState.totalPages, currentPage - 1, currentPage, currentPage + 1]);
    const numericPages = Array.from(pageSet)
      .filter((page) => page >= 1 && page <= tableState.totalPages)
      .sort((left, right) => left - right);

    numericPages.forEach((page, index) => {
      pages.push(page);
      const nextPage = numericPages[index + 1];
      if (nextPage && nextPage - page > 1) {
        pages.push(`ellipsis-${page}`);
      }
    });
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
  document.body.classList.remove("route-modules");
  sidebar?.removeAttribute("hidden");
  applicationsListView?.removeAttribute("hidden");
  applicationsReportView?.setAttribute("hidden", "");
  compositionListView?.setAttribute("hidden", "");
  modulesView?.setAttribute("hidden", "");
  cabinetNavigatorView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  emptyContentView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
}

function showApplicationsReportView() {
  document.body.classList.remove("route-modules");
  sidebar?.removeAttribute("hidden");
  applicationsReportView?.removeAttribute("hidden");
  applicationsListView?.setAttribute("hidden", "");
  compositionListView?.setAttribute("hidden", "");
  modulesView?.setAttribute("hidden", "");
  cabinetNavigatorView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  emptyContentView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
}

function tformat(key, fallback = "", replacements = {}) {
  const template = tr(key, fallback);
  return Object.entries(replacements).reduce((message, [token, value]) => {
    return message.replaceAll(`{${token}}`, value ?? "");
  }, template);
}

function getCompositionStatusClass(status) {
  if (status === "Tasdiqlangan") {
    return "status-badge--accepted";
  }
  if (status === "Rad etilgan") {
    return "status-badge--rejected";
  }
  if (status === "Yangi") {
    return "status-badge--new";
  }
  return "status-badge--process";
}

function buildCompositionActionList(status) {
  const actions = [{ label: "Ko'rish", tone: "default" }];

  if (["Rad etilgan", "Yangi", "Tahrirlangan"].includes(status)) {
    actions.push({ label: "Tahrirlash", tone: "default" });
  }

  if (["Tahrirlangan", "Yangi"].includes(status)) {
    actions.push({ label: "Yuborish", tone: "success" });
  }

  if (status === "Yuborilgan") {
    actions.push({ label: "Rad etish", tone: "danger" });
    actions.push({ label: "Tasdiqlash", tone: "success" });
  }

  if (status === "Tasdiqlangan") {
    actions.push({ label: "Bekor qilish", tone: "danger" });
  }

  return actions;
}

function getCompositionActionIcon(label) {
  const icons = {
    "Ko'rish":
      '<svg viewBox="0 0 24 24" fill="none"><path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>',
    "Tahrirlash":
      '<svg viewBox="0 0 24 24" fill="none"><path d="m4 15.5 9.75-9.75 3.75 3.75L7.75 19.25H4V15.5Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M13 6.5 16.5 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "Yuborish":
      '<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h11M12 5l7 7-7 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "Rad etish":
      '<svg viewBox="0 0 24 24" fill="none"><path d="m7 7 10 10M17 7 7 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "Tasdiqlash":
      '<svg viewBox="0 0 24 24" fill="none"><path d="m5 12 4.5 4.5L19 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    "Bekor qilish":
      '<svg viewBox="0 0 24 24" fill="none"><path d="M6 6h12M9 6V4h6v2M8 6l1 13h6l1-13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  };
  return icons[label] ?? icons["Ko'rish"];
}

function renderCompositionTable(type = "workingGroup") {
  currentCompositionType = type;
  const rows = type === "commission" ? commissionMembersData : workingGroupMembersData;
  const translatedTitle =
    type === "commission"
      ? translateRouteTitle("Arizalar - Komissiya tarkibi")
      : translateRouteTitle("Arizalar - Ishchi guruhi tarkibi");

  if (compositionListTitle) {
    compositionListTitle.textContent = translatedTitle;
  }

  if (!compositionTableBody) {
    return;
  }

  compositionTableBody.innerHTML = rows
    .map((row) => {
      const menuItems = buildCompositionActionList(row.status)
        .map((action) => {
          const toneClass =
            action.tone === "danger"
              ? " row-menu__item--danger"
              : action.tone === "success"
                ? " row-menu__item--accent"
                : "";

          return `<button class="row-menu__item${toneClass}" type="button" data-composition-action="${action.label}" data-composition-id="${row.id}">${getCompositionActionIcon(action.label)}<span>${action.label}</span></button>`;
        })
        .join("");

      return `<tr>
        <td>
          <div class="row-menu">
            <button class="row-menu__toggle" type="button" aria-expanded="false" aria-label="Amallar menyusi">
              <span></span><span></span><span></span>
            </button>
            <div class="row-menu__dropdown">${menuItems}</div>
          </div>
        </td>
        <td>${row.id}</td>
        <td>${row.date}</td>
        <td>${row.region}</td>
        <td><span class="status-badge ${getCompositionStatusClass(row.status)}">${row.status}</span></td>
      </tr>`;
    })
    .join("");

  rowMenuToggles = document.querySelectorAll(".row-menu__toggle");
  bindRowMenuToggles();
}

function showCompositionView() {
  document.body.classList.remove("route-modules");
  sidebar?.removeAttribute("hidden");
  compositionListView?.removeAttribute("hidden");
  applicationsListView?.setAttribute("hidden", "");
  modulesView?.setAttribute("hidden", "");
  cabinetNavigatorView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  emptyContentView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
}

function showDisabilityReportView() {
  document.body.classList.remove("route-modules");
  sidebar?.removeAttribute("hidden");
  applicationsReportView?.setAttribute("hidden", "");
  compositionListView?.setAttribute("hidden", "");
  applicationsListView?.setAttribute("hidden", "");
  modulesView?.setAttribute("hidden", "");
  cabinetNavigatorView?.setAttribute("hidden", "");
  disabilityReportView?.removeAttribute("hidden");
  emptyContentView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
}

function showModulesView() {
  document.body.classList.add("route-modules");
  sidebar?.setAttribute("hidden", "");
  modulesView?.removeAttribute("hidden");
  cabinetNavigatorView?.setAttribute("hidden", "");
  applicationsReportView?.setAttribute("hidden", "");
  compositionListView?.setAttribute("hidden", "");
  applicationsListView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  emptyContentView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
}

function showCabinetNavigatorView() {
  document.body.classList.remove("route-modules");
  sidebar?.removeAttribute("hidden");
  modulesView?.setAttribute("hidden", "");
  cabinetNavigatorView?.removeAttribute("hidden");
  applicationsReportView?.setAttribute("hidden", "");
  compositionListView?.setAttribute("hidden", "");
  applicationsListView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  emptyContentView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
}

function showEmptyView(title) {
  document.body.classList.remove("route-modules");
  sidebar?.removeAttribute("hidden");
  modulesView?.setAttribute("hidden", "");
  cabinetNavigatorView?.setAttribute("hidden", "");
  applicationsReportView?.setAttribute("hidden", "");
  compositionListView?.setAttribute("hidden", "");
  applicationsListView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  contentLoader?.setAttribute("hidden", "");
  emptyContentView?.removeAttribute("hidden");
  if (emptyViewTitle) {
    emptyViewTitle.textContent = translateRouteTitle(title);
  }
  if (emptyViewDescription) {
    if (title === "Home") {
      emptyViewDescription.textContent = "";
      emptyViewDescription.setAttribute("hidden", "");
    } else {
      const translatedTitle = translateRouteTitle(title);
      emptyViewDescription.textContent = `"${translatedTitle}" ${tr("empty.notReady", "bo'limi uchun kontent hali tayyorlanmagan.")}`;
      emptyViewDescription.removeAttribute("hidden");
    }
  }
}

async function navigateToView(title) {
  const normalizedTitle = title.trim();
  const isModulesHub = normalizedTitle === "Modullar";
  const isHomeView = normalizedTitle === "Home";
  const isApplicationsList = normalizedTitle === "Arizalar - Arizalar ro'yxati";
  const isApplicationsReport = normalizedTitle === "Hisobotlar - Arizalar bo'yicha hisobot";
  const isWorkingGroupComposition = normalizedTitle === "Arizalar - Ishchi guruhi tarkibi";
  const isCommissionComposition = normalizedTitle === "Arizalar - Komissiya tarkibi";
  const isDisabilityReport = normalizedTitle === "Hisobotlar - Nogironligi bo'lgan shaxslar soni bo'yicha hisobot";
  const isSocialNavigator = normalizedTitle === "Ijtimoiy navigator";

  if (!isModulesHub && !isHomeView && !isApplicationsList && !isApplicationsReport && !isWorkingGroupComposition && !isCommissionComposition && !isDisabilityReport && !isSocialNavigator) {
    showEmptyView(normalizedTitle.split(" - ").pop() ?? normalizedTitle);
    return;
  }

  emptyContentView?.setAttribute("hidden", "");
  modulesView?.setAttribute("hidden", "");
  cabinetNavigatorView?.setAttribute("hidden", "");
  compositionListView?.setAttribute("hidden", "");
  applicationsListView?.setAttribute("hidden", "");
  applicationsReportView?.setAttribute("hidden", "");
  disabilityReportView?.setAttribute("hidden", "");
  contentLoader?.removeAttribute("hidden");
  await sleep(200);

  if (isModulesHub) {
    showModulesView();
    return;
  }

  if (isHomeView) {
    showEmptyView("Home");
    return;
  }

  if (isApplicationsList) {
    showApplicationsView();
    return;
  }

  if (isApplicationsReport) {
    renderApplicationsReportTable();
    showApplicationsReportView();
    return;
  }

  if (isWorkingGroupComposition) {
    renderCompositionTable("workingGroup");
    showCompositionView();
    return;
  }

  if (isCommissionComposition) {
    renderCompositionTable("commission");
    showCompositionView();
    return;
  }

  if (isSocialNavigator) {
    showCabinetNavigatorView();
    return;
  }

  showDisabilityReportView();
}

cabinetNavigatorView?.addEventListener("click", async (event) => {
  const actionButton = event.target.closest("[data-navigator-action]");
  if (!(actionButton instanceof HTMLElement)) {
    return;
  }

  const action = actionButton.getAttribute("data-navigator-action");
  if (!action) {
    return;
  }

  if (action === "create-application") {
    window.location.hash = "/mrv/applications/applicationList";
    await applyRouteFromHash();
    showToast("Arizalar ro'yxati ochildi", "Yangi murojaat yaratish uchun tegishli bo'limga o'tdingiz.");
    return;
  }

  if (action === "support") {
    showToast("Support tavsiya qilindi", "Call-markaz yoki Telegram support orqali tezkor bog'lanish mumkin.");
    return;
  }

  if (action === "check-status") {
    showToast("Holat yangilandi", "So'nggi murojaatlar va xizmat holatlari qayta tekshirildi.");
    return;
  }

  if (action === "find-service") {
    showToast("Xizmatlar yangilandi", "Hududingiz bo'yicha eng yaqin xizmatlar ro'yxati yangilandi.");
    return;
  }

  showToast("Profil yangilash", "Ma'lumotlarni yangilash funksiyasi keyingi bosqichda kengaytiriladi.");
});

compositionFilterButton?.addEventListener("click", () => {
  const title =
    currentCompositionType === "commission"
      ? "Komissiya tarkibi filtri"
      : "Ishchi guruhi tarkibi filtri";
  showToast(title, "Filter logikasi keyingi bosqichda backend bilan bog'lanadi.");
});

compositionCreateButton?.addEventListener("click", () => {
  const title =
    currentCompositionType === "commission"
      ? "Komissiya tarkibini yaratish"
      : "Ishchi guruhi tarkibini yaratish";
  showToast(title, "Yaratish formasi uchun starter view keyingi bosqichda qo'shiladi.");
});

compositionTableBody?.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-composition-action]");
  if (!(actionButton instanceof HTMLElement)) {
    return;
  }

  const action = actionButton.getAttribute("data-composition-action");
  const itemId = actionButton.getAttribute("data-composition-id");
  if (!action || !itemId) {
    return;
  }

  document.querySelectorAll(".row-menu").forEach((menu) => {
    menu.classList.remove("row-menu--open");
    menu.querySelector(".row-menu__toggle")?.setAttribute("aria-expanded", "false");
  });

  showToast(action, `${itemId} bo'yicha "${action}" amali demo rejimda tayyorlandi.`);
});

function formatSupportTimestamp() {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

function prependSupportTicket(ticket) {
  if (!supportTicketList) {
    return;
  }

  const article = document.createElement("article");
  article.className = "support-ticket";
  article.innerHTML = `
    <div class="support-ticket__top">
      <strong>${ticket.id}</strong>
      <span class="support-ticket__status support-ticket__status--new">Yangi</span>
    </div>
    <p>${ticket.description}</p>
    <small>Yangilangan: ${ticket.updatedAt}</small>
  `;
  supportTicketList.prepend(article);
}

function getHashForTitle(title) {
  const moduleConfig = getModuleConfig();
  const routeEntry = Object.entries(moduleConfig.routes).find(([, routeTitle]) => routeTitle === title);
  return normalizeRoutePath(routeEntry?.[0] ?? "");
}

function getTitleFromHash(hashValue) {
  const normalizedPath = normalizeRoutePath(hashValue);
  const moduleKey = getModuleKeyFromHash(normalizedPath);
  return modulesConfig[moduleKey]?.routes?.[normalizedPath] ?? "";
}

function getReportFilterValues() {
  return {
    diagnosis: reportDiagnosisFilter?.value ?? "all",
    group: reportDisabilityGroupFilter?.value ?? "all",
    gender: reportGenderFilter?.value ?? "all",
    age: reportAgeFilter?.value ?? "all",
  };
}

function getCatalogLabel(items, value, fallback = "") {
  const match = items.find((item) => String(item.value) === String(value));
  return match?.label ?? fallback;
}

function getApplicationRegionLabel(value) {
  return getCatalogLabel(getCurrentRegionOptions(), value, value);
}

function getApplicationStepLabel(value) {
  return tl(applicationStepLabels[value] ?? value);
}

function getDefaultStepForStatus(status) {
  const normalized = status.toLowerCase();
  if (normalized === "jarayonda") {
    return "134";
  }
  if (normalized === "qabul qilingan") {
    return "171";
  }
  if (normalized === "rad etilgan") {
    return "136";
  }
  return "";
}

function getApplicationOrganizationTypeLabel(value) {
  return tl(applicationOrganizationTypeLabels[value] ?? value);
}

function getFallbackDistrictOptionsFromRows(regionValue) {
  const seen = new Map();

  Array.from(applicationRows)
    .filter((row) => String(row.getAttribute("data-region") ?? "") === String(regionValue))
    .forEach((row) => {
      const value = String(row.getAttribute("data-district") ?? "").trim();
      if (!value || value === "all" || seen.has(value)) {
        return;
      }

      const label = row.getAttribute("data-district-raw")
        ?? row.querySelector("td:nth-child(5) span")?.textContent?.trim()
        ?? value;

      seen.set(value, { value, label, regionId: String(regionValue) });
    });

  return Array.from(seen.values());
}

function getFallbackOrganizationOptionsFromRows(organizationTypeValue) {
  const seen = new Map();

  Array.from(applicationRows)
    .filter((row) => String(row.getAttribute("data-organization-type") ?? "") === String(organizationTypeValue))
    .forEach((row) => {
      const value = String(row.getAttribute("data-organization") ?? "").trim();
      if (!value || value === "all" || seen.has(value)) {
        return;
      }

      const label = row.getAttribute("data-organization-raw")
        ?? row.querySelector("td:nth-child(4) strong")?.textContent?.trim()
        ?? value;

      seen.set(value, { value, label, organizationTypeId: String(organizationTypeValue) });
    });

  return Array.from(seen.values());
}

function getCurrentRegionOptions() {
  return applicationStaticFilterOptions.regions;
}

function getCurrentDistrictOptions(regionValue) {
  if (!regionValue || regionValue === "all") {
    return [];
  }

  return getFallbackDistrictOptionsFromRows(regionValue);
}

function getCurrentOrganizationOptions(organizationTypeValue) {
  if (!organizationTypeValue || organizationTypeValue === "all") {
    return [];
  }

  return getFallbackOrganizationOptionsFromRows(organizationTypeValue);
}

function getApplicationDistrictLabel(value) {
  const currentRegionValue = regionFilter?.value ?? applicationAppliedFilters.region;
  return getCatalogLabel(getCurrentDistrictOptions(currentRegionValue), value, value);
}

function getApplicationOrganizationLabel(value) {
  const currentOrganizationTypeValue = organizationTypeFilter?.value ?? applicationAppliedFilters.organizationType;
  return getCatalogLabel(getCurrentOrganizationOptions(currentOrganizationTypeValue), value, value);
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
  const normalizedValues = Array.from(
    new Set(
      values.filter((value) => {
        if (!value) {
          return false;
        }
        return String(value).trim().toLowerCase() !== "all";
      }),
    ),
  );
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
    const organizationPrimary = row.querySelector("td:nth-child(4) strong");
    const organizationSecondary = row.querySelector("td:nth-child(4) span");
    const regionPrimary = row.querySelector("td:nth-child(5) strong");
    const districtSecondary = row.querySelector("td:nth-child(5) span");
    if (organizationPrimary && !organizationPrimary.dataset.rawValue) {
      organizationPrimary.dataset.rawValue = organizationPrimary.textContent?.trim() ?? "";
    }
    if (organizationSecondary && !organizationSecondary.dataset.rawValue) {
      organizationSecondary.dataset.rawValue = organizationSecondary.textContent?.trim() ?? "";
    }
    if (regionPrimary && !regionPrimary.dataset.rawValue) {
      regionPrimary.dataset.rawValue = regionPrimary.textContent?.trim() ?? "";
    }
    if (districtSecondary && !districtSecondary.dataset.rawValue) {
      districtSecondary.dataset.rawValue = districtSecondary.textContent?.trim() ?? "";
    }
    if (organizationPrimary?.dataset.rawValue) {
      row.dataset.organizationRaw = organizationPrimary.dataset.rawValue;
    }
    if (organizationSecondary?.dataset.rawValue) {
      row.dataset.organizationRegionRaw = organizationSecondary.dataset.rawValue;
    }
    if (regionPrimary?.dataset.rawValue) {
      row.dataset.regionLabelRaw = regionPrimary.dataset.rawValue;
    }
    if (districtSecondary?.dataset.rawValue) {
      row.dataset.districtRaw = districtSecondary.dataset.rawValue;
    }

    const organization = row.dataset.organizationRaw
      ?? organizationPrimary?.dataset.rawValue
      ?? organizationPrimary?.textContent?.trim()
      ?? "";
    const organizationRegion = row.dataset.organizationRegionRaw
      ?? organizationSecondary?.dataset.rawValue
      ?? organizationSecondary?.textContent?.trim()
      ?? "";
    const regionLabel = row.dataset.regionLabelRaw
      ?? regionPrimary?.dataset.rawValue
      ?? regionPrimary?.textContent?.trim()
      ?? "";
    const district = row.dataset.districtRaw
      ?? districtSecondary?.dataset.rawValue
      ?? districtSecondary?.textContent?.trim()
      ?? "";
    const status = row.getAttribute("data-status") ?? "";
    const organizationTypeMatch = organization.match(/\(([^)]+)\)\s*$/);
    const organizationType = organizationTypeMatch?.[1]?.trim().toLowerCase() ?? "";
    const stepValue = normalizeApplicationStepValue(metadata.step || getDefaultStepForStatus(status), "");

    if (organizationPrimary) {
      organizationPrimary.textContent = translateDisplayValue(organization);
    }
    if (organizationSecondary) {
      organizationSecondary.textContent = translateDisplayValue(organizationRegion);
    }
    if (regionPrimary) {
      regionPrimary.textContent = translateDisplayValue(regionLabel);
    }
    if (districtSecondary) {
      districtSecondary.textContent = translateDisplayValue(district);
    }

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
  const organizationTypeValue = organizationTypeFilter?.value ?? "all";
  const allowedStepValues = statusValue === "all"
    ? applicationStaticFilterOptions.steps.map((item) => item.value)
    : applicationStaticFilterOptions.steps
      .filter((item) => {
        if (statusValue === "jarayonda") {
          return ["112", "131", "133", "134"].includes(item.value);
        }
        if (statusValue === "qabul qilingan") {
          return ["171", "172"].includes(item.value);
        }
        if (statusValue === "rad etilgan") {
          return ["132", "136"].includes(item.value);
        }
        return true;
      })
      .map((item) => item.value);
  const regionOptions = getCurrentRegionOptions();
  const districtOptions = getCurrentDistrictOptions(regionValue);
  const organizationOptions = getCurrentOrganizationOptions(organizationTypeValue);

  setCustomSelectOptions(statusFilter, applicationStaticFilterOptions.statuses.map((item) => item.value), (value) => {
    return getCatalogLabel(applicationStaticFilterOptions.statuses, value, value);
  });
  setCustomSelectOptions(stepFilter, allowedStepValues, (value) => {
    return getCatalogLabel(applicationStaticFilterOptions.steps, value, value);
  });
  setCustomSelectOptions(regionFilter, regionOptions.map((item) => item.value), getApplicationRegionLabel);
  setCustomSelectOptions(districtFilter, districtOptions.map((item) => item.value), getApplicationDistrictLabel);
  setCustomSelectOptions(
    organizationTypeFilter,
    applicationStaticFilterOptions.organizationTypes.map((item) => item.value),
    getApplicationOrganizationTypeLabel,
  );
  setCustomSelectOptions(
    organizationFilter,
    organizationOptions.map((item) => item.value),
    getApplicationOrganizationLabel,
  );

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

function applyReportFilters() {
  reportAppliedFilters = { ...getReportFilterValues() };
  updateReportFilterControls();
  renderReportTable();
  syncReportFrozenColumn();
}

function getApplicationsReportStatusLabel(value) {
  if (value === "all") {
    return tr("common.all", "Barchasi");
  }

  const labels = {
    "jarayonda": tr("status.process", "Jarayonda"),
    "rad etilgan": tr("status.rejected", "Rad etilgan"),
    "qabul qilingan": tr("status.accepted", "Qabul qilingan"),
  };

  return labels[value] ?? value;
}

function getApplicationsReportStepLabel(value) {
  if (value === "all") {
    return tr("common.all", "Barchasi");
  }

  const labels = {
    "131": "Ishchi guruhi tomonidan ko'rib chiqilmoqda",
    "133": "Ishchi guruhi tomonidan qabul qilingan",
    "134": "Komissiya tomonidan ko'rib chiqilmoqda",
    "132": "Ishchi guruhidan rad etilgan",
    "136": "Komissiyadan rad etilgan",
    "accepted": "Qabul qilingan",
  };

  return translateDisplayValue(labels[value] ?? value);
}

function getApplicationsReportGenderLabel(value) {
  if (value === "all") {
    return tr("common.all", "Barchasi");
  }

  return translateDisplayValue(value === "erkak" ? "Erkak" : "Ayol");
}

function getApplicationsReportAgeLabel(value) {
  if (value === "all") {
    return tr("common.all", "Barchasi");
  }

  return value;
}

function updateApplicationsReportFilterOptionSets() {
  setCustomSelectOptions(applicationsReportStatusFilter, ["all", "jarayonda", "rad etilgan", "qabul qilingan"], getApplicationsReportStatusLabel);
  setCustomSelectOptions(applicationsReportStepFilter, ["all", "131", "133", "134", "132", "136", "accepted"], getApplicationsReportStepLabel);
  setCustomSelectOptions(applicationsReportGenderFilter, ["all", "erkak", "ayol"], getApplicationsReportGenderLabel);
  setCustomSelectOptions(applicationsReportAgeFilter, ["all", "0-3", "3-7", "7-18", "18-55/60", "55/60+"], getApplicationsReportAgeLabel);
}

function getApplicationsReportFilterValues() {
  return {
    status: applicationsReportStatusFilter?.value ?? "all",
    step: applicationsReportStepFilter?.value ?? "all",
    gender: applicationsReportGenderFilter?.value ?? "all",
    age: applicationsReportAgeFilter?.value ?? "all",
    dateFrom: applicationsReportDateFromFilter?.value ?? "",
    dateTo: applicationsReportDateToFilter?.value ?? applicationsReportDefaultFilters.dateTo,
  };
}

function getApplicationsReportFilterActiveCount() {
  const values = getApplicationsReportFilterValues();
  return Object.entries(values).reduce((count, [key, value]) => count + (value !== applicationsReportDefaultFilters[key] ? 1 : 0), 0);
}

function updateApplicationsReportFilterControls() {
  updateApplicationsReportFilterOptionSets();
  const activeCount = getApplicationsReportFilterActiveCount();
  const currentFilters = getApplicationsReportFilterValues();
  const hasPendingChanges = Object.keys(applicationsReportDefaultFilters).some(
    (key) => currentFilters[key] !== applicationsReportAppliedFilters[key],
  );
  const hasAppliedFilters = Object.keys(applicationsReportDefaultFilters).some(
    (key) => applicationsReportAppliedFilters[key] !== applicationsReportDefaultFilters[key],
  );

  if (applicationsReportApplyFilters) {
    applicationsReportApplyFilters.disabled = !hasPendingChanges;
  }

  if (applicationsReportResetFilters) {
    applicationsReportResetFilters.disabled = !hasAppliedFilters;
  }

  if (applicationsReportFilterToggle) {
    applicationsReportFilterToggle.classList.toggle("table-action--active", activeCount > 0);
  }

  if (applicationsReportFilterActiveCount) {
    applicationsReportFilterActiveCount.hidden = activeCount === 0;
    applicationsReportFilterActiveCount.textContent = String(activeCount);
  }
}

function getApplicationsReportFilteredRows() {
  ensureApplicationRowsSeeded();

  return applicationRows.filter((row) => {
    const statusValue = String(row.getAttribute("data-status") ?? "").trim().toLowerCase();
    const stepValue = String(row.getAttribute("data-step") ?? "").trim();
    const genderValue = String(row.getAttribute("data-gender") ?? "").trim().toLowerCase();
    const ageGroupValue = String(row.getAttribute("data-age-group") ?? "").trim();
    const dateIso = String(row.getAttribute("data-date-iso") ?? "").trim();

    if (applicationsReportAppliedFilters.status !== "all" && statusValue !== applicationsReportAppliedFilters.status) {
      return false;
    }

    if (applicationsReportAppliedFilters.step !== "all") {
      if (applicationsReportAppliedFilters.step === "accepted") {
        if (!["171", "172"].includes(stepValue)) {
          return false;
        }
      } else if (stepValue !== applicationsReportAppliedFilters.step) {
        return false;
      }
    }

    if (applicationsReportAppliedFilters.gender !== "all" && genderValue !== applicationsReportAppliedFilters.gender) {
      return false;
    }

    if (applicationsReportAppliedFilters.age !== "all" && ageGroupValue !== applicationsReportAppliedFilters.age) {
      return false;
    }

    if (applicationsReportAppliedFilters.dateFrom && (!dateIso || dateIso < applicationsReportAppliedFilters.dateFrom)) {
      return false;
    }

    if (applicationsReportAppliedFilters.dateTo && (!dateIso || dateIso > applicationsReportAppliedFilters.dateTo)) {
      return false;
    }

    return true;
  });
}

function applyApplicationsReportFilters(closeMenu = true) {
  applicationsReportAppliedFilters = { ...getApplicationsReportFilterValues() };
  applicationsReportState.level = "region";
  applicationsReportState.selectedRegionKey = null;
  updateApplicationsReportFilterControls();
  renderApplicationsReportTable();

  if (closeMenu) {
    applicationsReportFilterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
    applicationsReportFilterToggle?.setAttribute("aria-expanded", "false");
  }
}

function syncReportFrozenColumn() {
  return;
}

function normalizeThemeKey(themeKey) {
  if (themeKey === "classic-light") {
    return "brand-light";
  }

  if (themeKey === "classic-dark") {
    return "brand-dark";
  }

  return themeKey;
}

function getThemeMeta(themeKey) {
  const normalizedThemeKey = normalizeThemeKey(themeKey);
  return themeModes.find((theme) => theme.key === normalizedThemeKey) ?? themeModes[0];
}

function getCurrentThemeKey() {
  return normalizeThemeKey(document.body.dataset.theme) || (document.body.classList.contains("theme-dark") ? "brand-dark" : "brand-light");
}

function getNextThemeKey(themeKey) {
  const currentIndex = themeModes.findIndex((theme) => theme.key === themeKey);
  const safeIndex = currentIndex === -1 ? 0 : currentIndex;
  return themeModes[(safeIndex + 1) % themeModes.length].key;
}

function setThemeIcon(themeKey) {
  if (!themeToggleIcon) {
    return;
  }

  themeToggleIcon.innerHTML = getThemeMeta(themeKey).dark
    ? '<path d="M12 3v2.2M12 18.8V21M4.9 4.9l1.6 1.6M17.5 17.5l1.6 1.6M3 12h2.2M18.8 12H21M4.9 19.1l1.6-1.6M17.5 6.5l1.6-1.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="12" cy="12" r="4.2" stroke="currentColor" stroke-width="1.5"/>'
    : '<path d="M14.5 4.5a7 7 0 1 0 5 12 7.5 7.5 0 1 1-5-12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>';
}

function applyTheme(themeKey) {
  const normalizedThemeKey = normalizeThemeKey(themeKey);
  const theme = getThemeMeta(normalizedThemeKey);

  document.body.dataset.theme = theme.key;
  document.body.classList.toggle("theme-dark", theme.dark);
  themeToggle?.setAttribute("aria-pressed", String(theme.dark));
  themeToggle?.setAttribute("aria-label", theme.label);
  themeToggle?.setAttribute("title", theme.label);
  setThemeIcon(theme.key);
}

function getSavedThemePreference() {
  const savedTheme = normalizeThemeKey(window.localStorage.getItem(themeStorageKey));
  return themeModes.some((theme) => theme.key === savedTheme) ? savedTheme : null;
}

function initializeTheme() {
  const savedTheme = getSavedThemePreference();
  const themeKey = savedTheme || (systemTheme?.matches ? "brand-dark" : "brand-light");
  applyTheme(themeKey);
}

function initializeLanguage() {
  currentLanguage = languageMeta[getSavedLanguagePreference()] ? getSavedLanguagePreference() : "uz";
  currentFont = fontMeta[getSavedFontPreference()] ? getSavedFontPreference() : "noto";
  applyStaticTranslations();
}

if (loginForm && loginUsername && loginPassword && loginSubmit) {
  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = loginUsername.value.trim();
    const password = loginPassword.value.trim();
    const shouldRemember = Boolean(rememberMe?.checked);

    loginError?.setAttribute("hidden", "");
    loginSubmit.disabled = true;
    loginSubmit.innerHTML = `<span class="login-submit__spinner" aria-hidden="true"></span><span>${tr("login.signingIn", "Kirilmoqda...")}</span>`;

    await sleep(200);

    if (username === "admin" && password === "muruvvat123") {
      persistAuthState(shouldRemember);
      rememberUsername(shouldRemember ? username : "");
      const targetRoute = resolvePostLoginRoute();
      loginSubmit.disabled = false;
      loginSubmit.textContent = tr("login.submit", "Kirish");
      showAppView();
      window.location.hash = targetRoute;
      showToast(
        tr("login.welcomeTitle", "Xush kelibsiz"),
        tformat("login.welcomeDescription", "Tizimga muvaffaqiyatli kirildi.", {
          module: tl("Asosiy menyu"),
        }),
      );
      return;
    }

    loginSubmit.disabled = false;
    loginSubmit.textContent = tr("login.submit", "Kirish");
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
    tr("login.resetPasswordUnavailableTitle", "Parolni tiklash"),
    tr("login.resetPasswordUnavailableDescription", "Demo rejimda parolni tiklash ulanmagan. Administrator yoki OneID orqali kirishdan foydalaning."),
  );
});

supportGuides.forEach((guide) => {
  guide.addEventListener("click", () => {
    const title = guide.getAttribute("data-guide-title") ?? tr("support.guideFallback", "Qo'llanma");
    const guideData = supportGuideMap[title];

    if (guideData) {
      if (supportGuidePreviewTitle) {
        supportGuidePreviewTitle.textContent = title;
      }
      if (supportGuidePreviewText) {
        supportGuidePreviewText.textContent = guideData.text;
      }
      if (supportGuidePreviewSteps) {
        supportGuidePreviewSteps.innerHTML = guideData.steps.map((step) => `<li>${step}</li>`).join("");
      }
    }

    showToast(
      tformat("support.guideOpenedTitle", `${title} ochildi`, { title }),
      tformat("support.guideOpenedDescription", `${title} bo'yicha yo'riqnoma demo rejimda yangi oynada ochilishga tayyor holatda ko'rsatildi.`, { title }),
    );
  });
});

supportForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!supportCategory || !supportPriority || !supportApplicationId || !supportContactMethod || !supportMessage || !supportSubmit) {
    return;
  }

  const message = supportMessage.value.trim();
  if (!message) {
    showToast(
      tr("support.descriptionMissingTitle", "Tavsif kiritilmadi"),
      tr("support.descriptionMissingDescription", "Murojaat yuborish uchun muammo tavsifini yozing."),
      "error",
    );
    supportMessage.focus();
    return;
  }

  supportSubmit.disabled = true;
  supportSubmit.innerHTML = `<span class="confirm-modal__button-spinner" aria-hidden="true"></span><span>${tr("common.submitting", "Yuborilmoqda...")}</span>`;
  await sleep(1000);

  const ticketId = `SUP-${supportTicketCounter}`;
  supportTicketCounter += 1;
  const applicationId = supportApplicationId.value.trim();

  prependSupportTicket({
    id: ticketId,
    description: `${supportCategory.value}: ${applicationId ? `${applicationId} bo'yicha ` : ""}${message}`,
    updatedAt: formatSupportTimestamp(),
  });

  supportForm.reset();
  supportSubmit.disabled = false;
  supportSubmit.textContent = tr("support.send", "Yuborish");
  showToast(
    tr("support.sentTitle", "Murojaat yuborildi"),
    tformat("support.sentDescription", `${ticketId} raqamli support ticket yaratildi. ${supportContactMethod.value} orqali qayta bog'laniladi.`, {
      ticket: ticketId,
      channel: translateDisplayValue(supportContactMethod.value),
    }),
  );
});

logoutButton?.addEventListener("click", () => {
  clearAuthState();
  window.sessionStorage.removeItem(routeIntentStorageKey);
  showLoginView();
  loginUsername && (loginUsername.value = getRememberedUsername());
  loginPassword && (loginPassword.value = "");
  rememberMe && (rememberMe.checked = Boolean(getRememberedUsername()));
  loginSubmit && (loginSubmit.textContent = tr("login.submit", "Kirish"));
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
    const nextTheme = getNextThemeKey(getCurrentThemeKey());
    window.localStorage.setItem(themeStorageKey, nextTheme);
    applyTheme(nextTheme);
  });
}

systemTheme?.addEventListener("change", (event) => {
  if (getSavedThemePreference()) {
    return;
  }

  applyTheme(event.matches ? "brand-dark" : "brand-light");
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

  if (applicationsReportFilterToggle && applicationsReportFilterMenu) {
    const applicationsReportFilterContainer = applicationsReportFilterToggle.closest(".table-menu");
    if (applicationsReportFilterContainer && !applicationsReportFilterContainer.contains(target)) {
      applicationsReportFilterContainer.classList.remove("table-menu--open");
      applicationsReportFilterToggle.setAttribute("aria-expanded", "false");
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
  if (title === "Modullar") {
    document.title = "NASP - Modullar";
    if (pageBreadcrumb) {
      pageBreadcrumb.textContent = tl("Asosiy menyu");
    }
    return;
  }
  const moduleShortNameMap = {
    muruvvat: "MRV",
    ptpk: "PTPK",
    cabinet: "Kabinet",
  };
  const moduleShortName = moduleShortNameMap[currentModule] || "NASP";
  const pageName = parts[parts.length - 1];
  document.title = pageName === "Home" ? moduleShortName : `${moduleShortName} - ${pageName}`;
  if (pageBreadcrumb) {
    pageBreadcrumb.textContent = parts.length > 1 ? parts.join(" / ") : tl("Asosiy menyu");
  }
}

function syncDocumentTitleForAuth() {
  document.title = "NASP - Kirish";
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
    const nextLocation = nextHash ? `#${nextHash}` : "";
    if (nextHash && window.location.hash !== nextLocation) {
      window.location.hash = nextHash;
      await applyRouteFromHash();
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
  let startIndex = 0;
  let endIndex = matchedRows.length;
  tableState.totalPages = Math.max(1, Math.ceil(matchedRows.length / limit));
  tableState.currentPage = Math.min(tableState.currentPage, tableState.totalPages);
  startIndex = (tableState.currentPage - 1) * limit;
  endIndex = startIndex + limit;
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
    totalApplicationsShare.textContent = totalBase > 0 ? "100%" : "0%";
  }
  if (processApplicationsStat) {
    processApplicationsStat.textContent = String(processCount);
  }
  if (processApplicationsShare) {
    processApplicationsShare.textContent = totalBase > 0 ? percent(processCount) : "0%";
  }
  if (acceptedApplicationsStat) {
    acceptedApplicationsStat.textContent = String(acceptedCount);
  }
  if (acceptedApplicationsShare) {
    acceptedApplicationsShare.textContent = totalBase > 0 ? percent(acceptedCount) : "0%";
  }
  if (rejectedApplicationsStat) {
    rejectedApplicationsStat.textContent = String(rejectedCount);
  }
  if (rejectedApplicationsShare) {
    rejectedApplicationsShare.textContent = totalBase > 0 ? percent(rejectedCount) : "0%";
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
  showToast(
    tr("applications.exportDoneTitle", "Eksport yakunlandi"),
    tr("applications.exportDoneDescription", "Ro'yxat fayl ko'rinishida tayyorlandi."),
  );
});

sidebarHomeButton?.addEventListener("click", async () => {
  if (loginView && !loginView.hasAttribute("hidden")) {
    return;
  }

  if (appShell?.classList.contains("app-shell--collapsed")) {
    appShell.classList.remove("app-shell--collapsed");
    sidebarCollapse?.setAttribute("aria-expanded", "true");
    return;
  }

  const defaultHash = `#${getModuleConfig(currentModule).defaultHash}`;
  if (window.location.hash !== defaultHash) {
    window.location.hash = defaultHash;
    return;
  }

  await applyRouteFromHash();
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
    showToast(
      tr("report.downloadFailedTitle", "Xatolik"),
      tr("report.downloadFailedDescription", "Hisobotni yuklab bo'lmadi."),
    );
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

[statusFilter, stepFilter, districtFilter, organizationFilter].forEach((select) => {
  select?.addEventListener("change", () => {
    updateApplicationFilterOptionSets();
    updateApplicationFilterControls();
  });
});

regionFilter?.addEventListener("change", async () => {
  if (districtFilter) {
    districtFilter.value = "all";
  }

  updateApplicationFilterOptionSets();
  updateApplicationFilterControls();
});

organizationTypeFilter?.addEventListener("change", async () => {
  if (organizationFilter) {
    organizationFilter.value = "all";
  }

  updateApplicationFilterOptionSets();
  updateApplicationFilterControls();
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

fontItems.forEach((button) => {
  button.addEventListener("click", () => {
    const nextFont = button.getAttribute("data-font-code") || "noto";
    applyFont(nextFont);
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
    if (input.id === "applicationsReportDateFromFilter" || input.id === "applicationsReportDateToFilter") {
      updateApplicationsReportFilterControls();
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
    const isApplicationsReportDateField = input?.id === "applicationsReportDateFromFilter" || input?.id === "applicationsReportDateToFilter";

    const enterApplicationDateEditMode = () => {
      if (!isApplicationDateField && !isApplicationsReportDateField) {
        return;
      }

      textInput.dataset.previousValue = input.value ?? "";
      textInput.placeholder = getDateInputMask();
      if (textInput.value.trim()) {
        textInput.value = "";
      }
    };

    if (input?.id === "dateFromFilter" || input?.id === "dateToFilter" || input?.id === "applicationsReportDateFromFilter" || input?.id === "applicationsReportDateToFilter") {
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
        if ((input?.id === "dateFromFilter" || input?.id === "dateToFilter" || input?.id === "applicationsReportDateFromFilter" || input?.id === "applicationsReportDateToFilter") && textInput.dataset.previousValue) {
          input instanceof HTMLInputElement && (input.value = textInput.dataset.previousValue);
          syncDateFieldUi(field);
        } else {
          input instanceof HTMLInputElement && (input.value = "");
          syncDateFieldUi(field);
        }
        } else {
          syncDateFieldUi(field);
        }

        textInput.placeholder = textInput.value.trim() ? getDateInputMask() : getDateInputPlaceholder();
        delete textInput.dataset.previousValue;

      if (input.id === "applicationsReportDateFromFilter" || input.id === "applicationsReportDateToFilter") {
        updateApplicationsReportFilterControls();
        return;
      }

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

[
  applicationsReportStatusFilter,
  applicationsReportStepFilter,
  applicationsReportGenderFilter,
  applicationsReportAgeFilter,
].forEach((select) => {
  select?.addEventListener("change", updateApplicationsReportFilterControls);
});

reportApplyFilters?.addEventListener("click", () => {
  applyReportFilters();
  reportFilterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
  reportFilterToggle?.setAttribute("aria-expanded", "false");
});

reportFilterMenuClose?.addEventListener("click", () => {
  reportFilterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
  reportFilterToggle?.setAttribute("aria-expanded", "false");
});

if (applicationsReportFilterToggle && applicationsReportFilterMenu) {
  applicationsReportFilterToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const filterContainer = applicationsReportFilterToggle.closest(".table-menu");
    if (!filterContainer) {
      return;
    }

    const isOpen = filterContainer.classList.contains("table-menu--open");
    filterContainer.classList.toggle("table-menu--open", !isOpen);
    applicationsReportFilterToggle.setAttribute("aria-expanded", String(!isOpen));
    if (!isOpen) {
      syncTableMenuMaxHeight(applicationsReportFilterToggle, applicationsReportFilterMenu);
    }
  });
}

applicationsReportApplyFilters?.addEventListener("click", () => {
  applyApplicationsReportFilters();
});

applicationsReportFilterMenuClose?.addEventListener("click", () => {
  applicationsReportFilterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
  applicationsReportFilterToggle?.setAttribute("aria-expanded", "false");
});

applicationsReportResetFilters?.addEventListener("click", () => {
  if (applicationsReportStatusFilter) applicationsReportStatusFilter.value = applicationsReportDefaultFilters.status;
  if (applicationsReportStepFilter) applicationsReportStepFilter.value = applicationsReportDefaultFilters.step;
  if (applicationsReportGenderFilter) applicationsReportGenderFilter.value = applicationsReportDefaultFilters.gender;
  if (applicationsReportAgeFilter) applicationsReportAgeFilter.value = applicationsReportDefaultFilters.age;
  if (applicationsReportDateFromFilter) applicationsReportDateFromFilter.value = applicationsReportDefaultFilters.dateFrom;
  if (applicationsReportDateToFilter) applicationsReportDateToFilter.value = applicationsReportDefaultFilters.dateTo;
  applicationsReportDateFromText && (applicationsReportDateFromText.placeholder = getLocalizedDateEntryPlaceholder());
  applicationsReportDateToText && (applicationsReportDateToText.placeholder = getLocalizedDateEntryPlaceholder());
  applicationsReportDateFromFilter?.closest("[data-date-field]") && syncDateFieldUi(applicationsReportDateFromFilter.closest("[data-date-field]"));
  applicationsReportDateToFilter?.closest("[data-date-field]") && syncDateFieldUi(applicationsReportDateToFilter.closest("[data-date-field]"));
  applicationsReportAppliedFilters = { ...applicationsReportDefaultFilters };
  updateApplicationsReportFilterControls();
  applicationsReportState.level = "region";
  applicationsReportState.selectedRegionKey = null;
  renderApplicationsReportTable();
  applicationsReportFilterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
  applicationsReportFilterToggle?.setAttribute("aria-expanded", "false");
});

if (applicationsReportDateToFilter && !applicationsReportDateToFilter.value) {
  applicationsReportDateToFilter.value = applicationsReportDefaultFilters.dateTo;
}

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

applicationsReportScopeBack?.addEventListener("click", () => {
  applicationsReportState.level = "region";
  applicationsReportState.selectedRegionKey = null;
  renderApplicationsReportTable();
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

applicationsReportTableBody?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLElement)) {
    return;
  }

  const valueCell = target.closest('td[data-col]:not([data-col="region"])');
  if (valueCell instanceof HTMLTableCellElement && applicationsReportTableBody.contains(valueCell)) {
    toggleApplicationsReportCellSelection(valueCell, event.ctrlKey || event.metaKey);
    return;
  }

  const regionButton = target.closest("[data-applications-report-region]");
  if (!(regionButton instanceof HTMLButtonElement)) {
    return;
  }

  applicationsReportState.level = "district";
  applicationsReportState.selectedRegionKey = regionButton.dataset.applicationsReportRegion ?? null;
  renderApplicationsReportTable();
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") {
    return;
  }

  if (reportSelectedCells.size > 0) {
    clearReportSelection();
  }

  if (applicationsReportSelectedCells.size > 0) {
    clearApplicationsReportSelection();
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

function bindRowMenuToggles() {
  rowMenuToggles.forEach((toggle) => {
    if (toggle.dataset.bound === "true") {
      return;
    }

    toggle.dataset.bound = "true";

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
}

bindRowMenuToggles();

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
    showToast(
      tr("detail.pdfDownloadedTitle", "PDF yuklab olindi"),
      tformat("detail.pdfDownloadedDescription", `${title} fayli tayyorlandi.`, { title }),
    );
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
  openConfirmModal("accept", applicationId);
});

detailRejectButton?.addEventListener("click", () => {
  const applicationId = detailRejectButton.dataset.applicationId;
  if (!applicationId) {
    return;
  }
  openConfirmModal("reject", applicationId);
});

confirmModalApprove?.addEventListener("click", () => {
  if (!confirmState.action || !confirmState.applicationId) {
    return;
  }

  const { action, applicationId } = confirmState;
  const actionLabel = getActionLabel(action);
  confirmModalApprove.disabled = true;
  confirmModalApprove.innerHTML = `<span class="confirm-modal__button-spinner" aria-hidden="true"></span><span>${tr("common.submitting", "Yuborilmoqda...")}</span>`;
  confirmModalCancel?.setAttribute("disabled", "true");

  window.setTimeout(() => {
    closeConfirmModal();
    closeDetailModal();
    if (applicationId === "AR-000123") {
      updateApplicationRowStatus(applicationId, action === "accept" ? "qabul qilingan" : "rad etilgan");
      showToast(
        tformat("action.completedTitle", `${actionLabel} muvaffaqiyatli yakunlandi`, { action: actionLabel }),
        tformat("action.completedDescription", `${applicationId} arizasi bo'yicha amal muvaffaqiyatli bajarildi.`, { id: applicationId, action: actionLabel }),
      );
      return;
    }

    showToast(
      tformat("action.failedTitle", `${actionLabel} amalga oshmadi`, { action: actionLabel }),
      tformat("action.failedDescription", `${applicationId} arizasini ${actionLabel.toLowerCase()}da ERR-409 xatoligi kuzatildi. Batafsil ma'lumot uchun qo'llanma yoki bog'lanish bo'limiga murojaat qiling.`, {
        id: applicationId,
        action: actionLabel,
        actionLower: actionLabel.toLowerCase(),
      }),
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
    applicationsReportFilterToggle?.closest(".table-menu")?.classList.remove("table-menu--open");
    applicationsReportFilterToggle?.setAttribute("aria-expanded", "false");
    closeCalendar();
    closeConfirmModal();
    closeDetailModal();
  }
});

initializeTheme();
initializeLanguage();
const rememberedUsername = getRememberedUsername();
if (loginUsername && rememberedUsername) {
  loginUsername.value = rememberedUsername;
}
if (rememberMe) {
  rememberMe.checked = Boolean(rememberedUsername);
}
if (getCurrentRoutePath() === "/auth" || !isAuthenticated()) {
  showLoginView();
} else {
  showAppView();
}
syncPasswordToggleUi();
bindRowMenuToggles();
enrichApplicationRows();
updateApplicationFilterOptionSets();
updateApplicationFilterControls();
updateApplicationsReportFilterControls();
applyTableFilters();
applyReportFilters();
syncReportFrozenColumn();
syncRowsPerPageUi();
customSelects.forEach(syncCustomSelectUi);
dateFields.forEach(syncDateFieldUi);
enhanceProcessRowActions();
enhanceApplicationViewActions();

async function applyRouteFromHash() {
  const currentPath = getCurrentRoutePath();
  const loggedIn = isAuthenticated();

  if (currentPath === "/auth") {
    if (loggedIn) {
      const targetRoute = getLastVisitedRoute() || "/apps";
      if (window.location.hash !== `#${targetRoute}`) {
        window.location.hash = targetRoute;
        return;
      }
    }
    showLoginView();
    return;
  }

  if (!loggedIn) {
    storeRouteIntent(currentPath);
    showLoginView();
    return;
  }

  if (currentPath === "/apps") {
    currentCanonicalTitle = "Modullar";
    syncPageHeading("Modullar");
    showAppView();
    showModulesView();
    return;
  }

  const moduleKey = getModuleKeyFromHash(currentPath);
  const moduleConfig = getModuleConfig(moduleKey);
  const routeTitle = getTitleFromHash(currentPath);
  const effectiveRouteTitle = routeTitle;

  if (!effectiveRouteTitle) {
    const defaultTitle = getTitleFromHash(moduleConfig.defaultHash) || "Home";
    renderSidebar(moduleKey, defaultTitle);
    syncPageHeading(defaultTitle);
    const targetLink = document.querySelector(`[data-page-title="${defaultTitle}"]`);
    syncActiveNavigation(targetLink instanceof HTMLElement ? targetLink : null);
    await navigateToView(defaultTitle);
    return;
  }

  renderSidebar(moduleKey, effectiveRouteTitle);
  const targetLink = document.querySelector(`[data-page-title="${effectiveRouteTitle}"]`);
  syncPageHeading(effectiveRouteTitle);
  syncActiveNavigation(targetLink instanceof HTMLElement ? targetLink : null);
  storeLastVisitedRoute(currentPath);

  await navigateToView(effectiveRouteTitle);
}

window.addEventListener("popstate", () => {
  applyRouteFromHash();
});

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

  if (applicationsReportFilterToggle?.closest(".table-menu")?.classList.contains("table-menu--open")) {
    syncTableMenuMaxHeight(applicationsReportFilterToggle, applicationsReportFilterMenu);
  }
});

applyRouteFromHash();
