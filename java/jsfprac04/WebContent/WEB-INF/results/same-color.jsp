<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>Color Error</TITLE>
<LINK REL="STYLESHEET"
      HREF="./css/styles.css"
      TYPE="text/css">
</HEAD>
<BODY>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Color Error</TH></TR>
</TABLE>
<P>
You chose
"<h:outputText value="#{resumeBean.fgColor}"/>"
as both the foreground and background color. 
<P>
You don't deserve to get a job, but I suppose 
we will let you <A HREF="customize.faces">try again</A>.
</CENTER></BODY></HTML>
</f:view>