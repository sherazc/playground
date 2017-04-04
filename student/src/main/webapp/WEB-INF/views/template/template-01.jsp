<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>
<%
	request.setAttribute("contextPath", request.getContextPath());
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<link rel="stylesheet" href="http://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<script src="${contextPath}/resources/script/jquery-1.10.2.min.js"></script>
	<script src="${contextPath}/resources/script/jquery-1.10.3.ui.min.js"></script>
	<script src="${contextPath}/resources/css/jquery.mtz.monthpicker.js"></script>
	<jsp:include page="/resources/css/main_css.jsp" />
	<jsp:include page="/resources/script/main_js.jsp" />
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<title>
		<tiles:getAsString name="page-title"/>
	</title>

<!-- style="min-width: 600px; max-width: 1000px" -->
<style type="text/css">
body {
	background-image: url("${contextPath}/resources/images/background.png");
	background-size: 100% 100%;
	background-repeat: no-repeat;
}

.white-background {
	background-image: url("${contextPath}/resources/images/white_background.png");
	background-size: 100% 100%;
	background-repeat: repeat;
}
</style>
</head>
<body>
	<table style="min-width: 700px; max-width: 1200px; margin-left:auto; margin-right: auto;" border="0">
		<tr>
			<td style="width: 10px"></td>
			<td><br/>
				<table id="main_page_box" style="width: 100%;" align="center">
					<tr>
						<td class="white-background">
							<tiles:insertAttribute name="header" />
<table border="0" width="100%">
	<tr>
		<td width="10%">&nbsp;</td>
		<td width="80%" align="center">
			<br/> 
			<tiles:insertAttribute name="content" />
			<br/>
		</td>
		<td width="10%">&nbsp;</td>
	</tr>
</table>
							<tiles:insertAttribute name="footer"/>
							<br/>
						</td>
					</tr>
				</table>
			</td>
			<td style="width: 10px"></td>
		</tr>
	</table>
	<br/>
</body>
</html>