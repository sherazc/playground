<?php 
// http://php.net/manual/en/function.strtotime.php
echo "now = " . strtotime("now");
echo "<br/>";
echo "02 September 1980 = " . strtotime("02 September 1980");
echo "<br/>";
echo "+1 day = " . strtotime("+1 day");
echo "<br/>";
echo "+1 week = " . strtotime("+1 week");
echo "<br/>";
echo "+1 week 2 days 4 hours 2 seconds = " . strtotime("+1 week 2 days 4 hours 2 seconds");
echo "<br/>";
echo "next Thursday = " . strtotime("next Thursday");
echo "<br/>";
echo "last Monday = " . strtotime("last Monday");
echo "<br/>";
?>