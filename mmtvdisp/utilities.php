<?php
require_once "db_connect.php";

function pv(&$name, $default = null)
{
    $value = "";
    if (isset($name)) {
        $value = $name;
    } else if (isset($default)) {
        $value = $default;
    }
    echo $value;
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

function getConfigValue($db, $configName) {
    if (!isset($db) ||  !isset($configName)) {
        return null;
    }
    $resultValue = null;

    if ($result = $db->query("select * from configuration where config_name='". $configName ."'")) {
        if ($count = $result->num_rows) {
            if ($configuration = $result->fetch_object()) {
                $resultValue = $configuration->config_value;
            }
        }
    }
    return $resultValue;
}

function getJumahTime($db) {
    return getConfigValue($db, "jumah_prayer");
}