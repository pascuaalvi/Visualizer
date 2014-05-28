type = 2;

function plotGraphHierarchy() {

	allGames = [];
	
	// console.console.log(findGames(selectedTeam));
	var selectedElement2 = document.getElementById("position");
	var selectedPosition = selectedElement2.options[selectedElement2.selectedIndex].value;
	
	var positions = selectedPosition.split("to");
	var min = parseInt(positions[0]);
	var max = parseInt(positions[1]);

	console.log("Min: "+ min + " ,Max: "+max);
	findGamesWithPosH(min,max);
	// Gets an Array of Games with
	// the selected HOME Team within the selected Rounds

	d3.select("#Box").remove();
	// Resets the SVG container object, in case the
	// Visualize button is clicked multiple times.
	// Prevents the effects of plotGraph() from stacking
	var svgContainer = d3.select("#visualization").append("svg")
									 .attr("id","Box")
									 .attr("width", 800)
									 .attr("height", 600);
	
	var scoreTally = [
	                  {name:"New South Wales Swifts",score:0,teamColor:"#FF00FF"}, // 0
	                  {name:"Queensland Firebirds",score:0,teamColor:"#800080"}, // 1
	                  {name:"Northern Mystics",score:0,teamColor:"#0000FF"}, // 2
	                  {name:"Waikato Bay of Plenty Magic",score:0,teamColor:"#000000"}, // 3
	                  {name:"Canterbury Tactix",score:0,teamColor:"#FF0000"},  // 4
	                  {name:"Central Pulse",score:0,teamColor:"#FFFF00"}, // 5
	                  {name:"Adelaide Thunderbirds",score:0,teamColor:"#FF1493"}, // 6
	                  {name:"Southern Steel",score:0,teamColor:"#00B7EB"}, // 7
	                  {name:"West Coast Fever",score:0,teamColor:"#32CD32"}, // 8
	                  {name:"Melbourne Vixens",score:0,teamColor:"#008080"}, // 9
	                  ];
	
	console.log("Created scoreTally.");
	console.log("Creating Wins DB...");
	
	
	for ( var i = 0 ; i < allGames.length ; i++) {
		var score = allGames[i].Score;
		if (score.indexOf("draw") == 0) {
			score = score.slice(5, 11);
		}
		
		var homeaway = score.split("vs");
		var home = homeaway[0];
		var away = homeaway[1];
		var winTeamName = "";
		
		if(home > away){
			winTeamName = allGames[i]["Home Team"];
		}
		else if(away > home){
			winTeamName = allGames[i]["Away Team"];
		}
		
		console.log("       The "+winTeamName+" have Won!");
		
			for ( var j = 0 ; j < scoreTally.length ; j++){
				if(scoreTally[j]["name"] == winTeamName){
					scoreTally[j]["score"] = scoreTally[j]["score"] + 2;
				}
			}
	}
	
	
	console.log("Creating Graph...");
	
	// Graph Parameters
	var barHeight = 25;
	var marginX = 10;
	var marginY = 30;
	var spaceBetweenBars = 30;
	
	var scaleWidth = 30;
	
	// Draw Hierarchy
	// Draw the results for each season periodS
	for ( var i = 0 ; i < scoreTally.length ; i++) 
	{         
       
		
		var score = scoreTally[i]["score"];
		console.log("Index: "+i+" Score: "+score);
		
		var rectLabel = svgContainer.append("text")
		   .attr("x",marginX)
		   .attr("y",(marginY + (i*(barHeight+spaceBetweenBars))-(spaceBetweenBars/2)+10))
		   .text(scoreTally[i]["name"] +": "+scoreTally[i]["score"]+" points")
		   .attr("font-family", "arial")
		   .attr("font-size", "25px")
		   .attr("fill",scoreTally[i]["teamColor"]);
		
		var rect = svgContainer.append("rect")
						   .attr("x", marginX)
						   .attr("y",marginY + (i*(barHeight+spaceBetweenBars)))
						   .attr("width", 0)
						   .attr("height", barHeight) // Plot difference of Home Team score to Away Team score
						   .attr("fill",scoreTally[i]["teamColor"]);
		
		rect.transition().attr("width", (score*scaleWidth)+5).duration(1000);
	}
}