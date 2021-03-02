// Aanmaken van variabele waarin een random nummer word gepakt
// id variabele verkort document.getelementbyid naar id
// test linked een naam van array names en array images

var id = function(id) {return document.getElementById(id);};
var randoms = Math.floor(Math.random() * games.length);
var score = 0;

// een log om te checken wat de uitkomst van de variable zijn

console.log(score);

// zorgt ervoor dat elke but id word opgepakt

const start = id("bt1");
const reset = id("bt2");
const answer = document.getElementsByClassName("btn");

console.log(answer);
// start de matching game
// geeft alles een naam & img
// maakt alles visible
// maakt een random nummer

function generateNumber() {
	return Math.floor(Math.random() * games.length);
}

start.onclick = function start() {
	for (i = 0; i < games.length; i++) {	
	 	id(ids[i].id).innerHTML = games[generateNumber()].name;
 		id(ids[i].img).innerHTML = games[generateNumber()].image;
 		id(ids[i].id).style.visibility = "visible";
		id(ids[i].img).style.visibility = "visible";
	} 
	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";
	id("bt1").style.visibility = "hidden";
	id("bt2").style.visibility = "visible";
}

// als je op een button klikt dan checkt de functie of de img en naam gelijk zijn
// geeft dan een verandering op de variabele score
 
answer.onclick = function guess() {
	if(games.name == games.image) {
		score = score + 1;
	} else if(games.name != games.image) {
		score = score - 1;
	}
	console.log(score);
};

// reload de webpagina wanneer je op bt2 drukt

reset.onclick = function reset() {
	location.reload();
}

