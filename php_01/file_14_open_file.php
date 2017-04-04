<?php

$file = "./data_file.txt" or die("1. could not open file!");

$fh = fopen($file, "r") or die("2. could not open file!");

$data = fread($fh, filesize($file)) or die("3. could not open file!");

fclose($fh);

echo $data;

?>