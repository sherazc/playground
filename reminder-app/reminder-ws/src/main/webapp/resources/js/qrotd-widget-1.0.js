$.ajax({
    url:serviceURL
}).done(function (data) {
    $("#qrotd-widget-container").append(data);
});