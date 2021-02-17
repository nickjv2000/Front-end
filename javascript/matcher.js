var images = [
	"among.jpg",
	"apex.jpg",
	"csgo.jpg",
	"fortnite.jpg",
	"GTA.jpg",
	"LoL.jpg",
	"minecraft.jpg",
	"overwatch.jpg",
	"pubg.jpg",
	"rainbowsix.jpg",
	"rl.jpg",
	"warzone.jpg"
];

var names = [
	"Among us",
	"Apex Legends",
	"CS:GO",
	"Fortnite",
	"PubG",
	"Rainbow Six Siege",
	"Call of Duty Warzone",
	"Rocket League",
	"League of Legends",
	"Grand Theft Auto 5",
	"Minecraft",
	"Overwatch"
];

var randomimage = Math.floor(Math.random() * images.length);

var random = Math.floor(Math.random() * names.length);
var randomname = Math.floor(Math.random() * names.length);
var randomnames = Math.floor(Math.random() * names.length);

console.log(images[randomimage]);
console.log(names[randomname]);

function myFunction() {
	document.getElementById("but").innerHTML = names[random];
	document.getElementById("but1").innerHTML = names[randomname];
	document.getElementById("but2").innerHTML = names[randomnames];
	document.getElementById("but3").innerHTML = names[randomname];
	document.getElementById("but4").innerHTML = names[randomname];
	document.getElementById("but5").innerHTML = names[randomname];
	document.getElementById("but6").innerHTML = names[randomname];
	document.getElementById("but7").innerHTML = names[randomname];
	document.getElementById("but8").innerHTML = names[randomname];
	document.getElementById("but9").innerHTML = names[randomname];
}
// document.getElementById("but").innerHTML = names[randomname];

