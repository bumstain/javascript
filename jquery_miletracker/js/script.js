$(document).one('pageinit', function(){
	// Display runs
	showRuns();


	// Add Handler
	$('#submitAdd').on('tap', addRun);

	/****** SHOW ALL RUNS ON HOMEPAGE *******/

	function showRuns() {
		// Get runs object
		var runs = getRunsObject();

		// Check if empty 
		if(runs != '' && runs != null) {
			for(var i = 0; i < runs.length; i++) {
				$('#stats').append('<li class:"ui-body-inherit ui-li-static"><strong>Date:</strong>'+ ' ' + runs[i]["date"]+
					'<br><strong>Distance: </strong>' + ' ' + runs[i]["miles"] + 'm<div class="controls">' + 
					'<a href="#edit">Edit</a> | <a href="#delete">Delete</a></li>');
			}
			$('#home').bind('pageinit', function() {
				$('stats').listview('refresh');
			});
		}
	}
	
	/****** ADD RUNS FUNCTIONALITY *******/
	 function addRun(){
		// Get form values
		var miles = $('#addMiles').val();
		var date = $('#addDate').val();
		
		// Create 'run' object
		var run = {
			date: date,
			miles: parseFloat(miles)
		};
		
		var runs = getRunsObject();
		
		// Add run to runs array
		runs.push(run);
		
		alert('The run has been added!');
		
		// Set stringified object to localStorage
		localStorage.setItem('runs', JSON.stringify(runs));
		
		// Redirect
		window.location.href="index.html";
		
		return false;
	 }
	 


	 
	 /****** GET RUNS OBJECT *******/
	 function getRunsObject(){
		// Set runs array
		var runs = new Array();
		// Get current runs from localStorage
		var currentRuns = localStorage.getItem('runs');
		
		// Check localStorage
		if(currentRuns != null){
			// Set to runs
			var runs = JSON.parse(currentRuns);
		}


		
		// Return runs object
		return runs.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
	 }
});