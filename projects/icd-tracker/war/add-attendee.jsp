<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<jsp:include page="/layout_top.jsp" />
<jsp:include page="/results.jsp" />
<table class="table4" cellpadding="0" cellspacing="0" width="500px">
	<tr>
		<td class="table4tl"/>
		<td class="table4tm">
		Add Attendee
		</td>
		<td class="table4tr"/>
	</tr>
	<tr>
		<td class="table4ml"/>
		<td>

&nbsp;
<form action="${application.contextPath}/attendee" method="get">
<table border="0" align="center">
	<tr>
		<th><label for="fname"><b>First Name</b></label></th>
		<td><input id="fname" name="fname" type="text" value="${fname}"/></td>
	</tr>
	<tr>
		<th><label for="lname"><b>Last Name</b></label></th>
		<td><input id="lname" name="lname" type="text" value="${lname}"/></td>
	</tr>
	<tr>
		<th><label for="email"><b>Email</b></label></th>
		<td><input id="email" name="email" type="text" value="${email}"/></td>
	</tr>
	<tr>
		<th><label for="phone"><b>Phone</b></label></th>
		<td><input id="phone" name="phone" type="text" value="${phone}"/></td>
	</tr>
	<tr>
		<th><label for="profession"><b>Profession</b></label></th>
		<td><input id="profession" name="profession" type="text" value="${profession}"/></td>
	</tr>
	<tr>
		<th><label for="street"><b>Street</b></label></th>
		<td><input id="street" name="street" type="text" value="${street}"/></td>
	</tr>
	<tr>
		<th><label for="city"><b>City</b></label></th>
		<td><input id="city" name="city" type="text" value="${city}"/></td>
	</tr>
	<tr>
		<th><label for="state"><b>State</b></label></th>
		<td><input id="state" name="state" type="text" value="${state}"/></td>
	</tr>
	<tr>
		<th><label for="zip"><b>Postal Code</b></label></th>
		<td><input id="zip" name="zip" type="text" value="${zip}"/></td>
	</tr>
	<tr>
		<th valign="top"><label for="comments"><b>Comments</b></label></th>
		<td>
		<textarea rows="5" cols="30" id="comments" name="comments" value="${comments}"></textarea>
		</td>
	</tr>
	<tr align="left">
		<td colspan="2">
		&nbsp;
		<p/>
			<input type="submit" value="Add"/>
			&nbsp;&nbsp;
			| &nbsp;&nbsp; View activity 
			<a href="${application.contextPath}/attendee?action=showattendee&activityid=${activity.encodedId}">
	    		${activity.name}
	    	</a>
		</td>
	</tr>
</table>
<input type="hidden" name="activityid" value="${activity.encodedId}"/>
<input type="hidden" name="action" value="create-attendee"/>
</form>


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