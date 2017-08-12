<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/layout_top.jsp" />
<jsp:include page="/results.jsp" />
<table class="table4" cellpadding="0" cellspacing="0" width="100%">
	<tr>
		<td class="table4tl"/>
		<td class="table4tm">
		Attendees
		</td>
		<td class="table4tr"/>
	</tr>
	<tr>
		<td class="table4ml"/>
		<td>
<c:choose>
	<c:when test="${not empty attendees}">
		&nbsp;
		<table border='1' class="datagrid" cellpadding="10" cellspacing="0" align="center">
		<tr>
			<th>Name</th>
			<th>Email</th>
			<th>Phone</th>
			<th>Profession</th>
			<th>Address</th>
			<th>Comments</th>
			<th>Date Created</th>
			<th>Delete</th>
		</tr>
		<c:forEach items="${attendees}" var="attendee">
			<tr>
				<td style="white-space:nowrap;">${attendee.fname} ${attendee.lname}</td>
				<td style="white-space:nowrap;">${attendee.email}</td>
				<td style="white-space:nowrap;">${attendee.phone}</td>
				<td style="white-space:nowrap;">${attendee.profession}</td>
				<td style="white-space:nowrap;">
					${attendee.street}
					<c:if test="${not empty attendee.city and not empty attendee.state and not empty attendee.zip}">
						<br/>
						${attendee.city} ${attendee.state} ${attendee.zip}
					</c:if>
				</td>
				<td>${attendee.comments}</td>
				<td style="white-space:nowrap;"><fmt:formatDate value="${attendee.dateCreate}"  pattern="MM-dd-yyyy hh:mm aaa"/></td>
				<td style="white-space:nowrap;">
<a href="${application.contextPath}/attendee?action=deleteattendee&attendeeid=${attendee.encodedId}&activityid=${activity.encodedId}">X</a>
				</td>
			</tr>
		</c:forEach>
		</table>
	</c:when>
	<c:otherwise>
		No attendees in this event
	</c:otherwise>
</c:choose>

<p/>
<a href="${application.contextPath}/attendee?action=addattendee&activityid=${activity.encodedId}">Add Attendee</a>


		</td>
		<td class="table4mr"/>
	</tr>
	<tr>
		<td class="table4bl"/>
		<td class="table4bm"/>
		<td class="table4br"/>
	</tr>
</table>
<jsp:include page="/layout_bottom.jsp" />