const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll(".panel");
const panelsContainer = document.querySelector(".panels");
const FADE_OUT_MS = 300;

function updatePanelsMinHeight() {
  let tallest = 0;

  panels.forEach((panel) => {
    panel.hidden = false;
    panel.style.animation = "none";
    const panelHeight = panel.scrollHeight;
    if (panelHeight > tallest) {
      tallest = panelHeight;
    }
    panel.style.animation = "";
  });

  panelsContainer.style.setProperty("--panels-min-height", `${tallest}px`);
}

function setActiveTabButton(tabName) {
  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });
}

function activateTab(tabName) {
  const currentActivePanel = document.querySelector(".panel.is-active");
  const nextPanel = document.getElementById(tabName);
  if (!nextPanel) {
    return;
  }

  setActiveTabButton(tabName);
  document.body.dataset.activeSection = tabName;

  if (currentActivePanel && currentActivePanel.id === tabName) {
    return;
  }

  const savedScrollY = window.scrollY;

  nextPanel.classList.remove("is-leaving");
  nextPanel.classList.add("is-active");
  nextPanel.setAttribute("aria-hidden", "false");

  if (currentActivePanel) {
    currentActivePanel.classList.remove("is-active");
    currentActivePanel.classList.add("is-leaving");
    currentActivePanel.setAttribute("aria-hidden", "true");

    setTimeout(() => {
      currentActivePanel.classList.remove("is-leaving");
    }, FADE_OUT_MS);
  }

  requestAnimationFrame(() => {
    window.scrollTo({ top: savedScrollY, behavior: "auto" });
  });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    activateTab(tab.dataset.tab);
  });
});

panels.forEach((panel) => {
  panel.hidden = false;
  panel.setAttribute("aria-hidden", panel.classList.contains("is-active") ? "false" : "true");
});

updatePanelsMinHeight();
window.addEventListener("resize", updatePanelsMinHeight);

activateTab("about");