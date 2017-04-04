<style>
    div#d_clock_container {
        width: 174px;
        height: 86px;
        background: url("images/dclock_images/clock_background.png") no-repeat;
        margin-top: 30px;
        left:30px;
        margin-left:auto;
        margin-right:auto;
        z-index: 5;
        position: absolute;
    }
    div#d_clock {
        height: 30px;
        width: 165px;
        /*
        background-color: red;
        */
        overflow: hidden;
        position: relative;
        top: 52px;
        left: 4px;
    }

    #dClockDot, #dClockColon, #dClockAmPm {
        height: 30px;
        width: 11px;
    }
    #hour10, #hour01, #minute10, #minute01 , #second10, #second01  {
        height: 30px;
        width: 22px;
    }
    .slide_a, .slide_b {
        width: 22px;
        height: 30px;
        position: relative;
        top: 0;
    }
    #dClockDot, #dClockColon, #hour10, #hour01, #minute10, #minute01 , #second10, #second01, #dClockAmPm  {
        float: left;
    }
    #dClockDot {
        background: url("images/dclock_images/dot.png");
    }
    #dClockColon {
        background: url("images/dclock_images/colon.png");
    }
    #dClockAmPm {
        background: url("images/dclock_images/am.png");
    }
</style>
<script>

    var slidePixels = "-30px"; // height of the image.
    var flipNumberAnimationDuration = 200;
    var clockRunning = false;
    var lastHour12 = -1;
    var lastMinute = -1;
    var lastSecond = -1;
    var todayDate = null;
    var dClockAmPm = null;
    var dClockColon = null;

    function startDClock() {
        if (clockRunning) {
            return;
        }
        clockRunning = true;
        dClockAmPm = document.getElementById("dClockAmPm");
        dClockColon = document.getElementById("dClockColon");
        runDClock()
    }

    function stopDClock() {
        clockRunning = false;
    }

    function runDClock() {
        if (clockRunning) {
            setTimeout(runDClock, 1000);
            calculateAndSetTime();
        }
    }

    function calculateAndSetTime() {
        todayDate = new Date();
        var currentHour24 = todayDate.getHours();
        var currentMinute = todayDate.getMinutes();
        var currentSecond = todayDate.getSeconds();

        var currentHour12 = 0;
        if (currentHour24 == 0){
            currentHour12 = 12;
        } else if (currentHour24 > 12) {
            currentHour12 = currentHour24 - 12;
        } else {
            currentHour12 = currentHour24;
        }

        if (lastHour12 != currentHour12) {
            var lastHour10 = get10(lastHour12);
            var currentHour10 = get10(currentHour12);
            if (lastHour10 != currentHour10) {
                flipNumber("hour10", lastHour10, currentHour10);
            }
            flipNumber("hour01", get01(lastHour12), get01(currentHour12));

            if (currentHour24 > 11) {
                dClockAmPm.style.backgroundImage = "url(images/dclock_images/pm.png)";
            } else {
                dClockAmPm.style.backgroundImage = "url(images/dclock_images/am.png)";
            }

            lastHour12 = currentHour12;
        }
        if (lastMinute != currentMinute) {

            var lastMinute10 = get10(lastMinute);
            var currentMinute10 = get10(currentMinute);
            if (lastMinute10 != currentMinute10) {
                flipNumber("minute10", lastMinute10, currentMinute10);
            }
            flipNumber("minute01", get01(lastMinute), get01(currentMinute));

            lastMinute = currentMinute;
        }

        if (lastSecond != currentSecond) {
            var lastSecond10 = get10(lastSecond);
            var currentSecond10 = get10(currentSecond);
            if (lastSecond10 != currentSecond10) {
                flipNumber("second10", lastSecond10, currentSecond10);
            }
            flipNumber("second01", get01(lastSecond), get01(currentSecond));
            /*
             if (currentSecond % 2 == 0) {
             dClockColon.style.backgroundImage = "url(images/dclock_images/colon.png)";
             } else {
             dClockColon.style.backgroundImage = "url(images/dclock_images/blank_full.png)";
             }
             */
            lastSecond = currentSecond;
        }
    }

    function flipNumber(section, fromNumber, toNumber) {
        var fromNumberValid = fromNumber;
        if (fromNumberValid < 0 || fromNumberValid > 9) {
            fromNumberValid = 0;
        }

        var toNumberValid = toNumber;
        if (toNumberValid < 0 || toNumberValid > 9) {
            toNumberValid = 0;
        }

        var slideA = document.querySelector("#" + section + " div.slide_a");
        var slideB = document.querySelector("#" + section + " div.slide_b");
        slideA.style.backgroundImage = "url(images/dclock_images/" + fromNumberValid + ".png)";
        slideB.style.backgroundImage = "url(images/dclock_images/" + toNumberValid + ".png)";
        slideA.style.transition = "top " + flipNumberAnimationDuration + "ms ease-out 0s";
        slideB.style.transition = "top " + flipNumberAnimationDuration + "ms ease-out 0s";
        slideA.style.top = slidePixels;
        slideB.style.top = slidePixels;

        function reset() {
            slideA.style.transition = "";
            slideB.style.transition = "";
            slideA.style.backgroundImage = "url(images/dclock_images/" + toNumberValid + ".png)";
            slideB.style.backgroundImage = "url(images/dclock_images/" + fromNumberValid + ".png)";
            slideA.style.top = "0px";
            slideB.style.top = "0px";
        }

        setTimeout(reset, flipNumberAnimationDuration);
    }

    function get10(number) {
        return Math.floor(number / 10);
    }
    function get01(number) {
        return Math.floor(number % 10);
    }

    window.addEventListener("load", startDClock);
</script>
<div id="d_clock_container">
    <div id="d_clock">

        <div id="hour10">
            <div class="slide_a"></div>
            <div class="slide_b"></div>
        </div>
        <div id="hour01">
            <div class="slide_a"></div>
            <div class="slide_b"></div>
        </div>
        <div id="dClockColon"></div>
        <div id="minute10">
            <div class="slide_a"></div>
            <div class="slide_b"></div>
        </div>
        <div id="minute01">
            <div class="slide_a"></div>
            <div class="slide_b"></div>
        </div>
        <div id="dClockDot"></div>
        <div id="second10">
            <div class="slide_a"></div>
            <div class="slide_b"></div>
        </div>
        <div id="second01">
            <div class="slide_a"></div>
            <div class="slide_b"></div>
        </div>
        <div id="dClockAmPm"></div>
    </div>
</div>