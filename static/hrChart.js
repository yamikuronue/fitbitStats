var ctx = document.getElementById("hrChart").getContext("2d");

var data = {
	labels: window.hrData.map(function(value) { return value.time }),
	datasets: [
		{
			fillColor: "rgba(220,220,220,0.2)",
			strokeColor: "rgba(220,220,220,1)",
			pointColor: "rgba(220,220,220,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(220,220,220,1)",
			data: window.hrData.map(function(value) { return value.value })
		}
	]
}
var hrChart = new Chart(ctx).Line(data, {
    bezierCurve: false
});