<?php
// http://localhost/google_map_02_php_calc_dist/phpsqlsearch_genxml.php?lat=37&lng=-122&radius=25
header("Content-type: text/xml");
require 'phpsqlsearch_dbinfo.php';

$center_lat = $_GET["lat"];
$center_lng = $_GET["lng"];
$radius = $_GET["radius"];

$dom = new DOMDocument("1.0");
$node = $dom->createElement("markers");
$parnode = $dom->appendChild($node);

$connection = mysql_connect($host, $username, $password);
if (!$connection) {
	die("Not connected: ".mysql_errno());
}

$db_selected = mysql_select_db($database, $connection);
if (!$db_selected) {
	die("Cant use db: ".mysql_errno());
}

$query = sprintf("SELECT address, name, lat, lng, ( 3959 * acos( cos( radians('%s') ) * cos( radians( lat ) ) * cos( radians( lng ) - radians('%s') ) + sin( radians('%s') ) * sin( radians( lat ) ) ) ) AS distance FROM markers HAVING distance < '%s' ORDER BY distance LIMIT 0 , 20", 
		mysql_real_escape_string($center_lat),
		mysql_real_escape_string($center_lng),
		mysql_real_escape_string($center_lat),
		mysql_real_escape_string($radius));


$result = mysql_query($query);

if(!$result) {
	die("Invalid query: " . mysql_error());
}

while($row = @mysql_fetch_assoc($result)){
	$node = $dom->createElement("marker");
	$newnode = $parnode->appendChild($node);
	$newnode->setAttribute("name", $row['name']);
	$newnode->setAttribute("address", $row['address']);
	$newnode->setAttribute("lat", $row['lat']);
	$newnode->setAttribute("lng", $row['lng']);
	$newnode->setAttribute("distance", $row['distance']);
	
}

mysql_free_result($result);
mysql_close($connection);

echo $dom->saveXML();

//echo "working";
?>