<!DOCTYPE html>
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
    <style type="text/css">
      html { height: 100% }
      body { height: 100%; margin: 0; padding: 0 }
      #map_canvas { height: 100% }
    </style>
    <script type="text/javascript" 
    	src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCg7ZGBS0smQZnsYhB5eSOEjN9qaPazgBA&sensor=false"></script>
  
  	<script type="text/javascript">
//ROADMAP displays the normal, default 2D tiles of Google Maps.
//SATELLITE displays photographic tiles.
//HYBRID displays a mix of photographic tiles and a tile layer for prominent features (roads, city names).
//TERRAIN displays physical relief tiles for displaying elevation and water features (mountains, rivers, etc.).
  	
		function initialize() {
			var mapOptions = {
						center: new google.maps.LatLng(34.108109,-84.264793),
						zoom: 20,
						mapTypeId: google.maps.MapTypeId.HYBRID
					};

			var map = new google.maps.Map(document.getElementById("map_canvas"), 
					mapOptions);
		}
  	</script>
  </head>
  <body onload="initialize();">
    <div id="map_canvas" style="width:100%; height:100%"></div>
  </body>
</html>