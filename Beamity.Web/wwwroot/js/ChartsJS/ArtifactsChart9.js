
//Average of visitors and time for all rooms

anychart.onDocumentReady(function () {
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
    ac_add_link('https://cdn.anychart.com/releases/v8/css/anychart-ui.min.css');
    ac_add_link('https://cdn.anychart.com/releases/v8/fonts/css/anychart-font.min.css');
    ac_add_style(document.getElementById("ac_style_DHd8fH15").innerHTML);
    ac_add_style(".anychart-embed-DHd8fH15{width:600px;height:450px;}");
});


function chart1Initiate(){
    var dataTable = anychart.data.table();
    dataTable.addData(getData());

    var mapping = dataTable.mapAs({ 'value': 1 });
    var mapping2 = dataTable.mapAs({ 'value': 2 });

    var chart = anychart.stock();

    var plot = chart.plot();

    plot.yScale().stackMode('value');

    plot.column(mapping).name('Visitor Count');
    plot.column(mapping2).name('Duration');

    var tooltip = chart.tooltip();

    // Set text formatter.
    tooltip.format(function () {
        if (this.seriesName == "Duration") {
            return this.seriesName +"="+ secondsToFinalTime(this.value);
        } else {
            return this.seriesName + "=" + this.value;
        }

        /*
        var average = (this.value + this.value) / 2;
        console.log(average);
        return average + '\n' + this.seriesName + ': ' + this.value;*/
    });

    chart.scroller().line(mapping);

    chart.selectRange('2019-08-29', '2019-09-05');

    chart.container('chart9');

    chart.draw();

    function getData() {
       
        var preArray = $.makeArray($.parseJSON(placeholderChart1Data));
        var actualArray = [];
        for (var i = 0; i < preArray.length; i++) {
            actualArray.push([preArray[i].date, preArray[i].count, parseFloat(preArray[i].averageTime.toFixed(2))]);
        }
        return actualArray;
        return

       
    }


    
}