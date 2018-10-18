<?php
session_start();
include_once "db_connect.php";
include_once "utilities.php";
$logged_in_user = "logged_in_user";

function findUser($db, $userId, $password) {
    $stmt = $db->prepare("SELECT id, user_id, user_password FROM `event_tracker_user` WHERE lower(user_id)=lower(?) and user_password=?");
    $stmt->bind_param("ss", $userId, $password);
    $stmt->execute();
    $result = $stmt->get_result();
    if($result->num_rows === 0) {
        return null;
    } else {

        $row = $result->fetch_assoc();
        $user = new stdClass();
        $user->id = $row['id'];
        $user->userId = $row['user_id'];
        $user->password = $row['user_password'];
        $stmt->close();
        return $user;
    }
}

$userId = getValue($_REQUEST["userId"]);
$password = getValue($_REQUEST["password"]);

$user = findUser($db, $userId, $password);

if (isNull($user)) {
    redirect("login.php?failLogin=true");
} else {
    $_SESSION[$logged_in_user] = $user->userId;
    redirect("even-tracker.php");
}

var_dump($user);

mysqli_close($db);