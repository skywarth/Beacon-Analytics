anychart.onDocumentReady(function () {
    // The data used in this sample can be obtained from the CDN
    // https://cdn.anychart.com/csv-data/msft-daily-short.js
    // https://cdn.anychart.com/csv-data/orcl-daily-short.js
    // https://cdn.anychart.com/csv-data/csco-daily-short.js
    // https://cdn.anychart.com/csv-data/ibm-daily-short.js

    // create data tables on loaded data
    var msftDataTable = anychart.data.table();
    msftDataTable.addData(get_msft_daily_short_data());

    var orclDataTable = anychart.data.table();
    orclDataTable.addData(get_orcl_daily_short_data());

    var cscoDataTable = anychart.data.table();
    cscoDataTable.addData(get_csco_daily_short_data());

    var ibmDataTable = anychart.data.table();
    ibmDataTable.addData(get_ibm_daily_short_data());

    // create stock chart
    var chart = anychart.stock();

    // create first plot on the chart with column series
    var firstPlot = chart.plot(0);
    // create line series on the first plot
    firstPlot.line()
        .data(msftDataTable.mapAs({ 'value': 4 }))
        .name('Average of Total Bounce Rates for Museum');

    // create second plot on the chart
    var secondPlot = chart.plot(1);
    // create spline line series on the second plot
    secondPlot.spline()
        .data(orclDataTable.mapAs({ 'value': 4 }))
        .name('Total Visitors for Museum')
        .fill('#1976d2 0.65')
        .stroke('1.5 #1976d2');

    // create third plot
    var thirdPlot = chart.plot(2);
    // create step line series on the third plot
    thirdPlot.stepLine()
        .data(cscoDataTable.mapAs({ 'value': 4 }))
        .name('Average of Total Times for Museum')
        .fill('#ef6c00 0.65')
        .stroke('1.5 #ef6c00');

    // create forth plot
    var forthPlot = chart.plot(3);
    // create step line series on the forth plot
    forthPlot.line()
        .data(msftDataTable.mapAs({ 'value': 4 }))
        .name('Average of Total Bounce Rates for Museum')
        .tooltip(false);
    forthPlot.spline()
        .data(orclDataTable.mapAs({ 'value': 4 }))
        .name('Total Visitors for Museum')
        .tooltip(false);
    forthPlot.stepLine()
        .data(cscoDataTable.mapAs({ 'value': 4 }))
        .name('Average of Total Times for Museum')
        .tooltip(false);

    // create scroller series with mapped data
    chart.scroller().line(msftDataTable.mapAs({ 'value': 4 }));

    // set chart selected date/time range
    chart.selectRange('2004', '@DateTime.Now');

    // set container id for the chart
    chart.container('chart11');
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
});