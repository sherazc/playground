<?php
// http://devzone.zend.com/12/php-101-part-8-databases-and-other-animals_part-1/
// CREATE TABLE symbols (
// id integer NOT NULL auto_increment,
// country varchar(255) NOT NULL default '',
// animal varchar(255) NOT NULL default '',
// PRIMARY KEY  (id)
// );

// INSERT INTO symbols VALUES (1, 'America', 'eagle');

// INSERT INTO symbols VALUES (2, 'China', 'dragon');

// INSERT INTO symbols VALUES (3, 'England', 'lion');

// INSERT INTO symbols VALUES (4, 'India', 'tiger');

// INSERT INTO symbols VALUES (5, 'Australia', 'kangaroo');

// INSERT INTO symbols VALUES (6, 'Norway', 'elk');

// select * from symbols;

$host = "localhost";
$user = "sheraz";
$password = "sheraz";
$db = "myphp";
$query = "SELECT * FROM symbols";

$connection = mysql_connect($host, $user, $password) or die ("Unable to connect!");

mysql_select_db($db);


$result = mysql_query($query) or die ("Error in query: $query. ".mysql_error());

if (mysql_num_rows($result) > 0) {
	while ($row = mysql_fetch_row($result)) {
		print_r($row);
		echo "<br/>";
	}
} else {
	echo "No rows found!";
}

mysql_free_result($result);

mysql_close($connection);

?>