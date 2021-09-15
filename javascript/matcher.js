/*
Id variable made smaller from document.getelementbyid to id.
Creating variables where random numbers are being generated.
Creating multitude of variables for functions.
*/
var id = function(id) {return document.getElementById(id);};
var score = 0;
var spliceName = [0,1,2,3,4,5,6,7,8,9,10,11];
var spliceImage = [0,1,2,3,4,5,6,7,8,9,10,11];
var cloneGames = games.slice();
var historyScore = false;
var textScoreResultStat = false;
var timer = 5;
var timeleft = timer;
var settingsUsed = false;
var startedGame = false;
var resultGame = [];
var gamesPlayed = 0;
var historyEnabled = false;
var containerDiv = document.getElementById("containers");

document.body.style.backgroundImage = "url('../images/start.gif')";



// Creates random number.
function generateNumberByArray(Array){

	var index = Math.floor(Math.random() * Array.length);
	var returnValue = Array[index];
	Array.splice(index, 1);
	return returnValue;
}

// Making the elements invisible.
function visibleElements() {

	document.body.style.backgroundImage = "none";

	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";

	resetGameBtn.disabled = false;
	startGame.disabled = true;
	historyGameBtn.disabled = true;
	settingsGameBtn.disabled = true;

	if (settingsUsed == true) {
		settingsTextTitle.remove();
		changeTimerText.remove();
		changeTimer.remove();
		extraTimerText.remove();
	}

	if (historyEnabled == true) {
		historyTextDiv.remove();
	}
}	

/*
Start the matching game.
Apply the function visibleElements.
Create a variable for the container div.
Create a card group to put the divs in.
*/
function start() {

	visibleElements();
	timerStart();

	if(timeleft <= 0){
		finish();
	}

	settingsGameBtn.disabled = true;
	startedGame = true;
	textScoreResultStat = false;

	gamesPlayed += 1;

	var cardGroupDiv = document.createElement("div");
		cardGroupDiv.className = "card-group";
		cardGroupDiv.id = "cardGroup";

	for (let u = 0; u < games.length; u++) {

		/* 
		Apply a random number to the variables.
		Create divs and buttons.
		*/
		randomNumberName = generateNumberByArray(spliceName);
		randomNumberImage = generateNumberByArray(spliceImage);
	
		var cardDiv = document.createElement("div");
			cardDiv.className = "card";
			cardDiv.id = "cardId";

		var imgDiv = document.createElement("img");
			imgDiv.className = "img";
			imgDiv.src = games[randomNumberImage].image;
			imgDiv.id = "imgId";

		var gameBtn = document.createElement("button");
			gameBtn.className = "btn btn-dark";
			gameBtn.innerHTML = games[randomNumberName].name;
			gameBtn.id = "gameBtn"

		/*
		Add "div2" to "div1", "btn" to "div1" and "div1" to "div0" so they show in container.
		Remove numbers from the games array.
		*/
		cardDiv.appendChild(imgDiv);
		cardDiv.appendChild(gameBtn);
		cardGroupDiv.appendChild(cardDiv);
		containerDiv.appendChild(cardGroupDiv);	
	
		// Apply scores by clicking on the names.
		if(randomNumberName == randomNumberImage) {
			gameBtn.onclick = function(){score += 1};
		} else if(randomNumberName != randomNumberImage) {
			gameBtn.onclick = function(){score -= 1};
		}
	}

	settingsUsed = false;
	spliceName = [0,1,2,3,4,5,6,7,8,9,10,11];
	spliceImage = [0,1,2,3,4,5,6,7,8,9,10,11];
}

/*
A function that loads the last page of the website.
Removes any buttons/text that was made prior to the result screen.
*/
function finish() {

	textCreateFinish();

// check that local storage is available

	resultGame.push(score);

	settingsGameBtn.disabled = false;
	startedGame = false;
	textScoreResultStat = true;
	historyScore = true;

	id("countdown").style.display = "none";
	id("dropdown").style.display = "none";
	id("text1").style.display = "none";
	id("text2").style.display = "none";
	id("containers").style.display = "none";

  	if (historyScore = true) {
		historyGameBtn.disabled = false;
	}

  	for (let u = 0; u < 11; u++) {
  		document.getElementById("cardId").remove();
  		document.getElementById("imgId").remove();
  		document.getElementById("gameBtn").remove();
  	}

  	document.getElementById("cardGroup").remove();
  	
/*  Showing the results of the game.
	Score higher than 0. */
	if (score > 0){

		document.body.style.backgroundImage = "url('../images/happy.gif')";
			textResult.innerHTML = "You've gotten a score above 0, congratulations you've done very well!";
		
	// Score under 0.
	} else if (score < 0) {

		document.body.style.backgroundImage = "url('../images/sad.png')";
			textResult.innerHTML = "A score below 0...? How did you even manage that."

	// Score equal to 0.
	} else if (score == 0) {

		document.body.style.backgroundImage = "url('../images/neutral.png')";
			textResult.innerHTML = "0 on the dot, unfortunate!"
	}
 	startGameChanges();
}

// Removes any texts added in Finish(), resets the display of elements and runs the function start().
function continueGame() {

	statRemoval();

	id("countdown").style.display = "";
	id("containers").style.display = "";
	id("dropdown").style.display = "";
	id("text1").style.display = "";
	id("text2").style.display = "";
	score = 0;

	start();
}

// Reload the page when pressing the "Reset" button.
function reset() {

	location.reload();
}

// Load the history of the past 10 matches.
function historyMatches() {

	historyEnabled = true;

	document.body.style.backgroundImage = "none";

	statRemoval();

	textScoreResultStat = false;
	startGame.disabled = false;
	resetGameBtn.disabled = false;
	historyGameBtn.disabled = true;
	settingsGameBtn.disabled = false;

	id("containers").style.display = "none";	
	id("dropdown").style.display = "none";
	id("text1").style.display = "none";
	id("text2").style.display = "none";

	if (settingsUsed == true) {
		settingsTextTitle.remove();
		changeTimerText.remove();
		changeTimer.remove();
		extraTimerText.remove();
	}

	historyTextDiv = document.createElement("div");
	historyTextDiv.id = "historyTextContainer";
	document.body.appendChild(historyTextDiv);

	historyTitleText = document.createElement("P");
	historyTitleText.style.textAlign = "center"
	historyTitleText.id = "historyTitleText";
	historyTitleText.className = "mt-2"
	historyTitleText.style.fontSize = "x-large";
	historyTitleText.innerHTML = "The previous 10 scores you've reached (resets on page refresh/reset)"
	historyTextDiv.appendChild(historyTitleText);

	if(gamesPlayed > 10) {
		gamesPlayed = 10;
		id("scoretext1").remove();
	}

	for (var i = 0; i < gamesPlayed; ++i) {
    	historyText = document.createElement("P");
    	historyText.style.textAlign = "center";
    	historyText.id = "historyText";
    	historyText.className = "mt-2"
    	historyText.id = "scoreText"[i]
    	historyText.innerHTML = i + ". Your score was " + resultGame[i] + ", " + Date().valueOf();
    	historyTextDiv.appendChild(historyText);
	}
}

/* Call on a page where u can set settings such as a timer.
   Removes a bunch of added texts, applies changes to the start button
   changes tp buttons and the background.
   Creates texts purely to change the settings. 
*/
function settings() {

	statRemoval();
	startGameChanges();

	startGame.innerHTML = "Start";

	settingsUsed = true;
	settingsGameBtn.disabled = true;
	historyGameBtn.disabled = false;
	resetGameBtn.disabled = false;

	id("countdown").style.display = "none";
	id("containers").style.display = "none";	
	id("dropdown").style.display = "none";
	id("text1").style.display = "none";
	id("text2").style.display = "none";

	textScoreResultStat = false;
	startGame.disabled = false;

	document.body.style.backgroundImage = "none";

	statRemoval();
	createTextSettings();

 	changeTimer = document.createElement("INPUT");
 	changeTimer.className = "mx-auto d-block";
  	changeTimer.setAttribute("type", "text");
  	document.body.appendChild(changeTimer);

  	if (startedGame == true) {
  		for (let u = 0; u < 11; u++) {
  			document.getElementById("cardId").remove();
  			document.getElementById("imgId").remove();
  			document.getElementById("gameBtn").remove();
  		}
  		document.getElementById("cardGroup").remove();
  	}
}

// A timer that countsdown from 10 to 0 and then calls on the finish() function.
function timerStart() {
	
	var gameTimer = setInterval(function(){
  	if(timeleft <= 0){
    	clearInterval(gameTimer);
    	document.getElementById("countdown").innerHTML = "Finished";
    	finish();
    	timeleft = timer;
  	} else {
    	document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  	}
  		timeleft -= 1;
	}, 1000);
}

// Text for the function finish().
function textCreateFinish() {
	
	var textResult = document.createElement("P");
  	textResult.style.fontSize = "x-large";
  	textResult.style.color = "red";
  	textResult.style.textAlign = "center";
  	textResult.className = "mt-5"
  	textResult.id = "textResult";
  	document.body.appendChild(textResult);

  	var textScoreResult = document.createElement("P");
  	textScoreResult.style.fontSize = "x-large";
  	textScoreResult.style.color = "red";
  	textScoreResult.innerHTML = "Your score is: " + score;
  	textScoreResult.style.textAlign = "center";
  	textScoreResult.id = "textScoreResult";
  	document.body.appendChild(textScoreResult);
}

// Changes to the button Start.
function startGameChanges() {
	
	startGame.style.visibility = "visible";
	startGame.innerHTML = "Play Again";
	startGame.disabled = false;
	startGame.onclick = function() {continueGame()};
}

// Removal of texts created in the function finish().
function statRemoval() {

	if (textScoreResultStat == true) {
		id("textScoreResult").remove();
		id("textResult").remove();
	}
}

// Text created for the settings page.
function createTextSettings() {

	settingsTextTitle = document.createElement("p");
	settingsTextTitle.style.fontSize = "x-large";
	settingsTextTitle.style.textAlign = "center";
	settingsTextTitle.id = "settingsTitle";
	settingsTextTitle.innerHTML = "Settings";
	document.body.appendChild(settingsTextTitle);

	changeTimerText = document.createElement("P");
	changeTimerText.style.fontSize = "x-large";
	changeTimerText.style.textAlign = "center";
	changeTimerText.id = "changeTimerText";
	changeTimerText.className = "mt-4";
	changeTimerText.innerHTML = "Change the timer (currently " + timeleft + " seconds)";
	document.body.appendChild(changeTimerText);
	
	extraTimerText = document.createElement("P");
	extraTimerText.style.textAlign = "center";
	extraTimerText.id = "extraSettingsText";
	extraTimerText.innerHTML = "If you've already played 1 game, the timer might give a second lower than it is when it starts."
	document.body.appendChild(extraTimerText);
}

// All main buttons created at the start.
var startGame = document.createElement("button");
	startGame.className = "btn btn-dark mx-auto d-block";
	startGame.innerHTML = "Start";
	startGame.style.display = "none";
	document.body.appendChild(startGame);
	startGame.onclick = function() {start()};

var settingsGameBtn = document.createElement("button");
	settingsGameBtn.className = "btn btn-dark mx-auto d-block";
	settingsGameBtn.innerHTML = "Settings";
	document.body.appendChild(settingsGameBtn);
	settingsGameBtn.onclick = function() {settings()};

var historyGameBtn = document.createElement("button");
	historyGameBtn.className = "btn btn-dark mx-auto d-block";
	historyGameBtn.innerHTML = "History";
	historyGameBtn.disabled = true;
	document.body.appendChild(historyGameBtn);
	historyGameBtn.onclick = function() {historyMatches()};

var resetGameBtn = document.createElement("button");
	resetGameBtn.className = "btn btn-dark mx-auto d-block";
	resetGameBtn.innerHTML = "Reset";
	resetGameBtn.disabled = true;
	document.body.appendChild(resetGameBtn);
	resetGameBtn.onclick = function() {reset()};
