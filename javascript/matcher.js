/*
Id variable made smaller from document.getelementbyid to id
Creating variables where random numbers are being generated
*/
var id = function(id) {return document.getElementById(id);};
var score = 10;
var spliceName = [0,1,2,3,4,5,6,7,8,9,10,11];
var spliceImage = [0,1,2,3,4,5,6,7,8,9,10,11];

/*
giving id's bt1, bt2 and bt3 a const to link with a function
hides finish button
*/
const start = id("bt1");
const reset = id("bt2");
const finish = id("bt3");

finish.style.visibility = "hidden";

// Creates random number
function generateNumberByArray(Array){
	var index = Math.floor(Math.random() * Array.length);
	var returnValue = Array[index];
	Array.splice(index, 1);
	return returnValue;
}

// Making the elements invisible
function visibleElements() {
	id("dropdown").style.visibility = "visible";

	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";
	id("text3").style.display = "none";
	id("text4").style.display = "none";
	id("text5").style.display = "none";
	id("text6").style.display = "none";

	reset.style.visibility = "visible";
	finish.style.visibility = "visible";
	start.remove();
}

/*
Start the matching game
Apply the function visibleElements
create a variable for the container div
Create a card group to put the divs in
*/
start.onclick = function start() {

	visibleElements();

	var containerDiv = document.getElementById("containers");

	var div0 = document.createElement("div");
		div0.className = "card-group";

	for (let u = 0; u < games.length; u++) {

		/* 
		Apply a random number to the variables
		Create divs and buttons 
		*/
		randomNumberName = generateNumberByArray(spliceName);
		randomNumberImage = generateNumberByArray(spliceImage);
	
		var div1 = document.createElement("div");
			div1.className = "card";

		var div2 = document.createElement("img");
			div2.className = "img";
			div2.src = games[randomNumberImage].image;

		var btn = document.createElement("button");
			btn.className = "btn btn-dark";
			btn.innerHTML = games[randomNumberName].name;

		/*
		Add "div2" to "div1", "btn" to "div1" and "div1" to "div0" so they show in container
		Remove numbers from the games array
		*/
		div1.appendChild(div2);
		div1.appendChild(btn);
		div0.appendChild(div1);
		containerDiv.appendChild(div0);	
	
		// Apply scores by clicking on the names
		if(randomNumberName == randomNumberImage) {
			btn.onclick = function(){score += 1};
		} else if(randomNumberName != randomNumberImage) {
			btn.onclick = function(){score -= 1};
		}
	}	
}

/*
A function that loads the last page of the website
Removes any buttons/text that was made prior to the result screen
*/
finish.onclick = function finish() {

	id("dropdown").remove();
	id("text1").remove();
	id("text2").remove();
	id("containers").remove();
	id("bt3").remove();

	reset.remove();

// Adds back the text 3 up to 6 for results
	id("text3").style.display = "";
	id("text4").style.display = "";
	id("text5").style.display = "";
	id("text6").style.display = "";

	id("text3").style.fontSize = "x-large";
	id("text4").style.fontSize = "x-large";
	id("text5").style.fontSize = "x-large";
	id("text6").style.fontSize = "x-large";

// Looks at what number the score is, depending on the score gives text
	var result = document.getElementById("text3");
	result.innerHTML = "Your score is: " + score;

// Showing the results of the game
	// Score higher than 10
	if (score > 10){

		document.body.style.backgroundImage = "url('../images/happy.gif')";

		var resultTexts = document.getElementById("text4");
			resultTexts.innerHTML = "If you've gotten a score above 10, congratulations you've done very well!";

		id("text3").style.color = "red";
		id("text4").style.color = "red";
		id("text5").style.color = "red";
		id("text6").style.color = "red";
		
	// Score under 10	
	} else if (score < 10) {

		document.body.style.backgroundImage = "url('../images/sad.png')";

		var resultTextz = document.getElementById("text5");
			resultTextz.innerHTML = "Is the score below 10? You've done poorly."

	// Score equal to 10
	} else if (score == 10) {

		document.body.style.backgroundImage = "url('../images/neutral.png')";

		var resultTexta = document.getElementById("text6");
			resultTexta.innerHTML = "Is the score 10 on the dot? Well you could've done nothing else to change that."
	}
}

// Reload the page when pressing the "Reset" button
reset.onclick = function reset() {
	location.reload();
}
