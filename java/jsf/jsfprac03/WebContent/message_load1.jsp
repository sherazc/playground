<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<f:loadBundle var="messages" basename="messages"/>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>${messages.title}</title>
</head>
<body>

	<h1>${messages.title}</h1>

	<h:outputText value="#{messages.firstNamePrompt}"/>
	<br>
	<h:outputText value="#{messages.lastNamePrompt}"/>
	<br>
	<h:outputFormat value="#{messages.enterPrompt1}">
		<f:param value="#{messages.emailAddressPrompt}" />
		<f:param value="#{messages.lastNamePrompt}" />
	</h:outputFormat>
	
</body>
</html>
</f:view>