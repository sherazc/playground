<!DOCTYPE html>
<html lang="en">
<?php
//error_reporting(0);
require_once "db_connect.php";
require_once "utilities.php";
?>
<head>
    <meta charset="UTF-8">
    <!-- Page Refreash ever 2 hours. This is used just as backup to javascript 30 mins refresh -->
    <meta http-equiv="refresh" content="7200">
    <title>Suffah Display</title>
    <link rel="stylesheet" href="scripts/libs/bootstrap/css/bootstrap.min.css">

    <script src="scripts/libs/jquery/jquery-1.11.2.min.js"></script>
    <script src="scripts/libs/jquery/jquery-ui.min.js"></script>
    <script src="scripts/libs/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="scripts/js/main.js"></script>

    <style>
        @font-face {
            font-family: 'saleem';
            src: url('fonts/saleem.ttf') format('truetype')
        }

        @font-face {
            font-family: 'me_quran';
            src: url('fonts/me_quran.ttf') format('truetype')
        }
        body {
            /*background: black;*/
            background: transparent url("images/green_background_2.png") top left no-repeat;
            background-size: cover;
        }

        .prayer_time {
            background: transparent url("images/prayer_type_background.png") top center no-repeat;
            height: 796px;
            width: 791px;
            position: relative;
            text-align: center;
            margin-top: 100px;
            margin-left: auto;
            margin-right: auto;
        }

        .prayer_time_heading {
            font-weight: bold;
            font-size: 40px;
            color: #B38934;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);
        }

        #prayer_div_table {
            margin-top: 125px;
            font-size: 20px;
        }

        #prayer_table {
            text-align: left;
            border: 1px solid gray;
        }

        #prayer_table th {
            border: 1px solid gray;
            white-space: nowrap;
            padding: 5px;
            /*font-weight: normal;*/
            font-size: 22px;
            color: #B38934;
            /*text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);*/
        }

        #prayer_table td {
            border: 1px solid gray;
            padding: 5px;
            text-align: center;
            font-size: 28px;
            white-space: nowrap;

        }

        #prayer_table td.small_time {
            font-size: 22px;
            white-space: nowrap;
        }

        #logo {
            background: transparent url("images/logo.png")  top center no-repeat;
            background-size: 200px 175px;
            width: 200px;
            height: 175px;
            position: absolute;
            margin: 0px auto;
            top: 30px;
            right: 30px;
            z-index: 4;
        }

        .center {
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            width: auto;
            height: auto;
            position: relative;
        }
        .heading {
            white-space: nowrap;
            font-weight: bold;
            font-size: 35px;
            color: #B38934;
        }
        .big_text {
            font-size: 25px;
        }

        @media screen and (max-width: 1599px) {
            body {
                background-color: #2a1809;
            }

            #prayer_timetable_frame {
                margin-top: 150px;
            }
        }

    </style>
    <script type="text/javascript">

        // Page Refresh every 30 minutes
        setInterval(function () {
            $.ajax({
                url: "status.php"
            }).done(function (status) {
                if (status.trim() == "ok") {
                    location = location.pathname;
                }
            });
        }, 30 * 60 * 1000);

        var todaySalatObject = [];

        $(document).ready(function () {

            var announcements = [];
            <?php
            if ($result = $db->query("select heading, detail from announcement")) {
                if ($count = $result->num_rows) {

                    $index = 0;
                    while($row = $result->fetch_object()) {
                        echo "announcements[", ($index++), "] = {heading: '",  removeLineBreaksAndHtml($row->heading),
                            "', detail: '", removeLineBreaksAndHtml($row->detail), "'};\n";

                    }
                }
            }
            ?>

            for (i = 0; i < announcements.length; i++) {
                $("#ticker").append("<li>" + announcements[i].detail + "</li>");
            }

            function getTodayMonthDate() {
                var today = new Date();
                var month = today.getMonth() + 1;
                var date = today.getDate();

                if (month < 10) {
                    month = "0" + month;
                }
                if (date < 10) {
                    date = "0" + date;
                }
                return month + "-" + date;
            }

            var salatTimeUrl = "salat_time_2.php?month_date=" + getTodayMonthDate();

            $.ajax({
                url: salatTimeUrl
            }).done(function (salatTimeString) {
                if (salatTimeString != null && salatTimeString != "") {
                    var salatJson = JSON.parse(salatTimeString);
                    if (salatJson != null && salatJson.length > 0) {
                        todaySalatObject = salatJson[0];
                        updateSalatTimeTable(todaySalatObject);
                        updateSalatLights(todaySalatObject);
                    }
                }
            });
        });

        function updateSalatTimeTable(todaySalatObject) {
            $("#cell_fajr_beginning").html(dateStringToTime(todaySalatObject.fajr_beginning));
            $("#cell_fajr_athan").html(dateStringToTime(todaySalatObject.fajr_athan));
            $("#cell_fajr_iqama").html(dateStringToTime(todaySalatObject.fajr_iqama));
            $("#cell_thuhr_beginning").html(dateStringToTime(todaySalatObject.thuhr_beginning));
            $("#cell_thuhr_athan").html(dateStringToTime(todaySalatObject.thuhr_athan));
            $("#cell_thuhr_iqama").html(dateStringToTime(todaySalatObject.thuhr_iqama));
            $("#cell_asr_shafi_beginning").html(dateStringToTime(todaySalatObject.asr_beginning_shafi));
            $("#cell_asr_hanafi_beginning").html(dateStringToTime(todaySalatObject.asr_beginning_hanafi));
            $("#cell_asr_athan").html(dateStringToTime(todaySalatObject.asr_athan));
            $("#cell_asr_iqama").html(dateStringToTime(todaySalatObject.asr_iqama));
            $("#cell_maghrib_athan").html(dateStringToTime(todaySalatObject.maghrib_athan));
            $("#cell_maghrib_iqama").html(todaySalatObject.maghrib_iqama);
            $("#cell_isha_beginning").html(dateStringToTime(todaySalatObject.isha_beginning));
            $("#cell_isha_athan").html(dateStringToTime(todaySalatObject.isha_athan));
            $("#cell_isha_iqama").html(dateStringToTime(todaySalatObject.isha_iqama));
            $("#cell_shurooq").html(dateStringToTime(todaySalatObject.shurooq));

            $("#cell_fajr_next_change").html(formatNextChange(todaySalatObject.fajr_change_date, todaySalatObject.fajr_change));
            $("#cell_thuhr_next_change").html(formatNextChange(todaySalatObject.thuhr_change_date, todaySalatObject.thuhr_change));
            $("#cell_asr_next_change").html(formatNextChange(todaySalatObject.asr_change_date, todaySalatObject.asr_change));
            $("#cell_maghrib_next_change").html(formatNextChange(todaySalatObject.maghrib_change_date, todaySalatObject.maghrib_change));
            $("#cell_isha_next_change").html(formatNextChange(todaySalatObject.isha_change_date, todaySalatObject.isha_change));
            console.log(dateStringToTime(todaySalatObject.asr_athan));
        }

        setInterval(function () {
            updateSalatLights(todaySalatObject);
        }, 1000);

        function updateSalatLights(todaySalatObject) {
            var date = new Date();
            var currentHours = date.getHours();
            var currentMinutes = date.getMinutes();

            var fajr_athanHours = extractHours(todaySalatObject.fajr_beginning);
            var fajr_athanMinutes = extractMinutes(todaySalatObject.fajr_beginning);
            var shurooqHours = extractHours(todaySalatObject.shurooq);
            var shurooqMinutes = extractMinutes(todaySalatObject.shurooq);
            var thuhr_athanHours = extractHours(todaySalatObject.thuhr_beginning);
            var thuhr_athanMinutes = extractMinutes(todaySalatObject.thuhr_beginning);
            var asr_shafi_athanHours = extractHours(todaySalatObject.asr_beginning_shafi);
            var asr_shafi_athanMinutes = extractMinutes(todaySalatObject.asr_beginning_shafi);
            var asr_hanafi_athanHours = extractHours(todaySalatObject.asr_beginning_hanafi);
            var asr_hanafi_athanMinutes = extractMinutes(todaySalatObject.asr_beginning_hanafi);
            var maghrib_athanHours = extractHours(todaySalatObject.maghrib_athan);
            var maghrib_athanMinutes = extractMinutes(todaySalatObject.maghrib_athan);
            var isha_athanHours = extractHours(todaySalatObject.isha_athan);
            var isha_athanMinutes = extractMinutes(todaySalatObject.isha_athan);

            var minutesCurrent = totalMinutes(currentHours, currentMinutes);
            var minutesFajr = totalMinutes(fajr_athanHours, fajr_athanMinutes);
            var minutesShurooq = totalMinutes(shurooqHours, shurooqMinutes);
            var minutesThuhr = totalMinutes(thuhr_athanHours, thuhr_athanMinutes);
            var minutesAsrShafi = totalMinutes(asr_shafi_athanHours, asr_shafi_athanMinutes);
            var minutesAsrHanafi = totalMinutes(asr_hanafi_athanHours, asr_hanafi_athanMinutes);
            var minutesMaghrib = totalMinutes(maghrib_athanHours, maghrib_athanMinutes);
            var minutesIsha = totalMinutes(isha_athanHours, isha_athanMinutes);

            fixSalatLight(minutesCurrent, minutesFajr, minutesShurooq, "#light_fajr");
            fixSalatLight(minutesCurrent, minutesThuhr, minutesAsrShafi, "#light_thuhr");
            fixSalatLight(minutesCurrent, minutesAsrShafi, minutesMaghrib, "#light_asr_shafi");
            fixSalatLight(minutesCurrent, minutesAsrHanafi, minutesMaghrib, "#light_asr_hanafi");
            fixSalatLight(minutesCurrent, minutesMaghrib, minutesMaghrib + 40, "#light_maghrib");

            if (minutesCurrent >= minutesIsha && minutesCurrent < 1440) {
                fixSalatLight(minutesCurrent, minutesIsha, 1440, "#light_isha");
            }
            if (minutesCurrent >= 0 && minutesCurrent <= minutesFajr) {
                fixSalatLight(minutesCurrent, 0, minutesFajr, "#light_isha");
            }
        }

        function totalMinutes(hours, minutes) {
            return (parseInt(hours) * 60) + parseInt(minutes);
        }

        function fixSalatLight(minutesCurrent, minutesAthanCurrent, minutesAthanNext, lightId) {
            if (minutesCurrent >= minutesAthanCurrent && minutesCurrent < minutesAthanNext) {
                $(lightId).attr("src","images/prayer_on.png");
            } else {
                $(lightId).attr("src","images/prayer_off.png");
            }

        }
    </script>
</head>
<body>
<?php include 'analog_clock.php'; ?>

<div id="logo"></div>

<div class="container-fluid">
    <div class="row">
        <div class="col-lg-6">
            <div id="prayer_timetable_frame" class="prayer_time">
                <?php include 'hijri_date.php'; ?>
                <div id="prayer_time_heading" class="prayer_time_heading" style="top: 100px; position: relative;">
                </div>
                <div id="prayer_div_table" class="center" style="width: 700px;">
                    <table id="prayer_table" class="center">
                        <tr>
                            <th></th>
                            <th>Beginning</th>
                            <th>Athan</th>
                            <th>Iqama</th>
                            <th>Next Change</th>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_fajr" src="images/prayer_off.png"/>
                                Fajr
                            </th>
                            <td id="cell_fajr_beginning"></td>
                            <td id="cell_fajr_athan"></td>
                            <td id="cell_fajr_iqama"></td>
                            <td id="cell_fajr_next_change" class="small_time"></td>
                        </tr>
                        <tr>
                            <th>
                                Shurooq
                            </th>

                            <td id="cell_shurooq" colspan="4"></td>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_thuhr" src="images/prayer_off.png"/>
                                Thuhr
                            </th>
                            <td id="cell_thuhr_beginning"></td>
                            <td id="cell_thuhr_athan"></td>
                            <td id="cell_thuhr_iqama"></td>
                            <td id="cell_thuhr_next_change" class="small_time"></td>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_asr_shafi" src="images/prayer_off.png"/>
                                Asr Shafi
                            </th>
                            <td id="cell_asr_shafi_beginning"></td>
                            <td id="cell_asr_athan" rowspan="2"></td>
                            <td id="cell_asr_iqama" rowspan="2"></td>
                            <td id="cell_asr_next_change" rowspan="2" class="small_time"></td>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_asr_hanafi" src="images/prayer_off.png"/>
                                Asr Hanafi
                            </th>
                            <td id="cell_asr_hanafi_beginning"></td>
                        </tr>

                        <tr>
                            <th>
                                <img id="light_maghrib" src="images/prayer_off.png"/>
                                Maghrib
                            </th>

                            <td id="cell_maghrib_athan" colspan="2"></td>
                            <td id="cell_maghrib_iqama"></td>
                            <td id="cell_maghrib_next_change" class="small_time"></td>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_isha" src="images/prayer_off.png"/>
                                Isha
                            </th>
                            <td id="cell_isha_beginning"></td>
                            <td id="cell_isha_athan"></td>
                            <td id="cell_isha_iqama"></td>
                            <td id="cell_isha_next_change" class="small_time"></td>
                        </tr>
                        <tr>
                            <th>
                                Jum'ah
                            </th>
                            <td colspan="4">
                                <?php
                                pv(getJumahTime($db));
                                ?>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <style>
            .weather_row {
                clear: both;
                display: table;
                left: 0;
                right: 0;
                margin-left: auto;
                margin-right: auto;
                width: auto;
                height: auto;
                position: relative;
                top: 180px
            }
            .weather_left {
                float: left;
                width: 700px;
                margin: 5px;
            }
            .weather_right {
                float: right;
                width: 350px;
                height: 228px;
                margin: 5px;
            }
        </style>
        <div class="col-lg-6">

            <div id="weather_widget" class="prayer_time">

                <div id="announcement_label" class="prayer_time_heading" style="top: 130px; position: relative;">
                    Reminders &nbsp;
                </div>
                <div class="weather_row" >
                    <div class="weather_left">
                        <div class="heading" style="text-align: center">
                            Quran
                        </div>
                        <style type="text/css">

                            #reminder-widget-container {
                                margin-top: 10px;
                                /*width: 800px;*/
                            }

                            #reminder_table {
                                font-family: Arial;
                                text-align: center;
                                background-color: #fff8eb;
                                border-radius: 5px;
                                box-shadow: 1px 1px 2px #888888;
                                border: 0;
                                border-spacing: 0px;
                                border-collapse: separate;
                                font-size: 110%;
                                color: #444;
                                margin: 0 auto;
                            }

                            .surahTitle {
                                font-family: 'saleem';
                                font-size: 100%;
                            }

                            .bismillah {
                                font-family: 'saleem';
                                color: #062707;
                                font-size: 200%;
                            }

                            .surahTitleDescription {
                                font-size: 70%;
                            }

                            .ayaArabic {
                                font-family: 'saleem';
                                color: #062707;
                                font-size: 200%;
                                background-color: #cbdfcc;
                            }

                            .ayaTranslation {

                            }

                            .ayaNumber {
                                background-color: #cbdfcc;
                            }

                            .ayaTranslationName {
                                font-size: 70%;
                                color: #666;
                            }
                        </style>

                        <script type="application/javascript" src="http://quran-rotd.rhcloud.com/static/reminder-widget-script"></script>
                        <div id="reminder-widget-container"></div>
                    </div>
                </div>

                <div class="weather_row" >
                    <div class="weather_left">
                        <?php
                        if ($result = $db->query("SELECT * FROM hadith_of_the_day where id=mod((SELECT DATEDIFF(now(),'2015-01-01')), (select count(*) from hadith_of_the_day))")) {
                            if ($count = $result->num_rows) {
                                $todayHadith = $result->fetch_object();
                            }
                        }

                        if (isset($todayHadith)) {
                            ?>
                            <div class="heading" style="text-align: center">
                                Hadith
                            </div>
                            <blockquote class="descriptionText big_text">
                                <?= $todayHadith->hadith_text ?>
                                <footer><?= $todayHadith->source_reference ?></footer>
                            </blockquote>
                            <?php
                        }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include 'footer.php'; ?>
</body>
</html>
<?php
mysqli_close($db);