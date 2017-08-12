<?php
include "db_connect.php";

function pv(&$name, $default = null) {
    $value = "";
    if (isset($name)) {
        $value = $name;
    } else if (isset($default)) {
        $value = $default;
    }
    echo $value;
}

function assertPrint($value1, $value2, $result, $otherwise) {
    if ($value1 == $value2) {
        echo $result;
    } else {
        echo $otherwise;
    }
}

function removeLineBreaks($inputString) {
    if (!isset($inputString)) {
        return "";
    }
    $inputString = str_replace(array("\r\n", "\r"), "\n", $inputString);
    $lines = explode("\n", $inputString);
    $new_lines = array();

    foreach ($lines as $i => $line) {
        if(!empty($line))
            $new_lines[] = trim($line);
    }
    return implode($new_lines);
}

function removeLineBreaksAndHtml($inputString) {
    return htmlspecialchars(removeLineBreaks($inputString), ENT_QUOTES);
}

function makeFormattedDateTime() {
}
