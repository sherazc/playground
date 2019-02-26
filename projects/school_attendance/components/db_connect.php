<?php
// $db = new mysqli("localhost", "dbuser", "password123", "web");

$db = new mysqli("db774511780.hosting-data.io", "dbo774511780", "DbConn!0", "db774511780");

if ($db->connect_errno) {
    echo $db->connect_error;
    die("Sorry, we are having some DB problems.");
}