<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>Success</TITLE>
<LINK REL="STYLESHEET"
      HREF="./css/styles.css"
      TYPE="text/css">
</HEAD>
<BODY>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Success</TH></TR>
</TABLE>
<H2>You have registered successfully.</H2>
<UL>
  <LI>Email Address: 
      <h:outputText value="#{registrationBean.email}"/>
  <LI>Password: 
      <h:outputText value="#{registrationBean.password}"/>
</UL>
<p>
<a href="register.jsp">sign up again</a> ${registrationBean.password}
</CENTER></BODY></HTML>
</f:view>