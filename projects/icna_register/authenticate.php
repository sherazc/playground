<?php
if (!isset($_SESSION[$logged_in_user]) || $_SESSION[$logged_in_user] == null) {
    header('Location: login.php');
}

