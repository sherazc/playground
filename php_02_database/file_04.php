<?php
// http://devzone.zend.com/12/php-101-part-8-databases-and-other-animals_part-1/
$host = "localhost";
$user = "sheraz";
$pass = "sheraz";
$db = "myphp";

$connection = mysql_connect($host, $user, $pass) or die ("Unable to connect!");
mysql_select_db($db) or die ("Unable to select database!");

$query = "select id, country, animal from symbols";

$result = mysql_query($query) or die ("Error in query: $query. ".mysql_error());

echo "<table cellpadding=10 border=1>";

if (mysql_num_rows($result) > 0) {
	echo "<tr><th>ID</th><th>Country</th><th>Animal</th></tr>";
	
	// mysql_fetch_object() fetches row as a Object.
	while($row = mysql_fetch_object($result)) {
		echo "<tr>";
		echo "<td>".$row->id."</td>";
		echo "<td>".$row->country."</td>";
		echo "<td>".$row->animal."</td>";
		echo "</tr>";
	}
} else {
	echo "<tr><td>No rows found!</td></tr>";
}

echo "</table>";


mysql_free_result($result);
mysql_close($connection);
?>
