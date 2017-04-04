<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/layout_top.jsp" />
<jsp:include page="/results.jsp" />


<table class="table4" cellpadding="0" cellspacing="0" width="500">
	<tr>
		<td class="table4tl"/>
		<td class="table4tm">
		Events
		
		</td>
		<td class="table4tr"/>
	</tr>
	<tr>
		<td class="table4ml"/>
		<td>


<c:choose>
	<c:when test="${not empty allActivities}">
	&nbsp;
		<table border='1' class="datagrid" cellpadding="10" cellspacing="0">
		  <tr>
		    <th>Name</th>
			<th>Date Created</th>
			<th>Description</th>
			<th>Delete</th>
		  </tr>
			<c:forEach items="${allActivities}" var="activity">
			  <tr>
			    <td>
			    	<a href="${application.contextPath}/attendee?action=showattendee&activityid=${activity.encodedId}">
			    	${activity.name}
			    	</a>
			    </td>
			    <td>
			    <fmt:formatDate value="${activity.activityDate}"  pattern="MM-dd-yyyy hh:mm aaa"/>
			    
			    
			    </td>
			    <td>${activity.description}</td>
			    <td><a href="${application.contextPath}/activities?action=delete&id=${activity.encodedId}">X</a></td>
			  </tr>
			</c:forEach>
		</table>
	</c:when>
	<c:otherwise>
	&nbsp;
	<br/>
		No Events Created
	</c:otherwise>
</c:choose>
<p/>
<a href="${application.contextPath}/activities?action=add">Add Event</a>


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