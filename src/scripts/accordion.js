const acc = document.getElementsByClassName("accordion");
const container = document.querySelector(".accordion-section");
var i;

let lastInteractionType = null;

// Listen for keyboard interactions (tab)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    lastInteractionType = 'keyboard';
  }
});

// Listen for mouse interactions
document.addEventListener('mousedown', () => {
  lastInteractionType = 'mouse';
});


for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function (e) {
    const screenSize = checkScreenSize();
    const isActive = e.target.classList.contains("active") ? true : false;
    if (isActive) {
      deactivateAll(screenSize.desktop);
      return;
    }


    deactivateAll(screenSize.desktop);
    activateSlide(e, screenSize.desktop);

  });

  acc[i].addEventListener("focus", function (e) {
    const screenSize = checkScreenSize();

    console.log("Accordion focused: " + e.target.classList.contains("active"));

    if (e.target.classList.contains("active")) {
      return;
    }

    deactivateAll(screenSize.desktop);
    activateSlide(e, screenSize.desktop);
  });
}

function checkScreenSize() {
  const width = window.innerWidth;

  if (width >= 1000) {
    return { desktop: true, mobile: false };
  } else {
    return { desktop: false, mobile: true };
  }
}

function deactivateAll(screensize) {
  // deactivating accordion
  for (i = 0; i < acc.length; i++) {
    acc[i].classList.remove("active");
    console.log("Deactivating accordion: " + i);

    var panel = acc[i].nextElementSibling;
    panel.style.maxHeight = null;

    console.log(screensize);
    if (container && screensize) {
      container.style.paddingBottom = "2rem";
      container.style.marginTop = "unset";
      container.style.margin = "auto";
    }
  }

  // deactivate icons 
  const icons = document.querySelectorAll(".ql-icon");
  icons.forEach((icon) => {
    icon.classList.remove("active");
  });
}



function activateSlide(e, desktopSize) {

    // When user clicks a quick link, the focus event is triggered
  // If the last interaction was a mouse click, ignore the focus event
  if( e.type === "focus" && lastInteractionType === 'mouse') {
    return;
  }

    e.target.classList.toggle("active");
    const panel = e.target.nextElementSibling;

    console.log("is desktop size: " + desktopSize);

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;

      if(desktopSize) {
        container.style.paddingBottom = "0";
      }
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
      if(desktopSize) {
        container.style.paddingBottom = (panel.scrollHeight + 65) + "px";

        // need to add margin to top of container if on desktop
        container.style.marginTop = "1rem";
      }
    }

}