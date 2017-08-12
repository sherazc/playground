<html>

<head></head>
<body>

My favourite bands are:

<ul>

<?php

// define array

$artists = array('Metallica', 'Evanescence', 'Linkin Park', 'Guns n Roses');

// loop over it and print array elements

for ($x = 0; $x < sizeof($artists); $x++) {

    echo '<li>'.$artists[$x];

}

?>

</ul>

</body>

</html>