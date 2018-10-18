<!doctype html>
<html lang="en">
<head>
    <title>Event Tracker</title>
    <?php include_once 'common_html_head.php' ?>
    <?php include_once 'authenticate.php' ?>
</head>
<body>
<?php include_once 'header.php'?>
<?php

function createEvent($db,
                  $eventName,
                  $chapterRegion,
                  $eventStart,
                  $eventEnd,
                  $category,
                  $categoryType,
                  $attendance,
                  $servings,
                  $locationTypes,
                  $street,
                  $city,
                  $state,
                  $zip,
                  $attendees,
                  $eventInCharge,
                  $speakers,
                  $expense,
                  $paidBy,
                  $income,
                  $donation,
                  $workers,
                  $volunteers,
                  $rating,
                  $issues,
                  $comments) {

    $insertStatement = "insert into event_tracker"
        ."(event_name,chapter_region,event_start_date,event_end_date,category,category_type,"
        ."attendance,servings,location_types,street,city,state,zip,attendees,event_in_charge,"
        ."speakers,expense,paid_by,income,donation,workers,volunteers,rating,issues,comments)"
        ."values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

    $eventStartIso = uiDateTimeToIsoDateTime($eventStart);
    $eventEndIso = uiDateTimeToIsoDateTime($eventEnd);

    $statement = $db->prepare($insertStatement);
    $statement->bind_param("sssssssssssssssssssssssss",
        $eventName,
        $chapterRegion,
        $eventStartIso,
        $eventEndIso,
        $category,
        $categoryType,
        $attendance,
        $servings,
        $locationTypes,
        $street,
        $city,
        $state,
        $zip,
        $attendees,
        $eventInCharge,
        $speakers,
        $expense,
        $paidBy,
        $income,
        $donation,
        $workers,
        $volunteers,
        $rating,
        $issues,
        $comments);

    $result = $statement->execute();
    $statement->close();
    return $result;
}



$eventName = getValue($_REQUEST["eventName"]);
$chapterRegion = getValue($_REQUEST["chapterRegion"]);
$eventStart = getValue($_REQUEST["eventStart"]);
$eventEnd = getValue($_REQUEST["eventEnd"]);
$category = getValue($_REQUEST["category"]);
$categoryType = getValue($_REQUEST["categoryType"]);
$attendance = getValue($_REQUEST["attendance"]);
$servings = getValue($_REQUEST["servings"]);
$locationTypes = getValue($_REQUEST["locationTypes"]);
$street = getValue($_REQUEST["street"]);
$city = getValue($_REQUEST["city"]);
$state = getValue($_REQUEST["state"]);
$zip = getValue($_REQUEST["zip"]);
$attendees = getValue($_REQUEST["attendees"]);
$eventInCharge = getValue($_REQUEST["eventInCharge"]);
$speakers = getValue($_REQUEST["speakers"]);
$expense = getValue($_REQUEST["expense"]);
$paidBy = getValue($_REQUEST["paidBy"]);
$income = getValue($_REQUEST["income"]);
$donation = getValue($_REQUEST["donation"]);
$workers = getValue($_REQUEST["workers"]);
$volunteers = getValue($_REQUEST["volunteers"]);
$rating = getValue($_REQUEST["rating"]);
$issues = getValue($_REQUEST["issues"]);
$comments = getValue($_REQUEST["comments"]);


$loginSuccessful = createEvent($db,
        $eventName,
        $chapterRegion,
        $eventStart,
        $eventEnd,
        $category,
        $categoryType,
        $attendance,
        $servings,
        $locationTypes,
        $street,
        $city,
        $state,
        $zip,
        $attendees,
        $eventInCharge,
        $speakers,
        $expense,
        $paidBy,
        $income,
        $donation,
        $workers,
        $volunteers,
        $rating,
        $issues,
        $comments);
?>
<div class="container">
    <?php
        if ($loginSuccessful) {
            echo "Event successfully created";
        } else {
            echo "Failed to create event";
        }
    ?>
</div>
<?php include_once 'footer.php'?>
</body>
</html>


    <?php

// TODO below code is just for reference
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
