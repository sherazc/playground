<?php
require_once "db_connect.php";
if (isset($_GET["month_date"])) {
    $monthDate = $_GET["month_date"];
} else {
    $date = new DateTime();
    $monthDate = $date->format('m-d');
}
//
//if ($statement = $db->prepare("SELECT * FROM salat_times where DATE_FORMAT(prayer_date, '%m-%d')=?")) {
//    $statement->bind_param("s", $monthDate);
//    $statement->execute();
//    $resultSet = $statement->get_result();
//    $data = $resultSet->fetch_all(MYSQL_ASSOC);
//    echo json_encode($data);
//    mysqli_free_result($resultSet);
//}
echo "[";
if ($result = $db->query("SELECT * FROM salat_times where DATE_FORMAT(prayer_date, '%m-%d')='" . $monthDate . "'")) {
    if ($count = $result->num_rows) {
        $index = 0;
        while ($row = $result->fetch_object()) {
            echo json_encode($row);
            if (++$index < $count) {
                echo ",";
            }
        }
    }
}
echo "]";
mysqli_close($db);
