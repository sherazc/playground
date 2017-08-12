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
//https://google-developers.appspot.com/maps/documentation/javascript/examples/event-domListener
	function initialize() {
		var mapOptions = {
				zoom: 8,
				center: new google.maps.LatLng(-34.397, 150.644),
				mapTypeId: google.maps.MapTypeId.HYBRID
			};

		var mapDiv = document.getElementById("map_canvas");
		var map = new google.maps.Map(mapDiv, mapOptions);

		google.maps.event.addDomListener(mapDiv, "click", showAlert);
	}

	function showAlert() {
		window.alert("DIV Clicked");
	}
	
	google.maps.event.addDomListener(window, "load", initialize);
</script>
</head>
<body>
	<div id="map_canvas" style="width: 100%; height: 100%"></div>
</body>
</html>
