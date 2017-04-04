<script src="scripts/libs/jquery/jquery-1.11.2.min.js"></script>
<script src="scripts/libs/jquery/jquery-ui.min.js"></script>
<style type="text/css">
    #clock {
        position: absolute;
        width: 160px;
        height: 160px;
        background: url(images/msuffah/clock_dial.png) no-repeat;
        background-size: 160px;
        list-style: none;
        left:30px;
        right:auto;
        margin-top: 30px;
        margin-left:auto;
        margin-right:auto;
        z-index: 5;
    }

    #sec, #min, #hour {
        position: absolute;
        width: 8px;
        height: 160px;
        top: 0px;
        /*devide clock size by 2.105263157894737 to get number below*/
        left: 76px;
    }

    #sec {
        background: url(images/clock_seconds_hand.png) no-repeat;
        background-size: 8px 160px;
        z-index: 30;
    }

    #min {
        background: url(images/clock_minutes_hand.png) no-repeat;
        background-size: 8px 160px;
        z-index: 20;
    }

    #hour {
        background: url(images/clock_hours_hand.png) no-repeat;
        background-size: 8px 160px;
        z-index: 10;
    }
</style>

<script type="text/javascript">
    $(document).ready(function () {
        setInterval(function () {
            var seconds = new Date().getSeconds();
            var sdegree = seconds * 6;
            var srotate = "rotate(" + sdegree + "deg)";
            $("#sec").css({"-moz-transform": srotate, "-webkit-transform": srotate, "transform": srotate});
        }, 1000);

        setInterval(function () {
            var hours = new Date().getHours();
            var mins = new Date().getMinutes();
            var hdegree = hours * 30 + (mins / 2);
            var hrotate = "rotate(" + hdegree + "deg)";
            $("#hour").css({"-moz-transform": hrotate, "-webkit-transform": hrotate, "transform": hrotate});
        }, 1000);

        setInterval(function () {
            var mins = new Date().getMinutes();
            var mdegree = mins * 6;
            var mrotate = "rotate(" + mdegree + "deg)";
            $("#min").css({"-moz-transform": mrotate, "-webkit-transform": mrotate, "transform": mrotate});
        }, 1000);

    });
</script>
<ul id="clock">
    <li id="sec"></li>
    <li id="hour"></li>
    <li id="min"></li>
</ul>