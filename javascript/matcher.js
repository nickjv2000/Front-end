var images = [
	"<img src='../images/among.jpg' style='width:353px;height:200px;' alt='among us'>",
	"<img src='../images/apex.jpg' style='width:353px;height:200px;' alt='apex legends'>",
	"<img src='../images/csgo.jpg' style='width:353px;height:200px;' alt='csgo'>",
	"<img src='../images/fortnite.jpg' style='width:353px;height:200px;' alt='fortnite'>",
	"<img src='../images/GTA.jpg' style='width:353px;height:200px;' alt='grand theft auto'>",
	"<img src='../images/LoL.jpg' style='width:353px;height:200px;' alt='league of legends'>",
	"<img src='../images/minecraft.jpg' style='width:353px;height:200px;' alt='minecraft'>",
	"<img src='../images/overwatch.jpg' style='width:353px;height:200px;' alt='overwach'>",
	"<img src='../images/pubg.jpg' style='width:353px;height:200px;' alt='pubg'>",
	"<img src='../images/rainbowsix.jpg' style='width:353px;height:200px;' alt='rainbow six siege'>",
	"<img src='../images/rl.jpg' style='width:353px;height:200px;' alt='rocket league'>",
	"<img src='../images/warzone.jpg' style='width:353px;height:200px;' alt='warzone'>"
];

var names = [
	"Among us ",
	"Apex ",
	"CS:GO ",
	"Fortnite ",
	"GTA ",
	"LoL ",
	"MC ",
	"Overwatch ",
	"PUBG ",
	"R6 ",
	"RL ",
	"Warzone "
];

var ids = [
	"but",
	"but1",
	"but2",
	"but3",
	"but4",
	"but5",
	"but6",
	"but7",
	"but8",
	"but9",
	"but10",
	"but11"
];

var imgs = [
	"img",
	"img1",
	"img2",
	"img3",
	"img4",
	"img5",
	"img6",
	"img7",
	"img8",
	"img9",
	"img10",
	"img11"
];

// Aanmaken van variabele waarin een random nummer word gepakt
// id variabele verkort document.getelementbyid naar id
// test linked een naam van array names en array images

var id = function(id) {return document.getElementById(id);};
var random = Math.floor(Math.random() * images.length);
var test = names[random] + images[random];
var score = 0;

// een log om te checken wat de uitkomst van de variable zijn

console.log(test);
console.log(score);

// start de matching game en geeft alles een naam & img en maakt alles visible

function Start() {
	for (i = 0; i < names.length; i++) {
 	 	id(ids[i]).innerHTML = names[i];
 	 	id(imgs[i]).innerHTML = images[i];
 	 	id(ids[i]).style.visibility = "visible";
		id(imgs[i]).style.visibility = "visible";
	}
	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("bt1").style.visibility = "hidden";
}

// als je op een button klikt dan checkt de functie of de img en naam gelijk zijn
// en geeft dan een verandering op de variabele score

function Guess() {
		if(ids == imgs) {
			score = score + 1;
		} else {
		score = score - 1;
		}
		console.log(score);
}


