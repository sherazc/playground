<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>Customize Background Color</TITLE>
<LINK REL="STYLESHEET"
      HREF="./css/styles.css"
      TYPE="text/css">
</HEAD>
<BODY>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Customize Background Color</TH></TR>
</TABLE>
<P>
Click on the background color that you would like to use.
<h:form>
	<h:commandButton image="images/GrayBar.gif"
		actionListener="#{colorBean.selectGrayLevel}"
		action="#{colorBean.showPreview }"/>
	<h:commandButton image="images/Car001.JPG"
		actionListener="#{colorBean.selectGrayLevel}"
		action="#{colorBean.showPreview }"/>
	
</h:form>

</CENTER></BODY></HTML>
</f:view>