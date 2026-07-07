document.querySelectorAll(".nav-dropdown").forEach((dropdown) => {
  const summary = dropdown.querySelector("summary");
  let closeTimer;

  const cancelClose = () => {
    window.clearTimeout(closeTimer);
  };

  const closeIfUnpinned = () => {
    cancelClose();
    closeTimer = window.setTimeout(() => {
      if (dropdown.dataset.pinned !== "true" && !dropdown.matches(":hover")) {
        dropdown.open = false;
      }
    }, 240);
  };

  dropdown.addEventListener("mouseenter", () => {
    cancelClose();
    dropdown.open = true;
  });

  dropdown.addEventListener("mouseleave", () => {
    closeIfUnpinned();
  });

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    const isPinned = dropdown.dataset.pinned === "true";
    dropdown.dataset.pinned = isPinned ? "false" : "true";
    dropdown.open = !isPinned;
  });
});
