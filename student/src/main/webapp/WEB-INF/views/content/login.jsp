<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<style>
.errorblock {
	color: #ff0000;
	background-color: #ffEEEE;
	border: 1px solid #ff0000;
	padding: 5px;
	margin: 5px;
	font-size:small;
}
</style>
<table>
  <tr>
    <td align="left">
<table style="width: 250px; border:1px solid #437bcf;" >
  <tr>
    <td style="padding: 10px;">
<form name='f' action="<c:url value='j_spring_security_check' />" method='POST'>
	<table border="0" style="padding: 5px;">
		<c:if test="${not empty error}">
		<tr>
			<td colspan="2" class="errorblock">
				${sessionScope["SPRING_SECURITY_LAST_EXCEPTION"].message}
			</td>
		</tr>
		<tr>
			<td colspan="2" style="height: 10px;">
			</td>
		</tr>
		</c:if>
		<tr>
			<td>User:</td>
			<td><input type='text' name='j_username' value=''></td>
		</tr>
		<tr>
			<td>Password:</td>
			<td><input type='password' name='j_password' /></td>
		</tr>
		<tr>
			<td colspan='2'><input name="submit" type="submit" value="Sign in" /></td>
		</tr>
	</table>
</form>
	</td>
  </tr>
</table>
	</td>
  </tr>
</table>