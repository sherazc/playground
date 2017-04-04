<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<table width="100%">
<tr>
<td class="tbbg1" align="center">
<table class="pagewidth">
<tr>
<td class="tbbg1">
</td>
<td class="tbbg2">
</td>
<td class="tbbg1" >
<table>
	<tr valign="top">
		<td>
			<div class="tbalign">
				<a href="<c:url value="/" />" style="font-size: 18; color: #ffffff; text-decoration: none;" >
					Home
				</a>
			</div>
		</td>
		<td class="tbdiv"/>
		<td>
			<div class="tbalign">
				<a href="#" style="font-size: 18; color: #ffffff; text-decoration: none;" >
					Reports
				</a>
			</div>
		</td>
		<td class="tbdiv"/>
		<td>
			<div class="tbalign">
				<a href="<c:url value="/field/show" />" style="font-size: 18; color: #ffffff; text-decoration: none;" >
					Item Fields
				</a>
			</div>
		</td>
		<td class="tbdiv"/>
		<td>
			<div class="tbalign">
				<c:if test="${SPRING_SECURITY_CONTEXT.authentication.authenticated}">
					<a href="<c:url value="j_spring_security_logout" />" style="font-size: 18; color: #ffffff; text-decoration: none;" >
						Hi ${SPRING_SECURITY_CONTEXT.authentication.name} Logout
					</a>
				</c:if>
			</div>
		</td>
	</tr>
</table>
</td>
<td class="tbbg3">
</td>
<td class="tbbg1">
</td>
</tr>
</table>
</td>
</tr>
</table>