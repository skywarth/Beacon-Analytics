Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/usdeur.json', function (data) {

    var year = new Date(data[data.length - 1][0]).getFullYear(); // Get year of last data point

    // Create the chart
    Highcharts.stockChart('chart4', {


        rangeSelector: {
            selected: 4
        },

        title: {
            text: 'Average of Artifact by Visitors '
        },

        yAxis: {
            title: {
                text: 'Average of Artifact by Visitors'
            }
        },

        series: [{
            name: 'Average Artifacts',
            data: data,
            id: 'dataseries',
            tooltip: {
                valueDecimals: 4
            }
        }, {
            color: Highcharts.getOptions().colors[0], // same as onSeries
            fillColor: Highcharts.getOptions().colors[0],
            onSeries: 'dataseries',
            width: 16,
            style: { // text style
                color: 'white'
            },
            states: {
                hover: {
                    fillColor: '#395C84' // darker
                }
            }
        }]
    });
});