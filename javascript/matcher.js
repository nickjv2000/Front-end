/*
Id variable made smaller from document.getelementbyid to id
Creating variables where random numbers are being generated
*/
var id = function(id) {return document.getElementById(id);};
var score = 10;
var spliceName = [0,1,2,3,4,5,6,7,8,9,10,11];
var spliceImage = [0,1,2,3,4,5,6,7,8,9,10,11];
var cloneGames = games.slice();
var historyScore = false;
var textScoreResultStat = false;
var finishScore = 0;
var timeleft = 10;
var settingsUsed = false;
document.body.style.backgroundImage = "url('../images/start.gif')";
/*
giving id's bt1, bt2 and bt3 a const to link with a function
hides finish button
*/

var containerDiv = document.getElementById("containers");

// Creates random number
function generateNumberByArray(Array){

	var index = Math.floor(Math.random() * Array.length);
	var returnValue = Array[index];
	Array.splice(index, 1);
	return returnValue;
}

// Making the elements invisible
function visibleElements() {

	document.body.style.backgroundImage = "none";

	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";

	resetGame.disabled = false;
	startGame.disabled = true;

	if (settingsUsed == true) {
		settingsTextTitle.remove();
		changeTimerText.remove();
		changeTimer.remove();
	}
}	

/*
Start the matching game
Apply the function visibleElements
create a variable for the container div
Create a card group to put the divs in
*/
function start() {

	visibleElements();
	timerStart();

	textScoreResultStat = false;

	var cardGroupDiv = document.createElement("div");
		cardGroupDiv.className = "card-group";
		cardGroupDiv.id = "cardGroup";

	for (let u = 0; u < games.length; u++) {

		/* 
		Apply a random number to the variables
		Create divs and buttons 
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
		Add "div2" to "div1", "btn" to "div1" and "div1" to "div0" so they show in container
		Remove numbers from the games array
		*/
		cardDiv.appendChild(imgDiv);
		cardDiv.appendChild(gameBtn);
		cardGroupDiv.appendChild(cardDiv);
		containerDiv.appendChild(cardGroupDiv);	
	
		// Apply scores by clicking on the names
		if(randomNumberName == randomNumberImage) {
			gameBtn.onclick = function(){
				score += 1;
			};
		} else if(randomNumberName != randomNumberImage) {
			gameBtn.onclick = function(){score -= 1};
		}
	}
	settingsUsed = false;
	spliceName = [0,1,2,3,4,5,6,7,8,9,10,11];
	spliceImage = [0,1,2,3,4,5,6,7,8,9,10,11];
}

/*
A function that loads the last page of the website
Removes any buttons/text that was made prior to the result screen
*/
function finish() {

	textCreateFinish();


	textScoreResultStat = true;
	finishScore += 1;
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
  	
// Showing the results of the game
	// Score higher than 10
	if (score > 10){

		document.body.style.backgroundImage = "url('../images/happy.gif')";
			textResult.innerHTML = "You've gotten a score above 10, congratulations you've done very well!";
		
	// Score under 10	
	} else if (score < 10) {

		document.body.style.backgroundImage = "url('../images/sad.png')";
			textResult.innerHTML = "A score below 10...? How did you even manage that."

	// Score equal to 10
	} else if (score == 10) {

		document.body.style.backgroundImage = "url('../images/neutral.png')";
			textResult.innerHTML = "10 on the dot, unlucky!"
	}
 	startGameChanges();
}

function continueGame() {

	statRemoval();

	id("countdown").style.display = "";
	id("containers").style.display = "";	
	id("dropdown").style.display = "";
	id("text1").style.display = "";
	id("text2").style.display = "";
	start();
}

// Reload the page when pressing the "Reset" button
function reset() {
	location.reload();
}

// Load the history of the past 10 matches
function historyMatches() {

	document.body.style.backgroundImage = "none";

	statRemoval();

	textScoreResultStat = false;
	startGame.disabled = false;
	resetGame.disabled = true;
	historyGameBtn.disabled = true;

	id("containers").style.display = "none";	
	id("dropdown").style.display = "none";
	id("text1").style.display = "none";
	id("text2").style.display = "none";
}

function settings() {

	startGameChanges();

	startGame.innerHTML = "Start";

	settingsUsed = true;
	settingsGame.disabled = true;


	id("containers").style.display = "none";	
	id("dropdown").style.display = "none";
	id("text1").style.display = "none";
	id("text2").style.display = "none";

	textScoreResultStat = false;
	startGame.disabled = false;
	resetGame.disabled = true;
	historyGameBtn.disabled = true;

	document.body.style.backgroundImage = "none";

	statRemoval();
	createTextSettings();

	timeleft = id("changeTimerText").value;

 	changeTimer = document.createElement("INPUT");
 	changeTimer.className = "mx-auto d-block";
  	changeTimer.setAttribute("type", "text");
  	document.body.appendChild(changeTimer);
}

function timerStart() {
	
	var gameTimer = setInterval(function(){
  	if(timeleft <= 0){
    	clearInterval(gameTimer);
    	document.getElementById("countdown").innerHTML = "Finished";
    	finish();
  	} else {
    	document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  	}
  		timeleft -= 1;
	}, 1000);
}

function textCreateFinish() {
	
	var textResult = document.createElement("P");
  	textResult.style.fontSize = "x-large";
  	textResult.style.color = "red";
  	textResult.style.textAlign = "center";
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

function startGameChanges() {
	
	startGame.style.visibility = "visible";
	startGame.innerHTML = "Play Again";
	startGame.disabled = false;
	startGame.onclick = function() {continueGame()};
}

function statRemoval() {

	if (textScoreResultStat == true) {
		id("textScoreResult").remove();
		id("textResult").remove();
	}
}

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
}

var startGame = document.createElement("button");
startGame.className = "btn btn-dark mx-auto d-block";
startGame.innerHTML = "Start";
startGame.style.display = "none";
document.body.appendChild(startGame);
startGame.onclick = function() {start()};

settingsGame = document.createElement("button");
settingsGame.className = "btn btn-dark mx-auto d-block";
settingsGame.innerHTML = "Settings";
document.body.appendChild(settingsGame);
settingsGame.onclick = function() {settings()};

var historyGameBtn = document.createElement("button");
historyGameBtn.className = "btn btn-dark mx-auto d-block";
historyGameBtn.innerHTML = "History";
historyGameBtn.disabled = true;
document.body.appendChild(historyGameBtn);
historyGameBtn.onclick = function() {historyMatches()};

resetGame = document.createElement("button");
resetGame.className = "btn btn-dark mx-auto d-block";
resetGame.innerHTML = "Reset";
resetGame.disabled = true;
document.body.appendChild(resetGame);
resetGame.onclick = function() {reset()};
