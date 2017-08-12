<?php
// http://localhost/php_03_xml/file_04_dom_load_xml.php
//http://www.w3schools.com/php/php_xml_dom.asp

$domDocument = new DOMDocument();

$domDocument->load("input_file_01.xml");

$documentElement = $domDocument->documentElement;

foreach ($documentElement->childNodes as $item) {
	print $item->nodeName . " = " . $item->nodeValue . "<br/>";
}


?>