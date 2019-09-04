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
    table = anychart.data.table();
    table.addData([
        ['2010-01-01', 1.0860, 73],
        ['2010-02-04', 1.0832, 72.7250],
        ['2010-02-05', 1.0780, 73.3850],
        ['2010-03-06', 1.0781, 74.6020],
        ['2010-04-07', 1.0936, 75.1000],
        ['2011-01-08', 1.0932, 74.8050],
        ['2011-08-11', 1.0860, 76.3750],
        ['2011-01-12', 1.0857, 76.9360],
        ['2011-01-13', 1.0877, 76.6310],
        ['2012-07-14', 1.0865, 76.2450],
        ['2012-07-15', 1.0917, 77.7650],
        ['2012-01-18', 1.0893, 79.4090],
        ['2013-01-19', 1.0909, 78.8160],
        ['2013-12-20', 1.0891, 81.3790],
        ['2013-01-21', 1.0874, 82.3970],
        ['2014-11-22', 1.0797, 78.1713],
        ['2014-01-25', 1.0849, 80.0704],
        ['2014-01-26', 1.0872, 78.8750],
        ['2015-01-27', 1.0893, 78.0500],
        ['2015-01-28', 1.0939, 76.3325],
        ['2015-01-29', 1.0837, 75.5213],
        ['2016-02-01', 1.0889, 77.2277],
        ['2016-02-02', 1.0919, 79.7967],
        ['2016-02-03', 1.1104, 76.8869],
        ['2016-02-04', 1.1208, 76.9080],
        ['2016-02-05', 1.1159, 77.4872],
        ['2016-02-08', 1.1198, 78.5509],
        ['2016-02-09', 1.1293, 79.7087],
        ['2016-02-10', 1.1290, 78.6429],
        ['2016-02-11', 1.1324, 79.5917],
        ['2016-02-12', 1.1260, 78.3558],
        ['2016-02-15', 1.1155, 76.9807],
        ['2016-02-16', 1.1144, 77.8876],
        ['2016-02-17', 1.1128, 75.0400],
        ['2016-02-18', 1.1107, 76.4278],
        ['2016-02-19', 1.1135, 76.9937],
        ['2016-02-22', 1.1029, 77.0453],
        ['2016-02-23', 1.1020, 75.3462],
        ['2016-02-24', 1.1013, 75.7421],
        ['2016-02-25', 1.1023, 75.3641],
        ['2016-02-26', 1.0934, 76.1883],
        ['2016-02-29', 1.0873, 75.1682]
    ]);

    // map the data
    mapping_euro = table.mapAs();
    mapping_euro.addField('value', 1);
    mapping_rub = table.mapAs();
    mapping_rub.addField('value', 2);

    // chart type
    var chart = anychart.stock();

    // set the series
    var series_euro = chart.plot(0).spline(mapping_euro);
    series_euro.name("Average of Time");

    var series_rub = chart.plot(1).spline(mapping_rub);
    series_rub.name("Total Time");

    // coloring
    series_euro.stroke("#ff0000");

    chart.title('');

    chart.container('chart5');
    chart.draw();
});