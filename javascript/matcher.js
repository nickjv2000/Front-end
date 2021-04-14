// Creating variables where random numbers are being generated
// Id variable made smaller from document.getelementbyid to id

var id = function(id) {return document.getElementById(id);};
var randoms = Math.floor(Math.random() * games.length);
var score = 10;
var div = document.createElement('div');

// giving id's bt1 and bt2 a const to link with a function
// hides finish button

const start = id("bt1");
const reset = id("bt2");
const finish = id("bt3");

finish.style.visibility = "hidden";
// Creates random numbers

function generateNumber() {
	return Math.floor(Math.random() * games.length);
}

// Makes it so that the elements become visible

function visibleElements() {
	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";
	reset.style.visibility = "visible";
	finish.style.visibility = "visible";
	start.remove();
	id("text3").style.display = "none";
	id("text4").style.display = "none";
	id("text5").style.display = "none";
	id("text6").style.display = "none";
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

	randomImage = generateNumber();
	randomName = generateNumber();

	console.log(games[randomName].name + ": " + randomImage + " " + randomName);
	// console.log(randomName);
	
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
		btn.onclick = function(){score += 1};
	} else if(randomName != randomImage) {
		btn.onclick = function(){score -= 1};
	}

	div1.appendChild(btn);

	div0.appendChild(div1);
	containerDiv.appendChild(div0);

	}	
}

// A function that loads the last page of the website
// showing the results of the game
// removes any buttons/text that was made prior to the result screen
// adds back the text 3 up to 6 for results
// looks at what number the score is, depending on the score gives text

finish.onclick = function finish() {
	id("dropdown").remove();
	id("text1").remove();
	id("text2").remove();
	id("containers").remove();
	id("bt3").remove();

	reset.remove();

	id("text3").style.display = "";
	id("text4").style.display = "";
	id("text5").style.display = "";
	id("text6").style.display = "";

	var result = document.getElementById("text3");
	result.innerHTML = "Your score is: " + score;

	if (score > 10){
		document.body.style.backgroundImage = "url('../images/happy.gif')";
		var resultTexts = document.getElementById("text4");
		resultTexts.innerHTML = "If you've gotten a score above 10, congratulations you've done very well!"
		id("text3").style.color = "red";
		id("text4").style.color = "red";
		id("text5").style.color = "red";
		id("text6").style.color = "red";
		id("text3").style.fontSize = "x-large";
		id("text4").style.fontSize = "x-large";
		id("text5").style.fontSize = "x-large";
		id("text6").style.fontSize = "x-large";
	} else if (score < 10) {
		document.body.style.backgroundImage = "url('../images/sad.png')";
		var resultTextz = document.getElementById("text5");
		resultTextz.innerHTML = "Is the score below 10? You've done poorly."
		id("text3").style.fontSize = "x-large";
		id("text4").style.fontSize = "x-large";
		id("text5").style.fontSize = "x-large";
		id("text6").style.fontSize = "x-large";
	} else if (score == 10) {
		document.body.style.backgroundImage = "url('../images/neutral.png')";
		var resultTexta = document.getElementById("text6");
		resultTexta.innerHTML = "Is the score 10 on the dot? Well you could've done nothing else to change that."
		id("text3").style.fontSize = "x-large";
		id("text4").style.fontSize = "x-large";
		id("text5").style.fontSize = "x-large";
		id("text6").style.fontSize = "x-large";
	}
}

// Reload the page when pressing the "Reset" button

reset.onclick = function reset() {
	location.reload();
}

