<?php
include_once "utilities.php";
if (!isset($_SESSION[$logged_in_user]) || $_SESSION[$logged_in_user] == null) {
    redirect("login.php");
}

