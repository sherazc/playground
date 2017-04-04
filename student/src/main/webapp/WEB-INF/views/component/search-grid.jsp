<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!-- Start search grid -->
<%
request.setAttribute("contextPath", request.getContextPath());
%>
<s:url value="/fee/save" var="feeSaveAction"/>

<jsp:include page="/resources/css/grid-css.jsp" />

<form:form action="${feeSaveAction}" method="post" name="feeSaveForm">
	<input type="hidden" name="selectedPaidType" value="${selectedPaidType}"/>
	<input type="hidden" name="selectedYear" value="${selectedYear}"/>
	<input type="hidden" name="selectedMonth" value="${selectedMonth}"/>
	<input type="hidden" name="searchQuery" value="${searchQuery}"/>
	<input type="hidden" name="pageNumber" value="${pageNumber}"/>
	<input type="hidden" name="ajaxFlag" value="${ajaxFlag}"/>
	<input type="hidden" name="sortField" value="${sortField}"/>
	<input type="hidden" name="sortOrder" value="${sortOrder}"/>

<jsp:include page="/WEB-INF/views/component/search-grid-pagination.jsp" />



<script type="text/javascript">

function makeFieldEditable(inputId, containerId, initValue) {
	var inputObj = document.getElementById(inputId);
	var containerObj = document.getElementById(containerId);
	var saveLink1 = document.getElementById('saveFeeLink1');
	var saveLink2 = document.getElementById('saveFeeLink2');
	containerObj.style.backgroundColor = "#c3efda";
	inputObj.style.borderColor = "#3dd28a";
	inputObj.readOnly = false;
	inputObj.focus();
	if (inputObj.value == null || inputObj.value == "") {
		inputObj.value = initValue;
	}
	saveLink1.style.display="block";
	saveLink2.style.display="block";
}

</script>
<!-- Table goes in the document BODY -->
<table class="altrowstable" id="alternatecolor">
<tr>
	<th>
		<c:choose>
			<c:when test="${sortField eq 'firstName' and sortOrder eq 'asc'}">
				<c:set var="sortUrl" value="javascript:sort('firstName', 'desc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_up1.png"/>
			</c:when>
			<c:when test="${sortField eq 'firstName' and sortOrder eq 'desc'}">
				<c:set var="sortUrl" value="javascript:sort('firstName', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_down1.png"/>
			</c:when>
			<c:otherwise>
				<c:set var="sortUrl" value="javascript:sort('firstName', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/nosort.png"/>
			</c:otherwise>
		</c:choose>
		<a href="${sortUrl}" style="color: white;">
			First Name<br/>
			<img alt="" src="${contextPath}${sortIcon}" class="sorticon">
		</a>
	</th>
	<th>
		<c:choose>
			<c:when test="${sortField eq 'lastName' and sortOrder eq 'asc'}">
				<c:set var="sortUrl" value="javascript:sort('lastName', 'desc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_up1.png"/>
			</c:when>
			<c:when test="${sortField eq 'lastName' and sortOrder eq 'desc'}">
				<c:set var="sortUrl" value="javascript:sort('lastName', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_down1.png"/>
			</c:when>
			<c:otherwise>
				<c:set var="sortUrl" value="javascript:sort('lastName', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/nosort.png"/>
			</c:otherwise>
		</c:choose>
		<a href="${sortUrl}" style="color: white;">
			Last Name<br/>
			<img alt="" src="${contextPath}${sortIcon}" class="sorticon">
		</a>
	
	
	</th>
	<th>
		<c:choose>
			<c:when test="${sortField eq 'guardianFirstName' and sortOrder eq 'asc'}">
				<c:set var="sortUrl" value="javascript:sort('guardianFirstName', 'desc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_up1.png"/>
			</c:when>
			<c:when test="${sortField eq 'guardianFirstName' and sortOrder eq 'desc'}">
				<c:set var="sortUrl" value="javascript:sort('guardianFirstName', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_down1.png"/>
			</c:when>
			<c:otherwise>
				<c:set var="sortUrl" value="javascript:sort('guardianFirstName', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/nosort.png"/>
			</c:otherwise>
		</c:choose>
		<a href="${sortUrl}" style="color: white;">
			Guardian First Name<br/>
			<img alt="" src="${contextPath}${sortIcon}" class="sorticon">
		</a>
	</th>
	<th>
		<c:choose>
			<c:when test="${sortField eq 'guardianLastName' and sortOrder eq 'asc'}">
				<c:set var="sortUrl" value="javascript:sort('guardianLastName', 'desc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_up1.png"/>
			</c:when>
			<c:when test="${sortField eq 'guardianLastName' and sortOrder eq 'desc'}">
				<c:set var="sortUrl" value="javascript:sort('guardianLastName', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_down1.png"/>
			</c:when>
			<c:otherwise>
				<c:set var="sortUrl" value="javascript:sort('guardianLastName', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/nosort.png"/>
			</c:otherwise>
		</c:choose>
		<a href="${sortUrl}" style="color: white;">
			Guardian Last Name<br/>
			<img alt="" src="${contextPath}${sortIcon}" class="sorticon">
		</a>
	</th>
	<th>
		<c:choose>
			<c:when test="${sortField eq 'registrationDate' and sortOrder eq 'asc'}">
				<c:set var="sortUrl" value="javascript:sort('registrationDate', 'desc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_up1.png"/>
			</c:when>
			<c:when test="${sortField eq 'registrationDate' and sortOrder eq 'desc'}">
				<c:set var="sortUrl" value="javascript:sort('registrationDate', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/arrow_down1.png"/>
			</c:when>
			<c:otherwise>
				<c:set var="sortUrl" value="javascript:sort('registrationDate', 'asc')"/>
				<c:set var="sortIcon" value="/resources/images/sort/nosort.png"/>
			</c:otherwise>
		</c:choose>
		<a href="${sortUrl}" style="color: white;">
			Registration Date<br/>
			<img alt="" src="${contextPath}${sortIcon}" class="sorticon">
		</a>
	
		
	</th>
	<th>Phone</th>
	<th>Setup Fee</th>
	<th>Fee Paid</th>
</tr>

<c:forEach items="${searchList}" var="item">
<s:url var="studentDetailLink" value="/register?id=${item.id}" />

<tr>
	<td><a href="${studentDetailLink}">${item.firstName}</a></td>
	<td><a href="${studentDetailLink}">${item.lastName}</a></td>
	<td><a href="${studentDetailLink}">${item.guardianFirstName}</a></td>
	<td><a href="${studentDetailLink}">${item.guardianLastName}</a></td>
	<td><fmt:formatDate pattern="MMMM, yyyy" value="${item.registrationDate}" /></td>
	<td class="nowrap">${item.formatedPhoneNumber}</td>
	<td>${item.fee}</td>
	<c:choose>
		<c:when test="${empty item.selectedStudentFeePaid}">
			<c:set var="feePaidStyle" value="width: 50px; font-size:x-small;border-style: solid; border-width: 1px;border-color:#FF9966; background-color:#ffffff;"/>
		</c:when>
		<c:otherwise>
			<c:set var="feePaidStyle" value="width: 50px; font-size:x-small;border-style: solid; border-width: 1px;border-color:#437bcf; background-color:#ffffff;"/>
		</c:otherwise>
	</c:choose>
	<c:set var="inputFieldId" value="feeinput_${item.id}_${item.selectedStudentFeePaid.id}" />
	<c:set var="inputContainerId" value="feecontainer_${item.id}_${item.selectedStudentFeePaid.id}" />
	<td id="${inputContainerId}" class="nowrap" style="padding: 1px;" align="center" valign="middle">
<!-- 	onkeypress='return event.charCode >= 48 && event.charCode <= 57' -->
		<input name="${inputFieldId}" id="${inputFieldId}" readonly="readonly" maxlength="4" value="${item.selectedStudentFeePaid.feePaidAmount}" pattern="[0-9]"  type="text" style="${feePaidStyle}"/>
		<img onclick="makeFieldEditable('${inputFieldId}', '${inputContainerId}', '${item.fee}')" alt="edit" src="${contextPath}/resources/images/edit.png" width="14" height="14" border="0" style="cursor: pointer;"/>
	</td>
</tr>
</c:forEach>
</table>
<jsp:include page="/WEB-INF/views/component/search-grid-pagination.jsp" />
<!-- End search grid -->
</form:form>