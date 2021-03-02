
var games = [
	{name:"Among us ", image: "<img src='../images/among.jpg' style='width:353px;height:200px;' alt='among us'>"},
	{name:"Apex ",image: "<img src='../images/apex.jpg' style='width:353px;height:200px;' alt='apex legends'>"},
	{name:"CS:GO ",image: "<img src='../images/csgo.jpg' style='width:353px;height:200px;' alt='csgo'>"},
	{name:"Fortnite ",image: "<img src='../images/GTA.jpg' style='width:353px;height:200px;' alt='grand theft auto'>"},
	{name:"GTA ",image: "<img src='../images/GTA.jpg' style='width:353px;height:200px;' alt='grand theft auto'>"},
	{name:"LoL ",image: "<img src='../images/LoL.jpg' style='width:353px;height:200px;' alt='league of legends'>"},
	{name:"MC ",image: "<img src='../images/minecraft.jpg' style='width:353px;height:200px;' alt='minecraft'>"},
	{name:"OW ",image: "<img src='../images/overwatch.jpg' style='width:353px;height:200px;' alt='overwatch'>"},
	{name:"PUBG",image: "<img src='../images/pubg.jpg' style='width:353px;height:200px;' alt='pubg'>"},
	{name:"R6 ",image: "<img src='../images/rainbowsix.jpg' style='width:353px;height:200px;' alt='rainbow six siege'>"},
	{name:"RL ",image: "<img src='../images/rl.jpg' style='width:353px;height:200px;' alt='rocket league'>"},
	{name:"Warzone ",image: "<img src='../images/warzone.jpg' style='width:353px;height:200px;' alt='warzone'>"}
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
var random = Math.floor(Math.random() * games.length);
var score = 0;

// een log om te checken wat de uitkomst van de variable zijn

console.log(score);

// start de matching game en geeft alles een naam & img en maakt alles visible

function Start() {
	for (i = 0; i < games.length; i++) {	
 	 	id(ids[i]).innerHTML = games[i].name;
 	 	id(imgs[i]).innerHTML = games[i].image;
 	 	id(ids[i]).style.visibility = "visible";
		id(imgs[i]).style.visibility = "visible";
	} 
	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";
	id("bt1").style.visibility = "hidden";
	id("bt2").style.visibility = "visible";
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

function Reset() {
	location.reload();
}
