var onGame = new Array();
var offGame = new Array();


// The function to start all functions
function load(){
onGame = [];
offGame = [];	
// Get Season that was selected by User
var filename = "https://dl.dropboxusercontent.com/u/155290014/";
var selectedElement = document.getElementById("season");
var selectedSeason = selectedElement.options[selectedElement.selectedIndex].value;
var finalFilename = filename+""+selectedSeason+"-Table1.csv";

d3.csv(finalFilename,
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
			plotGraph();
		});
}

// For debugging purposes only
// FIXME Throws uncaught errors, must be a better way to print statements.
function log(msg) {
	setTimeout(function() {
		throw new Error(msg);
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
var teamGames = new Array();

function findGames(team) {
	for ( var i = 0; i < onGame.length; i++) {
		if (onGame[i]["Home Team"] == team) {
			teamGames.push(onGame[i]);
			console.log(onGame[i]);
		}
	}
}

function plotGraph() {
	
	teamGames = [];
	// Get the selected HOME Team from the drop-down-list
	var selectedElement = document.getElementById("teamName");
	var selectedTeam = selectedElement.options[selectedElement.selectedIndex].value;
	// console.log(findGames(selectedTeam));

	findGames(selectedTeam);  // Gets an Array of Games with
							  // the selected HOME Team

	d3.select("#Box").remove(); 
	// Resets the SVG container object, in case the
	// Visualize button is clicked multiple times.
	// Prevents the effects of plotGraph() from stacking

	var svgContainer = d3.select("p").append("svg")
									 .attr("id","Box")
									 .attr("width", 800)
									 .attr("height", 500);
		
	// Draw the results for each match
	var j = 0;
	for (var match in teamGames) 
	// In this case, match is a game by the Home
	// Team versus a variety of Visiting Teams
	{
		// Draw the zero line
		var line = svgContainer.append("line")
							   .attr("x1", 5)
							   .attr("y1", 250)
							   .attr("x2", 5 + (teamGames.length * 51) + 50) // The graph line can only be as long as the input
							   .attr("y2", 250)
							   .attr("stroke-width", 2)
							   .attr("stroke", "black");
		j++;
	}
	
	// Draw the results for each match
	for ( var i = 0 ; i < teamGames.length ; i++) // In this case, match is a game by the Home
	// Team versus a variety of Visiting Teams
	{
		console.log(match);
		// Draw the bar graph ON the current length of line
		var score = teamGames[i].Score;
		if (score.indexOf("draw") == 0) {
			score = score.slice(5, 11);
		}
		var bak = score; // For slicing a brand new string (Not sliced yet).
		var home = score.slice(0, 2); 
		var away = bak.slice(4, 6);
		log("Home: "+home);
		log("Away: "+away);
		var diff = home - away;
		var diff2 = away - home;
		if(diff > 0){
			var rect = svgContainer.append("rect")
							   .attr("x", 5 + (i * 51))
							   .attr("y",250)
							   .attr("width", 50)
							   .attr("height", 0) // Plot difference of Home Team score to Away Team score
							   .attr("fill","green"); 
			rect.transition().attr("height", diff*5).duration(1000).attr("y",250-(diff*5));
			
		}
		else{
			var rect = svgContainer.append("rect")
			   .attr("x", 5 + (i * 51))
			   .attr("y", 250)
			   .attr("width", 50)
			   .attr("height",0)
			   .attr("fill","red"); // Plot difference of Home Team score to Away Team score
			
			rect.transition().attr("height", diff2*5).duration(1000);
		}
		
		// TODO print graph in side of filtering attributes, not at the top.
	}

}