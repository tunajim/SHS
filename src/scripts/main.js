function handleVideo(e) {
  console.log("Video clicked");
}

const video = document.querySelectorAll(".video-slide");

video.forEach((vid) => {
  vid.addEventListener("click", handleVideo);
});

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

  console.log({screenSizeIs})
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
 * Quick link activator
 * * When user clicks on a quick link button, it will activate the proper information
 * * info will expand down, underneath the button.
 *
 */

const quickLinks = document
  .querySelector("#quick-links")
  .getElementsByTagName("ul")[0].children;

/**
 * Add event listeners to each quick link
 * * When a quick link is clicked, it will slide the associated section down
 * * If the section is already active, it will collapse it
 * * If another section is active, it will collapse that section first
 */
const quickLinksContainer = document.querySelector("#quick-links");

for (let i = 0; i < quickLinks.length; i++) {
  quickLinks.item(i).addEventListener("click", (e) => {

    // we have to take height 100% off of body, when the quicklinks are active
    // document.body.style.height = "auto";

    console.log(e.target);

    if (e.target.className === "active") {
      removeActiveClasses(quickLinks);
      return;
    }

    removeActiveClasses(quickLinks);
    const width = window.innerWidth;
    console.log(e.target);
    if (e.target.tagName === "SECTION") {
      return;
    }
    const info = e.target.nextElementSibling;
    e.target.classList.add("active");

    if (info.tagName === "SECTION") {
      if (info.classList.contains("active")) {
        info.classList.remove("active");
        info.style.maxHeight = null;
      } else {
        info.classList.add("active");
        info.style.maxHeight = info.scrollHeight + "px";

        const heightBuffer = (info.id === "contact" || info.id === "guides") ? 100 : 60;
        console.log(info.id);

        if(screenSizeIs.desktop) {
          setTimeout(() => {
            // document.body.style.height = "auto";
          }, 500);
          quickLinksContainer.classList.add("active");
          quickLinksContainer.style.paddingBottom +=
            info.scrollHeight + heightBuffer + "px";
        }
      }
    }
  });
}

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
