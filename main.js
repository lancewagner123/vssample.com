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

document.querySelectorAll("[data-veil-vote]").forEach((form) => {
  const result = form.querySelector("[data-vote-result]");
  const storageKey = "veiledStudiosVolumeIvVote";

  const writeResult = (character, destination) => {
    if (!result) {
      return;
    }

    result.textContent = `${character} is marked to lead toward ${destination}.`;
  };

  try {
    const savedVote = JSON.parse(window.localStorage.getItem(storageKey) || "null");
    if (savedVote?.character && savedVote?.destination) {
      const characterInput = Array.from(form.querySelectorAll('input[name="character"]')).find((input) => input.value === savedVote.character);
      const destinationInput = Array.from(form.querySelectorAll('input[name="destination"]')).find((input) => input.value === savedVote.destination);
      if (characterInput && destinationInput) {
        characterInput.checked = true;
        destinationInput.checked = true;
        writeResult(savedVote.character, savedVote.destination);
      }
    }
  } catch (error) {
    try {
      window.localStorage.removeItem(storageKey);
    } catch (storageError) {
      // Storage may be unavailable in some private browsing modes.
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const character = data.get("character");
    const destination = data.get("destination");

    if (!character || !destination) {
      return;
    }

    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ character, destination }));
    } catch (error) {
      // The vote remains visible even when browser storage is unavailable.
    }

    writeResult(character, destination);
  });
});
