<?php

$pizzaToppings = array('onion', 'tomato', 'cheese', 'anchovies', 'ham', 'pepperoni');

print_r($pizzaToppings);

echo "<br/>";

echo $pizzaToppings[2];

echo "<br/>";

$fruits = array('red' => 'apple', 'yellow' => 'banana', 'purple' => 'plum', 'green' => 'grape');

print $fruits["yellow"];

echo "<br/>";

print_r($fruits);

echo "<br/>";
array_push($pizzaToppings, "orange");

print_r($pizzaToppings);

array_pop($pizzaToppings);

echo "<br/>";

print_r($pizzaToppings);

echo "<br/>";

array_shift($pizzaToppings);

print_r($pizzaToppings);

echo "<br/>";

array_unshift($pizzaToppings, "mashroom");

print_r($pizzaToppings);

echo "<br/>";


?>