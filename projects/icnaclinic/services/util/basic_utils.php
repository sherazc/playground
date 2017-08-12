<?php
$DATE_FORMAT = "Y-m-d H:i:s.u";

function getRequestParam($paramName) {
	$value = "";
	if (empty($paramName)) {
		$value = "";
	} elseif (isset($_REQUEST[$paramName])) {
		$value = $_REQUEST[$paramName];
	} elseif (isset($_GET[$paramName])) {
		$value = $_GET[$paramName];
	} elseif (isset($_POST[$paramName])) {
		$value = $_POST[$paramName];
	}
	return $value;
}

function getSessionAttribute($attributeName) {
	$value = "";
	if (empty($paramName)) {
		$value = "";
	} elseif (isset($_SESSION[$paramName])) {
		$value = $_SESSION[$paramName];
	}
	return $value;
}

function setSessionAttribute($attributeName, $attribute) {
	if (!isEmpty($attributeName) && !isEmpty($attribute)) {
		$_SESSION[$attributeName] = $attribute;
	}
}

function removeSessionAttribute($attributeName) {
	if (!isEmpty($attributeName)) {
		unset($_SESSION[$attributeName]);
	}
}

function isEmpty($value) {
	return empty($value);
}

function forwardRequest($url, $param) {
	if (empty($url)) {
		return;
	}

	$httpRequest = new HttpRequest($url, HttpRequest::METH_POST);
	$httpRequest->addPostFields($param);
	try {
		echo $httpRequest->send()->getBody();
	} catch (Exception $e) {
		echo $e;
	}

}

function redirectRequest($url, $param) {
	if (empty($url)) {
		return;
	}
	$redirectUrl = buildUrl($url, $param);
	$redirectUrl = "Location: ".$redirectUrl;
	header($redirectUrl);
}

function buildUrl($url, $param) {
	$resultUrl = $url;

	if (empty($resultUrl)) {
		return "";
	}

	if (!strpos($resultUrl, '?') && !empty($param)) {
		$resultUrl .= '?';
	}

	if (!empty($param)) {
		foreach ($param as $param_name => $param_value) {
			$resultUrl .= ($param_name."=".$param_value."&");
		}
	}
	return $resultUrl;
}

function startsWith($haystack, $needle) {
	return !strncmp($haystack, $needle, strlen($needle));
}

function endsWith($haystack, $needle) {
	$length = strlen($needle);
	if ($length == 0) {
		return true;
	}

	return (substr($haystack, -$length) === $needle);
}

function cloneArray($existingArray) {
	$newArray = array();
	foreach ($existingArray as $key => $value) {
		$newArray[$key] = $value;
	}
	return $newArray;
}

function getTodaysDate() {
	return strtotime("now");
}

function getTodaysDateStr() {
	global $DATE_FORMAT;
	$todaysDate = getTodaysDate();
	return date($DATE_FORMAT, $todaysDate);
}
?>