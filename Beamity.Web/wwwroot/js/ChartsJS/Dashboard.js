/*Chart code*/
var temperatures= null;
am4core.ready(qwe());
    function qwe() {
            // Themes begin
            am4core.useTheme(am4themes_animated);
        // Themes end

        /**
         * This is a copy of a chart created by Antti Lipponen: https://twitter.com/anttilip?lang=en Thanks a lot!
         */

        // disclaimer: this data is not accuarate, don't use it for any puroposes
    // first temperature is average for 1973-1980 period
    if (temperatures == null)
        temperatures = {
            "ODA 1": [
            ["ESER 1", 1, 2, 3, 4, 5, 6, 7, 8, 4, 5, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 4, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.2, 3, 4, 1, 2, 3, 4, 4, 5],
            ["ESER 2", 1.1, 3.2, 4.2, 2],
            ["ESER 3", 5.67, 0.84, 1.23, 1.9, -0.27, 0.33, -0.72, -1.16, -1.03, -0.88, 0.01, 0.36, 0.41, -1.97, -0.76, -1.9, 0.09, 1.21, 1.43, 0.27, 1.01, -0.27, 0.06, -1.02, -0.46, 1.06, 0.29, 1.09, 1.73, 0.59, 1.48, 0.82, 0.86, 1.22, 1.43, 1.2, 0.38, 0.13, -1.55, 0.85, 0.11, 0.42, 1.59, 1.42, -0.29],
            ["ESER 4 ", 9.73, -0.3, 0.37, 0.16, 0.27, 0.45, -0.75, -0.15, -0.68, -0.25, 0.46, 0.43, -0.44, -0.74, -0.46, -0.5, 0.55, 0.73, 1.02, 0.01, 0.64, 0.26, 1.59, 0.44, -0.64, 0.67, 0.73, 0.85, 1.63, 0.74, 1.33, 1.41, 0.54, 0.39, 0.96, 1.24, 0.76, 1.08, -0.13, 1.65, 0.86, 0.21, 1.81, 1.7, 0.34],
            ["ESER 5", 5]
        ],

        "ODA 2": [
            ["ESER 6", 17.03, -0.29, -0.54, 0.45, -0.05, 0.03, -0.53, -0.21, 0.31, -0.73, -0.19, 0.74, 0.79, 1.51, 0.36, 0.96, 0.35, 0.44, 2.13, -0.26, 1.02, 1.31, 0.47, 1.36, 0.42, 0.02, 0.5, 1.83, 0.71, 0.31, 1.28, 1.45, 1.57, 1.11, 1.08, 0.51, 0.58, 0.86, 1.29, 0.56, 1.16, 1.59, 0.97, 1.63, 1.73],
            ["ESER 7", 24.09, -0.58, -0.93, 0.12, 0.28, 0.41, -0.58, -0.18, 0.26, 0.21, 0.56, 0.19, -0.41, -0.59, -0.18, 0.25, 0.34, 0.16, -0.52, 0.19, -0.39, -0.39, 1.93, 1.99, 2.96, 1.89, 1.93, 2.42, -0.16, -0.79, 0.53, 1.06, 0.57, 1.11, 1.01, 0.79, 0.12, 0.72, 1.02, 0.57, 0.62, 0.44, 0.38, 0.43, 0.51],
            ["ESER 8", 18.81, 0.07, -0.68, -0.31, -0.92, 0.28, -0.22, 0.15, -0.46, 0.21, 1.46, 0.41, -0.21, 0.51, 0.76, 1.13, 1.01, 0.34, 1.02, -0.38, 0, 0.53, 1.86, 1.1, 0.74, 1.48, 1.14, 2.43, 1.64, 2.48, 1.56, 2.47, 0.9, 2.38, 2.1, 1.86, 2.04, 2.08, 1.82, 1.6, 2.61, 1.71, 2.36, 2.29, 2.36],
            ["ESER 9", 21.76, 3.24, -3.41, 1.78, -0.2, -0.06, -3.73, 1.24, -1.18, -1.47, 1.4, 2.4, 0.78, 0.65, -0.65, 1.28, 0.35, -0.7, 0.44, -0.51, -0.28, -3.03, 0.08, 0.25, 1.94, -2.09, 4.19, 1.19, -1.39, 2.88, 1.77, 0.54, -0.14, 3.77, -1.06, 1.69, 0.24, 0.72, 2.36, 3.51, 0.63, 1.03, 1.08, 1.81, 4.54],
            ["ESER 10", 19.03, 0.15, -0.56, -0.41, -0.39, 0.21, -0.18, 0.06, -0.16, -0.31, 0.27, 1.32, 0.43, -0.03, 0.14, 1.04, 0.21, 0.07, 0.68, 0.45, 0.91, -0.18, 0.3, 0.87, 0.12, -0.25, 0.61, -0.42, -0.36, 0.39, 0.77, 0.48, 0.37, 1.07, 0.32, 0.42, 0.94, 0.47, 0.61, 1.61, 0.34, 0.2, 0.56, 0.7, 1.42]
        ],
        "ODA 3": [
            ["ESER 11", 26.98, 0.33, -0.43, -0.37, -0.11, 0.34, 0.04, -0.25, 0.12, -0.02, -0.08, 0.42, -0.17, -0.21, -0.06, 0.55, 0.44, 0.24, 0.43, 0.49, 0.64, 0.75, 0.85, 0.94, 0.62, 1.11, 1.19, 0.59, 0.57, 0.86, 0.97, 1.02, 0.93, 1.04, 0.94, 0.91, 0.21, 1.16, 0.84, 0.31, 0.97, 1.14, 1.31, 1.41, 1.32],
            ["ESER 12", 21.24, -0.5, 1.04, 0.06, -1.08, -0.12, 0.12, -0.27, 0.08, 0.27, -0.02, 0.03, -0.63, -0.54, -0.48, -0.49, -0.14, 0.78, 0.71, 0.8, 0.58, 0.75, 1.27, 0.88, 1.04, 0.29, 1.94, -1.11, 1.34, 1.16, 1.17, 1.67, 1.24, 1.29, 1.76, 1.39, 1.08, 1.79, 1.17, 1.95, 1.63, 1.6, 1.64, 1.96, 2.07],
            ["ESER 13", 22.78, 1.06, -0.46, -2.44, 0.09, 1.63, -1.56, -1.71, -1.65, 3.02, 1.26, 0.24, -1.73, 2.62, 3.78, -0.06, 1.05, 0.57, 0.31, 1.39, -0.05, 1.49, 1.8, 1.77, 0.87, 2.48, 0.23, 0.5, 0.9, 1.33, 2.05, 1.98, 0.79, 1.88, 2.24, 1.49, 1.16, 1.46, 0.94, 2.02, 2.04, 1.34, 2.11, 1.68, 0.82],
            ["ESER 14 ", 20.42, -0.07, -0.42, -0.68, 0.01, -0.09, -0.12, 0.06, 0.16, -0.52, 0.07, 1.72, 0.09, -0.17, 0.18, 0.73, -0.11, 0.22, 0.21, 0.78, 2.39, 0.96, 0.96, 0.88, 0.34, 1.9, 1.99, 0.08, 0.43, 0.25, 0.63, 0.16, 1.17, 0.32, 0.88, -0.21, 0.19, 0.43, 0.48, -0.02, 0.42, 0.49, 1.06, 1.32, 1.43],
            ["ESER 15", 18, -0.42, -0.45, -2.36, -2.33, 3.59, -1.29, -0.57, -0.39, 0.41, 1.18, -0.13, 4.28, -1.37, 1.24, -0.15, -0.38, 0.67, 0.29, 0.54, 0.36, 0.31, 0.56, 0.39, 0.16, 1.86, -0.26, -0.22, 0, 0.49, 0.48, 0.06, 0.64, 0.88, 1.11, -0.77, 1.11, 1.46, 0.19, 0.09, 1.2, 0.59, 0.59, 0.6, -0.76]
        ],
        "ODA 4": [
            ["ESER 16", 27.27, 0.03, -0.43, -0.27, -0.44, 0.01, 0.19, 0.5, 0.4, -0.16, 0.01, 0.21, -0.74, 0.04, 0.01, 0.57, 0.28, 0.32, 0.63, 0.68, 0.47, 0.37, 0.44, 0.58, 0.29, 0.72, 1.37, 0.27, 0.38, 0.73, 0.84, 0.67, 0.67, 0.72, 0.79, 0.65, 0.39, 0.72, 1.38, 0.34, 1.22, 0.98, 1.01, 1.4, 1.58],
            ["ESER 17", 13.63, -0.26, -0.89, -2.68, 0.54, 1.04, 0.79, 0.99, 0.63, 1.4, 0.29, -0.52, -0.06, 0.14, 0.09, -0.4, 0.04, 0.33, 0.47, 0.24, -0.87, -0.33, 1.29, 0.48, 0.77, -0.2, 1.19, 1.27, 0.31, 1.7, 0.68, 1.49, 0.59, 0.38, 0.91, 1.87, 1.12, 1.49, 2.94, 0.57, 1.61, 2.14, 2.77, 2.43, -3.67],
            ["ESER 18", 16.18, 1.9, -2.76, 0.29, -0.89, 0.08, -0.49, 0.56, 1.3, 0.68, -0.73, 0.08, -0.57, 0.99, 0.43, -0.29, -0.23, 0.8, 1.74, 0.88, 0.38, 0.11, 0.9, 1.53, 0.54, 1.31, 1.78, 2.12, 2.05, 2.49, 2.33, 2.06, 2.53, 3.4, 2.97, 1.17, 1.55, 2.25, 2.82, 1.82, 2.37, 2.61, 1.69, 3.1, 3.21],
            ["ESER 19", 27.37, 0, 0, 0, 0, -4.97, 0.22, 5.47, -0.12, 1.13, -0.57, -0.39, -0.66, -0.07, 0.18, -0.23, 0.26, -0.56, 0.42, -0.54, -0.13, 0.44, 1.15, 0.02, 0.89, 0.13, 2.84, 2.95, -1, 0.54, 1.23, 1.16, 2.54, 2.19, 1.71, -0.89, 1.11, 1.92, 1.25, 1.82, 2.08, 0.71, 1.69, 1.51, 2.39],
            ["ESER 20", 25.36, 1.97, -0.97, 0.52, -0.05, 0.17, 0.38, -2.68, -2.68, -2.68, 1.51, 0.83, 1.3, 0.97, 0.99, 1.99, 1.77, 0.93, 1.23, 1.28, 0.19, 0.54, 0.48, 0.26, 0.08, 0.12, 1.03, 0.22, 0.12, 0.24, 0.42, 0.73, 0.05, 0.11, 0.53, 0.24, -0.14, 0.41, 0.76, -0.47, 0.45, 0.29, 0.31, -1.95, 1.08]
        ],
        "ODA 5": [
            ["ESER 21", 18.38, 0.36, -0.34, -0.14, -0.48, -0.08, -0.34, 0.3, 0.57, 0.12, -0.11, 0.1, -0.62, -0.21, -0.44, -0.13, 0.56, -0.31, -0.26, -0.18, -0.66, -0.38, -0.44, -0.61, -0.59, -0.35, -0.11, -0.29, -0.29, -0.21, 0.19, 0.11, -0.02, 0.28, -0.06, 0.26, -0.21, 0.41, 0.01, -0.18, -0.18, 0.56, 0.48, 0.27, 0.41],
            ["ESER 22", 26.11, 0, 0, 0, 1.39, 1.39, 1.39, -1.22, 0.79, -0.77, -0.77, -0.77, 1.39, 1.39, 1.39, -1.72, 1.27, -0.96, -0.66, -0.39, 0.97, -1.45, -1.12, -0.58, -0.54, -0.82, 0.27, 0.12, 0.58, 0.17, 0.71, 0.07, 0.19, 0.21, 0.11, 0.51, 0.04, -0.41, 0.42, 0.42, 0.18, 0.38, 0.19, -0.02, 0.45],
            ["ESER 23", 25.11, 0, 0, 0, 1.14, 1.14, 1.14, -0.19, 0.03, -0.3, -0.33, -0.19, -0.15, -0.01, -0.06, -0.08, 0.13, -0.04, 0.11, -0.06, 0.26, 0.09, -0.02, 0.27, -0.05, 0.06, 0.23, 0.34, 0.24, 0.22, 0.55, 0.36, 0.28, 0.19, 0.48, 0.32, 0.07, 0.51, 0.29, 0.22, -0.09, 0.01, -0.05, 0.37, 0.45],
            ["ESER 24", 12.39, 0.27, 0.47, 0.43, -0.27, -0.31, 0.44, -0.16, -0.18, 0.08, -0.28, -0.36, 0.32, 0.29, 0.27, 0.35, 0.41, 0.63, 0.57, -0.2, -0.59, -0.37, -0.71, 0.26, 0.28, -0.06, 0.96, 0.91, 0.52, 0.65, 0.69, 0.47, 0.04, 0.84, 0.01, 0.26, 0.34, -0.26, 0.53, 0.21, 0.62, 1.62, 0.79, 0.37, 0.64],
            ["ESER 25", 26.37, 0, 0, 0, 0, 0, 0, -0.92, -1.87, -0.87, 1.73, 1.49, 1.63, 1.85, 2.03, 1.65, 1.62, 1.57, 1.94, 2.03, 1.86, 1.77, 2.3, 1.86, 1.52, 1.52, 1.54, 1.73, 2.09, 2.23, 2.33, 2.38, 2.21, 2.32, 2.35, 2.23, 1.86, 2.23, 2.03, 2.12, 1.77, 2.38, 2.34, 2.36, 2.64],
        ]
    }

    var startYear = 1973;
    var endYear = 2016;
    var currentYear = 1995;
    var colorSet = new am4core.ColorSet();

    var chart = am4core.create("chartdiv", am4charts.RadarChart);
    chart.numberFormatter.numberFormat = "#|#|0";
    chart.hiddenState.properties.opacity = 0;

    chart.startAngle = 270 - 180;
    chart.endAngle = 270 + 180;

    chart.padding(5, 15, 5, 10)
    chart.radius = am4core.percent(65);
    chart.innerRadius = am4core.percent(40);

    // year label goes in the middle
    var yearLabel = chart.radarContainer.createChild(am4core.Label);
    yearLabel.horizontalCenter = "middle";
    yearLabel.verticalCenter = "middle";
    yearLabel.fill = am4core.color("#673AB7");
    yearLabel.fontSize = 30;
    yearLabel.text = String(currentYear);

    // zoomout button
    var zoomOutButton = chart.zoomOutButton;
    zoomOutButton.dx = 0;
    zoomOutButton.dy = 0;
    zoomOutButton.marginBottom = 15;
    zoomOutButton.parent = chart.rightAxesContainer;

    // scrollbar
    chart.scrollbarX = new am4core.Scrollbar();
    chart.scrollbarX.parent = chart.rightAxesContainer;
    chart.scrollbarX.orientation = "vertical";
    chart.scrollbarX.align = "center";
    chart.scrollbarX.exportable = false;

    // vertical orientation for zoom out button and scrollbar to be positioned properly
    chart.rightAxesContainer.layout = "vertical";
    chart.rightAxesContainer.padding(120, 20, 120, 20);

    // category axis
    var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "country";

    var categoryAxisRenderer = categoryAxis.renderer;
    var categoryAxisLabel = categoryAxisRenderer.labels.template;
    categoryAxisLabel.location = 0.5;
    categoryAxisLabel.radius = 28;
    categoryAxisLabel.relativeRotation = 90;

    categoryAxisRenderer.fontSize = 11;
    categoryAxisRenderer.minGridDistance = 10;
    categoryAxisRenderer.grid.template.radius = -25;
    categoryAxisRenderer.grid.template.strokeOpacity = 0.05;
    categoryAxisRenderer.grid.template.interactionsEnabled = false;

    categoryAxisRenderer.ticks.template.disabled = true;
    categoryAxisRenderer.axisFills.template.disabled = true;
    categoryAxisRenderer.line.disabled = true;

    categoryAxisRenderer.tooltipLocation = 0.5;
    categoryAxis.tooltip.defaultState.properties.opacity = 0;

    // value axis
    var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = -3;
    valueAxis.max = 6;
    valueAxis.strictMinMax = true;
    valueAxis.tooltip.defaultState.properties.opacity = 0;
    valueAxis.tooltip.animationDuration = 0;
    valueAxis.cursorTooltipEnabled = true;
    valueAxis.zIndex = 10;

    var valueAxisRenderer = valueAxis.renderer;
    valueAxisRenderer.axisFills.template.disabled = true;
    valueAxisRenderer.ticks.template.disabled = true;
    valueAxisRenderer.minGridDistance = 20;
    valueAxisRenderer.grid.template.strokeOpacity = 0.05;


    // series
    var series = chart.series.push(new am4charts.RadarColumnSeries());
    series.columns.template.width = am4core.percent(90);
    series.columns.template.strokeOpacity = 0;
    series.dataFields.valueY = "value" + currentYear;
    series.dataFields.categoryX = "country";
            series.tooltipText = "{categoryX}:{valueY.value}";

        // this makes columns to be of a different color, depending on value
            series.heatRules.push({target: series.columns.template, property: "fill", minValue: -3, maxValue: 6, min: am4core.color("#673AB7"), max: am4core.color("#F44336"), dataField: "valueY" });

        // cursor
        var cursor = new am4charts.RadarCursor();
        chart.cursor = cursor;
        cursor.behavior = "zoomX";

        cursor.xAxis = categoryAxis;
        cursor.innerRadius = am4core.percent(40);
        cursor.lineY.disabled = true;

        cursor.lineX.fillOpacity = 0.2;
        cursor.lineX.fill = am4core.color("#000000");
        cursor.lineX.strokeOpacity = 0;
        cursor.fullWidthLineX = true;

        // year slider
        var yearSliderContainer = chart.createChild(am4core.Container);
        yearSliderContainer.layout = "vertical";
        yearSliderContainer.padding(0, 38, 0, 38);
        yearSliderContainer.width = am4core.percent(100);

        var yearSlider = yearSliderContainer.createChild(am4core.Slider);
            yearSlider.events.on("rangechanged", function () {
            updateRadarData(startYear + Math.round(yearSlider.start * (endYear - startYear)));
        })
        yearSlider.orientation = "horizontal";
        yearSlider.start = 0.5;
        yearSlider.exportable = false;

        chart.data = generateRadarData();

            function generateRadarData() {
                var data = [];
        var i = 0;
                for (var continent in temperatures) {
                    var continentData = temperatures[continent];

                    continentData.forEach(function (country) {
                        var rawDataItem = {"country": country[0] }

                        for (var y = 2; y < country.length; y++) {
            rawDataItem["value" + (startYear + y - 2)] = country[y];
        }

        data.push(rawDataItem);
    });


    createRange(continent, continentData, i);
    i++;

}
return data;
}

            function updateRadarData(year) {
                if (currentYear != year) {
            currentYear = year;
        yearLabel.text = String(currentYear);
        series.dataFields.valueY = "value" + currentYear;
        chart.invalidateRawData();
    }
}

            function createRange(name, continentData, index) {

                var axisRange = categoryAxis.axisRanges.create();
        axisRange.axisFill.interactionsEnabled = true;
        axisRange.text = name;
        // first country
        axisRange.category = continentData[0][0];
        // last country
        axisRange.endCategory = continentData[continentData.length - 1][0];

        // every 3rd color for a bigger contrast
        axisRange.axisFill.fill = colorSet.getIndex(index * 3);
        axisRange.grid.disabled = true;
        axisRange.label.interactionsEnabled = false;
        axisRange.label.bent = true;

        var axisFill = axisRange.axisFill;
        axisFill.innerRadius = -0.001; // almost the same as 100%, we set it in pixels as later we animate this property to some pixel value
        axisFill.radius = -20; // negative radius means it is calculated from max radius
        axisFill.disabled = false; // as regular fills are disabled, we need to enable this one
        axisFill.fillOpacity = 1;
        axisFill.togglable = true;

        axisFill.showSystemTooltip = true;
        axisFill.readerTitle = "click to zoom";
        axisFill.cursorOverStyle = am4core.MouseCursorStyle.pointer;

                axisFill.events.on("hit", function (event) {
                    var dataItem = event.target.dataItem;
                    if (!event.target.isActive) {
            categoryAxis.zoom({ start: 0, end: 1 });
        }
                    else {
            categoryAxis.zoomToCategories(dataItem.category, dataItem.endCategory);
        }
    })

    // hover state
    var hoverState = axisFill.states.create("hover");
    hoverState.properties.innerRadius = -10;
    hoverState.properties.radius = -25;

    var axisLabel = axisRange.label;
    axisLabel.location = 0.5;
    axisLabel.fill = am4core.color("#ffffff");
    axisLabel.radius = 3;
    axisLabel.relativeRotation = 0;
}

var slider = yearSliderContainer.createChild(am4core.Slider);
slider.start = 1;
slider.exportable = false;
            slider.events.on("rangechanged", function () {
                var start = slider.start;

        chart.startAngle = 270 - start * 179 - 1;
        chart.endAngle = 270 + start * 179 + 1;

        valueAxis.renderer.axisAngle = chart.startAngle;
    })

}; // end am4core.ready()
   