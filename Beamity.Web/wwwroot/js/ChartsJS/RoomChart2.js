(function () {
    function ac_add_to_head(el) {
        var head = document.getElementsByTagName('head')[0];
        head.insertBefore(el, head.firstChild);
    }
    function ac_add_link(url) {
        var el = document.createElement('link');
        el.rel = 'stylesheet'; el.type = 'text/css'; el.media = 'all'; el.href = url;
        ac_add_to_head(el);
    }
    function ac_add_style(css) {
        var ac_style = document.createElement('style');
        if (ac_style.styleSheet) ac_style.styleSheet.cssText = css;
        else ac_style.appendChild(document.createTextNode(css));
        ac_add_to_head(ac_style);
    }

    ac_add_style(document.getElementById("ac_style_samples-stock-spline-05").innerHTML);
    ac_add_style(".anychart-embed-samples-stock-spline-05{width:600px;height:450px;}");
})();

anychart.onDocumentReady(function () {

    // set the data

});


function chart5Initiate() {
    var chart5Defer = $.Deferred();
    chart5Defer = $.Deferred();
    table = anychart.data.table();
    table.addData(getData5());



    // map the data
    mapping_euro = table.mapAs();
    mapping_euro.addField('value', 1);
    mapping_rub = table.mapAs();
    mapping_rub.addField('value', 2);

    // chart type
    var chart = anychart.stock();

    // set the series
    var series_euro = chart.plot(0).spline(mapping_euro);
    series_euro.name("Average of Visitors for All Artifacts");

    var series_rub = chart.plot(1).spline(mapping_rub);
    series_rub.name("Average of duration for All Artifacts");

    var tooltip = chart.tooltip();

    // Set text formatter.
    tooltip.format(function () {
        if (this.seriesName == "Average of duration for All Artifacts") {
            return this.seriesName + "=" + secondsToFinalTime(this.value);
        } else {
            return this.seriesName + "=" + this.value;
        }

        /*
        var average = (this.value + this.value) / 2;
        console.log(average);
        return average + '\n' + this.seriesName + ': ' + this.value;*/
    });

    // coloring
    series_euro.stroke("#ff0000");

    chart.title('');

    chart.container('chart5');
    chart.draw();
    chart5Defer.resolve('yay');
    return chart5Defer.promise();


}


function getData5() {
    var preArray = $.makeArray(chart5Data);
    var actualArray = [];
    for (var i = 0; i < preArray.length; i++) {
        actualArray.push([preArray[i].date, preArray[i].count, preArray[i].averageTime]);
    }
    return actualArray;


}