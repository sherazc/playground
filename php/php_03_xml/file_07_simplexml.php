<?php

// http://localhost/php_03_xml/file_07_simplexml.php
// http://www.w3schools.com/php/php_xml_simplexml.asp
// http://www.w3schools.com/php/php_ref_simplexml.asp

$xml = simplexml_load_file("input_file_01.xml");

echo $xml->getName() . "<br/>";

foreach ($xml->children() as $child) {
	echo $child->getName();
	echo " = ";
	echo $child;
	echo "<br/>";
}

?>