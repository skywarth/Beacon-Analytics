var actualChart9Data;
var chart4Data;
var chart5Data;
var chart10Data;
var chart7Data;
var tableData;

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


async function GetChart4() {
    var chart4Defer = $.Deferred();
    chart4Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetArtifactCountPerUser";
    var obj = {};
    obj.Id = locationId;
    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        //actualChart9Data = data;
        chart4Data = JSON.parse(data);
        chart4Defer.resolve('yay');


    };
    options.error = function (e, msg) {
        chart4Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart4Defer.promise();


}

async function GetChart5() {
    var chart5Defer = $.Deferred();
    chart5Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetArtifactsVisitorCountAndDurationAverage";
    var obj = {};
    obj.Id = locationId;
    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        //actualChart9Data = data;
        chart5Data = JSON.parse(data);
        chart5Defer.resolve('yay');


    };
    options.error = function (e, msg) {
        chart5Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart5Defer.promise();


}

async function GetChart10() {

    var chart10Defer = $.Deferred();
    chart10Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetBehaviourFlowByRange";
    var obj = {};
    obj.Id = locationId;

    if ($('#start').val() && $('#end').val()) {
        obj.Start = $('#start').val();
        obj.End = $('#end').val();
    }
    
    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        //actualChart9Data = data;
        chart10Data = JSON.parse(data);
        chart10Defer.resolve('yay');


    };
    options.error = function (e, msg) {
        chart10Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart10Defer.promise();


}



async function GetChart7() {

    var chart7Defer = $.Deferred();
    chart7Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetAllBounceRates";
    var obj = {};
    obj.Id = locationId;

    if ($('#start').val() && $('#end').val()) {
        obj.Start = $('#start').val();
        obj.End = $('#end').val();
    }

    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        //actualChart9Data = data;
        chart7Data = JSON.parse(data);
        chart7Defer.resolve('yay');


    };
    options.error = function (e, msg) {
        chart7Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart7Defer.promise();


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
        var result = JSON.parse(data);
        tableData = result;
        chart9Defer.resolve('yay');
        
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
    await chart9Initiate();
    chartXLoaded($("#chart9Placeholder")[0], $(".chart9Actual")[0]);


}


//chart9Composition();

async function chart4Composition() {
    //    chart9Initiate();

    await GetChart4();
    chart4Initiate();
    chartXLoaded($("#chart4Placeholder")[0], $(".chart4Actual")[0]);


}


async function chart5Composition() {
    //    chart9Initiate();

    await GetChart5();
    await chart5Initiate();
    chartXLoaded($("#chart5Placeholder")[0], $(".chart5Actual")[0]);


}

async function tableComposition() {
    await GetArtifacts();
    tableInitialize(tableData);
    chartXLoaded($("#tablePlaceholder")[0], $(".tableActual")[0]);
}


async function chart10Composition() {
    //    chart9Initiate();

    await GetChart10();
    chart10Initiate();
    //chartXLoaded($("#chart9Placeholder")[0], $(".chart9Actual")[0]);


}


async function chart7Composition() {
    //    chart9Initiate();

    await GetChart7();
    chart7Initiate();
    //chartXLoaded($("#chart9Placeholder")[0], $(".chart9Actual")[0]);


}

//chart3Composition();



async function chart9Selection(element) {
    var id = element;
    $("#chart9").empty();
    chart9Composition(id);
}



$('#chart9Table').on('click span', 'tr', function () {
    chart9Selection($(this).data("artifact"));
});


//GetArtifacts();



$("#behaviourClick").click(function () {
    chart10Composition();
});


async function ArtifactAnalyticsController() {
    await locationAnon();
    tableComposition();
    //chart9Composition();
    chart4Composition();
    chart5Composition();
    chart10Composition();
    chart7Composition();
}

ArtifactAnalyticsController();

//TRY REMOVE
