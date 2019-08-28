
function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}


$(document).ready(function () {


    $.when(locationAnon()).done(function () {
        swalload();
        var options = {};
        options.url = "https://localhost:44327/api/BeaconActivity/GetDashboardPayload";
        options.type = "POST";
        var obj = {};
        obj.Id = locationId;
        options.data = JSON.stringify(obj);
        options.contentType = "application/json";
        options.dataType = "html";
        options.success = function (data, msg) {
            var payload = JSON.parse(data);
            $("#Average1-data")[0].textContent = payload.artifactsVisitorAverage1;
            $("#Average2-data")[0].textContent = payload.roomsVisitorAverage1;
            /* time stuff */
            var time = payload.artifactsWatchTimeAverage1;
            var minutes = Math.floor(time / 60);
            var seconds = time - minutes * 60;
            seconds = seconds.toFixed(0);
            var finalTime = minutes + ':' + seconds;
            /* time stuff */
            $("#Average3-data")[0].textContent = finalTime;





            Swal({
                type: 'success',
                title: 'Thanks',
                text: 'Operation is success',
            })
        };
        options.error = function (msg) {
            $("#msg").html("Error while calling the Web API!");
            alert("Hata");
        };
        $.ajax(options);
    });




    /*$.when(locationAnon()).done(function () {
        //Artifacts visitor average
        swalload();
        var options = {};
        options.url = "https://localhost:44327/api/BeaconActivity/GetArtifactsVisitorAverage";
        options.type = "POST";
        var obj = {};
        obj.LocationId = locationId;
        options.data = JSON.stringify(obj);
        options.contentType = "application/json";
        options.dataType = "html";
        options.success = function (data, msg) {
            var a = $("#Average1-data")[0];
            a.textContent = data;

            //debugger
            //$("#msg").html(msg);
            Swal({
                type: 'success',
                title: 'Thanks',
                text: 'Operation is success',
            })
        };
        options.error = function () {
            $("#msg").html("Error while calling the Web API!");
            alert("Hata");
        };
        $.ajax(options);
    });

    $.when(locationAnon()).done(function () {
        //Artifacts visitor average
        swalload();
        var options = {};
        options.url = "https://localhost:44327/api/BeaconActivity/GetRoomsVisitorAverage";
        options.type = "POST";
        var obj = {};
        obj.LocationId = locationId;
        options.data = JSON.stringify(obj);
        options.contentType = "application/json";
        options.dataType = "html";
        options.success = function (data, msg) {
            var a = $("#Average2-data")[0];
            a.textContent = data;

            //debugger
            //$("#msg").html(msg);
            Swal({
                type: 'success',
                title: 'Thanks',
                text: 'Operation is success',
            })
        };
        options.error = function () {
            $("#msg").html("Error while calling the Web API!");
            alert("Hata");
        };
        $.ajax(options);
    });*/

});