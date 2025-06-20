console.log("WORKING");

const list = document.querySelector("#lab-list").getElementsByTagName("li");
const sections = document.querySelector("#lab-list").getElementsByTagName("section");


console.log(sections);

for (let i = 0; i < list.length; i++) {
  const item = list.item(i);
  if (item) {
	item.addEventListener("click", labClicked);
  }
}

function labClicked(e) {
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
	console.log(active);

	console.log(section);
	if (section) {
		if (active) {
			section.classList.remove("active");
			section.style.maxHeight = null;
		} else {
			section.classList.add("active");
			section.style.maxHeight = section.scrollHeight + "px";
			document.body.style.height = "auto";
		}
	}
}