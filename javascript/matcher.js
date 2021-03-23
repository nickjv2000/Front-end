// Aanmaken van variabele waarin een random nummer word gepakt
// id variabele verkort document.getelementbyid naar id
// test linked een naam van array names en array images

var id = function(id) {return document.getElementById(id);};
var randoms = Math.floor(Math.random() * games.length);
var score = 0;
var div = document.createElement('div');

// een log om te checken wat de uitkomst van de variable zijn

console.log(score);

// id's bt1 en bt2 een const geven om later te linken met een functie
// alle classes met "btn" pakken en om een const aan te maken

const start = id("bt1");
const reset = id("bt2");
const answers = document.getElementsByClassName("#but1");

console.log(answers);

// maakt een random nummer

function generateNumber() {
	return Math.floor(Math.random() * games.length);
}

// zorgt ervoor dat de elementen tevoorschijn komen

function visibleElements() {
	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";
	id("bt1").style.visibility = "hidden";
	id("bt2").style.visibility = "visible";
}

// start de matching game
// geeft alles een naam & img
// maakt alles visible

start.onclick = function start() {

	visibleElements();

	var containerDiv = document.getElementById("containers");

	for (u = 0; u < games.length; u++) {

		var div1 = document.createElement("div");
		div1.className = "card";

		var div2 = document.createElement("img");
		div2.className = "img";
		div2.src = games[generateNumber()].img;

		div1.appendChild(div2);

		var btn = document.createElement("button");
		btn.className = "btn btn-dark";
		div1.appendChild(btn);

		containerDiv.appendChild(div1);
	}	
}

// als je op een button klikt dan checkt de functie of de img en naam gelijk zijn
// geeft dan een verandering op de variabele score
 
// answers.onclick = function guess() {
// 	if(games.name == games.image) {
// 		score = score + 1;
// 	} else if(games.name != games.image) {
// 		score = score - 1;
// 	}
// 	console.log(score);
// };

// reload de webpagina wanneer je op bt2 drukt

reset.onclick = function reset() {
	location.reload();
}

