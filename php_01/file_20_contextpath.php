<?php
$contextPath = "/php_01";
$requestUri = ($_SERVER['REQUEST_URI']);
if (strncmp($requestUri, $contextPath, strlen($contextPath))) {
	$contextPath = "";
}

echo $contextPath;

echo " working"

?>