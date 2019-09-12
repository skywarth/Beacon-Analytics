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
    ac_add_link('https://cdn.anychart.com/releases/8.7.0/css/anychart-ui.min.css?hcode=a0c21fc77e1449cc86299c5faa067dc4');
    ac_add_style(document.getElementById("ac_style_samples-stock-grouping-01").innerHTML);
    ac_add_style(".anychart-embed-samples-stock-grouping-01{width:600px;height:450px;}");
})();

async function chart7Initiate() {
    var dataTable = anychart.data.table();
    // data comes from the function in https://cdn.anychart.com/csv-data/dji-daily-short.js
    dataTable.addData(getData7());

    var mapping = dataTable.mapAs({ value: 1 });

    var chart = anychart.stock();
    chart.padding(10, 10, 10, 50);

    var currentPlot = chart.plot();
    currentPlot.area(mapping);

    var currentScroller = chart.scroller();
    currentScroller.line(mapping);

    chart.title(" ");
    chart.container("chart7");
    chart.draw();
}


function getData7() {
    var preArray = $.makeArray(chart7Data);
    var actualArray = [];
    for (var i = 0; i < preArray.length; i++) {
        actualArray.push([preArray[i].date, preArray[i].value]);
    }
    return actualArray;


}