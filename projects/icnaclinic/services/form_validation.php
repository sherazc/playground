<?php 
$errorMessages = array();

function addError($formName, $fieldName, $message) {
	global $errorMessages;
	$field = $formName.".".$fieldName;
	$errorMessages[$field] = $message;
}

function removeAllErrorMessages() {
	global $errorMessages;
	$errorMessages = array();
}

function removeAllFormErrorMessages($formName) {
	global $errorMessages;
	$tempErrorMessage = cloneArray($errorMessages);
	foreach ($tempErrorMessage as $errorName => $errorMessage) {
		if (startsWith($errorName, $formName)) {
			unset($errorMessages[$errorName]);
		}
	}
}

function getErrorMessage($formName, $fieldName) {
	global $errorMessages;
	$field = $formName.".".$fieldName;
	if (isset($errorMessages[$field])) {
		return $errorMessages[$field];
	} else {
		return "";
	}
	return ;
}


function addErrorIfEmpty($formName, $fieldName, $fieldLable) {
	if(isEmpty(getRequestParam($fieldName))) {
		addError($formName, $fieldName, "Please enter $fieldLable.");
	}
}


function printFormErrorMessages($formName, $prefix, $suffix) {
	global $errorMessages;
	foreach ($errorMessages as $errorName => $errorMessage) {
		if (startsWith($errorName, $formName.".")) {
			echo $prefix.$errorMessage.$suffix;
		}
	}
}

function formHasErrors($formName) {
	global $errorMessages;
	foreach ($errorMessages as $errorName => $errorMessage) {
		if (startsWith($errorName, $formName.".")) {
			return true;
		}
	}
	return false;
}

function defaultPrintFormErrorMessages($formName) {
	if (formHasErrors($formName)) {
		echo "<ul style='color: #c48686;'>";
		printFormErrorMessages($formName, "<li>", "</li>");
		echo "</ul>";
	}
}
?>