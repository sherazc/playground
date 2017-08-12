<!DOCTYPE html>
<html lang="en">
<?php
require_once "db_connect.php";
require_once "utilities.php";
?>
<head>
    <meta charset="UTF-8">
    <!-- Page Refreash ever 30 mins. This is used just as backup to javascript 15 mins refresh -->
    <meta http-equiv="refresh" content="1800">
    <title>Hamzah Display</title>
    <link rel="stylesheet" href="scripts/libs/bootstrap/css/bootstrap.min.css">

    <script src="scripts/libs/jquery/jquery-1.11.2.min.js"></script>
    <script src="scripts/libs/jquery/jquery-ui.min.js"></script>
    <script src="scripts/libs/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="scripts/js/main.js"></script>

    <script type="text/javascript">
        // Page Refresh every 15 minutes
        setInterval(function () {
            $.ajax({
                url: "status.php"
            }).done(function (status) {
                if (status.trim() == "ok") {
                    location = location.pathname;
                }
            });
        }, 15 * 60 * 1000);

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
            $("#cell_fajr_athan").html(dateStringToTime(todaySalatObject.fajr_athan));
            $("#cell_fajr_iqama").html(dateStringToTime(todaySalatObject.fajr_iqama));
            $("#cell_thuhr_athan").html(dateStringToTime(todaySalatObject.thuhr_athan));
            $("#cell_thuhr_iqama").html(dateStringToTime(todaySalatObject.thuhr_iqama));
            $("#cell_asr_athan").html(dateStringToTime(todaySalatObject.asr_athan));
            $("#cell_asr_iqama").html(dateStringToTime(todaySalatObject.asr_iqama));
            $("#cell_maghrib_athan").html(dateStringToTime(todaySalatObject.maghrib_athan));
            $("#cell_maghrib_iqama").html(todaySalatObject.maghrib_iqama);
            $("#cell_isha_athan").html(dateStringToTime(todaySalatObject.isha_athan));
            $("#cell_isha_iqama").html(dateStringToTime(todaySalatObject.isha_iqama));
            $("#cell_shurooq").html(dateStringToTime(todaySalatObject.shurooq));

            $("#cell_fajr_next_change").html(formatNextChange(todaySalatObject.fajr_change_date, todaySalatObject.fajr_change));
            // $("#cell_thuhr_next_change").html(formatNextChange(todaySalatObject.thuhr_change_date, todaySalatObject.thuhr_change));
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

            var fajr_athanHours = extractHours(todaySalatObject.fajr_athan);
            var fajr_athanMinutes = extractMinutes(todaySalatObject.fajr_athan);
            var shurooqHours = extractHours(todaySalatObject.shurooq);
            var shurooqMinutes = extractMinutes(todaySalatObject.shurooq);
            var thuhr_athanHours = extractHours(todaySalatObject.thuhr_athan);
            var thuhr_athanMinutes = extractMinutes(todaySalatObject.thuhr_athan);
            var asr_athanHours = extractHours(todaySalatObject.asr_athan);
            var asr_athanMinutes = extractMinutes(todaySalatObject.asr_athan);
            var maghrib_athanHours = extractHours(todaySalatObject.maghrib_athan);
            var maghrib_athanMinutes = extractMinutes(todaySalatObject.maghrib_athan);
            var isha_athanHours = extractHours(todaySalatObject.isha_athan);
            var isha_athanMinutes = extractMinutes(todaySalatObject.isha_athan);

            var minutesCurrent = totalMinutes(currentHours, currentMinutes);
            var minutesFajr = totalMinutes(fajr_athanHours, fajr_athanMinutes);
            var minutesShurooq = totalMinutes(shurooqHours, shurooqMinutes);
            var minutesThuhr = totalMinutes(thuhr_athanHours, thuhr_athanMinutes);
            var minutesAsr = totalMinutes(asr_athanHours, asr_athanMinutes);
            var minutesMaghrib = totalMinutes(maghrib_athanHours, maghrib_athanMinutes);
            var minutesIsha = totalMinutes(isha_athanHours, isha_athanMinutes);

            fixSalatLight(minutesCurrent, minutesFajr, minutesShurooq, "#light_fajr");
            fixSalatLight(minutesCurrent, minutesThuhr, minutesAsr, "#light_thuhr");
            fixSalatLight(minutesCurrent, minutesAsr, minutesMaghrib, "#light_asr");
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
                $(lightId).attr("src", "images/prayer_on.png");
            } else {
                $(lightId).attr("src", "images/prayer_off.png");
            }

        }
    </script>
    <style>
        body {
            /*background: black;*/
            background: transparent url("images/background_display.png") top left no-repeat;
            background-size: cover;
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

        #hamzah_logo {
            background: transparent url("images/hamzah_logo.png") top center no-repeat;
            width: 107px;
            height: 156px;
            position: absolute;
            margin-right: 0px;
            margin-top: 0px;
            margin-left: auto;
            left: 0;
            right: 30px;
            top: 30px;
            z-index: 4;
            box-shadow: -3px 3px 5px rgba(0, 0, 0, 0.5);
        }

        .headingBig {
            white-space: nowrap;
            font-weight: bold;
            font-size: 35px;
            color: #B38934;
            text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);
        }

        .heading {
            white-space: nowrap;
            font-weight: bold;
            font-size: 25px;
            color: #B38934;
            /*text-shadow: 1px 1px 2px rgba(0, 0, 0, .8);*/
        }

        .side_column {
            position: relative;
            background: transparent url("images/thin_side_frame.png") top center no-repeat;
            width: 597px;
            height: 700px;
            top: 200px;
        }

        #dome_pillar {
            /*position: relative;*/
            background: transparent url("images/center_dome_pillar.png") top center no-repeat;
            background-size: 614px 895px;
            width: 614px;
            height: 895px;
            position: relative;
            top: 20px;
            z-index: 2;
            /*left: -10px;*/
        }

        .descriptionText {
            margin-top: 5px;
            margin-left: 75px;
            margin-right: 75px;
            position: relative;
            font-size: 20px;;
        }

        .prayerLight {
            width: 16px;
            height: 16px;
        }

        .prayer_table {
            text-align: left;
            border: 1px solid gray;
        }

        .prayer_table th {
            border: 1px solid #cba234;
            white-space: nowrap;
            padding: 5px;
            /*font-weight: normal;*/
            font-size: 25px;
            color: #B38934;
        }

        .prayer_table td {
            border: 1px solid #cba234;
            padding: 5px;
            text-align: center;
            font-size: 25px;
        }

        .prayer_table td.small_time {
            font-size: 16px;
        }

        @media screen and (max-width: 1599px) {
            body {
                background-color: #063961;
            }

            #dome_pillar {
                top: 30px;
                position: relative;
            }

            #prayer_time_container {
                top: 30px;
                position: relative;
            }

            #hadith_weather_container {
                top: 30px;
                position: relative;
            }
        }
    </style>
</head>
<body>

<?php include 'analog_clock.php'; ?>

<div id="hamzah_logo"></div>

<div class="container-fluid">
    <div class="row">
        <div class="col-lg-4">
            <div id="prayer_time_container" class="side_column center-block">
                <div style="top: 75px; position: relative;">

                    <?php include 'hijri_date.php'; ?>

                    <div id="prayer_time_heading" class="headingBig" style="text-align: center;">
                    </div>

                    <div style="top: 40px; position: relative">
                        <table class="prayer_table center">
                            <tr>
                                <th></th>
                                <th>Athan</th>
                                <th>Iqama</th>
                                <th>Next Change</th>
                            </tr>
                            <tr>
                                <th>
                                    <img id="light_fajr" src="images/prayer_off.png" class="prayerLight"/>
                                    Fajr
                                </th>
                                <td id="cell_fajr_athan"></td>
                                <td id="cell_fajr_iqama"></td>
                                <td id="cell_fajr_next_change" class="small_time"></td>
                            </tr>
                            <tr>
                                <th>
                                    Shurooq
                                </th>
                                <td id="cell_shurooq" colspan="3"></td>
                            </tr>
                            <tr>
                                <th>
                                    <img id="light_thuhr" src="images/prayer_off.png" class="prayerLight"/>
                                    Thuhr
                                </th>
                                <td id="cell_thuhr_athan"></td>
                                <td id="cell_thuhr_iqama"></td>
                                <td id="cell_thuhr_next_change" class="small_time"></td>
                            </tr>
                            <tr>
                                <th>
                                    <img id="light_asr" src="images/prayer_off.png" class="prayerLight"/>
                                    Asr
                                </th>
                                <td id="cell_asr_athan"></td>
                                <td id="cell_asr_iqama"></td>
                                <td id="cell_asr_next_change" class="small_time"></td>
                            </tr>
                            <tr>
                                <th>
                                    <img id="light_maghrib" src="images/prayer_off.png" class="prayerLight"/>
                                    Maghrib
                                </th>
                                <td id="cell_maghrib_athan"></td>
                                <td id="cell_maghrib_iqama"></td>
                                <td id="cell_maghrib_next_change" class="small_time"></td>
                            </tr>
                            <tr>
                                <th>
                                    <img id="light_isha" src="images/prayer_off.png" class="prayerLight"/>
                                    Isha
                                </th>
                                <td id="cell_isha_athan"></td>
                                <td id="cell_isha_iqama"></td>
                                <td id="cell_isha_next_change" class="small_time"></td>
                            </tr>
                            <tr>
                                <th>
                                    Jum'ah
                                </th>
                                <td colspan="3">
                                    <?php printConfig("jumah_prayer"); ?>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div id="dome_pillar" class="center-block">
                <div class="headingBig" style="text-align: center; top: 150px; position: relative;">
                    Masjid Expenses
                </div>
                <div style="top: 190px; position: relative">
                    <?php include 'funds_progress_thermometer.php'; ?>
                </div>
            </div>
        </div>
        <div class="col-lg-4">
            <div id="hadith_weather_container" class="side_column center-block">
                <div style="top: 200px; position: relative;">
                    <?php
                    if ($result = $db->query("SELECT * FROM hadith_of_the_day where id=mod((SELECT DATEDIFF(now(),'2015-01-01')), (select count(*) from hadith_of_the_day))")) {
                        if ($count = $result->num_rows) {
                            $todayHadith = $result->fetch_object();
                        }
                    }

                    if (isset($todayHadith)) {
                        ?>
                        <div class="heading" style="text-align: center">
                            Hadith Of the day
                        </div>
                        <blockquote class="descriptionText">
                            <?= $todayHadith->hadith_text ?>
                            <footer><?= $todayHadith->source_reference ?></footer>
                        </blockquote>

                        <?php
                    }
                    ?>

                    <div>
                        <div class="center" style="width: 300px;">
                            <iframe style="display: block;"
                                    src="http://cdnres.willyweather.com/widget/loadView.html?id=23381" width="300"
                                    height="228" frameborder="0" scrolling="no"></iframe>
                            <a style="height: 20px;display: block;position: relative;margin: -20px 0 0 0;text-indent: -9999em;z-index: 1"
                               href="http://www.willyweather.com/ga/fulton-county/milton.html">Milton GA forecast</a>
                        </div>
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