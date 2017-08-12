<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>Illegal Email Address</TITLE>
<LINK REL="STYLESHEET"
      HREF="./css/styles.css"
      TYPE="text/css">
</HEAD>
<BODY>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Illegal Email Address</TH></TR>
</TABLE>
<P>
The address
"<h:outputText value="#{registrationBean.email}"/>"
is not of the form username@hostname (e.g.,
<h:outputText value="#{registrationBean.suggestion.email}"/>).
<P>
Please <A HREF="register.faces">try again</A>.
</CENTER></BODY></HTML>
</f:view>