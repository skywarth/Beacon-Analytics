

//Artifacts Average of Years

Highcharts.chart('chart5', {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Browser market shares in January, 2018'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: '2015',
            y: 61.41,
            sliced: true,
            selected: true
        }, {
            name: '2016',
            y: 11.84
        }, {
            name: '2017',
            y: 10.85
        }, {
            name: '2018',
            y: 4.67
        }, {
            name: '2019',
            y: 4.18
        }]
    }]
});