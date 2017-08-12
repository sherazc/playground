<?php 
//http://php.net/manual/en/pdo.prepared-statements.php

$dateNow = microtime(true);

$createDate = date("Y-m-d H:i:s.u", $dateNow);
$dmlDate = date("Y-m-d H:i:s.u", $dateNow);

$host = "localhost";
$user = "sheraz";
$pass = "sheraz";
$db = "myphp";

$mysqli = new mysqli($host, $user, $pass, $db);

if ($mysqli->connect_errno) {
	echo "Failed to connect to MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}


if (!($stat = $mysqli->prepare("select count(*) from user_time where id = ? "))) {
	echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

$id = 1;
if (!$stat->bind_param("i", $id)) {
	echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stat->execute()) {
	echo "Execute failed: (" . $stat->errno . ") " . $stat->error;
} 

//while ($row = $stmt->fetch()) {
// 	/print_r($row);
//}


/*
if (!($stat = $mysqli->prepare("insert into user_time(create_date, dml_date) values (?, ?)"))) {
	echo "Prepare failed: (" . $mysqli->errno . ") " . $mysqli->error;
}

if (!$stat->bind_param("ss", $createDate, $dmlDate)) {
	echo "Binding parameters failed: (" . $stmt->errno . ") " . $stmt->error;
}

if (!$stat->execute()) {
	echo "Execute failed: (" . $stat->errno . ") " . $stat->error;
}

*/

$mysqli->close();
echo "inserted record in USER_TIME at $dmlDate";

?>