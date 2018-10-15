<?php
session_start();
$_SESSION["logged_in_user"] = null;
unset($_SESSION["logged_in_user"]);
header('Location: login.php');
