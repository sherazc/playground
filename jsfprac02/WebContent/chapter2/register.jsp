<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">New Account Registration</TH></TR>
</TABLE>
<P>
	<h:form>
		email address: <h:inputText/>
		<BR>
		password: <h:inputSecret/>
		<BR>
		<h:commandButton value="Sign in" action="register" />
		
	</h:form>
<BR><BR><BR>
<P>
Taken from 
<A HREF="http://www.coreservlets.com/JSF-Tutorial/">
the coreservlets.com JSF 1.x and JSF 2.0 tutorials</A>.
</CENTER></BODY></HTML>
</f:view>