<%@ taglib prefix="s" uri="http://www.springframework.org/tags/form" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Register page</title>
</head>
<body>
<div id="sm_main_content">
    <h4>Register User</h4>
<c:choose>
    <c:when test="${updateProfile}">
        <c:url var="profileActionUrl" value="/update-profile-submit"/>
    </c:when>
    <c:otherwise>
        <c:url var="profileActionUrl" value="/register-submit"/>
    </c:otherwise>
</c:choose>

    <s:form action="${profileActionUrl}" commandName="registerUser" method="post">
        <strong><s:label path="username">User Name:</s:label></strong>

        <c:choose>
            <c:when test="${updateProfile}">
                ${registerUser.username}
            </c:when>
            <c:otherwise>
                <s:input path="username"/>
            </c:otherwise>
        </c:choose>


        <br/>

        <strong><s:label path="password">Password:</s:label></strong>
        <s:input path="password"/>
        <br/>

        <strong><s:label path="firstName">First Name:</s:label></strong>
        <s:input path="firstName"/>
        <br/>

        <strong><s:label path="lastName">Last Name:</s:label></strong>
        <s:input path="lastName"/>
        <br/>

        <strong><s:label path="lastName">Roles:</s:label></strong>
        <s:checkboxes path="roleCodes" items="${allRoles}" />

        <br/><br/>

        <button type="submit">Submit</button>
    </s:form>
</div>
</body>
</html>
