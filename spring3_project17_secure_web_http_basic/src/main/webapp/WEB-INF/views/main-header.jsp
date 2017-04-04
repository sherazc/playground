<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>

<table>
	<tr>
		<td align="center">
			<a href="<s:url value="/"/>">Home</a> 
			<s:url value="/customerdetail" var="customerRegister">
				<s:param name="register" />
			</s:url>
			<a href="<s:url value="/j_spring_security_logout"/>">Logout</a>
		</td>
	</tr>
</table>