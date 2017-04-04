<?php
// http://localhost/php_03_xml/file_02_expath_string_xml.php
$xmlData =
"<?xml version='1.0' encoding='ISO-8859-1'?>".
"<note>".
"	<to>Tove</to>".
"	<from>Jani</from>".
"	<heading>Reminder</heading>".
"	<body>Don't forget me this weekend!</body>".
"</note>";


$parser = xml_parser_create();

function handleElement($parser, $element, $attribute) {
	switch ($element) {
		case "NOTE":
			echo "<b>-- Note --</b><hr/>";
			break;
		case "TO":
			echo "<b>To:</b>";
			break;
		case "FROM":
			echo "<b>From:</b>";
			break;
		case "HEADING":
			echo "<b>Heading:</b>";
			break;
		case "BODY":
			echo "<b>Body:</b>";
			break;
	}
}

function handleEnd($parser, $data) {
	echo "<hr/>";
}

function handleElementData($parser, $value) {
	echo " <i>$value</i><br/>";
}

xml_set_element_handler($parser, "handleElement", "handleEnd");

xml_set_character_data_handler($parser, "handleElementData");

xml_parse($parser, $xmlData)
or
die (sprintf("XML Error: %s at line %d.",
xml_error_string(xml_get_error_code($parser)), xml_get_current_line_number($parser))
);

xml_parser_free($parser);

?>