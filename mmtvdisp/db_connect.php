<?php

$db = new mysqli("localhost", "root", "root", "hd");


if ($db->connect_errno) {
    echo $db->connect_error;
    die("Sorry, we are having some DB problems.");
}