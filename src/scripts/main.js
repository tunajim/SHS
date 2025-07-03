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

/**
 * @description Quick link drop-down functionality
 * 1. Get all quick links from the DOM
 * 2. Add event listeners to each quick link
 * 3. Toggle the active state of quick links and their associated sections
 * 4. Remove active classes when a quick link is clicked again
 * 5. Collapse sections when quick links are toggled
 * 6. Adjust padding and max-height for sections based on screen size
 */

const quickLinks = document
  .querySelector("#quick-links")
  .getElementsByTagName("ul")[0].children;

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


/**
 * add an event listener for each quick link to listen for clicks
 *
 */

const quickLinksContainer = document.querySelector("#quick-links");

for (let i = 0; i < quickLinks.length; i++) {
  quickLinks.item(i).addEventListener("mouseup", toggleQuickLinks);
  quickLinks.item(i).addEventListener("focus", toggleQuickLinks);
  //add focus event listener to each quick link
}


/**
 * @name toggleQuickLinks
 * @description Toggles the active state of quick links and their associated sections.
 * @param {Event} e - The click event on the quick link.
 * @returns {void}
 *
 */
function toggleQuickLinks(e) {


  // When user clicks a quick link, the focus event is triggered
  // If the last interaction was a mouse click, ignore the focus event
  if( e.type === "focus" && lastInteractionType === 'mouse') {
    return;
  }

  // check if the clicked element is already active
  // if it is, remove the active class and collapse the section
  if (e.target.className === "active") {
    removeActiveClasses(quickLinks);
    return;
  }

  // If not, remove all active classes to collapse any open sections
  removeActiveClasses(quickLinks);
  const width = window.innerWidth;

  // 
  const parentElement = e.target.parentElement;
  const grandParentElement = e.target.parentElement.parentElement;

  // if (parentElement && parentElement.classList.contains("slide-down")) {
  //   return;
  // }

  // if(grandParentElement && grandParentElement.classList.contains("slide-down")) {
  //   return;
  // }


  // If the clicked element is a section, do nothing
  // This prevents the following logic from breaking
  if (e.target.tagName === "SECTION") {
    return;
  }

  // If the clicked element is not a section, it means we have clicked a list item/link
  const info = e.target.nextElementSibling;


  // activate the clicked element
  if (!e.target.classList.contains("no-click"))
    e.target.classList.add("active");

  // only manipulate info if it is indeed a section
  if (info.tagName === "SECTION") {
    if (info.classList.contains("active")) {
      info.classList.remove("active");
      info.style.maxHeight = null;
    } else {
      info.classList.add("active");
      info.style.maxHeight = info.scrollHeight + "px";

      const heightBuffer =
        info.id === "contact" || info.id === "guides" ? 100 : 60;

      if (screenSizeIs.desktop) {
        quickLinksContainer.classList.add("active");
        quickLinksContainer.style.paddingBottom +=
          info.scrollHeight + heightBuffer + "px";
      }
    }
  }
}

/**
 * @name removeActiveClasses
 * @description Removes active classes from all quick links and collapses their sections.
 * @param {HTMLCollection} quickLinks - The collection of quick link elements.
 * @returns {void}
 */

function removeActiveClasses(quickLinks) {
  for (let i = 0; i < quickLinks.length; i++) {
    const info = quickLinks.item(i);
    if (info) {
      if (info.classList.contains("active")) {
        info.classList.remove("active");
      }

      if (info.tagName === "SECTION") {
        // Reset the max height to null to collapse the section
        info.style.maxHeight = null;
      }
    }
  }

  // loop through all children and all of the childrens children and remove active
  const children = quickLinksContainer.children;
  for (let i = 0; i < children.length; i++) {
    const child = children.item(i);
    if (child) {
      child.classList.remove("active");
    }
  }

  quickLinksContainer.classList.remove("active");
  quickLinksContainer.style.paddingBottom = null;
}
