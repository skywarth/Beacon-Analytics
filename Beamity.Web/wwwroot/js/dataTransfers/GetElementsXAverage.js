
function str_pad_left(string, pad, length) {
    return (new Array(length + 1).join(pad) + string).slice(-length);
}


function secondsToFinalTime(sec) {
    var _sec = sec;
    var minutes = Math.floor(_sec / 60);
    var seconds = _sec - minutes * 60;
    seconds = seconds.toFixed(0);
    var finalTime = minutes + ':' + seconds;
    return finalTime;
}





function loadPayload() {
    var payloadDefer = $.Deferred();
    //swalload();
    payloadDefer = $.Deferred();
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
        /*var time = payload.artifactsWatchTimeAverage1;
        var minutes = Math.floor(time / 60);
        var seconds = time - minutes * 60;
        seconds = seconds.toFixed(0);
        var finalTime = minutes + ':' + seconds;*/
        /* time stuff */
        $("#Average3-data")[0].textContent = secondsToFinalTime(payload.artifactsWatchTimeAverage1);

        $("#Average4-data")[0].textContent = secondsToFinalTime(payload.roomsWatchTimeAverage1);
        $("#Average5-data")[0].textContent = payload.locationBounceRate1;
        $("#Average6-data")[0].textContent = payload.locationCurrentVisitors1;
        $("#Average7-data")[0].textContent = secondsToFinalTime(payload.userWatchTimeAverage1);
        $("#Average8-data")[0].textContent = payload.userArtifactAverage1;
        var dataForTable = payload.maxMinVisitorArtifact1;
        var stringPart1 = "<thead><tr><th></th><th>" + dataForTable[0].name + "</th><th>" + dataForTable[1].name + "</th></tr></thead>";
        var stringPart2 = "<tbody><tr><th>Dun</th><td>" + dataForTable[2].count + "</td><td>" + dataForTable[3].count + "</td></tr>";
        var stringPart3 = "<tr><th>Bugun</th><td>" + dataForTable[0].count + "</td><td>" + dataForTable[1].count + "</td></tr></tbody>"

        $("#datatable")[0].innerHTML = stringPart1 + stringPart2 + stringPart3;
       am4core.ready(function () {
            
           var data = [];
           // Add data
           for (var i = 0; i < payload.hourlyVisitorsMuseum1.length; i++) {
               data.push({ date: payload.hourlyVisitorsMuseum1[i].hour, value:payload.hourlyVisitorsMuseum1[i].count });
           }


           chart.data = data;


           temperatures = [];
           var tempHourly = payload.roomsArtifactHourly;
           //flower
           for (var i = 0; i < tempHourly.length; i++) {
               temperatures[tempHourly[i].roomName] = [];
               for (var k = 0; k < tempHourly[i].artifacts.length; k++) {
                   //temperatures[tempHourly[i].roomName][k] = [];
                   var counts = [];
                   counts[0] = tempHourly[i].artifacts[k].name;
                   for (var m = 1; m < tempHourly[i].artifacts[k].times.length; m++) {
                       counts[m]= tempHourly[i].artifacts[k].times[m].count;
                      
                   }
                   temperatures[tempHourly[i].roomName][k] = counts;
               }
               
           }

       });
        var behaviourFlow = payload.behaviourFlow;
        chartDiv2Data = [];
        for (var i = 0; i < behaviourFlow.length; i++) {
            chartDiv2Data[i] = { from: behaviourFlow[i].from, to: behaviourFlow[i].to, value: behaviourFlow[i].count };
        }


        payloadDefer.resolve('yay');
        

        /*Swal({
            type: 'success',
            title: 'Thanks',
            text: 'Operation is success',
        })*/
    };
    options.error = function (msg) {
        /*$("#msg").html("Error while calling the Web API!");*/
        payloadDefer.reject('boo');
        alert("Payload hata");
    };
    $.ajax(options);
    return payloadDefer.promise();
    
}








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

