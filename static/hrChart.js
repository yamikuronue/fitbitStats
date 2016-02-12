var ctx = document.getElementById("hrChart").getContext("2d");

function filterItems(value, index) {
	return (index % 10 == 0);
}

var datapoints = window.hrData.filter(filterItems).map(function(value) { return value.value });

var data = {
	labels: window.hrData.filter(filterItems).map(function(value) { return value.time }),
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
var hrChart = new Chart(ctx).Line(data, {
    bezierCurve: false
});

datapoints.forEach(function (value, i) {
	if (value > 100) {
		hrChart.datasets[0].points[i].fillColor = "lightred";
		hrChart.datasets[0].points[i].strokeColor = "red";
		hrChart.datasets[0].points[i].pointColor = "darkred";
	}
});