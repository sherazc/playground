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
//https://google-developers.appspot.com/maps/documentation/javascript/examples/event-arguments
	function initialize() {
		var mapOptions = {
					zoom: 15,
					center: new google.maps.LatLng(34.108109,-84.264793),
					mapTypeId: google.maps.MapTypeId.HYBRID
				};

		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		google.maps.event.addListener(map, "click", function(e) {
				placeMarker(e.latLng, map);

			});
		
	}

	function placeMarker(position, map) {
		var marker = new google.maps.Marker({
				position: position,
				map: map
			});
		map.panTo(position);
	}

	google.maps.event.addDomListener(window, "load", initialize);
</script>
</head>
<body>
	<div id="map_canvas" style="width: 100%; height: 100%"></div>
</body>
</html>
