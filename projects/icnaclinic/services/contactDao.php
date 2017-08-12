<?php require $_SERVER["DOCUMENT_ROOT"]."/icnaclinic_contextpath.php"; ?>
<?php require_once $docContext.'/services/util/basic_utils.php';?>
<?php require $docContext.'/services/db_commons.php';?>
<?php 

$contactFields = " id, email, user_id, password, first_name, last_name, street, city, state_id, zip, phone, longitude, latitude, contact_type_id, date_created, dml_date ";

$insertContactSql = "insert into contact"." (".$contactFields .")"
		." values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";


$selectContactByUserId = "select".$contactFields." from contact where user_id=?";

function addUser($id, $email, $userId, $password, $firstName, $lastName, $street, $city, $state_id, $zip, $phone, $longitude, $latitude, $contactTypeId) {
	
	global $insertContactSql;
	
	$todayDateStr = getTodaysDateStr();
	
	$dbConnection = getConnection();
	$statement = prepareStatement($dbConnection, $insertContactSql);

	if (!$statement->bind_param("isssssssssssssss", 
			$id, $email, $userId, $password, $firstName, $lastName, $street, $city, $state_id, $zip, $phone, $longitude, $latitude, $contactTypeId, $todayDateStr, $todayDateStr)) {
		echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
		echo $statement;
	}

	executeStatement($statement);
	closeConnection($dbConnection);
	
	return true;
}

function getContactByUserId($userIdParam) {
	global $selectContactByUserId;
	$dbConnection = getConnection();
	
	$statement = prepareStatement($dbConnection, $selectContactByUserId);
	
	if (!$statement->bind_param("s", $userIdParam)) {
		echo "Binding parameters failed: (" . $statement->errno . ") " . $statement->error;
		echo $statement;
	}
	executeStatement($statement);
	
	
	closeConnection($dbConnection);
	return true;
}
?>