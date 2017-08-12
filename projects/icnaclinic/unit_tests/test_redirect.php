<?php 
require './services/util/basic_utils.php';

$params = array('key1' => 'value1', 'key2' => 'value2', 'key3' => 'value3');


redirectRequest("./", $params);
?>