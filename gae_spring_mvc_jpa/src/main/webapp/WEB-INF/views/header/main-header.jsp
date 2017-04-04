<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>

<table>
	<tr>
		<td align="center">
			<a href="<s:url value="/"/>">Home</a>
			<a href="<s:url value="/j_spring_security_logout"/>">Log me out</a>
			<%--
			<s:url value="/customerdetail" var="customerRegister">
				<s:param name="register" />
			</s:url>
			<a href="${customerRegister}">Register</a>
			
			 --%>
		</td>
	</tr>
</table>