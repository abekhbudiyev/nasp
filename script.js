const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const appShell = document.querySelector(".app-shell");
const sidebarCollapse = document.getElementById("sidebarCollapse");
const pageBreadcrumb = document.getElementById("pageBreadcrumb");
const pageTitle = document.getElementById("pageTitle");
const themeToggle = document.getElementById("themeToggle");
const menuToggles = document.querySelectorAll("[data-menu-toggle]");
const navToggles = document.querySelectorAll(".nav-item--toggle");
const pageLinks = document.querySelectorAll("[data-page-title]");
const applicationSearch = document.getElementById("applicationSearch");
const statusFilter = document.getElementById("statusFilter");
const regionFilter = document.getElementById("regionFilter");
const resetFilters = document.getElementById("resetFilters");
const rowsPerPage = document.getElementById("rowsPerPage");
const applicationCount = document.getElementById("applicationCount");
const paginationInfo = document.getElementById("paginationInfo");
const totalApplicationsStat = document.getElementById("totalApplicationsStat");
const newApplicationsStat = document.getElementById("newApplicationsStat");
const processApplicationsStat = document.getElementById("processApplicationsStat");
const acceptedApplicationsStat = document.getElementById("acceptedApplicationsStat");
const rejectedApplicationsStat = document.getElementById("rejectedApplicationsStat");
const totalApplicationsShare = document.getElementById("totalApplicationsShare");
const newApplicationsShare = document.getElementById("newApplicationsShare");
const processApplicationsShare = document.getElementById("processApplicationsShare");
const acceptedApplicationsShare = document.getElementById("acceptedApplicationsShare");
const rejectedApplicationsShare = document.getElementById("rejectedApplicationsShare");
const applicationRows = document.querySelectorAll("#applicationsTable tbody tr");
const filterToggle = document.getElementById("filterToggle");
const filterMenu = document.getElementById("filterMenu");
const rowMenuToggles = document.querySelectorAll(".row-menu__toggle");

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
    const isDark = document.body.classList.toggle("theme-dark");
    themeToggle.setAttribute("aria-pressed", String(isDark));
  });
}

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
      filterContainer.classList.remove("table-menu--open");
      filterToggle.setAttribute("aria-expanded", "false");
    }
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

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const title = link.getAttribute("data-page-title");
    if (pageTitle && title) {
      const parts = title.split(" - ");
      pageTitle.textContent = parts[parts.length - 1];
      if (pageBreadcrumb) {
        pageBreadcrumb.textContent = parts.length > 1 ? parts.join(" / ") : "Asosiy menyu";
      }
    }

    document.querySelectorAll(".nav-item--active").forEach((item) => {
      item.classList.remove("nav-item--active");
    });

    document.querySelectorAll(".nav-subitem--active").forEach((item) => {
      item.classList.remove("nav-subitem--active");
    });

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

    if (window.innerWidth <= 1180) {
      sidebar?.classList.remove("sidebar--open");
    }
  });
});

function applyTableFilters() {
  const searchValue = applicationSearch?.value.trim().toUpperCase() ?? "";
  const statusValue = statusFilter?.value ?? "all";
  const regionValue = regionFilter?.value ?? "all";
  const limit = Number(rowsPerPage?.value ?? "10");
  let visibleCount = 0;
  let renderedCount = 0;
  let newCount = 0;
  let processCount = 0;
  let acceptedCount = 0;
  let rejectedCount = 0;

  applicationRows.forEach((row) => {
    const rowStatus = row.getAttribute("data-status") ?? "";
    const rowRegion = row.getAttribute("data-region") ?? "";
    const rowSearch = row.getAttribute("data-search") ?? "";

    const matchesSearch = !searchValue || rowSearch.includes(searchValue);
    const matchesStatus = statusValue === "all" || rowStatus === statusValue;
    const matchesRegion = regionValue === "all" || rowRegion === regionValue;
    const matched = matchesSearch && matchesStatus && matchesRegion;

    if (matched) {
      visibleCount += 1;
      if (rowStatus === "yangi") {
        newCount += 1;
      }
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

    const visible = matched && renderedCount < limit;
    row.style.display = visible ? "" : "none";

    if (visible) {
      renderedCount += 1;
    }
  });

  if (applicationCount) {
    applicationCount.textContent = String(visibleCount);
  }
  const totalBase = visibleCount || 1;
  const percent = (value) => `${Math.round((value / totalBase) * 100)}%`;
  if (totalApplicationsStat) {
    totalApplicationsStat.textContent = String(visibleCount);
  }
  if (totalApplicationsShare) {
    totalApplicationsShare.textContent = visibleCount > 0 ? "100%" : "0%";
  }
  if (newApplicationsStat) {
    newApplicationsStat.textContent = String(newCount);
  }
  if (newApplicationsShare) {
    newApplicationsShare.textContent = visibleCount > 0 ? percent(newCount) : "0%";
  }
  if (processApplicationsStat) {
    processApplicationsStat.textContent = String(processCount);
  }
  if (processApplicationsShare) {
    processApplicationsShare.textContent = visibleCount > 0 ? percent(processCount) : "0%";
  }
  if (acceptedApplicationsStat) {
    acceptedApplicationsStat.textContent = String(acceptedCount);
  }
  if (acceptedApplicationsShare) {
    acceptedApplicationsShare.textContent = visibleCount > 0 ? percent(acceptedCount) : "0%";
  }
  if (rejectedApplicationsStat) {
    rejectedApplicationsStat.textContent = String(rejectedCount);
  }
  if (rejectedApplicationsShare) {
    rejectedApplicationsShare.textContent = visibleCount > 0 ? percent(rejectedCount) : "0%";
  }

  if (paginationInfo) {
    paginationInfo.textContent = visibleCount > 0 ? `1-${Math.min(visibleCount, limit)} / ${visibleCount} ta yozuv` : "0 / 0 ta yozuv";
  }
}

applicationSearch?.addEventListener("input", applyTableFilters);
statusFilter?.addEventListener("change", applyTableFilters);
regionFilter?.addEventListener("change", applyTableFilters);
rowsPerPage?.addEventListener("change", applyTableFilters);

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
  });
}

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
  });
});

resetFilters?.addEventListener("click", () => {
  if (applicationSearch) {
    applicationSearch.value = "";
  }
  if (statusFilter) {
    statusFilter.value = "all";
  }
  if (regionFilter) {
    regionFilter.value = "all";
  }
  applyTableFilters();
});

applyTableFilters();
