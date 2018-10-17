<?php
function endsWith($s1, $s2) {
    if (!isset($s1) || !isset($s2)) {
        return false;
    }

    $strlen = strlen($s1);
    $testlen = strlen($s2);
    if ($testlen > $strlen) return false;
    return substr_compare($s1, $s2, $strlen - $testlen, $testlen) === 0;

}

$serverAddress = getenv('SERVER_ADDR');
$serverName = getenv('SERVER_NAME');
$remoteAddress = getenv('REMOTE_ADDR');
$isLocal = $serverAddress == '::1' || $serverAddress == '127.0.0.1' || $serverName == 'localhost'
    || substr($serverAddress, 0, 8) == '192.168.';

$isProd = endsWith($serverName, '.com');

if ($isLocal) {
    $dbHost = "localhost:3306";
    $dbUser = "root";
    $dbPassword = "root";
    $dbName = "employeedb";
} elseif ($isProd) {
    $dbHost = "localhost:3306";
    $dbUser = "hamzahdbadmin";
    $dbPassword = "password123";
    $dbName = "hamzahdashboarddb";
}

$db = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

if ($db->connect_errno) {
    echo $db->connect_error;
    die("Sorry, we are having some DB problems.");
}