<?php
$file = "./data_file.txt" or die("1. could not open file!");

// read file into array

$data = file($file) or die('Could not read file!');

// loop through array and print each line

foreach ($data as $line) {

	echo $line;

}

?>