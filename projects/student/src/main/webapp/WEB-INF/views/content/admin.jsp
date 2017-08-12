<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<s:url value="/admin/save" var="createAdminAction" />
<form:form name="secureUserCommandForm" commandName="secureUserCommand" action="${createAdminAction}" method="GET">
<form:hidden path="userId" />
<form:hidden path="adminCodeVerified" />
<table>
	<tr>
	<td align="left">
		<h4>
			<c:choose>
				<c:when test="${empty secureUserCommand.userId}">
					Create Admin User
				</c:when>
				<c:otherwise>
					Update Admin User
				</c:otherwise>
			</c:choose>
		</h4>
	</td>
	</tr>
	<tr>
	<td align="left">
<c:if test="${not empty viewMessage}">
	${viewMessage}
</c:if>
<table style="width: 500px;">
	<tr>
		<th align="right" width="30%" valign="top" class="nowrap">User Name:</th>
		<td valign="top" align="left">
			<c:choose>
				<c:when test="${empty secureUserCommand.userId or fn:length(secureUserCommand.userName) < 4}">
					<form:input path="userName" />
				</c:when>
				<c:otherwise>
					<form:hidden path="userName" />
					${secureUserCommand.userName}
				</c:otherwise>
			</c:choose>
			<form:errors path="userName" cssClass="errormessage" element="div" />
		</td>
	</tr>
	<tr>
		<th align="right" valign="top" class="nowrap">Password:</th>
		<td valign="top" align="left">
			<form:input path="userPassword" />
			<form:errors path="userPassword" cssClass="errormessage" element="div" />
		</td>
	</tr>
	<sec:authorize access="hasRole('ROLE_ADMIN')" var="adminRoleExists"/>
	<c:if test="${adminRoleExists or secureUserCommand.adminCodeVerified}">
		<tr>
			<th align="right" valign="top" class="nowrap">User Roles:</th>
			<td valign="top" align="left">
				<form:checkboxes items="${secureUserCommand.defaultRoles}" path="securityRoles" element="div"/>
				<form:errors path="securityRoles" cssClass="errormessage" element="div" />
			</td>
		</tr>
	</c:if>
	<tr>
		<td align="right" valign="top" class="nowrap">
			<br/>&nbsp;

			<c:choose>
				<c:when test="${empty secureUserCommand.userId}">
					<a class="bluebglink" href="javascript:secureUserCommandForm.submit();">
						Save
					</a>
				</c:when>
				<c:otherwise>
					<a class="bluebglink" href="javascript:secureUserCommandForm.submit();">
						Update
					</a>
				</c:otherwise>
			</c:choose>
		</td>
		<td valign="top" align="left" class="nowrap">
			&nbsp;<br/>
			<c:if test="${not empty secureUserCommand.userId}">
				<a class="bluebglink" href="${contextPath}/admin/delete?id=${secureUserCommand.userId}">
					Delete
				</a>
			</c:if>
		</td>
	</tr>
</table>

<sec:authorize access="hasRole('ROLE_ADMIN')">
<br/>
<h4>
All Admin Users
</h4>
<jsp:include page="/resources/css/grid-css.jsp" />
<table style="width: 500px;" class="altrowstable" id="alternatecolor">
<tr>
    <th width="50%">User Name</th>
	<th width="50%">Roles</th>
	<th width="50%">Action</th>
</tr>
<c:forEach items="${allSecureUsers}" var="secureUsers">
<tr>
    <td align="center">
    	${secureUsers.userName}
    </td>
	<td align="center">
		<c:forEach items="${secureUsers.secureUserRoles}" var="secureUserRole">
			${secureUserRole.authority}
		</c:forEach>
	</td>
	<td align="center" style="white-space: nowrap;">
		<a href="${contextPath}/admin?profileof=${secureUsers.userName}">
    		Update
    	</a>
		<a href="${contextPath}/admin/delete?id=${secureUsers.id}">
    		Delete
    	</a>
	</td>
</tr>
</c:forEach>
</table>
</sec:authorize>
	</td>
	</tr>
</table>

</form:form>
