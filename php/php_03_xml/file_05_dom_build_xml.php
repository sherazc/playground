<?php
// http://localhost/php_03_xml/file_05_dom_build_xml.php
header("Content-type: text/xml");

$domDocument = new DOMDocument("1.0");

$note = $domDocument->createElement("note");
$domDocument->appendChild($note);

$to = $domDocument->createElement("to", "Tove");
$note->appendChild($to);

$from = $domDocument->createElement("from", "Jani");
$note->appendChild($from);


$heading = $domDocument->createElement("heading", "Reminder");
$note->appendChild($heading);

$body = $domDocument->createElement("body", "Don't forget me this weekend!");
$note->appendChild($body);

echo $domDocument->saveXML();
?>