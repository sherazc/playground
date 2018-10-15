<?php

function addOrUpdateStudent($db, $updateStudentId, $firstName, $lastName, $grade, $picture)
{
    $message = null;
    if (!isset($db) || !isset($firstName) || !isset($lastName) || !isset($grade)) {
        return "Required fields missing.";
    }

    if (isset($updateStudentId)) {
        $dbStudent = findStudent($db, $updateStudentId);
    }
    if (isset($dbStudent)) {
        $statement = $db->prepare("UPDATE students SET first_name=?, last_name=?, grade=?, picture=? WHERE id=?");
        $statement->bind_param("sssss", $firstName, $lastName, $grade, $picture, $updateStudentId);
    } else {
        $statement = $db->prepare("INSERT INTO students (first_name, last_name, grade, picture) VALUES (?, ?, ?, ?)");
        $statement->bind_param("ssss", $firstName, $lastName, $grade, $picture);
    }

    if ($statement->execute()) {
        $message = "Student successfully saved.";
    } else {
        $message = "Failed to save student.";
    }
    $statement->close();
    return $message;
}
//
//if ($statement = $db->prepare("SELECT * FROM salat_times where DATE_FORMAT(prayer_date, '%m-%d')=?")) {
//    $statement->bind_param("s", $monthDate);
//    $statement->execute();
//    $resultSet = $statement->get_result();
//    $data = $resultSet->fetch_all(MYSQL_ASSOC);
//    echo json_encode($data);
//    mysqli_free_result($resultSet);
//}

function findStudent($db, $studentId)
{
    if ($db == null || $studentId == null) {
        return null;
    }
    $student = null;
    $queryString = "select * from students where id='" . $studentId . "' and enabled='1'";
    if ($result = $db->query($queryString)) {
        if ($count = $result->num_rows) {
            $student = $result->fetch_object();
        }
        $result->close();
    }
    return $student;
}



function findConfigValueByName($db, $configName)
{
    if (!isset($db) || !isset($configName)) {
        return null;
    }

    $queryString = "select config_value from configuration where config_name = ? limit 1";

    $result = null;
    if ($statement = $db->prepare($queryString)) {
        $statement->bind_param("s", $configName);
        if ($statement->execute()) {
            $statement->bind_result($result);
            $statement->fetch();
        }
        $statement->close();
    }
    return $result;
}


// #################
// https://websitebeaver.com/prepared-statements-in-php-mysqli-to-prevent-sql-injection


/*
One Row

$result->fetch_assoc() - Fetch an associative array
$result->fetch_row() - Fetch a numeric array
$result->fetch_object() - Fetch an object array
All

$result->fetch_all(MYSQLI_ASSOC) - Fetch an associative array
$result->fetch_all(MYSQLI_NUM) - Fetch a numeric array

*/

function sampleSelectFetchAssoc() {
    $stmt = $mysqli->prepare("SELECT * FROM myTable WHERE name = ?");
    $stmt->bind_param("s", $_POST['name']);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows === 0) exit('No rows');
    while($row = $result->fetch_assoc()) {
    $ids[] = $row['id'];
    $names[] = $row['name'];
    $ages[] = $row['age'];
    }
    var_export($ages);
    $stmt->close();
}


function sampleSelectBindResult(){
    $stmt = $mysqli->prepare("SELECT id, name, age FROM myTable WHERE name = ?");
    $stmt->bind_param("s", $_POST['name']);
    $stmt->execute();
    $stmt->store_result();
    if($stmt->num_rows === 0) exit('No rows');
    $stmt->bind_result($idRow, $nameRow, $ageRow); 
    while($stmt->fetch()) {
    $ids[] = $idRow;
    $names[] = $nameRow;
    $ages[] = $ageRow;
    }
    var_export($ids);
    $stmt->close();
}

function sampleFetchRow() {
    $arr = [];
    $stmt = $mysqli->prepare("SELECT location, favorite_color, age FROM myTable WHERE name = ?");
    $stmt->bind_param("s", $_POST['name']);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_row()) {
    $arr[] = $row;
    }
    if(!$arr) exit('No rows');
    var_export($arr);
    $stmt->close();
}

function sampleSingleRow() {
    $arr = [];
    $stmt = $mysqli->prepare("SELECT location, favorite_color, age FROM myTable WHERE name = ?");
    $stmt->bind_param("s", $_POST['name']);
    $stmt->execute();
    $result = $stmt->get_result();
    while($row = $result->fetch_row()) {
    $arr[] = $row;
    }
    if(!$arr) exit('No rows');
    var_export($arr);
    $stmt->close();
}
