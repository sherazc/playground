<?php
// define CSV string
$str = 'red, blue, green, yellow';

// split into individual words

$colors = explode(', ', $str);

print_r($colors);

// join into single string with 'and'

// returns 'red and blue and green and yellow'

$str = implode(' and ', $colors);

echo "<br/>";

print $str;

?>