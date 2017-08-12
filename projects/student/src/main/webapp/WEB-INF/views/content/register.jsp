<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>


<s:url value="/register/save" var="registerSave" />

<form:form name="studentForm" commandName="studentCommand" action="${registerSave}" method="POST">
<form:hidden path="id" />
<table>
	<tr>
	<td align="left">
		<h4>
			<c:choose>
				<c:when test="${empty studentData.id}">
					Register
				</c:when>
				<c:otherwise>
					Update Registration
				</c:otherwise>
			</c:choose>
		</h4>
	</td>
	</tr>
	<tr>
	<td align="left">
<table style="width: 500px;">
	<tr>
		<th align="right" width="30%" valign="top" class="nowrap">First Name:</th>
		<td valign="top" align="left">
			<form:input path="firstName" />
			<form:errors path="firstName" cssClass="errormessage" element="div" />
		</td>
	</tr>
	<tr>
		<th align="right" valign="top" class="nowrap">Last Name:</th>
		<td valign="top" align="left">
			<form:input path="lastName" />
			<form:errors path="lastName" cssClass="errormessage" element="div" />
		</td>
	</tr>
	<tr>
		<th align="right" valign="top" class="nowrap">Guardian First Name:</th>
		<td valign="top" align="left">
			<form:input path="guardianFirstName" />
			<form:errors path="guardianFirstName" cssClass="errormessage" element="div" />
		</td>
	</tr>
	<tr>
		<th align="right" valign="top" class="nowrap">Guardian Last Name:</th>
		<td valign="top" align="left">
			<form:input path="guardianLastName" />
			<form:errors path="guardianLastName" cssClass="errormessage" element="div" />
		</td>
	</tr>
	<tr>
		<th align="right" valign="top" class="nowrap">Registration Date:</th>
		<td valign="top" align="left">
			<form:input path="registrationDate" />
			<form:errors path="registrationDate" cssClass="errormessage" element="div" />
		</td>
	</tr>
	<tr>
		<th align="right" valign="top" class="nowrap">Phone Number:</th>
		<td valign="top" align="left">
			<form:input path="formatedPhoneNumber" id="studentPhoneNumber"/>
			<form:errors path="phoneNumber" cssClass="errormessage" element="div" />
<script type="text/javascript">
function f_a(v_id) {
    return document.getElementById(v_id);
}
f_a('studentPhoneNumber').maxLength = 14;
f_a('studentPhoneNumber').onkeyup = function (v_e) {
    v_e = v_e || window.event;
    if (v_e.keyCode >= 65 && v_e.keyCode <= 90) {
        this.value = this.value.substr(0, this.value.length - 1);
        return false;
    } else if (v_e.keyCode >= 37 && v_e.keyCode <= 40) {
        return true;
    }
    var v_value = (this.value.replace(/[^\d]/g, ''));
    if (v_value.length > 3 && v_value.length < 8) {
        this.value = (v_value.substring(0, 3) + "-" + v_value.substring(3, 7));
    } else if (v_value.length > 7 && v_value.length < 100) {
        this.value = ("(" + v_value.substring(0, 3) + ") " + v_value.substring(3, 6) + "-" + v_value.substring(6, 10));
    };
}

</script>

		</td>
	</tr>
	<tr>
		<th align="right"valign="top" class="nowrap">Original Fee:</th>
		<td valign="top" align="left">
<!-- 			onkeypress='return event.charCode >= 48 && event.charCode <= 57' -->
			<form:input path="fee" maxlength="3" />
			<form:errors path="fee" cssClass="errormessage" element="div" />
		</td>
	</tr>
	<tr>
		<td align="right" valign="top" class="nowrap">
			<br/>&nbsp;
			
			<c:choose>
				<c:when test="${empty studentData.id}">
					<a class="bluebglink" href="javascript:studentForm.submit();">
						Save
					</a>
				</c:when>
				<c:otherwise>
					<a class="bluebglink" href="javascript:studentForm.submit();">
						Update
					</a>
				</c:otherwise>
			</c:choose>
		</td>
		<td valign="top" align="left" class="nowrap">
			&nbsp;<br/>
			<c:if test="${not empty studentData.id}">
				<a class="bluebglink" href="${contextPath}/register/delete?id=${studentData.id}">
					Delete
				</a>
			</c:if>
		</td>
	</tr>
</table>
	</td>
	</tr>
</table>
<c:if test="${not empty studentData.studentFeePaids}">
<br/>&nbsp;
<jsp:include page="/resources/css/grid-css.jsp" />
<table style="width: 300px;" class="altrowstable" id="alternatecolor">
<tr>
	<th width="50%">Fee Month</th>
	<th width="50%">Amount Paid</th>
</tr>

<c:forEach items="${studentData.studentFeePaids}" var="item">
<tr>
	<td align="center">
		<fmt:formatDate pattern="MMMM, yyyy" value="${item.feeDate}" />		
	</td>
	<td align="center">${item.feePaidAmount}</td>
</tr>
</c:forEach>
</table>
</c:if>
<br/>&nbsp;


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

$("#registrationDate").monthpicker(options);

$( document ).ready(function() {
	initRegistrationDate();
});

function initRegistrationDate() {
	var searchDate = document.getElementById("registrationDate");
	<c:choose> 
		<c:when test="${empty studentCommand.registrationDate}">
			var date=new Date();
			var yy = date.getYear();
			var year = (yy < 1000) ? yy + 1900 : yy;
			var monthString =  months[date.getMonth()];
			searchDate.value =  monthString + ", " + year;
		</c:when>
		<c:otherwise>
			searchDate.value = '${studentCommand.registrationDate}';  
		</c:otherwise>
	</c:choose>
}
</script>


</form:form>
