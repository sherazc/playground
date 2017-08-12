<%--

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%
    request.setAttribute("contextPath", request.getContextPath());
%>
--%>
<script src="http://quran-rotd.rhcloud.com/resources/lib/jquery/jquery-1.11.2.min.js"></script>
<script>
    $.ajax({
        url: "http://quran-rotd.rhcloud.com/reminder"
    }).done(function (reminders) {
        if (reminders != null && reminders != "" && reminders.length > 0) {
            updateReminders(reminders[0]);
        }
    });

    function updateReminders(reminder) {
        for (i=0; i< reminder.ayas.length; i++) {
            var aya = reminder.ayas[i].lineString;
            var translation = reminder.translations[i].lineString;
            var suraNumber = reminder.ayas[i].suraNumber;
            var ayaNumber = reminder.ayas[i].ayaNumber;

            $("#reminder_table").append(
                    "<tr><td class=\'ayaNumber\' rowspan=\'2\'>"
                    + ayaNumber
                    + "</td><td class=\'arabicText\'>"
                    + aya
                    + "</td></tr><tr><td class=\'translationText\'>"
                    + translation
                    + "</td></tr>");
        }
    }
</script>
<table id="reminder_table" border="1">

</table>