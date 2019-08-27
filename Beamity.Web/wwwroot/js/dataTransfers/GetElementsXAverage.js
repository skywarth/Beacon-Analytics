

var asd;
$(document).ready(function () {
    swalload();
    var options = {};
    options.url = "https://localhost:44327/api/BeaconActivity/GetArtifactsVisitorAverage";
    options.type = "POST";
    var obj = {};
    obj.LocationId = "8962C635 - D42D - 43C5 - B1E3 - FC77FCF71B19";
    options.data = JSON.stringify(obj);
    options.contentType = "application/json";
    options.dataType = "html";
    options.success = function (data, msg) {
        $("#msg").html(msg);
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
    asd = $.ajax(options);
});
