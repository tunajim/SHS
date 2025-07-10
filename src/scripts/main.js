/**********************************************
 * This script is responsible for:
 * 1. Changing the placeholder text of the Google Search embed
 * 2. Detecting screen size and applying responsive design classes
 * 3. Handling quick link drop-down functionality
 **********************************************/
console.log("Main script loaded");

/**********************************************
 * After page loads, we have to manually find the Google Search embed
 * and change the placeholder text
 **********************************************/
setTimeout(() => {
  const searchInput = document.querySelector("#gsc-i-id1");
  searchInput.placeholder = "Search Support";
}, 500);

/**********************************************
 * Certain elements require classes to be added or removed based on the screen size.
 * * This script detects the screen size and applies the necessary classes.
 * * This is particularly useful for responsive design.
 * * * Will also detect changes in screen size and respond accordingly
 **********************************************/
const screenSizes = {
  mobile: 320,
  tablet: 600,
  desktop: 900,
};

const screenSizeIs = {
  mobile: false,
  tablet: false,
  desktop: false,
};

// Initialize screen size on page load and resize
window.addEventListener("load", setScreenSize);
window.addEventListener("load", checkScreenSize);
window.addEventListener("resize", handleScreenSize);

function handleScreenSize(e) {
  setScreenSize(e);
  checkScreenSize();
}

function setScreenSize(e) {
  console.log(e.currentTarget.innerWidth);
  const sW = e.currentTarget.innerWidth;

  console.log(`Screen width: ${sW}px`);

  // Reset all screen size flags
  screenSizeIs.mobile = false;
  screenSizeIs.tablet = false;
  screenSizeIs.desktop = false;

  // Determine the screen size based on the width
  screenSizeIs.mobile = sW < screenSizes.tablet;
  screenSizeIs.tablet = sW >= screenSizes.tablet && sW < screenSizes.desktop;
  screenSizeIs.desktop = sW >= screenSizes.desktop;

  console.log({ screenSizeIs });
}

function checkScreenSize() {
  if (screenSizeIs.mobile) {
    mobileView();
  } else if (screenSizeIs.tablet) {
    tabletView();
  } else {
    desktopView();
  }
}

function mobileView() {}

function tabletView() {
  console.log("Tablet view detected");

  // Adjust styles for tablet view
  // remove column from footer class
  const footer = document.querySelector("footer");
  footer.classList.remove("column");

  const fineprint = document.querySelector(".fine-print");
  fineprint.classList.add("column");
}

function desktopView() {
  console.log("Desktop view detected");

  // Adjust styles for desktop view
  const footer = document.querySelector("footer");
  footer.classList.remove("column");

  const fineprint = document.querySelector(".fine-print");
  fineprint.classList.remove("column");
}


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

