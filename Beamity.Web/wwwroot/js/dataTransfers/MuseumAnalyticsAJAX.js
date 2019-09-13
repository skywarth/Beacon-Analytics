var bounceData;
//var visitorCountData;
var visitorCountAndDurationData;

async function GetChart11Bounce() {
    var chart9Defer = $.Deferred();
    chart9Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetMuseumBounceRate";
    var obj = {};
    obj.Id = locationId;
    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        bounceData = JSON.parse(data);

        chart9Defer.resolve('yay');


    };
    options.error = function (e, msg) {
        chart9Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart9Defer.promise();


}


/*async function GetChart11VisitorCount(id) {
    var chart9Defer = $.Deferred();
    chart9Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetMuseumVisitorCount";
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


}*/


async function GetChart11VisitorCountAndDuration() {
    var chart9Defer = $.Deferred();
    chart9Defer = $.Deferred();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetMuseumVisitorCountAndDurationAverage";
    var obj = {};
    obj.Id = locationId;
    options.type = "POST";

    options.data = JSON.stringify(obj);
    options.dataType = "html";
    options.contentType = "application/json";
    options.processData = false;
    options.success = function (data) {
        visitorCountAndDurationData = JSON.parse(data);

        chart9Defer.resolve('yay');


    };
    options.error = function (e, msg) {
        chart9Defer.reject('boo');
        alert(msg);
    };
    $.ajax(options);
    return chart9Defer.promise();


}





async function chart11Composition() {
    //    chart9Initiate();

    await GetChart11Bounce();
    await GetChart11VisitorCountAndDuration();
          chart11Initiate();
    chartXLoaded($("#chart11Placeholder")[0], $(".chart11Actual")[0]);


}







//GetArtifacts();




async function museumAnalyticsController() {
    await locationAnon();
    chart11Composition();
    //chart9Composition();
    /*roomTableComposition();
    chart4Composition();
    chart5Composition();*/
    /*
    chart9Composition();
    
    
    chart10Composition();
    chart7Composition();*/
}

museumAnalyticsController();

//TRY REMOVE
