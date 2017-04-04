<?php

$db = new mysqli("localhost", "dbuser", "password123", "web");
// $db = new mysqli("mysql7.000webhost.com", "a5617878_hduser", "password123", "a5617878_hd");
// $db = new mysqli("127.0.0.1", "sheraz", "password123", "mydb");
// $db = new mysqli("mysql2.000webhost.com", "a7054520_hduser", "password123", "a7054520_hd");
// $db = new mysqli(getenv('OPENSHIFT_MYSQL_DB_HOST'), "hd", "password123", "web");

if ($db->connect_errno) {
    echo $db->connect_error;
    die("Sorry, we are having some DB problems.");
}