<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<%
    request.setAttribute("contextPath", request.getContextPath());
%>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title><sitemesh:write property="title"/></title>
</head>
<body>
<h3>
    Header
</h3>

<a href="${contextPath}/home">Home</a>

<security:authorize access="isAnonymous()">
    | <a href="${contextPath}/login">Login</a>
    | <a href="${contextPath}/register">Register</a>
</security:authorize>
<security:authorize access="isAuthenticated()">
    | Hi
    <security:authentication property="principal.firstName"/>
    <security:authentication property="principal.lastName"/>
    | <a href="/update-profile">Update Profile</a>
    | <a href="<s:url value="/j_spring_security_logout"/>">Logout</a>
</security:authorize>

<security:authorize access="isAuthenticated()">
    <security:authorize access="hasAnyRole('ROLE_USER', 'ROLE_ADMIN')">
        | <a href="${contextPath}/user">User</a>
    </security:authorize>

    <security:authorize access="hasRole('ROLE_ADMIN')">
        | <a href="${contextPath}/admin">Admin</a>
    </security:authorize>

</security:authorize>

<hr/>
<c:if test="${not empty main_error_message}">
    <p style="color: firebrick;"><c:out value="${main_error_message}"/></p>
</c:if>
<c:if test="${not empty main_warn_message}">
    <p style="color: coral;"><c:out value="${main_warn_message}"/></p>
</c:if>
<c:if test="${not empty main_info_message}">
    <p style="color: yellowgreen;"><c:out value="${main_info_message}"/></p>
</c:if>
<sitemesh:write property="div.sm_main_content"/>
<hr/>
<h3>
    Footer
</h3>
<%
    request.setAttribute("debug", request.getParameter("debug"));
%>
<c:if test="${debug}">
    <jsp:include page="/resources/debug.jsp"/>
</c:if>

</body>
</html>