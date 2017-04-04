<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Health Plan Signup</title>
</head>
<body>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Health Plan Signup</TH></TR>
</TABLE>
<P>

<h:form>
	First name: <h:inputText/>
	<br/>
	Last name: <h:inputText/>
	<br/>
	SSN: <h:inputText/>
	<br/>
	<h:inputTextarea/>
	<br/>
	<h:commandButton
		value="Sign Me Up!" 
		action="#{helthPlanController.signup}"/>
</h:form>
</CENTER>
</body>
</html>
</f:view>