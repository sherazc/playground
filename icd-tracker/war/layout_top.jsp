<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<link href="styles/main.css" rel="stylesheet" type="text/css" />
<title>ICD Tracker</title>
</head>

<body>
	<table cellpadding="0" cellspacing="0" width="100%" border="0">
		<tr>
			<td class="darkbar">
				<table cellpadding="0" cellspacing="0" class="pagewidth" align="center">
					<tr>
						<td class="mainTitle">
						ICD-Tracker
						</td>
					</tr>
				</table>
			</td>
		</tr>
		<tr>
		<td>
		<table cellpadding="0" cellspacing="0" width="100%" class="tbbg" border="0">
			<tr>
			<td class="tbbg1"></td>
			<td class="tbbg2"></td>
			<td class="tbbg3" valign="top">
				<div style="margin-top: 20; margin-left: 30px;">
					<a href="${application.contextPath}/" style="color: white;">HOME</a>
<!--					<img alt="" src="images/tbseparator.jpg">-->
					&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
					<a href="${application.contextPath}/activities" style="color: white;">ACTIVITIES</a>
					<c:if test="${not empty trackerUser }">
						&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
						
						<a style="color: white;" href="${application.contextPath}/home?action=logout">Hello ${trackerUser.name} SIGN OUT</a>
						
						
					</c:if>
				</div>
			</td>
			<td class="tbbg4"></td>
			<td class="tbbg1"></td>
			</tr>
		</table>
		
		
		<table cellpadding="0" cellspacing="0" width="100%" border="0" width="100%">
			<tr>
			<td align="center">
				<table class="pagewidth" border=0>
				<tr><td height="30"></td></tr>
				<tr>
				<td>