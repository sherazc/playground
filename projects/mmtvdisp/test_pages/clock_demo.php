<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="../scripts/libs/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="../scripts/libs/jquery/jquery-1.11.2.min.js"></script>
    <script src="../scripts/libs/bootstrap-3.3.2/js/bootstrap.min.js"></script>

    <style type="text/css">
        #clock {
            position: relative;
            width: 300px;
            height: 300px;
            margin: 0px auto 0 auto;
            background: url(../images/clock_dial.png);
            list-style: none;
        }

        #sec, #min, #hour {
            position: absolute;
            width: 15px;
            height: 300px;
            top: 0px;
            left: 142px;
        }

        #sec {
            background: url(../images/clock_seconds_hand.png);
            z-index: 3;
        }

        #min {
            background: url(../images/clock_minutes_hand.png);
            z-index: 2;
        }

        #hour {
            background: url(../images/clock_hours_hand.png);
            z-index: 1;
        }
    </style>

    <script type="text/javascript">

        $(document).ready(function() {

            setInterval( function() {
                var seconds = new Date().getSeconds();
                var sdegree = seconds * 6;
                var srotate = "rotate(" + sdegree + "deg)";

                $("#sec").css({"-moz-transform" : srotate, "-webkit-transform" : srotate, "transform" : srotate});

            }, 1000 );


            setInterval( function() {
                var hours = new Date().getHours();
                var mins = new Date().getMinutes();
                var hdegree = hours * 30 + (mins / 2);
                var hrotate = "rotate(" + hdegree + "deg)";

                $("#hour").css({"-moz-transform" : hrotate, "-webkit-transform" : hrotate , "transform" : hrotate});

            }, 1000 );


            setInterval( function() {
                var mins = new Date().getMinutes();
                var mdegree = mins * 6;
                var mrotate = "rotate(" + mdegree + "deg)";

                $("#min").css({"-moz-transform" : mrotate, "-webkit-transform" : mrotate, "transform" : mrotate});

            }, 1000 );

        });

    </script>
    <style>
    </style>
</head>
<body>

<ul id="clock">
    <li id="sec"></li>
    <li id="hour"></li>
    <li id="min"></li>
</ul>
</body>
</html>

