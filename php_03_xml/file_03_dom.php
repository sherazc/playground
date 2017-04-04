<?php
//http://localhost/php_03_xml/file_03_dom.php
//http://www.w3schools.com/php/php_xml_dom.asp
$xmlDoc = new DOMDocument();

$xmlDoc->load("input_file_01.xml");

echo $xmlDoc->saveXML();

?>