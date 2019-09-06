var actualChart9Data;

async function GetChart9(id) {
    var chart9Defer = $.Deferred();
    chart9Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetArtifactVisitorCountAndDurationAverage";
    var obj = {};
    var TEMPArtifactId = id;
    obj.Id = TEMPArtifactId;
    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        actualChart9Data = data;
        
        chart9Defer.resolve('yay');
        
       
    };
    options.error = function (e, msg) {
        chart9Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart9Defer.promise();


}



async function GetArtifacts() {
    var chart9Defer = $.Deferred();
    chart9Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/Artifact/GetAllArtifacts";
    var obj = {};
    var TEMPArtifactId = locationId;
    obj.Id = TEMPArtifactId;
    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        var result=JSON.parse(data);
        chart9Defer.resolve('yay');
        tableInitialize(result);

    };
    options.error = function (e, msg) {
        chart9Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart9Defer.promise();


}

async function tableInitialize(data) {
    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += "<tr class='artifactSelectors' data-artifact='" + data[i].id + "' ><td><span>" + data[i].name + "</span></td><td><span>" + data[i].roomName + "</span></td><td><span>" + data[i].floorName +"</span></td></tr>";
    }
    $("#chart9Table").eq(0).html(html);
}



async function chart9Composition(id = "1E0B540E-03D3-4070-EAF7-08D726064EB2") {
    //    chart9Initiate();
    
    await GetChart9(id);
    chart9Initiate();
    chartXLoaded($("#chart9Placeholder")[0], $(".chart9Actual")[0]);


}


chart9Composition();


async function chart9Selection(element) {
    var id = element;
    $("#chart9").empty();
    chart9Composition(id);
}



$('#chart9Table').on('click span', 'tr', function () {
    chart9Selection($(this).data("artifact"));
});


GetArtifacts();