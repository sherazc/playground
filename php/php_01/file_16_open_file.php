<?php
$file = "./data_file.txt" or die("1. could not open file!");

// read file into array

$data = file_get_contents($file) or die('2. Could not read file!');

echo $data;



?>