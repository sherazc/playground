<?php
//header("Content-type: text/plain; charset=utf-8");
require 'assert.php'; 
require '../services/db_commons.php';

$dbConnection = getConnection();

if (assert(isConnectionOpen($dbConnection))) {
	echo "DB connection successful";
} else {
	echo "DB connection failed";
}

closeConnection($dbConnection);

if (assert(isConnectionOpen($dbConnection))) {
	echo "DB Connection closed successfully";
} else {
	echo "DB Connection close failed";
}
?>