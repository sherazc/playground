<?php
include_once "utilities.php";
session_start();
$_SESSION["logged_in_user"] = null;
unset($_SESSION["logged_in_user"]);

redirect("login.php");
