<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<table>
	<tr>
		<td align="center">
			<a href="<s:url value="/"/>">Home</a>

			<c:choose>
				<c:when test="${not empty currentUserContact}">
					Hi ${currentUserContact.firstName} ${currentUserContact.lastName}
					<a href="<s:url value="/user/edit/current-user"/>">Edit profile</a>
					<a href="<s:url value="/user/logout"/>">Logout</a>
				</c:when>
				<c:otherwise>
					<s:url value="/user/login" var="loginURL">
					<%-- <s:param name="login"/> --%>
					</s:url>
					<a href="${loginURL}">Login</a>
					<a href="<s:url value="/user/register"/>">Register</a>
				</c:otherwise>			
			</c:choose>
			
			
			
		</td>
	</tr>
</table>