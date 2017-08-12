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

	function initialize() {
		var myLatLng = new google.maps.LatLng(-25.363882, 131.044922);
		var mapOptions = {
				zoom: 4, 
				center: myLatLng,
				mapTypeId: google.maps.MapTypeId.HYBRID
			};

		var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

		var infowindow = new google.maps.InfoWindow({
				content: "Change the zoom level",
				position: myLatLng
			});
		infowindow.open(map);

		google.maps.event.addListener(map, "zoom_changed", function() {
				var zoomLevel = map.getZoom();
				map.setCenter(myLatLng);
				infowindow.setContent("Zoom: " + zoomLevel);
			});
	}

	google.maps.event.addDomListener(window, "load", initialize);
</script>
</head>
<body>
	<div id="map_canvas" style="width: 100%; height: 100%"></div>
</body>
</html>
