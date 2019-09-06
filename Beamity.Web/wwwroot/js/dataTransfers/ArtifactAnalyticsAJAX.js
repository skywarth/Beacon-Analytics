var placeholderChart1Data;

function GetChart1() {
    var beaconCountDefer = $.Deferred();
    beaconCountDefer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetArtifactVisitorCountAndDurationAverage";
    var obj = {};
    var TEMPArtifactId = "1E0B540E-03D3-4070-EAF7-08D726064EB2";
    obj.Id = TEMPArtifactId;
    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        placeholderChart1Data = data;
        
        beaconCountDefer.resolve('yay');
        
       
    };
    options.error = function (e, msg) {
        beaconCountDefer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return beaconCountDefer.promise();


}

async function aa() {
    await GetChart1();
    chart1Initiate();
}


aa();