import { interpolate, interpolateAll } from "flubber";




/**
 * @description The following logic handles the mobile navigation logic.
 * @
 * @variable hamburger - The hamburger icon element.
 * 	- only visible when the mobile navigation is closed.
 * @variable exitIcon - The close icon element.
 *  - only visible when the mobile navigation is open.
 * 
 * @function toggleNav - Toggles the mobile navigation menu.
 *  - Gets called when hamburger or exitIcon is clicked
 *  - Checks whether the hamburger icon is active or not.
 *    - If not active, it means the mobile navigation is open
 * 		Perform the following:
 * 			1. remove active class from exitIcon
 * 			2. add active class to hamburger icon
 * 			3. deactivate the mobile navigation
 * 	  - If active, it means the mobile navigation is closed
 * 		Perform the following:
 * 			1. remove active class from hamburger icon
 * 			2. add active class to exitIcon
 * 			3. activate the mobile navigation
 * 
 * @function activateMobileNav - Activates the mobile navigation menu.
 * 
 */

const hamburger = document.querySelector("#hamburger");
const exitIcon = document.querySelector("#exit-icon");

hamburger.addEventListener("mouseup", toggleNav);
exitIcon.addEventListener("mouseup", toggleNav);

function toggleNav() {
	if (!hamburger.classList.contains("active")) {
		exitIcon.classList.remove("active"); // 1.
		hamburger.classList.add("active");  // 2.
		deactivateMobileNav(); // 3.
	} else {
		hamburger.classList.remove("active"); // 1.
		exitIcon.classList.add("active"); // 2.
		activateMobileNav(); // 3.
	}
}

function activateMobileNav() {
	const mobileNav = document.querySelector("#nav-links");
	mobileNav.classList.add("active");

	// add overlay
	const overlay = createElement("div", { id: "nav-overlay" });
	const nav = document.getElementsByTagName("nav");
	overlay.classList.add("active");

	nav[0].appendChild(overlay);

}

function deactivateMobileNav() {
	const mobileNav = document.querySelector("#nav-links");
	mobileNav.classList.remove("active");

	const overlay = document.querySelector("#nav-overlay");
	overlay.classList.add("slide-out");
	setTimeout(() => {
		overlay.remove();	
	}, 400);
}


function createElement(type, attributes, ...children) {
	const element = document.createElement(type);
	for (const [key, value] of Object.entries(attributes)) {
		element.setAttribute(key, value);
	}
	for (const child of children) {
		if (typeof child === "string") {
			element.appendChild(document.createTextNode(child));
		} else {
			element.appendChild(child);
		}
	}
	return element;
}