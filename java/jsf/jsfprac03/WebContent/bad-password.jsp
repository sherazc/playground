<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>Illegal Password</TITLE>
<LINK REL="STYLESHEET"
      HREF="./css/styles.css"
      TYPE="text/css">
</HEAD>
<BODY>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Illegal Password</TH></TR>
</TABLE>
<P>
The password
"<h:outputText value="#{registrationBean.password}"/>"
is too short; it must contain at least six characters.
Here is a possible password:
<h:outputText value="#{registrationBean.suggestion.password}"/>.
<P>
Please <A HREF="register.faces">try again</A>.
</CENTER></BODY></HTML>
</f:view>