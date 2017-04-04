<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!-- ############################## Start Header ############################## -->
<!-- start logo section -->
<table border="0" width="100%">
	<tr>
		<td width="5%">&nbsp;</td>
		<td width="90%">
<table border="0" width="100%">
	<tr>
		<td width="10%">
			&nbsp;<br/>&nbsp;<br/>
			<a href="${contextPath}/">
			<img border="0" alt="Student Registration" src="${contextPath}/resources/images/title.png">
			</a>
		</td>
		<td width="80%" rowspan="2" align="right" valign="bottom">
		
			
		</td>
		<td width="10%" rowspan="2">
			
			<a href="${contextPath}/">
			<img border="0" alt="ICNA Logo" src="${contextPath}/resources/images/logo_small.png" style="height: 125px; width: 120px; border: 0px;"/>
			</a>
		</td>
	</tr>
	<tr>
		<td valign="bottom">
			
		</td>
	</tr>
</table>
		</td>
		<td width="5%">&nbsp;</td>
	</tr>
</table>
<!-- end logo section -->

<!-- start menu bar -->
<table style="width: 100%;">
	<tr>
	<td align="center">
		<table style="width: 98%;">
		<tr>
		<td style="background-color: #437bcf; height: 35px;">
			<table>
			<tr style="color: #FFFFFF;" >
			<td align="left">
			&nbsp;&nbsp;
				<a href="${contextPath}/home"  style="color: #FFFFFF;">
					Home
				</a>
				<sec:authorize access="isAuthenticated()">
				|
				<a href="${contextPath}/reports" style="color: #FFFFFF;">
					Reports 
				</a>
				|
				<a href="${contextPath}/register" style="color: #FFFFFF;">
					Register
				</a>
				</sec:authorize>
			</td>
			<td align="right">
			<sec:authorize access="hasRole('ROLE_ADMIN')">
				<a href="${contextPath }/admin" style="color: #ffffff;">
					<img alt="Add Admin" src="${contextPath }/resources/images/admin_add.png" style="height: 16px; width: 25px; border: 0px;"/>
					Create Account
				</a> |
			</sec:authorize>
			<sec:authorize access="isAuthenticated()">
				<a href="${contextPath }/admin?profileof=${SPRING_SECURITY_CONTEXT.authentication.principal.username}" style="color: #ffffff;">
					<img alt="Edit Admin" src="${contextPath }/resources/images/edit_white.png" style="height: 16px; width: 16px; border: 0px;"/>
					Edit Account
				</a> | 
				<a href="<s:url value="/j_spring_security_logout"/>" style="color: #ffffff;">
					<img alt="Logout" src="${contextPath }/resources/images/logout_white.png" style="height: 16px; width: 16px; border: 0px;"/>
					Logout
				</a>
			</sec:authorize>
			&nbsp;&nbsp;
			</td>
			</tr>
			</table>
		</td>
		</tr>
		</table>
	</td>
	</tr>
</table>
<!-- end menu bar -->
<!-- ############################## End Header ############################## -->