<?php
$menu = array('breakfast' => 'bacon and eggs', 'lunch' => 'roast beef', 'dinner' => 'lasagna');

$result = array_keys($menu);

print_r($result);

print "<br />";

/* returns the array ('bacon and eggs', 'roast beef', 'lasagna') with numeric indices */

$result = array_values($menu);

print_r($result);

?>