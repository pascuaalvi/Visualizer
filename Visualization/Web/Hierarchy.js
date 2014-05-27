function plotGraphHierarchy() {

	allGames = [];
	
	// console.log(findGames(selectedTeam));
	var selectedElement2 = document.getElementById("position");
	var selectedPosition = selectedElement2.options[selectedElement2.selectedIndex].value;
	
	if(selectedPosition != "All"){
		var positions = selectedPosition.split("to");
		var min = parseInt(positions[0]);
		var max = parseInt(positions[1]);

		log("Min: "+ min + " ,Max: "+max);
		findGamesWithPosH(min,max);
		// Gets an Array of Games with
		// the selected HOME Team within the selected Rounds
	}
	else{
	findGamesH();
	}

	d3.select("#Box").remove();
	// Resets the SVG container object, in case the
	// Visualize button is clicked multiple times.
	// Prevents the effects of plotGraph() from stacking
	var svgContainer = d3.select("#visualization").append("svg")
									 .attr("id","Box")
									 .attr("width", 1000)
									 .attr("height", 600);
}