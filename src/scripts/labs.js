console.log("Labs script loaded");

const list = document.querySelector("#lab-list").getElementsByTagName("li");
const sections = document.querySelector("#lab-list").getElementsByTagName("section");


console.log(sections);

for (let i = 0; i < list.length; i++) {
  const item = list.item(i);
  if (item) {
	item.addEventListener("mouseup", labClicked);
	item.addEventListener("focus", labClicked);
  }
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


function labClicked(e) {

	
	// When user clicks a quick link, the focus event is triggered
	// If the last interaction was a mouse click, ignore the focus event
	if( e.type === "focus" && lastInteractionType === 'mouse') {
		return;
	}

	const el = e.target;
	const active = el.classList.contains("active");
	removeActiveClasses(list); 
	collapseSections(e, active);
	rotateCarets(e, active); 
	expandSections(e, active);

}

function removeActiveClasses(list) {
	for (let i = 0; i < list.length; i++) {
		const item = list.item(i);
		if (item) {
			item.classList.remove("active");

			// remove active class from carets
			item.firstElementChild.classList.remove("active");
		}
	}
	// document.body.style.height = "100%";

	for(let i = 0; i < sections.length; i++) {
		const section = sections.item(i);
		if (section) {
			section.classList.remove("active");
			section.style.maxHeight = null;
		}
	}
}

function rotateCarets(e, active) {
	if(!active) {
		e.target.firstElementChild.classList.toggle("active");
		e.target.classList.toggle("active");
	}
}

function collapseSections(e, active) {
	// section is the next element sibling of the clicked item
	const section = e.target.nextElementSibling;
	section.classList.remove("active");
	section.style.maxHeight = null;
}

function expandSections(e, active) {
	// section is the next element sibling of the clicked item
	const section = e.target.nextElementSibling;
	if (section) {
		if (active) {
			section.classList.remove("active");
			section.style.maxHeight = null;
		} else {
			section.classList.add("active");
			section.style.maxHeight = section.scrollHeight + "px";
		}
	}
}