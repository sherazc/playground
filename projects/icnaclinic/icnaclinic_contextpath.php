<?php
$contextPath = "/icnaclinic";
$requestUri = ($_SERVER['REQUEST_URI']);
if (strncmp($requestUri, $contextPath, strlen($contextPath))) {
	$contextPath = "";
}
$docContext = $_SERVER["DOCUMENT_ROOT"].$contextPath;
?>