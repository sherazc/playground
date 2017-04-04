<?php
// $db = new mysqli("localhost", "dbuser", "password123", "web");

$db = new mysqli("127.0.0.1", "sheraz", "password123", "sa");

if ($db->connect_errno) {
    echo $db->connect_error;
    die("Sorry, we are having some DB problems.");
}