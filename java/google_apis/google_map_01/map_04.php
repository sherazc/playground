<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style type="text/css">
html {height: 100%}
body {height: 100%;margin: 0;padding: 0}
#map_canvas {height: 100%}
</style>
<script type="text/javascript"
	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg7ZGBS0smQZnsYhB5eSOEjN9qaPazgBA&sensor=false"></script>
<script type="text/javascript">
//https://developers.google.com/maps/documentation/javascript/events
//https://google-developers.appspot.com/maps/documentation/javascript/examples/event-closure
	function initialize() {
		var mapOptions = {
				zoom: 10,
				center: new google.maps.LatLng(-25.363882, 131.044922),
				mapTypeId: google.maps.MapTypeId.HYBRID
			};

		var mapA = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		var southWest = new google.maps.LatLng(-31.203405, 125.244141);
        var northEast = new google.maps.LatLng(-25.363882, 131.044922);

        var bounds = new google.maps.LatLngBounds(southWest, northEast);

        mapA.fitBounds(bounds);

        var lngSpan = northEast.lng() - southWest.lng();
        var latSpan = northEast.lat() - southWest.lat();

        for (var i=0; i < 5; i++) {
			var position = new google.maps.LatLng(
						southWest.lat() + latSpan * Math.random(),
						southWest.lng() + lngSpan * Math.random());
			var marker = new google.maps.Marker({
				position: position,
				map: mapA
				});

			marker.setTitle((i + 1).toString());
			attachSecretMessage(marker, i);
        }
	}

	function attachSecretMessage(marker, num) {
		var message = ['This', 'is', 'the', 'secret', 'message'];
		var infowindow = new google.maps.InfoWindow({
				content: message[num]
			});

		google.maps.event.addListener(marker, "click", function() {
				infowindow.open(marker.get("map"), marker);
			});
	}
	
	google.maps.event.addDomListener(window, "load", initialize);
</script>
</head>
<body>
	<div id="map_canvas" style="width: 100%; height: 100%"></div>
</body>
</html>
