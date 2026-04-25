const tabs = document.querySelectorAll("[data-tab]");
const panels = document.querySelectorAll(".panel");

function activateTab(tabName) {
  const currentActivePanel = document.querySelector(".panel.is-active");
  const nextPanel = document.getElementById(tabName);

  tabs.forEach((tab) => {
    const isActive = tab.dataset.tab === tabName;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
  });

  if (currentActivePanel && currentActivePanel.id !== tabName) {
    // Fade out the current panel
    currentActivePanel.classList.remove("is-active");
    
    // Wait for the fade out animation to complete, then show the new panel
    setTimeout(() => {
      currentActivePanel.hidden = true;
      nextPanel.hidden = false;
      nextPanel.classList.add("is-active");
      
      // Reset scroll to top when switching tabs (workaround for VSCode browser auto-scroll)
      window.scrollTo(0, 0);
    }, 300);
  } else if (!currentActivePanel) {
    // First time activation (on page load)
    nextPanel.hidden = false;
    nextPanel.classList.add("is-active");
  }
}

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    activateTab(tab.dataset.tab);
  });
});

activateTab("about");