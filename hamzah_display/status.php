<?php
require_once "db_connect.php";

if ($result = $db->query("select now() as now_date")) {
    if ($count = $result->num_rows) {
        $todayDate = $result->fetch_object();
    }
}
if(isset($todayDate)) {
    echo "ok";
}