
/*Today*/
$(document).ready(function() { 
	var ctx = document.getElementById("hrTodayChart").getContext("2d");

	function filterItems(value, index) {
		return (index % 10 == 0);
	}

	var datapoints = window.hrTodayData.filter(filterItems).map(function(value) { return value.value });

	var data = {
		labels: window.hrTodayData.filter(filterItems).map(function(value) { return value.time }),
		datasets: [
			{
				fillColor: "lightgreen",
				strokeColor: "green",
				pointColor: "darkgreen",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: datapoints
			}
		]
	}
	var hrTodayChart = new Chart(ctx).Line(data, {
		bezierCurve: false
	});

	datapoints.forEach(function (value, i) {
		if (value > 100) {
			hrTodayChart.datasets[0].points[i].fillColor = "lightred";
			hrTodayChart.datasets[0].points[i].strokeColor = "red";
			hrTodayChart.datasets[0].points[i].pointColor = "darkred";
		}
	});

	hrTodayChart.update();
});


/*Week*/
$(document).ready(function() { 
	var ctx = document.getElementById("hrWeekChart").getContext("2d");
	function filterItems(value, index) {
		return (index % 10 == 0);
	}

	var datapoints = window.hrWeekData.filter(filterItems).map(function(value) { return value.value.restingHeartRate });

	var data = {
		labels: window.hrWeekData.filter(filterItems).map(function(value) { return value.dateTime }),
		datasets: [
			{
				fillColor: "lightgreen",
				strokeColor: "green",
				pointColor: "darkgreen",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(220,220,220,1)",
				data: datapoints
			}
		]
	}
	var hrWeekChart = new Chart(ctx).Line(data, {
		bezierCurve: false
	});

	datapoints.forEach(function (value, i) {
		if (value > 90) {
			hrWeekChart.datasets[0].points[i].fillColor = "lightred";
			hrWeekChart.datasets[0].points[i].strokeColor = "red";
			hrWeekChart.datasets[0].points[i].pointColor = "darkred";
		}
	});

	hrWeekChart.update();
});