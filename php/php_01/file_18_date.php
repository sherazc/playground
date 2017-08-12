<?php 
// http://www.tizag.com/phpT/phpdate.php
// http://www.google.com/#hl=en&gs_rn=7&gs_ri=psy-ab&cp=11&gs_id=1a&xhr=t&q=php+date+tutorial&es_nrs=true&pf=p&sclient=psy-ab&oq=php+date+tu&gs_l=&pbx=1&bav=on.2,or.r_qf.&bvm=bv.44011176,d.eWU&fp=db8be5b96e09e15d&biw=942&bih=931
// http://www.php.net/manual/en/function.date.php
echo "Today: " . date("m/d/y");

echo "<br/>";
//mktime(hour, minute, second, month, day, year, daylight savings time)
$tomorrow = mktime(0, 0, 0, date("m"), date("d") + 1, date("y"));

echo "Tomorrow is ".date("m/d/y", $tomorrow);
?>