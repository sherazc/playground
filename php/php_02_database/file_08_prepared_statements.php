<?php

$host = "localhost";
$user = "sheraz";
$pass = "sheraz";
$db = "myphp";

$mysqli = new mysqli($host, $user, $pass, $db);
if ($mysqli->connect_errno) {
	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}

if (!$mysqli->query("drop table if exists test") || !$mysqli->query("create table test(id int, dml_date datetime)")) {
	echo "Table creation failed: (". $mysqli->errno . ") " . $mysqli->error;
}


if (!($stat = $mysqli->prepare("insert into test(id, dml_date) values (?, ?)"))) {
	echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
}
$id = 1;

$dateNow = microtime(true);

$dmlDate = mktime(0, 0, 0, "01", "01", "2001");

$dmlDateStr = date("Y-m-d H:i:s.u", $dateNow);

//echo $dmlDateStr;

// for some reason its not storing milli/micro seconds
if (!$stat->bind_param("is", $id, $dmlDateStr)) {
	echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

// if (!$stat->mbind_param("s", $dmlDateStr)) {
// 	echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
// }

if (!$stat->execute()) {
	echo "Execute failed: (" . $stat->errno . ") " . $stat->error;
}

$mysqli->close();
echo "worked";
?>