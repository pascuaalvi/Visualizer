
var onGame = new Array();
var offGame = new Array();
d3.csv("https://dl.dropboxusercontent.com/u/155290014/2008-Table1.csv",function(error,data)
{ 
	if(error!=null)
		//console.log(error);
		error.forEach(function(d){
		if(d.Date.indexOf("BYES:") == 0){
			offGame.push(d);
		}
		else{
		    onGame.push(d);
		}
	});
	
});

// For debugging purposes only
function log(msg) {
    setTimeout(function() {
        throw new Error(msg);
    }, 0);
}
//

var homeScores = Array();
var awayScores = Array();

function findGames(team){
	var games = new Array();
	for(var i = 0 ; i < onGame.length ; i++){
		if(onGame[i]["Home Team"] == team){
			var score = onGame[i].Score;
			if(score.indexOf("draw") == 0){				
			score = score.slice(5,11);	
			}	
			var bak = score;
			log("Before:"+score);
			log("Beforebak:"+bak);
			var home = score.slice(0,2);
			var away = bak.slice(4,6);
			log(home + " - " + away);
		games.push(onGame[i]);
		}
	}
	return games;
}

function plotGraph(){
	var selectedElement = document.getElementById("teamName");
	var selectedTeam = selectedElement.options[selectedElement.selectedIndex].value;
	//console.log(findGames(selectedTeam));
	
	var teamGames = findGames(selectedTeam);
		
	var svgContainer = d3.select("p").append("svg")
	                                 .attr("width", 600)
	                                 .attr("height", 500);
		
	 //Draw the zero line
	var circle = svgContainer.append("line")
	                          .attr("x1", 5)
	                          .attr("y1", 250)
	                         .attr("x2", 500)
	                         .attr("y2", 250)
							 .attr("stroke-width", 2)
	                         .attr("stroke", "black");
	
	// Draw the results for each match
	var i = 0;
	for(var match in teamGames){
	var rectangle = svgContainer.append("rect")
	                            .attr("x", 20+(i*21))
	                            .attr("y", match)
	                            .attr("width", 50)
	                            .attr("height", 100);
	i++;
	}

	
	
}