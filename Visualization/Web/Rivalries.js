type = 3;

function plotTreeGraph() {
	d3.select("#Box").remove();
	// Resets the SVG container object, in case the
	// Visualize button is clicked multiple times.
	// Prevents the effects of plotGraph() from stacking
	var svgContainer = d3.select("#visualization").append("svg").attr("id",
			"Box").attr("width", 940).attr("height", 3800);

	var allRivals = [ {
		name : "New South Wales Swifts",
		teamColor : "#FF00FF"
	}, // 0
	{
		name : "Queensland Firebirds",
		teamColor : "#800080"
	}, // 1
	{
		name : "Northern Mystics",
		teamColor : "#0000FF"
	}, // 2
	{
		name : "Waikato Bay of Plenty Magic",
		teamColor : "#000000"
	}, // 3
	{
		name : "Canterbury Tactix",
		teamColor : "#FF0000"
	}, // 4
	{
		name : "Central Pulse",
		teamColor : "#FFFF00"
	}, // 5
	{
		name : "Adelaide Thunderbirds",
		teamColor : "#FF1493"
	}, // 6
	{
		name : "Southern Steel",
		teamColor : "#00B7EB"
	}, // 7
	{
		name : "West Coast Fever",
		teamColor : "#32CD32"
	}, // 8
	{
		name : "Melbourne Vixens",
		teamColor : "#008080"
	}, // 9
	];

	// Only potential rivals, not sifted as of yet.
	// Occurs both ways, but need to be interpreted only once.
	
	var barHeight = 40;
	var textMarginLeftX = 0;
	var textMarginRightX = 710;
	var textMarginY = 50;
	var barMarginX = 200;
	var barMarginY = 30;
	var barTotalLength = 500;
	var spaceBetweenBars = 10;
	
	
	var rectHomeMainLabel = svgContainer.append("text")
	   .attr("x",textMarginLeftX)
	   .attr("y",textMarginY/2)
	   .text("Home Team")
	   .attr("font-family", "Arial")
	   .attr("font-size", "30px")
	   .attr("fill","#000000");
	
	var rectAwayMainLabel = svgContainer.append("text")
	   .attr("x",textMarginRightX)
	   .attr("y",textMarginY/2)
	   .text("Away Team")
	   .attr("font-family", "Arial")
	   .attr("font-size", "30px")
	   .attr("fill","#000000");
	
	for ( var i = 0; i < onGame.length; i++) {
		var game = onGame[i];

		var score = game.Score;
		if (score.indexOf("draw") == 0) {
			score = score.slice(5, 11);
		}

		var homeaway = score.split("vs");
		
		var home = parseInt(homeaway[0]);
		var away = parseInt(homeaway[1]);
		var total = home+away;
		
		var homePC = home/total;
		var awayPC = away/total;

		var homeWidth = homePC*barTotalLength;
		var awayWidth = awayPC*barTotalLength;
		
		var homeColor = "";
		var awayColor = "";
			
		
		for(var j = 0; j < allRivals.length ; j++){
			if(game["Home Team"] == allRivals[j]["name"]){
				log(game["Home Team"] +" compared to: "+allRivals[j]["name"]);
				homeColor =  allRivals[j]["teamColor"];
			}
		}
		for(var j = 0; j < allRivals.length ; j++){
			if(game["Away Team"] == allRivals[j]["name"]){
				log(game["Away Team"] +" compared to: "+allRivals[j]["name"]);
				awayColor =  allRivals[j]["teamColor"];
			}
		}
		
		if(homeColor == "" || awayColor == ""){
			log("No Color Match!");
		}
		
		var rectHome = svgContainer.append("rect")
		   .attr("x", barMarginX)
		   .attr("y",barMarginY + (i*(barHeight+spaceBetweenBars)))
		   .attr("width", 0)
		   .attr("height", barHeight) // Plot difference of Home Team score to Away Team score
		   .attr("fill",homeColor);
		
		rectHome.transition().attr("width", homeWidth).duration(1000);
		
		var rectAway = svgContainer.append("rect")
		   .attr("x", barMarginX+homeWidth)
		   .attr("y",barMarginY + (i*(barHeight+spaceBetweenBars)))
		   .attr("width", 0)
		   .attr("height", barHeight) // Plot difference of Home Team score to Away Team score
		   .attr("fill",awayColor);  
		
		rectAway.transition().attr("width", awayWidth).duration(1000);
		
		var rectHomeLabel = svgContainer.append("text")
		   .attr("x",textMarginLeftX)
		   .attr("y",(textMarginY + (i*(barHeight+spaceBetweenBars))-(spaceBetweenBars/2)+10))
		   .text(game["Home Team"])
		   .attr("font-family", "Arial")
		   .attr("font-size", "15px")
		   .attr("fill","#000000");
		
		var rectAwayLabel = svgContainer.append("text")
		   .attr("x",textMarginRightX)
		   .attr("y",(textMarginY + (i*(barHeight+spaceBetweenBars))-(spaceBetweenBars/2)+10))
		   .text(game["Away Team"])
		   .attr("font-family", "Arial")
		   .attr("font-size", "15px")
		   .attr("fill","#000000");
		
		
		
	}
	var rectAwayLabel = svgContainer.append("text")
	   .attr("x", barMarginX+(barTotalLength/2)-50)
	   .attr("y", 20)
	   .text("Rivalry Boundary")
	   .attr("font-family", "Arial")
	   .attr("font-size", "15px")
	   .attr("fill","#FF0000");
	
	var separator = svgContainer.append("line")
	   .attr("x1", barMarginX+(barTotalLength/2))
	   .attr("y1", textMarginY/2)
	   .attr("x2", barMarginX+(barTotalLength/2)) // The graph line can only be as long as the input
	   .attr("y2", (textMarginY + (onGame.length*(barHeight+spaceBetweenBars))-(spaceBetweenBars/2)+10))
	   .attr("stroke-width", 2)
	   .attr("stroke", "black");
}