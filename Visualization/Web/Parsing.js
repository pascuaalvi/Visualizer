var onGame = new Array();
var offGame = new Array();

// The function to start all functions
function load() {
	onGame = [];
	offGame = [];
	// Get Season that was selected by User
	var filename = "https://dl.dropboxusercontent.com/u/155290014/SWEN303%20Assignment2/tidyData/";
	var selectedElement = document.getElementById("season");
	var selectedSeason = selectedElement.options[selectedElement.selectedIndex].value;
	var finalFilename = filename + "" + selectedSeason + "-Table1.csv";

	d3
			.csv(
					finalFilename,
					function(error, data) {
						if (error != null)
							// console.log(error);
							error.forEach(function(d) {
								if (d.Date.indexOf("BYES:") == 0) {
									offGame.push(d);
								} else {
									onGame.push(d);
								}
							});
						
						console.log(type);
												
						if(type == 1){
							plotGraphDP();
						}
						else if(type == 2){
							plotGraphHierarchy();
						}	
						else if(type == 3){
							plotTreeGraph();
						}
						else{
							return;
						}
					});
}

// For debugging purposes only
// FIXME Throws uncaught errors, must be a better way to print statements.
function log(msg) {
	setTimeout(function() {
		throw new Error("MADE BY ME: " + msg);
	}, 0);
}
//

// Several ways to visualize this:
// 1. Find the difference between the home score and the away score,
// a negative value will be plotted on the negative axis showing a red color.
// For a positive value it is on the positive axis showing a green color.
// 2. Plot the home scores on the positive axis and plot the away scores
// on the negative axis. (A horizontal stem-leaf graph)

// For this program, I have chosen strategy 1. This is because it is more
// visually representing of the home team's performance.
// A negative value would mean a poor performance, and vice versa.
var homeGames = new Array();
var awayGames = new Array();

var allGames = new Array();

function findGames(team) {
	for ( var i = 0; i < onGame.length; i++) {
		if (onGame[i]["Home Team"] == team) {
			homeGames.push(onGame[i]);
			console.log(onGame[i]);
		} else if (onGame[i]["Away Team"] == team) {
			awayGames.push(onGame[i]);
			console.log(onGame[i]);
		}
	}
}

function findGamesWithPos(team, minRound, maxRound) {
	for ( var i = 0; i < onGame.length; i++) {
		if (onGame[i]["Home Team"] == team) {

			if (parseInt(onGame[i]["Round"]) >= minRound) {
				if (parseInt(onGame[i]["Round"]) <= maxRound) {
					homeGames.push(onGame[i]);
					console.log(onGame[i]);
				}
			}
		} else if (onGame[i]["Round"] == team) {
			if (onGame[i]["Home Team"] == team) {

				if (parseInt(onGame[i]["Round"]) >= minRound) {
					if (parseInt(onGame[i]["Round"]) <= maxRound) {
						awayGames.push(onGame[i]);
						console.log(onGame[i]);
					}
				}
			}
		}
	}
}

function findGamesWithPosH(minRound, maxRound) {
	for ( var i = 0; i < onGame.length; i++) {
			if (parseInt(onGame[i]["Round"]) <= maxRound) {
						allGames.push(onGame[i]);
						console.log(onGame[i]);
			}
	}
}