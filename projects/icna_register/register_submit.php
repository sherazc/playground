<!doctype html>
<html lang="en">
<head>
    <title>Register</title>
    <?php include_once 'common_html_head.php' ?>
    <?php include_once 'authenticate.php' ?>
</head>
<body>
<?php include 'header.php'?>
<?php

$email = getValue($_REQUEST["email"]);
$firstName = getValue($_REQUEST["firstName"]);
$lastName = getValue($_REQUEST["lastName"]);
$street = getValue($_REQUEST["street"]);
$city = getValue($_REQUEST["city"]);
$state = getValue($_REQUEST["state"]);
$zip = getValue($_REQUEST["email"]);

echo $firstName;
?>
<div class="container">
    Registration Complete
</div>
<?php include 'footer.php'?>
</body>
</html>