// Creating variables where random numbers are being generated
// Id variable made smaller from document.getelementbyid to id

var id = function(id) {return document.getElementById(id);};
var randoms = Math.floor(Math.random() * games.length);
var score = 0;
var div = document.createElement('div');

// giving id's bt1 and bt2 a const to link with a function

const start = id("bt1");
const reset = id("bt2");

// Creates random numbers

function generateNumber() {
	return Math.floor(Math.random() * games.length);
}

// Makes it so that the elements become visible

function visibleElements() {
	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";
	id("bt1").style.visibility = "hidden";
	id("bt2").style.visibility = "visible";
}

// Start the matching game
// Create the images & buttons
// If you click on a button, check whether the name and image are the same
// After checking it adjusts the variable "score"

start.onclick = function start() {

	visibleElements();

	var containerDiv = document.getElementById("containers");

	var div0 = document.createElement("div");
	div0.className = "card-group";

	for (u = 0; u < games.length; u++) {

	randomImage = generateNumber()
	randomName = generateNumber()

	console.log(randomImage);
	console.log(randomName);
	
	var div1 = document.createElement("div");
	div1.className = "card";

	var div2 = document.createElement("img");
	div2.className = "img";
	div2.src = games[randomImage].image;

	div1.appendChild(div2);

	var btn = document.createElement("button");
	btn.className = "btn btn-dark";
	btn.innerHTML = games[randomName].name;

	if(randomName == randomImage) {
		btn.onclick = score + 1;
	} else if(randomName != randomImage) {
		btn.onclick = score - 1;
	}

	div1.appendChild(btn);

	div0.appendChild(div1);
	containerDiv.appendChild(div0);
	}	

	console.log(score);
	
}

// Reload the page when pressing the "Reset" button

reset.onclick = function reset() {
	location.reload();
}

