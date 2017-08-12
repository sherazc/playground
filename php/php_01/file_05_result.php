<?php
$num1 = $_POST["num1"];

$num2 = $_POST["num2"];

$num2 += $num1;

echo "Total = $num2";

?>

<br />

<?php

if ($num2 % 3 == 0) {
	echo "Total is divisible by 3.";
} elseif ($num2 % 2 == 0) {
	echo "Total is an even number.";
} else {
	echo "Total not divisible by 3 and not an even number.";
}

?>