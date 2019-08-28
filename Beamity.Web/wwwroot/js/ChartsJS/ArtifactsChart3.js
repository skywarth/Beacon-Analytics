

//Bütün eserlere gelen kişilerin ve izleme süresinin haftalık ortalaması

Highcharts.chart('chart3', {
    chart: {
        type: 'column'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            'Week1',
            'Week2',
            'Week3',
            'Week4',
           
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Average of visitors for all artifacts',
        data: [49.9, 71.5, 106.4, 54.4]

    }, {
        name: 'Average of times for all artifacts',
        data: [42.4, 33.2, 34.5, 39.7]

    }]
});