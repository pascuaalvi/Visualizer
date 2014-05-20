function plotGraphDP() {

	homeGames = [];
	awayGames = [];
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
	var svgContainer = d3.select("#visualization").append("svg")
									 .attr("id","Box")
									 .attr("width", 1200)
									 .attr("height", 800);
	//Axis stuff
	var maxScoreDiff = 400;
	var axisX = 100;
	var lineYPos = 400;
	var barWidth = 90;
	var spaceFromAxis = 200;
	var scaleHeight = 10;



	var yLabel = svgContainer.append("text")
	   .attr("x",200)
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
	   .attr("y2", lineYPos+maxScoreDiff-40)
	   .attr("stroke-width", 2)
	   .attr("stroke", "black");

	var initialvalue = -36;

	// Draw axis points and label value
	for(var start = (lineYPos+maxScoreDiff-40); start > (lineYPos-maxScoreDiff-40); start -= 40){
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
		   .attr("x2", spaceFromAxis + ((homeGames.length) * (barWidth))+ barWidth) // The graph line can only be as long as the input
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
								   .attr("x", spaceFromAxis + (i * (barWidth+10))+ barWidth)
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
		else if(selectedAdvantage == "Away Team"){

			// Draw X Axis line
			var line = svgContainer.append("line")
			   .attr("x1", axisX)
			   .attr("y1", lineYPos)
			   .attr("x2", spaceFromAxis + ((awayGames.length) * (barWidth))+ barWidth) // The graph line can only be as long as the input
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
			barWidth = 50;

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