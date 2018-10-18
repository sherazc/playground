<?php

function isNull(&$value = null) {
    return !isset($value) || $value == null;
}

function isEqual(&$valueA, &$valueB) {
    return !isNull($valueA) && !isNull($valueB) && $valueA == $valueB;
}

function isBlank(&$str) {
    return !isset($str) || strlen($str) < 1;
}

function getValue(&$value) {
    if (isset($value)) {
        return $value;
    } else {
        return null;
    }
}


function redirect($url) {
    header('Location: '.$url);
    echo "<script>window.location.replace(\"".$url."\");</script>";
}


function isLoggedIn() {
    return isset($_SESSION["logged_in_user"]) && $_SESSION["logged_in_user"] != null;
}

function uiDateTimeToIsoDateTime(&$uiDateTime) {
    return date('Y-m-d G:i:s', strtotime($uiDateTime));
}
