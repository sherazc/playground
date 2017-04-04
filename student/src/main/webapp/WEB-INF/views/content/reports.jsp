<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<table>
<tr>
<td align="left">
	<h4>
	Reports
	</h4>
</td>
<td align="left">
	Month <input id="reportDate" name="reportDate" value="${dateString}" onchange="javascritp:changeReports();"/>
</td>
</tr>
<tr>
<td align="left" colspan="2">

<table style="width: 500px;">
<tr>
	<td>
<jsp:include page="/resources/css/grid-css.jsp" />

<table style="width: 500px;" class="altrowstable" id="alternatecolor">
<tr>
    <th width="50%">Report Item</th>
	<th width="50%">Report Value</th>
</tr>
<c:forEach items="${reportList}" var="reportItem">
<tr>
    <td>${reportItem.field}</td>
	<td align="center">${reportItem.value}</td>
</tr>
</c:forEach>
</table>
	</td>
</tr>
</table>
</td>
</tr>
</table>

<script type="text/javascript">
var months=new Array();
months[0]="Jan";
months[1]="Feb";
months[2]="Mar";
months[3]="Apr";
months[4]="May";
months[5]="Jun";
months[6]="Jul";
months[7]="Aug";
months[8]="Sep";
months[9]="Oct";
months[10]="Nov";
months[11]="Dec";

var options = {
pattern: 'mmmm, yyyy', // Default is 'mm/yyyy' and separator char is not mandatory
startYear: 2008,
finalYear: 2020
};

$("#reportDate").monthpicker(options);

$( document ).ready(function() {
	initRegistrationDate();
});

function initRegistrationDate() {
	var searchDate = document.getElementById("reportDate");
	<c:choose> 
		<c:when test="${empty dateString}">
			var date=new Date();
			var yy = date.getYear();
			var year = (yy < 1000) ? yy + 1900 : yy;
			var monthString =  months[date.getMonth()];
			searchDate.value =  monthString + ", " + year;
		</c:when>
		<c:otherwise>
			searchDate.value = '${dateString}';  
		</c:otherwise>
	</c:choose>
}

function changeReports() {
	var reportUrl = "${contextPath}/reports"
	var reportMonth = getSelectedMonth();
	var reportYear = getSelectedYear();
	reportUrl += "/";
	reportUrl += reportYear;
	reportUrl += "/";
	reportUrl += reportMonth;
	window.location.href = reportUrl;
}

function getSelectedMonth() {
	var searchDate = document.getElementById("reportDate");
	var monthString = searchDate.value.substring(0, 3); 
	//var month = months.indexOf(monthString);
	var month = jQuery.inArray(monthString, months);
	return month;
}

function getSelectedYear() {
	var searchDate = document.getElementById("reportDate");
	return searchDate.value.substring(5, 9);
}


</script>
