<?php

// set up some string variables

$a = 'the';

$b = 'games';

$c = 'begin';

$d = 'now';

$e = $a . $b;

$e .= " another string added";

// combine them using the concatenation operator

// this returns 'the games begin now<br />'

$statement = $a.' '.$b.' '.$c.' '.$d.'<br />';

print $statement;

// and this returns 'begin the games now!'



$command = $c." ".$a.' '.$b.' '.$d.'!';

print $command;

print "<br/>";

print $e;

?>