<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
    <title>Login page</title>
</head>
<body>
<div id="sm_main_content">
    <style>
        .errorblock {
            color: #ff0000;
            background-color: #ffEEEE;
            border: 3px solid #ff0000;
            padding: 8px;
            margin: 16px;
        }
    </style>

    <c:if test="${not empty error}">
        <div class="errorblock">
            Your login attempt was not successful, try again.<br /> Caused :
            ${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}
        </div>
    </c:if>

    <form name='loginform' action="${contextPath}/j_spring_security_check" method='POST'>
        <table>
            <tr>
                <td>User:</td>
                <td><input type='text' name='j_username' value=''></td>
            </tr>
            <tr>
                <td>Password:</td>
                <td><input type='password' name='j_password' /></td>
            </tr>
            <tr>
                <td colspan='2'><input name="submit" type="submit" value="submit" /></td>
            </tr>
            <tr>
                <td colspan='2'><input name="reset" type="reset" /></td>
            </tr>
        </table>

    </form>
</div>
</body>
</html>
