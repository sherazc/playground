<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Preview Resume</title>
</head>
<body>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Preview Resume</TH></TR>
</TABLE>
<p>

<h:form>
	Use RGB instead of color names:
	<h:selectBooleanCheckbox valueChangeListener="#{resumeBean.changeColorMode}"
	onclick="submit()"
	immediate="true"/>
	<br>
	Foreground color:
	<h:selectOneMenu value="#{resumeBean.fgColor}"
		disabled="#{!resumeBean.colorSupported}">
		<f:selectItems value="#{resumeBean.availableColors}"/>
	</h:selectOneMenu>
	<br>
	Background color:
	<h:selectOneMenu value="#{resumeBean.bgColor }"
		disabled="#{!resumeBean.colorSupported}">
		<f:selectItems  value="#{resumeBean.availableColors}"/>
	</h:selectOneMenu>

	<br>
	
	<h:commandButton 
		value="#{resumeBean.colorsSupportedLabel}"
		actionListener="#{resumeBean.toggleColorSupport}"
		immediate="true"/>
	
	<BR><HR WIDTH="25%"><BR>
	Name:
	<h:inputText value="#{resumeBean.name }" />
	<br>
	Job Title:
	<h:inputText value="#{resumeBean.jobTitle}" />
	<p>
	<h:commandButton value="Show Preview" action="#{resumeBean.showPreview}"/>
</h:form>

</CENTER>
</body>
</html>
</f:view>