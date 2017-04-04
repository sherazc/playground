<!DOCTYPE html>
<html lang="en">
<?php
//error_reporting(0);
require_once "db_connect.php";
require_once "utilities.php";
?>
<head>
    <meta charset="UTF-8">
    <!--    Page Refreash ever 30 mins. This is used just as backup to javascript 15 mins refreash-->
    <meta http-equiv="refresh" content="1800">
    <title>Hamzah Display</title>
    <link rel="stylesheet" href="scripts/libs/bootstrap/css/bootstrap.min.css">
    <script src="scripts/libs/jquery/jquery-1.11.2.min.js"></script>
    <script src="scripts/libs/jquery/jquery-ui.min.js"></script>
    <script src="scripts/libs/bootstrap/js/bootstrap.min.js"></script>
    <script type="text/javascript" src="scripts/js/main.js"></script>

    <style>
        body {
            /*background: black;*/
            background: transparent url("images/background_night.png") top left no-repeat;
            background-size: cover;
        }

        #masjid_front {
            background: transparent url("images/masjid_front.png") top left no-repeat;
            background-size: 200px 223px;
            width: 200px;
            height: 223px;
            position: absolute;
            margin-top: 30px;
            margin-left: 30px;
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
            font-size: 50px;
            /*font-weight: bold;*/
            text-shadow: 2px 2px 5px rgba(0, 0, 0, .8);
            color: rgb(179, 136, 51);
            /*color: black;*/
        }

        #prayer_div_table {
            margin-top: 100px;
            font-size: 30px;
        }

        #prayer_table {
            text-align: left;
            border: 1px solid gray;
        }

        #prayer_table th {
            border: 1px solid gray;
            white-space: nowrap;
            padding: 10px;
            /*font-weight: normal;*/
        }

        #prayer_table td {
            border: 1px solid gray;
            padding: 10px;
            text-align: center;
        }

        #prayer_table td.small_time {
            font-size: 20px;
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

        .center {
            left: 0;
            right: 0;
            margin-left: auto;
            margin-right: auto;
            width: auto;
            height: auto;
            position: relative;

        }
        @media screen and (max-width: 1599px) {
            body {
                background-color: #063961;
            }

            #prayer_timetable_frame {
                margin-top: 300px;
            }
        }

    </style>
    <script type="text/javascript">

        // Page Refresh every 15 minutes
        setTimeout(function(){
            location = location.pathname;
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
                $(lightId).attr("src","images/prayer_on.png");
            } else {
                $(lightId).attr("src","images/prayer_off.png");
            }

        }
    </script>
</head>
<body>
<div id="masjid_front"></div>
<?php include 'analog_clock.php'; ?>

<div id="hamzah_logo"></div>

<div class="container-fluid">
    <div class="row">
        <div class="col-lg-6">
            <div id="prayer_timetable_frame" class="prayer_time">
                <?php include 'hijri_date.php'; ?>
                <div id="prayer_time_heading" class="prayer_time_heading" style="top: 80px; position: relative;">
                </div>
                <div id="prayer_div_table" class="center" style="width: 700px;">
                    <table id="prayer_table" class="center">
                        <tr>
                            <th></th>
                            <th>Athan</th>
                            <th>Iqama</th>
                            <th>Next Change</th>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_fajr" src="images/prayer_off.png"/>
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
                                <img id="light_thuhr" src="images/prayer_off.png"/>
                                Thuhr
                            </th>
                            <td id="cell_thuhr_athan"></td>
                            <td id="cell_thuhr_iqama"></td>
                            <td id="cell_thuhr_next_change" class="small_time"></td>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_asr" src="images/prayer_off.png"/>
                                Asr
                            </th>
                            <td id="cell_asr_athan"></td>
                            <td id="cell_asr_iqama"></td>
                            <td id="cell_asr_next_change" class="small_time"></td>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_maghrib" src="images/prayer_off.png"/>
                                Maghrib
                            </th>
                            <td id="cell_maghrib_athan"></td>
                            <td id="cell_maghrib_iqama"></td>
                            <td id="cell_maghrib_next_change" class="small_time"></td>
                        </tr>
                        <tr>
                            <th>
                                <img id="light_isha" src="images/prayer_off.png"/>
                                Isha
                            </th>
                            <td id="cell_isha_athan"></td>
                            <td id="cell_isha_iqama"></td>
                            <td id="cell_isha_next_change" class="small_time"></td>
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
                width: 300px;
                height: 228px;
                margin: 10px;
            }
            .weather_right {
                float: right;
                width: 300px;
                height: 228px;
                margin: 10px;
            }

        </style>
        <div class="col-lg-6">

            <div id="weather_widget" class="prayer_time">

                <div id="announcement_label" class="prayer_time_heading" style="top: 130px; position: relative;">
                    Weather
                </div>

                <div class="weather_row">
                    <div class="weather_left">
                        <div style="width: 300px;"><iframe style="display: block;" src="http://cdnres.willyweather.com/widget/loadView.html?id=23381" width="300" height="228" frameborder="0" scrolling="no"></iframe><a style="height: 20px;display: block;position: relative;margin: -20px 0 0 0;text-indent: -9999em;z-index: 1" href="http://www.willyweather.com/ga/fulton-county/milton.html">Milton GA forecast</a></div>
                    </div>
                    <div class="weather_right">
                        <div style="width: 300px;"><iframe style="display: block;" src="http://cdnres.willyweather.com/widget/loadView.html?id=23382" width="300" height="228" frameborder="0" scrolling="no"></iframe><a style="display: block;margin: -20px 0 0 0;position: relative;text-indent: -9999em;z-index: 1;height: 20px" href="http://rainfall.willyweather.com/ga/fulton-county/milton.html">milton GA rainfall forecast</a></div>
                    </div>
                </div>
                <div class="weather_row">
                    <div class="weather_left">
                        <div style="width: 300px;"><iframe style="display: block;" src="http://cdnres.willyweather.com/widget/loadView.html?id=23384" width="300" height="228" frameborder="0" scrolling="no"></iframe><a style="text-indent: -9999em;z-index: 1;display: block;margin: -20px 0 0 0;position: relative;height: 20px" href="http://sunrisesunset.willyweather.com/ga/fulton-county/milton.html">willyweather</a></div>
                    </div>
                    <div class="weather_right">
                        <div style="width: 300px;"><iframe style="display: block;" src="http://cdnres.willyweather.com/widget/loadView.html?id=23385" width="300" height="228" frameborder="0" scrolling="no"></iframe><a style="height: 20px;z-index: 1;margin: -20px 0 0 0;position: relative;display: block;text-indent: -9999em" href="http://moonphases.willyweather.com/ga/fulton-county/milton.html">milton forecast</a></div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!--
    <div class="row">
        <div class="col-lg-12">
            <div id="weather_style" class="center" style="margin-top: 40px;">
                <div style="width: 850px;" class="center">

                  <iframe style="display: block;" src="http://cdnres.willyweather.com/widget/loadView.html?id=23176"
                            width="850" height="92" frameborder="0" scrolling="no"></iframe>
                    <a style="width: 20px;height: 92px;text-indent: -9999em;margin: -92px 0 0 0;float: right;position: relative;z-index: 1"
                       href="http://www.willyweather.com/ga/fulton-county/milton.html">weather forecast</a></div>
            </div>
        </div>
    </div>
    -->


</div>
<?php include 'footer.php'; ?>
</body>
</html>
<?php
mysqli_close($db);