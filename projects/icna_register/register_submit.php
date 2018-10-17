<!doctype html>
<html lang="en">
<head>
    <title>Register</title>
    <?php include_once 'common_html_head.php' ?>
    <?php include_once 'authenticate.php' ?>
</head>
<body>
<?php include_once 'header.php'?>
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


function register($db,
                  $email,
                  $firstName,
                  $lastName,
                  $street,
                  $city,
                  $state,
                  $zip) {

    $statement = $db->prepare("insert into icna_register
(email, first_name, last_name, street, city, state, zip)
values (?, ?, ?, ?, ?, ?, ?)");
    $statement->bind_param("sssssss",
        $email,
        $firstName,
        $lastName,
        $street,
        $city,
        $state,
        $zip);

    $result = $statement->execute();
    $statement->close();
    return $result;
}

$email = getValue($_REQUEST["email"]);
$firstName = getValue($_REQUEST["firstName"]);
$lastName = getValue($_REQUEST["lastName"]);
$street = getValue($_REQUEST["street"]);
$city = getValue($_REQUEST["city"]);
$state = getValue($_REQUEST["state"]);
$zip = getValue($_REQUEST["zip"]);

$loginSuccessful = register($db,
    $email,
    $firstName,
    $lastName,
    $street,
    $city,
    $state,
    $zip);

?>
<div class="container">
    <?php
        if ($loginSuccessful) {
            echo "Registered Successfully";
        } else {
            echo "Failed to Register";
        }
    ?>
</div>
<?php include_once 'footer.php'?>
</body>
</html>