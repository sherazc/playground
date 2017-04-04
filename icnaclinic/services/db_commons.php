<?php 
$dbhost = "localhost";
$dbuser = "sheraz";
$dbpassword = "sheraz";
$db = "myphp";
$dbConnection = null;

function getConnection() {
	global $dbhost;
	global $dbuser;
	global $dbpassword;
	global $db;
	global $dbConnection;

	if (!isConnectionOpen($dbConnection)) {
		$dbConnection = new mysqli($dbhost, $dbuser, $dbpassword, $db);
		if (mysqli_connect_errno()) {
			printf("Connect failed: %s\n", mysqli_connect_error());
			exit();
		}
	}
	return $dbConnection;
}

function closeConnection($dbConnection) {
	if (isConnectionOpen($dbConnection)) {
		$dbConnection->close();
		$dbConnection = null;
	}
}

function isConnectionOpen($dbConnection) {
	if (!empty($dbConnection) && $dbConnection->ping()) {
		return true;
	} else {
		return false;
	}
}

function prepareStatement($dbConnection, $query) {
	if (!($statement = $dbConnection->prepare($query))) {
		echo "Prepare failed: (" . $mysqli->errno . ") " . $dbConnection->error;
		echo $query;
	}
	return $statement;
}

function executeStatement($statement) {
	if (!$statement->execute()) {
		echo "Execute failed: (" . $statement->errno . ") " . $statement->error;
	}
}

?>