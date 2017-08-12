<?php
require_once "db_connect.php";
if (isset($_GET["month_date"])) {
    $monthDate = $_GET["month_date"];
} else {
    $date = new DateTime();
    $monthDate = $date->format('m-d');
}

echo "[";
if ($result = $db->query("SELECT * FROM salat_times where DATE_FORMAT(prayer_date, '%m-%d') = '" . $monthDate . "' limit 1")) {
    if ($count = $result->num_rows) {
        $salatTimes = $result->fetch_object();
    }
}

if (isset($salatTimes)) {

    if ($result = $db->query("SELECT * FROM salat_times where DATE_FORMAT(prayer_date, '%m-%d') > '" . $monthDate . "'")) {
        if ($count = $result->num_rows) {
            $changeSetFajr = false;
            $changeSetThuhr = false;
            $changeSetAsr = false;
            $changeSetMaghrib = false;
            $changeSetIsha = false;

            while (($row = $result->fetch_object())
                && (!$changeSetFajr || !$changeSetThuhr || !$changeSetAsr || !$changeSetMaghrib || !$changeSetIsha)) {

                if (!$changeSetFajr &&  ($row->fajr_iqama != $salatTimes->fajr_iqama)) {
                    $salatTimes->fajr_change = $row->fajr_iqama;
                    $salatTimes->fajr_change_date = $row->prayer_date;
                    $changeSetFajr = true;
                }

                if (!$changeSetThuhr &&  ($row->thuhr_iqama != $salatTimes->thuhr_iqama)) {
                    $salatTimes->thuhr_change = $row->thuhr_iqama;
                    $salatTimes->thuhr_change_date = $row->prayer_date;
                    $changeSetThuhr = true;
                }

                if (!$changeSetAsr &&  ($row->asr_iqama != $salatTimes->asr_iqama)) {
                    $salatTimes->asr_change = $row->asr_iqama;
                    $salatTimes->asr_change_date = $row->prayer_date;
                    $changeSetAsr = true;
                }

                if (!$changeSetMaghrib &&  ($row->maghrib_athan != $salatTimes->maghrib_athan)) {
                    $salatTimes->maghrib_change = $row->maghrib_athan;
                    $salatTimes->maghrib_change_date = $row->prayer_date;
                    $changeSetMaghrib = true;
                }

                if (!$changeSetIsha &&  ($row->isha_iqama != $salatTimes->isha_iqama)) {
                    $salatTimes->isha_change = $row->isha_iqama;
                    $salatTimes->isha_change_date = $row->prayer_date;
                    $changeSetIsha = true;
                }
            }
        }
    }
    echo json_encode($salatTimes);
}

echo "]";
//mysqli_close($db);

