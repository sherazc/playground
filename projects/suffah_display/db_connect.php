<?php

$db = new mysqli("localhost", "root", "root", "suffah");
// $db = new mysqli(getenv('OPENSHIFT_MYSQL_DB_HOST'), "dbuser", "password123", "disp");

if ($db->connect_errno) {
    echo $db->connect_error;
    die("Sorry, we are having some DB problems.");
}