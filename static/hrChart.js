var ctx = document.getElementById("hrChart").getContext("2d");
var hrChart = new Chart(ctx).Line(window.hrData, {
    bezierCurve: false
});