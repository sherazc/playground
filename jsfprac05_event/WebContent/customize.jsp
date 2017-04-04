<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>Preview Resume</TITLE>
<LINK REL="STYLESHEET"
      HREF="./css/styles.css"
      TYPE="text/css">
</HEAD>
<BODY>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Preview Resume</TH></TR>
</TABLE>
<P>

<h:form>
	Use RGB instead of color names:
	<h:selectBooleanCheckbox 
		valueChangeListener="#{resumeBean.changeColorMode}"
		onclick="submit()"
		immediate="true"/>
	<br>
	Foreground color:
	<h:selectOneMenu 
		value="#{resumeBean.fgColor }"
		disabled="#{!resumeBean.colorSupported}">
		<f:selectItems value="#{resumeBean.availableColors }"/>
	</h:selectOneMenu>
	<br>
	Background color:
	<h:selectOneMenu 
		value="#{resumeBean.bgColor }"
		disabled="#{!resumeBean.colorSupported}">
		<f:selectItems value="#{resumeBean.availableColors }"/>
	</h:selectOneMenu>
	<br>
	changed
	<h:commandButton 
		value="#{resumeBean.colorSupportLabel }"
		actionListener="#{resumeBean.toggleColorSupport }"
		immediate="false"/>
	<BR><HR WIDTH="25%"><BR>
	Name: 
	<h:inputText value="#{resumeBean.name }"/>
	<br>
	Job Title:
	<h:inputText value="#{resumeBean.jobTitle}"/>
	<p>
	<h:commandButton value="Show Preview"
		action="#{resumeBean.showPreview }"/>
</h:form>


<BR><BR><BR>
<P>
Taken from 
<A HREF="http://www.coreservlets.com/JSF-Tutorial/">
the coreservlets.com JSF 1.x and JSF 2.0 tutorials</A>.
</CENTER></BODY></HTML>
</f:view>