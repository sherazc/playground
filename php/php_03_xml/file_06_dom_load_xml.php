<?php
// http://localhost/php_03_xml/file_06_dom_load_xml.php
$domDocument = new DOMDocument("1.0");

$domDocument->load("http://localhost/php_03_xml/file_05.php");

//echo $domDocument;
//echo ini_get('allow_url_fopen');
//echo file_get_contents('http://www.google.com');
$documentElement = $domDocument->documentElement;


foreach ($documentElement->childNodes as $item) {
	echo $item->nodeName;
	echo " = ";
	echo $item->nodeValue;
	echo "<br/>";
}


?>