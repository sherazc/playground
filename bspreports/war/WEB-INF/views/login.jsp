<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<table class="table4" width="270px">
	<tr>
		<td class="table4tl"/>
		<td class="table4tm">
		Sign In
		</td>
		<td class="table4tr"/>
	</tr>
	<tr>
		<td class="table4ml"/>
		<td>
<form id="loginForm" name="loginForm" action="j_spring_security_check" method="post">
<c:if test="${not empty param.authfailed}">
    <span id="infomessage" class="errormessage" >
    Login failed due to: <c:out value="${SPRING_SECURITY_LAST_EXCEPTION.message}"/>.
    </span>
</c:if>
<table class="formtable">
  <tr align="left">
    <th><label for="name"><b>Name</b></label></th>
    <td><input id="usernameField" type="text" name="j_username" value="<c:out value="${SPRING_SECURITY_LAST_USERNAME}"/>"/></td>
  </tr>
  <tr align="left">
    <th><label for="password"><b>Password</b></label></th>
    <td><input id="passwordField" type="password" name="j_password" /></td>
  </tr>
  <tr>
  <td colspan="2" align="left"><input type="submit" value="Login"/></td>
  </tr>
</table>
<input type="hidden" name="action" value="login"/>
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
<script type="text/javascript">
<!--
document.loginForm.j_username.focus();
//-->
</script>