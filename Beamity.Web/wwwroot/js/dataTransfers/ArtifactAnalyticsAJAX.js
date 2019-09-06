var actualChart1Data;

async function GetChart1(id) {
    var chart1Defer = $.Deferred();
    chart1Defer = $.Deferred();
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
        actualChart1Data = data;
        
        chart1Defer.resolve('yay');
        
       
    };
    options.error = function (e, msg) {
        chart1Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart1Defer.promise();


}



async function GetArtifacts() {
    var chart1Defer = $.Deferred();
    chart1Defer = $.Deferred();
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
        debugger
        actualChart1Data = data;

        chart1Defer.resolve('yay');


    };
    options.error = function (e, msg) {
        debugger
        chart1Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart1Defer.promise();


}

async function tableInitialize(data) {

}



async function chart9Composition(id = "1E0B540E-03D3-4070-EAF7-08D726064EB2") {
    //    chart1Initiate();
    
    await GetChart1(id);
    chart1Initiate();
    chartXLoaded($("#chart9Placeholder")[0], $(".chart9Actual")[0]);


}


chart9Composition();


async function chart9Selection(element) {
    var id = element;
    $("#chart9").empty();
    chart9Composition(id);
}

$('.artifactSelectors').click(function () {
    chart9Selection($(this).data("artifact"));
});


GetArtifacts();