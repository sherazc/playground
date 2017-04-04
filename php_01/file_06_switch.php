<?php

$sunday = 1;
if (isset($_GET["day"])) {
	$day = $_GET["day"];
	
	switch($day) {
		case $sunday:
			echo "It's Sunday today.";
			break;
		case 2:
			echo "It's Monday today.";
			break;
		default:
			echo "Not sure what day it is today.";
			break;
	}
	
} else {
	echo "You did not provided day=# parameter.";
}

?>