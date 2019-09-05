//merged vers

var chartDiv2Data = null;


/*if()
chartDiv2Data = [
    { from: "A", to: "D", value: 10 },
    { from: "B", to: "D", value: 8 },
    { from: "B", to: "E", value: 4 },
    { from: "B", to: "C", value: 2 },
    { from: "C", to: "E", value: 14 },
    { from: "E", to: "D", value: 8 },
    { from: "C", to: "A", value: 4 },
    { from: "G", to: "A", value: 7 },
    { from: "D", to: "B", value: 1 }
];*/

//am4core.ready(asd()); // end am4core.ready()




function fillBehaviourChart() {
    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end

    var chart = am4core.create("chartdiv2", am4charts.ChordDiagram);
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

    var nodeLink = chart.links.template;
    var bullet = nodeLink.bullets.push(new am4charts.CircleBullet());
    bullet.fillOpacity = 1;
    bullet.circle.radius = 5;
    bullet.locationX = 0.5;

    // create animations
    chart.events.on("ready", function () {
        for (var i = 0; i < chart.links.length; i++) {
            var link = chart.links.getIndex(i);
            var bullet = link.bullets.getIndex(0);

            animateBullet(bullet);
        }
    })

    

}


function animateBullet(bullet) {
    var duration = 3000 * Math.random() + 2000;
    var animation = bullet.animate([{ property: "locationX", from: 0, to: 1 }], duration)
    animation.events.on("animationended", function (event) {
        animateBullet(event.target.object);
    })
}
