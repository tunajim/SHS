console.log("Labs script loaded");

var acc = document.getElementsByClassName("accordion");
var i;

let lastInteractionType = null;

// Listen for keyboard interactions (tab)
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    lastInteractionType = "keyboard";
  }
});

// Listen for mouse interactions
document.addEventListener("mousedown", () => {
  lastInteractionType = "mouse";
});

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("focus", expandAccordion);

  acc[i].addEventListener("click", expandAccordion);
}

function expandAccordion(e) {
  // When user clicks a quick link, the focus event is triggered
  // If the last interaction was a mouse click, ignore the focus event
  if (e.type === "focus" && lastInteractionType === "mouse") {
    return;
  }

  const isActive = e.target.classList.contains("active") ? true : false;
  if (isActive) {
    deactivateAll();
    return;
  }

  deactivateAll();

  this.classList.toggle("active");
  var panel = this.nextElementSibling;
  panel.classList.toggle("active");
  if (panel.style.maxHeight) {
    panel.style.maxHeight = null;
  } else {
    panel.style.maxHeight = panel.scrollHeight + "px";
  }
}

function deactivateAll() {
  for (i = 0; i < acc.length; i++) {
    acc[i].classList.remove("active");
    var panel = acc[i].nextElementSibling;
    panel.classList.remove("active");
    panel.style.maxHeight = null;
  }
}
