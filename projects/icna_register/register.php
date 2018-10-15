<!doctype html>
<html lang="en">
<head>
    <title>Register</title>
    <?php include_once 'common_html_head.php' ?>
</head>
<body>
<?php include 'header.php'?>
<?php
echo $_REQUEST["email"];
echo $_REQUEST["firstName"];
echo $_REQUEST["lastName"];
echo $_REQUEST["street"];
echo $_REQUEST["city"];
echo $_REQUEST["state"];
echo $_REQUEST["zip"];
?>
<div class="container">
    Registration Complete
</div>
<?php include 'footer.php'?>
</body>
</html>