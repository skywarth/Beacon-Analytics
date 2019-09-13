anychart.onDocumentReady(function () {
    
});


function chart11Initiate() {
    // The data used in this sample can be obtained from the CDN
    // https://cdn.anychart.com/csv-data/msft-daily-short.js
    // https://cdn.anychart.com/csv-data/orcl-daily-short.js
    // https://cdn.anychart.com/csv-data/csco-daily-short.js
    // https://cdn.anychart.com/csv-data/ibm-daily-short.js

    // create data tables on loaded data
    var msftDataTable = anychart.data.table();
    msftDataTable.addData(getDataBounce());

    var orclDataTable = anychart.data.table();
    orclDataTable.addData(getDataVisitorCount());

    var cscoDataTable = anychart.data.table();
    cscoDataTable.addData(getDataAverageDuration());

    var ibmDataTable = anychart.data.table();
    ibmDataTable.addData(get_ibm_daily_short_data());

    // create stock chart
    var chart = anychart.stock();

    // create first plot on the chart with column series
    var firstPlot = chart.plot(0);
    // create line series on the first plot
    firstPlot.line()
        .data(msftDataTable.mapAs({ 'value': 1 }))
        .name('Average of Total Bounce Rates for Museum');

    // create second plot on the chart
    var secondPlot = chart.plot(1);
    // create spline line series on the second plot
    secondPlot.spline()
        .data(orclDataTable.mapAs({ 'value': 1 }))
        .name('Total Visitors for Museum')
        .fill('#1976d2 0.65')
        .stroke('1.5 #1976d2');

    // create third plot
    var thirdPlot = chart.plot(2);
    // create step line series on the third plot
    thirdPlot.stepLine()
        .data(cscoDataTable.mapAs({ 'value': 1 }))
        .name('Average Duration')
        .fill('#ef6c00 0.65')
        .stroke('1.5 #ef6c00');

    // create forth plot
    var forthPlot = chart.plot(3);
    // create step line series on the forth plot
    forthPlot.line()
        .data(msftDataTable.mapAs({ 'value': 1 }))
        .name('Average of Total Bounce Rates for Museum')
        .tooltip(false);
    forthPlot.spline()
        .data(orclDataTable.mapAs({ 'value': 1 }))
        .name('Total Visitors for Museum')
        .tooltip(false);
    forthPlot.stepLine()
        .data(cscoDataTable.mapAs({ 'value': 1 }))
        .name('Average Duration')
        .tooltip(false);

    // create scroller series with mapped data
    chart.scroller().line(msftDataTable.mapAs({ 'value': 1 }));

    // set chart selected date/time range
    chart.selectRange('2004', '@DateTime.Now');

    // set container id for the chart
    chart.container('chart11');

    var tooltip = chart.tooltip();
    tooltip.format(function () {
        if (this.seriesName == "Average Duration") {
            return this.seriesName + "=" + secondsToFinalTime(this.value);
        } else {
            return this.seriesName + "=" + this.value;
        }

        /*
        var average = (this.value + this.value) / 2;
        console.log(average);
        return average + '\n' + this.seriesName + ': ' + this.value;*/
    });

    // initiate chart drawing
    chart.draw();

    // create range picker
    var rangePicker = anychart.ui.rangePicker();
    // init range picker
    rangePicker.render(chart);

    // create range selector
    var rangeSelector = anychart.ui.rangeSelector();
    // init range selector
    rangeSelector.render(chart);
}


function getDataBounce() {
    var preArray = $.makeArray(bounceData);
    var actualArray = [];
    for (var i = 0; i < preArray.length; i++) {
        actualArray.push([preArray[i].date, preArray[i].value]);
    }
    return actualArray;


}


function getDataVisitorCount() {
    var preArray = $.makeArray(visitorCountAndDurationData);
    var actualArray = [];
    for (var i = 0; i < preArray.length; i++) {
        actualArray.push([preArray[i].date, preArray[i].count]);
    }
    return actualArray;
}

function getDataAverageDuration() {
    var preArray = $.makeArray(visitorCountAndDurationData);
    var actualArray = [];
    for (var i = 0; i < preArray.length; i++) {
        actualArray.push([preArray[i].date, preArray[i].averageTime]);
    }
    return actualArray;
}