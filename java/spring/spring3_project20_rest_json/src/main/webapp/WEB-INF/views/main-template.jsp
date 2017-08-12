<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Title</title>
</head>
<body>

	<table height="100%" border='1'>
		<tr height="20%">
			<td>
				<tiles:insertAttribute name="header"/>
			</td>
		</tr>
		<tr height="80%">
			<td>
				<tiles:insertAttribute name="content"/>
			</td>
		</tr>
		<tr height="20%">
			<td>
				<tiles:insertAttribute name="footer"/>
			</td>
		</tr>
	</table>
</body>
</html>