<?php
require_once "db_connect.php";
require_once "utilities.php";

function findLatestEvents()
{
    global $db;
    // $todayDate = new DateTime();
    // $todayDateString = $todayDate->format('Y-m-d');
    // $todayDateString = "2016-06-01";

    $query = "select * from events where event_date > DATE_SUB(NOW(), INTERVAL 1 DAY) and enabled='1' order by event_date, id limit " . config("event_limit", "4");

    $statment = $db->prepare($query);
    if ($statment) {
        // $statment->bind_param("s", $todayDateString);
        $statment->execute();
        $resultSet = $statment->get_result();
        $resultArray = [];

        while ($rowArray = $resultSet->fetch_assoc()) {
            $resultArray[] = $rowArray;
        }

        $resultSet->free();
        $statment->close();
    } else {
        trigger_error('Statement failed : ' . $statment->error, E_USER_ERROR);
    }
    return $resultArray;
}

function findLatestEventsJson() {
    $eventsArray = findLatestEvents();
    $result = null;
    if (isset($eventsArray)) {
        $result = json_encode($eventsArray, JSON_UNESCAPED_UNICODE);
    }
    return $result;
}

if (isset($_GET["printjson"])) {
    header('Content-Type: application/json');
    $eventsJson = findLatestEventsJson();
    if (isset($eventsJson)) {
        echo $eventsJson;
    }
}