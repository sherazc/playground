<script type="text/javascript" src="scripts/libs/jquery.calendars.package-2.0.0/jquery.calendars.min.js"></script>
<script type="text/javascript"
        src="scripts/libs/jquery.calendars.package-2.0.0/jquery.calendars.plus.min.js"></script>
<script type="text/javascript"
        src="scripts/libs/jquery.calendars.package-2.0.0/jquery.calendars.islamic.min.js"></script>
<script type="text/javascript" src="scripts/js/main.js"></script>


<script type="text/javascript">
    function getTodayYearMonthDateAdjust(separator, days) {
        var today = new Date();
        today.setDate(new Date().getDate()+days);
        var year = today.getFullYear();
        return year + separator + getTodayMonthDateAdjust(separator, days);
    }

    function getTodayMonthDateAdjust(separator, days) {
        var today = new Date();

        today.setDate(new Date().getDate()+days);

        var month = today.getMonth() + 1;
        var date = today.getDate();

        if (month < 10) {
            month = "0" + month;
        }
        if (date < 10) {
            date = "0" + date;
        }
        return month + separator + date;
    }



    $(document).ready(function () {

        var calendar = $.calendars.instance();
        var formats = ['yyyy/mm/dd', 'mm/dd/yyyy', 'M d, yyyy', 'MM d, yyyy',
            'mm/dd/yy', 'dd/mm/yyyy', 'mm/dd/yyyy (\'w\'w)',
            '\'Day\' d \'of\' MM, YYYY', calendar.ATOM, calendar.COOKIE,
            calendar.FULL, calendar.ISO_8601, calendar.JULIAN,
            calendar.RFC_822, calendar.RFC_850, calendar.RFC_1036,
            calendar.RFC_1123, calendar.RFC_2822, calendar.RSS,
            calendar.TICKS, calendar.TIMESTAMP, calendar.W3C];

        try {
            var calendar = $.calendars.instance("gregorian");
            var date = calendar.parseDate(formats[0], getTodayYearMonthDateAdjust("/", 1));

            calendar = $.calendars.instance("islamic");

            date = calendar.fromJD(date.toJD());

            $("#prayer_time_heading").html(calendar.formatDate(formats[3], date)).append("<br/>").append($.datepicker.formatDate('MM d, yy', new Date()));
        }
        catch (e) {
            alert(e);
        }
    });
</script>