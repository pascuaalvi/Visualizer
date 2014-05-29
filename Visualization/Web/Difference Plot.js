type = 1;

function mouseOver(game,adv){
	// adv - can be just a string with either "Home Team" or "Away Team"
	// If handling "All", directly refer to the two strings above instead of selectedAdvantage variable (This will result in "All").
	
	// Resets the SVG container object, in case the
	// Visualize button is clicked multiple times.
	// Prevents the effects of plotGraph() from stacking
	var info = d3.select("#visualization").append("svg")
									 .attr("id","info")
									 .attr("width", 800)
									 .attr("height", 90);
	
	var enemySide = "";

	var enemyScore = 0;
	var allyScore = 0;
	
	var score = awayGames[homeGames.length].Score;
	if (score.indexOf("draw") == 0) {
		score = score.slice(5, 11);
	}

	var homeaway = score.split("vs");
	var home = homeaway[0];
	var away = homeaway[1];
	
	
	if(adv == "Home Team"){
		enemySide = "Away Team";	
		
		allyScore = home;
		enemyScore = away;
	}
	else if(adv == "Away Team"){
		enemySide = "Home Team";
		
		allyScore = away;
		enemyScore = home;
	}
	else{
		log("Invalid Team Advantage!");
	}
	
	var infoBox = info.append("rect")
	   .attr("x",2)
	   .attr("y",2)
	   .attr("width",795)
	   .attr("height",60)
	   .attr("fill","white")
	   .attr("stroke","black");
	
	var gameInfo = info.append("text")
	   .attr("x",5)
	   .attr("y",5)
	   .text("Against: "+game[enemySide]+"		"+game[adv]+"'s Score: "+allyScore+"		"+game[enemySide]+"'s Score: "+enemyScore)
	   .attr("font-family", "sans-serif")
	   .attr("font-size", "40px")
	   .attr("fill","red");
}

function mouseOut(){

	d3.select("#info").remove();
}

function plotGraphDP() {

	homeGames = [];
	awayGames = [];
	// Get the selected HOME Team from the drop-down-list
	var selectedElement = document.getElementById("teamName");
	var selectedTeam = selectedElement.options[selectedElement.selectedIndex].value;
	// console.log(findGames(selectedTeam));
	var selectedElement2 = document.getElementById("position");
	var selectedPosition = selectedElement2.options[selectedElement2.selectedIndex].value;
	
	if(selectedPosition != "All"){
		var positions = selectedPosition.split("to");
		var min = parseInt(positions[0]);
		var max = parseInt(positions[1]);

		log("Min: "+ min + " ,Max: "+max);
		findGamesWithPos(selectedTeam,min,max);
		// Gets an Array of Games with
		// the selected HOME Team within the selected Rounds
	}
	else{
	findGames(selectedTeam);  // Gets an Array of Games with
	  // the selected HOME Team
	}

	d3.select("#Box").remove();
	// Resets the SVG container object, in case the
	// Visualize button is clicked multiple times.
	// Prevents the effects of plotGraph() from stacking
	var svgContainer = d3.select("#visualization").append("svg")
									 .attr("id","Box")
									 .attr("width", 800)
									 .attr("height", 500);
	//Axis stuff
	var maxScoreDiff = 250;
	var axisX = 100;
	var lineYPos = 250;
	var barWidth = 50;
	var spaceFromAxis = 200;
	var scaleHeight = 5;



	var yLabel = svgContainer.append("text")
	   .attr("x",70)
	   .attr("y",90)
	   .text("Difference in In-Match Scores")
	   .attr("font-family", "sans-serif")
	   .attr("font-size", "20px")
	   .attr("fill","red")
	   .attr("transform","rotate(90 10,90)");

		//Draw Y Axis line
	var axis = svgContainer.append("line")
	   .attr("x1", axisX)
	   .attr("y1", lineYPos-maxScoreDiff)
	   .attr("x2", axisX) // The graph line can only be as long as the input
	   .attr("y2", lineYPos+maxScoreDiff-20)
	   .attr("stroke-width", 2)
	   .attr("stroke", "black");

	var initialvalue = -36;

	// Draw axis points and label value
	for(var start = (lineYPos+maxScoreDiff-25); start > (lineYPos-maxScoreDiff-25); start -= 25){
		var yPoint = svgContainer.append("line")
		   .attr("x1", axisX+10)
		   .attr("y1", start)
		   .attr("x2", axisX-10) // The graph line can only be as long as the input
		   .attr("y2", start)
		   .attr("stroke-width", 2)
		   .attr("stroke", "black");
		var yPointLabel = svgContainer.append("text")
		   .attr("x",50)
		   .attr("y",start+10)
		   .text(initialvalue)
		   .attr("font-family", "arial")
		   .attr("font-size", "15px")
		   .attr("fill","red");

		initialvalue += 4;
	}

	var selectedElement = document.getElementById("Advantage");
	var selectedAdvantage = selectedElement.options[selectedElement.selectedIndex].value;

	log(selectedAdvantage);
	if(selectedAdvantage == "Home Team"){

		// Draw X Axis line
		var line = svgContainer.append("line")
		   .attr("x1", axisX)
		   .attr("y1", lineYPos)
		   .attr("x2", spaceFromAxis + ((homeGames.length) * (barWidth))+ barWidth+ (barWidth/2)) // The graph line can only be as long as the input
		   .attr("y2", lineYPos)
		   .attr("stroke-width", 2)
		   .attr("stroke", "black");

		// Draw the results for each match
		for ( var i = 0 ; i < homeGames.length ; i++) // In this case, match is a game by the Home
		// Team versus a variety of Visiting Teams
		{
			// Draw the bar graph ON the current length of line
			var score = homeGames[i].Score;
			if (score.indexOf("draw") == 0) {
				score = score.slice(5, 11);
			}

			var homeaway = score.split("vs");
			var home = homeaway[0];

			var filteredString = homeaway[1].slice(0,3);
			var away = filteredString;

			log("Home: "+home);
			log("Away: "+away);
			var diff = home - away;
			var diff2 = away - home;
			if(diff > 0){
				var rect = svgContainer.append("rect")
								   .attr("x", spaceFromAxis + (i * (barWidth+10)))
								   .attr("y",lineYPos)
								   .attr("width", barWidth)
								   .attr("height", 0) // Plot difference of Home Team score to Away Team score
								   .attr("fill","green");
				rect.transition().attr("height", diff*scaleHeight).duration(1000).attr("y",lineYPos-(diff*scaleHeight));
//				rect.addEventListener("mouseover",mouseOver);
//				rect.addEventListener("mouseout",mouseOut);

			}
			else{
				var rect = svgContainer.append("rect")
				   .attr("x", spaceFromAxis + (i * (barWidth+10)))
				   .attr("y", lineYPos)
				   .attr("width", barWidth)
				   .attr("height",0)
				   .attr("fill","red");

				rect.transition().attr("height", diff2*scaleHeight).duration(1000);
			}

			// TODO print graph in side of filtering attributes, not at the top.
		}
	}
		else if(selectedAdvantage == "Away Team"){

			// Draw X Axis line
			var line = svgContainer.append("line")
			   .attr("x1", axisX)
			   .attr("y1", lineYPos)
			   .attr("x2", spaceFromAxis + ((awayGames.length) * (barWidth))+ barWidth + (barWidth/2)) // The graph line can only be as long as the input
			   .attr("y2", lineYPos)
			   .attr("stroke-width", 2)
			   .attr("stroke", "black");

			// Draw the results for each match
			for ( var i = 0 ; i < awayGames.length ; i++) // In this case, match is a game by the Home
			// Team versus a variety of Visiting Teams
			{
				// Draw the bar graph ON the current length of line
				var score = awayGames[i].Score;
				if (score.indexOf("draw") == 0) {
					score = score.slice(5, 11);
				}

				var homeaway = score.split("vs");
				var home = homeaway[0];
				var away = homeaway[1];

				log("Home: "+home);
				log("Away: "+away);
				var diff = away-home;
				var diff2 = home-away;
				if(diff > 0){
					var rect = svgContainer.append("rect")
									   .attr("x", spaceFromAxis + (i * (barWidth+10)))
									   .attr("y",lineYPos)
									   .attr("width", barWidth)
									   .attr("height", 0) // Plot difference of Home Team score to Away Team score
									   .attr("fill","green");
					rect.transition().attr("height", diff*scaleHeight).duration(1000).attr("y",lineYPos-(diff*scaleHeight));

				}
				else{
					var rect = svgContainer.append("rect")
					   .attr("x", spaceFromAxis + (i * (barWidth+10)))
					   .attr("y", lineYPos)
					   .attr("width", barWidth)
					   .attr("height",0)
					   .attr("fill","red"); // Plot difference of Home Team score to Away Team score

					rect.transition().attr("height", diff2*scaleHeight).duration(1000);
				}

				// TODO print graph in side of filtering attributes, not at the top.
		}
	}
		else if (selectedAdvantage == "All"){
			barWidth = 30;

			//Longer line for more info
			var line = svgContainer.append("line")
			   .attr("x1", axisX)
			   .attr("y1", lineYPos)
			   .attr("x2", spaceFromAxis + ((homeGames.length+awayGames.length) * (barWidth+10)) + barWidth) // The graph line can only be as long as the input
			   .attr("y2", lineYPos)
			   .attr("stroke-width", 2)
			   .attr("stroke", "black");

			/** Home component*/
			// Draw the results for each match
			for ( var i = 0 ; i < homeGames.length ; i++) // In this case, match is a game by the Home
			// Team versus a variety of Visiting Teams
			{
				// Draw the bar graph ON the current length of line
				var score = homeGames[i].Score;
				if (score.indexOf("draw") == 0) {
					score = score.slice(5, 11);
				}

				var homeaway = score.split("vs");
				var home = homeaway[0];
				var away = homeaway[1];

				log("Home: "+home);
				log("Away: "+away);
				var diff = home - away;
				var diff2 = away - home;
				if(diff > 0){
					var rect = svgContainer.append("rect")
									   .attr("x", spaceFromAxis + (i * (barWidth+10)))
									   .attr("y",lineYPos)
									   .attr("width", barWidth)
									   .attr("height", 0) // Plot difference of Home Team score to Away Team score
									   .attr("fill","green");
					rect.transition().attr("height", diff*scaleHeight).duration(1000).attr("y",lineYPos-(diff*scaleHeight));

				}
				else{
					var rect = svgContainer.append("rect")
					   .attr("x", spaceFromAxis + (i * (barWidth+10)))
					   .attr("y", lineYPos)
					   .attr("width", barWidth)
					   .attr("height",0)
					   .attr("fill","red"); // Plot difference of Home Team score to Away Team score

					rect.transition().attr("height", diff2*scaleHeight).duration(1000);
				}

				// TODO print graph in side of filtering attributes, not at the top.
			}
			/** Away component*/
			// Draw the results for each match
			for ( var i = homeGames.length ; i < (homeGames.length+awayGames.length) ; i++) // In this case, match is a game by the Home
			// Team versus a variety of Visiting Teams
			{
				// Draw the bar graph ON the current length of line
				var score = awayGames[i-homeGames.length].Score;
				if (score.indexOf("draw") == 0) {
					score = score.slice(5, 11);
				}

				var homeaway = score.split("vs");
				var home = homeaway[0];
				var away = homeaway[1];

				log("Home: "+home);
				log("Away: "+away);
				var diff = away-home;
				var diff2 = home-away;
				if(diff > 0){
					var rect = svgContainer.append("rect")
									   .attr("x", spaceFromAxis + (i * (barWidth+10)))
									   .attr("y",lineYPos)
									   .attr("width", barWidth)
									   .attr("height", 0) // Plot difference of Home Team score to Away Team score
									   .attr("fill","green");
					rect.transition().attr("height", diff*scaleHeight).duration(1000).attr("y",lineYPos-(diff*scaleHeight));

				}
				else{
					var rect = svgContainer.append("rect")
					   .attr("x", spaceFromAxis + (i * (barWidth+10)))
					   .attr("y", lineYPos)
					   .attr("width", barWidth)
					   .attr("height",0)
					   .attr("fill","red"); // Plot difference of Home Team score to Away Team score

					rect.transition().attr("height", diff2*scaleHeight).duration(1000);
				}
			}
		}
}