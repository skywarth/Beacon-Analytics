
//Artifacts Analytics View Behaviour Flow


var chartDiv2Data = null;


function fillBehaviourChart() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chart6", am4charts.ChordDiagram);
    chart.hiddenState.properties.opacity = 0;

    chart.data = chartDiv2Data;

    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";

    // make nodes draggable
    var nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = true;
    nodeTemplate.cursorOverStyle = am4core.MouseCursorStyle.pointer

}