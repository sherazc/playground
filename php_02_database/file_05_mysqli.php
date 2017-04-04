<?php
// http://devzone.zend.com/12/php-101-part-8-databases-and-other-animals_part-1/
$host = "localhost";
$user = "sheraz";
$pass = "sheraz";
$db = "myphp";


$connection = mysqli_connect($host, $user, $pass, $db) or die ("Unable to connect!");

$query = "select id, country, animal from symbols";


// NOTE: query method in mysqli requires connection
$result = mysqli_query($connection, $query) or die ("Error in query: $query. ".mysqli_error());

echo "<table cellpadding=10 border=1>";

if (mysqli_num_rows($result) > 0) {
	echo "<tr><th>ID</th><th>Country</th><th>Animal</th></tr>";
	
	// mysql_fetch_object() fetches row as a Object.
	while($row = mysqli_fetch_row($result)) {
		echo "<tr>";
		echo "<td>".$row[0]."</td>";
		echo "<td>".$row[1]."</td>";
		echo "<td>".$row[2]."</td>";
		echo "</tr>";
	}
} else {
	echo "<tr><td>No rows found!</td></tr>";
}

echo "</table>";


mysqli_free_result($result);
mysqli_close($connection);
?>
