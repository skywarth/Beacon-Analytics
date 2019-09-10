am4core.ready(function () {

    
    

}); // end am4core.ready()




function chart4Initiate() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    // Create chart instance
    var chart = am4core.create("chart4", am4charts.XYChart);

    // Add data
    var a = chart4Data;
    chart.data = [{
        "date": "2012-07-27",
        "value": 13
    }, {
        "date": "2012-07-28",
        "value": 11
    }, {
        "date": "2012-07-29",
        "value": 15
    }, {
        "date": "2012-07-30",
        "value": 16
        }];
    chart.data = a;
    // Set input format for the dates
    chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

    // Create axes
    var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.valueY = "average";
    series.dataFields.dateX = "date";
    series.tooltipText = "{average}"
    series.strokeWidth = 2;
    series.minBulletDistance = 15;

    // Drop-shaped tooltips
    series.tooltip.background.cornerRadius = 20;
    series.tooltip.background.strokeOpacity = 0;
    series.tooltip.pointerOrientation = "vertical";
    series.tooltip.label.minWidth = 40;
    series.tooltip.label.minHeight = 40;
    series.tooltip.label.textAlign = "middle";
    series.tooltip.label.textValign = "middle";

    // Make bullets grow on hover
    var bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.circle.strokeWidth = 2;
    bullet.circle.radius = 4;
    bullet.circle.fill = am4core.color("#fff");

    var bullethover = bullet.states.create("hover");
    bullethover.properties.scale = 1.3;

    // Make a panning cursor
    chart.cursor = new am4charts.XYCursor();
    chart.cursor.behavior = "panXY";
    chart.cursor.xAxis = dateAxis;
    chart.cursor.snapToSeries = series;

    // Create vertical scrollbar and place it before the value axis
    chart.scrollbarY = new am4core.Scrollbar();
    chart.scrollbarY.parent = chart.leftAxesContainer;
    chart.scrollbarY.toBack();

    // Create a horizontal scrollbar with previe and place it underneath the date axis
    chart.scrollbarX = new am4charts.XYChartScrollbar();
    chart.scrollbarX.series.push(series);
    chart.scrollbarX.parent = chart.bottomAxesContainer;

    chart.events.on("ready", function () {
        //dateAxis.zoom({ start: 0.79, end: 1 });
    });

}


function generateChartData() {
    var chartData = [];
    /*for (var i = 0; i < chart4Data; i++) {
        chart4Data[i].date = chart4Data[i].date.getDate();
    }*/
    chart.data = chart4Data;
    return chartData;
}