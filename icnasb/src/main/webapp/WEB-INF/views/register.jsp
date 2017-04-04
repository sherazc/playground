<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <title>Register User</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
</head>
<body>

<div id="sm_main_middle">

    <%--Register user panel--%>
    <div class="panel panel-default">
        <div class="panel-heading">
            <h3 class="panel-title">Register User</h3>
        </div>
        <div class="panel-body">
            <form:form action="/register-submit" cssclass="form-horizontal" commandName="userCommand" method="post">
                <form:hidden path="id" />
                <div class="form-group">
                    <form:label path="firstName" cssClass="control-label col-sm-2">First Name:</form:label>
                    <div class="col-sm-10">
                        <%--<input type="text" class="form-control" id="user_email" placeholder="Enter email.">--%>
                        <form:input path="firstName" cssClass="form-control"/>
                    </div>
                </div>

                <div class="form-group">
                    <form:label path="lastName" cssClass="control-label col-sm-2">Last Name:</form:label>
                    <div class="col-sm-10">
                            <%--<input type="text" class="form-control" id="user_email" placeholder="Enter email.">--%>
                        <form:input path="lastName" cssClass="form-control"/>
                    </div>
                </div>

                <div class="form-group">
                    <form:label path="username" cssClass="control-label col-sm-2">User ID:</form:label>
                    <div class="col-sm-10">
                            <%--<input type="text" class="form-control" id="user_email" placeholder="Enter email.">--%>
                        <form:input path="username" cssClass="form-control"/>
                    </div>
                </div>

                <div class="form-group">
                    <form:label path="password" cssClass="control-label col-sm-2">Password:</form:label>
                    <div class="col-sm-10">
                            <%--<input type="text" class="form-control" id="user_email" placeholder="Enter email.">--%>
                        <form:input path="password" cssClass="form-control"/>
                    </div>
                </div>

                <div class="form-group">
                    <form:label path="email" cssClass="control-label col-sm-2">Email:</form:label>
                    <div class="col-sm-10">
                            
                        <form:input path="email" cssClass="form-control"/>
                    </div>
                </div>

                <div class="form-group">
                    <form:label path="roleCodes" cssClass="control-label col-sm-2">Role:</form:label>
                    <div class="col-sm-10">
                            
                            <form:checkboxes path="roleCodes" items="${allRoles}"/>
                    </div>
                </div>

                <div class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                        <br/>
                        <button type="submit" class="btn btn-default">Submit</button>
                    </div>
                </div>
            </form:form>

        </div>
    </div>
    <%--Register User Pannel--%>

</div>


</div>
</body>
</html>
