/*
Id variable made smaller from document.getelementbyid to id.
Creating multitude of global variables for functions.
*/
var id = function(id) {return document.getElementById(id);};
var score = 0;
var spliceName = [0,1,2,3,4,5,6,7,8,9,10,11];
var spliceImage = [0,1,2,3,4,5,6,7,8,9,10,11];
var historyScore = false;
var textScoreResultStat = false;
var timer = 15;
var timeleft;
var settingsUsed = false;
var startedGame = false;
var resultGame = [];
var gamesPlayed = 0;
var historyEnabled = false;
var containerDiv = document.getElementById("containers");
var maxImages = games.length;
var mostFailed = [];
var failEnabled = false;

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

	id("dropdown").style.visibility = "visible";
	id("text1").style.visibility = "visible";
	id("text2").style.visibility = "visible";

	resetGameBtn.disabled = false;
	startGame.disabled = true;
	historyGameBtn.disabled = true;
	settingsGameBtn.disabled = true;

	settingsInt();

	if (historyEnabled == true) {
		historyTextDiv.remove();
	}

	if (failEnabled == true) {
		failTextDiv.remove();
		cardFailGroupDiv.remove();
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

	document.body.style.backgroundImage = "url('../images/main.png')";
	document.body.style.backgroundPosition = "center center";

	settingsGameBtn.disabled = true;
	startedGame = true;
	textScoreResultStat = false;
	failEnabled = false;

	gamesPlayed += 1;

	var cardGroupDiv = document.createElement("div");
		 cardGroupDiv.className = "card-group";
		 cardGroupDiv.id = "cardGroup";

	for (let u = 0; u < maxImages; u++) {

		/* 
		Apply a random number to the variables.
		Create divs and buttons.
		*/

		randomNumberName = generateNumberByArray(spliceName);
		randomNumberImage = generateNumberByArray(spliceImage);
	
		var cardDiv = document.createElement("div");
			cardDiv.className = "card";
			cardDiv.id = "cardId" + u;

		var imgDiv = document.createElement("img");
			imgDiv.className = "img";
			imgDiv.src = games[randomNumberImage].image;
			imgDiv.id = "imgId" + u;

		var gameBtn = document.createElement("button");
			gameBtn.className = "btn btn-dark";
			gameBtn.innerHTML = games[randomNumberName].name;
			gameBtn.id = "gameBtn" + u;
			gameBtn.dataset.id = randomNumberName;

		var audioBtn = document.createElement("button");
			audioBtn.className = "btn btn-dark";
			audioBtn.innerHTML = "Audio " + games[randomNumberName].name;
			audioBtn.id = "audioBtn" + u;
			audioBtn.dataset.id = randomNumberName;
			audioBtn.dataset.audio = games[randomNumberName].audio;

			audioBtn.onclick = function() {
				var localAudio = new Audio(this.dataset.audio);
				localAudio.play(); 
			 }; 

	/*
		Appending divs to show up on the page.
		Remove numbers from the games array.
		*/
		cardDiv.appendChild(imgDiv);
		cardDiv.appendChild(gameBtn);
		cardDiv.appendChild(audioBtn);
		cardGroupDiv.appendChild(cardDiv);
		containerDiv.appendChild(cardGroupDiv);	
	
		/*
		Apply scores when clicking on button
		Change picture to wrong or right when clicked on button
		Remove button when button is clicked
		*/
		if(randomNumberName == randomNumberImage) {
			gameBtn.onclick = function(){
				score += 1; 
				id("cardId" + u).style.visibility = "hidden";
			}
		} else if(randomNumberName != randomNumberImage) {
			gameBtn.onclick = function(event){
				score -= 1;
				if (mostFailed.some(e => e.id === event.target.dataset.id)) {
					idIndex = mostFailed.findIndex((elem => elem.id === event.target.dataset.id));
					mostFailed[idIndex].amount += 1;
				} else {
					mostFailed.push( { id: event.target.dataset.id, amount: 1 } );
				}
				console.log(mostFailed, event.target.dataset.id);
			}
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

	createTextFinish();

// check that local storage is available

	settingsGameBtn.disabled = false;
	mostFailedBtn.disabled = false;
	startedGame = false;
	textScoreResultStat = true;
	historyScore = true;
	failEnabled = false;

	hideGen();

  	if (historyScore = true) {
		historyGameBtn.disabled = false;
	}

  	for (let u = 0; u < maxImages; u++) {
  		document.getElementById("cardId" + u).remove();
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

	scoreResultRemoval();

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

	if (historyEnabled == true) {
		historyTextDiv.remove();
	}

	if (failEnabled == true) {
		failTextDiv.remove();
		cardFailGroupDiv.remove();
	}

	historyEnabled = true;
	failEnabled = false;

	document.body.style.backgroundImage = "none";

	scoreResultRemoval();

	textScoreResultStat = false;
	startGame.disabled = false;
	resetGameBtn.disabled = false;
	historyGameBtn.disabled = true;
	settingsGameBtn.disabled = false;
	mostFailedBtn.disabled = false;

	id("containers").style.display = "none";	
	id("dropdown").style.display = "none";
	id("text1").style.display = "none";
	id("text2").style.display = "none";

	settingsInt();

	createTextHistory();
}

/* Call on a page where u can set settings such as a timer.
   Removes a bunch of added texts, applies changes to the start button
   changes tp buttons and the background.
   Creates texts purely to change the settings. 
*/
function settings() {

	scoreResultRemoval();
	startGameChanges();

	startGame.innerHTML = "Start";
	failenabled = false;
	settingsUsed = true;
	settingsGameBtn.disabled = true;
	historyGameBtn.disabled = false;
	resetGameBtn.disabled = false;
	mostFailedBtn.disabled = false;

	hideGen();

	textScoreResultStat = false;
	startGame.disabled = false;

	document.body.style.backgroundImage = "none";

	if (startedGame == true) {
  		for (let u = 0; u < 11; u++) {
  			document.getElementById("cardId").remove();
  			document.getElementById("imgId").remove();
  			document.getElementById("gameBtn").remove();
  		}
  		document.getElementById("cardGroup").remove();
  	}

  	if (historyEnabled == true) {
		historyTextDiv.remove();
	}

	if (failEnabled == true) {
		failTextDiv.remove();
		cardFailGroupDiv.remove();
	}

	scoreResultRemoval();
	createTextSettings();
}

function failedScores() {

	if (failEnabled == true) {
		failTextDiv.remove();
		cardFailGroupDiv.remove();
	}

	settingsGameBtn.disabled = false;
	mostFailedBtn.disabled = true;

	scoreResultRemoval();
	startGameChanges();

	textScoreResultStat = false;

	document.body.style.backgroundImage = "none";

	if (historyEnabled == true) {
		historyTextDiv.remove();
	}

	hideGen();
	settingsInt();
	createFailText();

}

// A timer that countsdown from 10 to 0 and then calls on the finish() function.
function timerStart() {

	var today = new Date();
	var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

	timeleft = timer;
	var gameTimer = setInterval(function(){
  	if(timeleft <= 0){
    	clearInterval(gameTimer);
    	document.getElementById("countdown").innerHTML = "Finished";
    	finish();
    	resultGame.push( { score: score, date: time } );
    	timeleft = timer;
  	} else {
    	document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  	}
  		timeleft -= 1;
	}, 1000);
}

// Text for the function finish().
function createTextFinish() {
	
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
function scoreResultRemoval() {

	if (textScoreResultStat == true) {
		id("textScoreResult").remove();
		id("textResult").remove();
	}
}

// Text created for the settings page.
function createTextSettings() {

	settingsCreateDiv = document.createElement("div");
	document.body.appendChild(settingsCreateDiv);

	settingsTextTitle = document.createElement("p");
	settingsTextTitle.style.fontSize = "x-large";
	settingsTextTitle.style.textAlign = "center";
	settingsTextTitle.id = "settingsTextTitle";
	settingsTextTitle.innerHTML = "Settings";
	settingsCreateDiv.appendChild(settingsTextTitle);

	changeTimerText = document.createElement("p");
	changeTimerText.style.fontSize = "x-large";
	changeTimerText.style.textAlign = "center";
	changeTimerText.id = "changeTimerText";
	changeTimerText.className = "mt-4";
	changeTimerText.innerHTML = "Change the timer (currently " + timeleft + " seconds)";
	settingsCreateDiv.appendChild(changeTimerText);

	extraTimerText = document.createElement("P");
	extraTimerText.style.textAlign = "center";
	extraTimerText.id = "extraSettingsText";
	extraTimerText.innerHTML = "If you've already played 1 game, the timer might give a second lower than it is when it starts."
	settingsCreateDiv.appendChild(extraTimerText);

 	changeTimer = document.createElement("INPUT");
 	changeTimer.className = "mx-auto d-block";
  	changeTimer.setAttribute("type", "text");
  	settingsCreateDiv.appendChild(changeTimer);

  	confirmChangeTimer = document.createElement("button");
  	confirmChangeTimer.className = "btn btn-dark mx-auto d-block mt-2";
  	confirmChangeTimer.innerHTML = "Confirm";
  	confirmChangeTimer.onclick = function(){
  		timer = changeTimer.value; 
  		alert("Time has been changed!");
  	}

  	settingsCreateDiv.appendChild(confirmChangeTimer);

  	settingsCreateDiv2 = document.createElement("div");
  	document.body.appendChild(settingsCreateDiv2);

  	changeCardText = document.createElement("P");
	changeCardText.style.textAlign = "center";
	changeCardText.id = "changeCardText";
	changeCardText.style.fontSize = "x-large";
	changeCardText.className = "mt-4";
	changeCardText.innerHTML = "Change the amount of images & buttons to match";
	settingsCreateDiv2.appendChild(changeCardText);

  	changeCardAmount = document.createElement("INPUT");
  	changeCardAmount.className = "mx-auto d-block mt-2";
  	changeCardAmount.setAttribute("type", "text");
  	settingsCreateDiv2.appendChild(changeCardAmount);

  	confirmChangeAmount = document.createElement("button");
  	confirmChangeAmount.className = "btn btn-dark mx-auto d-block mt-2";
  	confirmChangeAmount.innerHTML = "Confirm";
  	confirmChangeAmount.onclick = function(){
  		maxImages = changeCardAmount.value;
  		alert("Amount of images changed!"); 
  	}
  	settingsCreateDiv2.appendChild(confirmChangeAmount);
}

function createTextHistory() {

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

	console.log(resultGame);

	var btnName = ["sortScoreBtn", "sortDateBtn"];
	var btnInnerHTML = ["Sort by Score", "Sort by Date"];
	var btnId = ["sortScoreBtn", "sortDateBtn"]; 

	for (var k = 0; k < btnName.length; k++) {
		btnName[k] = document.createElement("button");
		btnName[k].className = "btn btn-dark mx-auto d-block";
		btnName[k].innerHTML = btnInnerHTML[k];
		btnName[k].id = btnId[k];
		historyTextDiv.appendChild(btnName[k]);
	}

	sortScoreBtn.onclick = function() {
		console.log(resultGame);
		resultGame.sort(function(a, b) {
			return b.score - a.score
		});
	}

	sortDateBtn.onclick = function() {
		console.log(resultGame);
		resultGame.sort(function(a, b) {
			return b.score - a.score
		});
	}

	for (var i = 0; i < gamesPlayed; ++i) {
    	historyText = document.createElement("P");
    	historyText.style.textAlign = "center";
    	historyText.id = "historyText";
    	historyText.className = "mt-2"
    	historyText.id = "scoreText"[i]
    	historyText.innerHTML = i + '. Score: ' + resultGame[i].score + '. Time: ' + resultGame[i].date;
    	historyTextDiv.appendChild(historyText);
	}
}

function createFailText() {

	var failTextDiv = document.createElement("div");
		 failTextDiv.id = "failTextDiv";
		 failTextDiv.className = "mx-auto d-block";
		 document.body.appendChild(failTextDiv);

	var failTitleText = document.createElement("p");
		 failTitleText.textAlign = "center";
		 failTitleText.className = "h3";
		 failTitleText.innerHTML = "The most failed buttons in recent games (if you've failed more in 1 game the first 3 show up)";

	if (mostFailed.id > 0) {
	failEnabled = true;

	var cardFailGroupDiv = document.createElement("div");
	 	 cardFailGroupDiv.className = "card-group mx-auto mt-5";
	 	 cardFailGroupDiv.id = "cardFailGroupDiv";

	 	console.log(mostFailed);
	 	mostFailed.sort(function(a, b) {
  			return b.amount - a.amount;
		});

		for (var i = 0; i <= 3; i++) {
			var cardFailDiv = document.createElement("div");
			 	cardFailDiv.className = "card";
			 	cardFailDiv.id = "cardFailId" + i;

			var imgFailDiv = document.createElement("img");
			 	imgFailDiv.className = "img";
			 	imgFailDiv.src = games[mostFailed[i].id].image; 
			 	imgFailDiv.id = "imgFailId" + i;

			var gameFailText = document.createElement("p");
			 	gameFailText.className = "mx-auto mt-2 h5";
			 	gameFailText.innerHTML = games[mostFailed[i].id].name + "Fails: " + mostFailed[i].amount;
			 	gameFailText.id = "gameFailText" + i;
		
			document.body.appendChild(cardFailGroupDiv)
			failTextDiv.appendChild(failTitleText);
			cardFailGroupDiv.appendChild(cardFailDiv);
			cardFailDiv.appendChild(imgFailDiv);
			cardFailDiv.appendChild(gameFailText);
		}
	}
}

function settingsInt() {

	if (settingsUsed == true) {
		settingsTextTitle.remove();
		changeTimerText.remove();
		changeTimer.remove();
		extraTimerText.remove();
		settingsCreateDiv.remove();
		settingsCreateDiv2.remove();
	}
}

function hideGen() {

	id("countdown").style.display = "none";
	id("containers").style.display = "none";	
	id("dropdown").style.display = "none";
	id("text1").style.display = "none";
	id("text2").style.display = "none";
}

// All main buttons created at the start.

var mainBtnNames = ["startGame", "settingsGameBtn", "historyGameBtn", "resetGameBtn", "mostFailedBtn"];
var mainBtnHTML = ["Start", "Settings", "History", "Reset", "Most Failed"];
var mainBtnIds = ["startGame", "settingsGameBtn", "historyGameBtn", "resetGameBtn", "mostFailedBtn"];

for (var i = 0; i < mainBtnNames.length; i++) {
	mainBtnNames[i] = document.createElement("button");
	mainBtnNames[i].className = "btn btn-dark mx-auto d-block";
	mainBtnNames[i].innerHTML = mainBtnHTML[i];
	mainBtnNames[i].id = mainBtnIds[i];
	document.body.appendChild(mainBtnNames[i]);
}

	startGame.style.display = "none";
	startGame.onclick = function() {start()};

	settingsGameBtn.onclick = function() {settings()};

	historyGameBtn.disabled = true;
	historyGameBtn.onclick = function() {historyMatches()};

	resetGameBtn.disabled = true;
	resetGameBtn.onclick = function() {reset()};

	mostFailedBtn.disabled = true;
	mostFailedBtn.onclick = function() {failedScores()};