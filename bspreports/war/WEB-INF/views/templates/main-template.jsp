<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<html>
<head>
<link href="${application.contextPath}/resources/css/maincss.jsp" rel="stylesheet" type="text/css" />
<script language="JavaScript" type="text/javascript" src="${application.contextPath}/resources/script/jquery-1.7.2.js"></script>
<title>BSP Reports</title>
</head>

<body>
	<table width="100%">
		<tr>
		<td bgcolor="#131e2f" align="center">
			<tiles:insertAttribute name="header"/>
		</td>
		</tr>
		<tr>
		<td align="center">
			<tiles:insertAttribute name="topbar"/>
		</td>
		</tr>
		<tr>
		<td align="center">
<!-- Content start		 -->
		<table class="pagewidth">
			<tr>
			<td class="clb"/>
			<td align="left">
				<table style="margin: 20;">
				<tr>
				<td>
				<tiles:insertAttribute name="content"/>
				</td>
				</tr>
				</table>
			</td>
			<td class="crb"/>
			</tr>
		</table>
<!-- Content end -->
		</td>
		</tr>
		<tr>
		<td align="center">
			<tiles:insertAttribute name="footer"/>
		</td>
		</tr>
	</table>
</body>