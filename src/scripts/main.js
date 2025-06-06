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
  desktop: 1024,
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
  const sW = e.target.innerWidth;

  // Reset all screen size flags
  screenSizeIs.mobile = false;
  screenSizeIs.tablet = false;
  screenSizeIs.desktop = false;

  // Determine the screen size based on the width
  screenSizeIs.mobile = sW < screenSizes.tablet;
  screenSizeIs.tablet = sW >= screenSizes.tablet && sW < screenSizes.desktop;
  screenSizeIs.desktop = sW >= screenSizes.desktop;
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

function mobileView() {
  const footer = document.querySelector("footer");

  // if footer does not have column class, it means we are sizing the screen down
  if (!footer.classList.contains("column")) {
    console.log("Adding column class to footer");
    footer.classList.add("column");

    const fineprint = document.querySelector(".fine-print");
    fineprint.classList.remove("column");
  }
}

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
