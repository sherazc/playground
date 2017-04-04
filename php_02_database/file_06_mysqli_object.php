<?php
// http://devzone.zend.com/12/php-101-part-8-databases-and-other-animals_part-1/
$host = "localhost";
$user = "sheraz";
$pass = "sheraz";
$db = "myphp";


$mysqli = new mysqli($host, $user, $pass, $db);

if (mysqli_connect_errno()) {
	die("Unable to connect!");
}

$query = "select id, country, animal from symbols";


if ($result = $mysqli->query($query)) {
	echo "<table cellpadding=10 border=1>";
	
	if ($result->num_rows > 0) {
		echo "<tr><th>ID</th><th>Country</th><th>Animal</th></tr>";
	
		// mysql_fetch_object() fetches row as a Object.
		while($row = $result->fetch_array()) {
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
	
} else {
	echo "Error in query: $query".$mysqli->error;
}
$mysqli->close();
?>
