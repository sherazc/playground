<h1>Loops</h1>
<?php 
$limit = 10;
if (isset($_GET["limit"])) {
	$limit = $_GET["limit"];
} else {
	echo "Parameter \'limit\' is not provided. Default limit = $limit";
}

?>

<h3>While loop</h3>
<?php
$i = 0;
while ($i < $limit) {
	$i++;
	echo "iteration #: $i <br/>";
}

?>

<h3>Do While loop</h3>
<?php
$i = 0;
do {
	$i++;
	echo "iteration #: $i <br/>";
} while ($i < $limit);

?>

<h3>For loop</h3>
<?php

for ($i = 0; $i < $limit ; $i++) {
	echo "iteration #: $i <br/>";
}
?>