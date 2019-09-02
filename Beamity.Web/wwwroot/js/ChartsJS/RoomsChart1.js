

//Total Visitors for one Room

Highcharts.getJSON('https://www.highcharts.com/samples/data/aapl-c.json', function (data) {

    // Create the chart
    Highcharts.stockChart('chart1', {


        rangeSelector: {
            selected: 2
        },

        title: {
            text: 'Total Visitors and Bounce Rate for one Room'
        },

        series: [{
            name: 'Total Visitors,Bounce Rate',   
            data: data,
            lineWidth: 0,
            marker: {
                enabled: true,
                radius: 2
            },
            tooltip: {
                valueDecimals: 2
            },
            states: {
                hover: {
                    lineWidthPlus: 0
                }
            }
        }]
       
    });
});