
//Artifacts Analytics View Behaviour Flow

/*

am4core.ready(function () {

    // Themes begin
    am4core.useTheme(am4themes_animated);
    // Themes end



    var chart = am4core.create("chart10", am4charts.ChordDiagram);


    chart.data = chart10Data;

    chart.dataFields.fromName = "from";
    chart.dataFields.toName = "to";
    chart.dataFields.value = "value";

    // make nodes draggable
    var nodeTemplate = chart.nodes.template;
    nodeTemplate.readerTitle = "Click to show/hide or drag to rearrange";
    nodeTemplate.showSystemTooltip = true;

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

    function animateBullet(bullet) {
        var duration = 3000 * Math.random() + 2000;
        var animation = bullet.animate([{ property: "locationX", from: 0, to: 1 }], duration)
        animation.events.on("animationended", function (event) {
            animateBullet(event.target.object);
        })
    }

}); // end am4core.ready()

*/

function chart10Initiate() {
    var behaviourFlow = chart10Data;
        var actualData = [];
        var BFInformationTableData = "";
        $("#BFInformationTable").innerHtml = "";
        var a = $("#BFInformationTable")[0];
    for (var i = 0; i < behaviourFlow.length; i++) {
        actualData[i] = { from: behaviourFlow[i].from, to: behaviourFlow[i].to, value: behaviourFlow[i].count };
            //table fill
            BFInformationTableData += "<tr><td>" + behaviourFlow[i].from + "</td><td>" + behaviourFlow[i].to + "</td><td>" + behaviourFlow[i].count + "</td></tr>";
    } a.innerHTML = BFInformationTableData;


    fillBehaviourChart("chart10", actualData);
}