<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>New Account Registration</TITLE>
<LINK REL="STYLESHEET"
      HREF="./css/styles.css"
      TYPE="text/css">
</HEAD>
<BODY>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">New Account Registration</TH></TR>
</TABLE>
<P>
<h:form>
  Email address: <h:inputText/><BR>
  Password: <h:inputSecret/><BR>
  <h:commandButton value="Sign Me Up!" action="register"/>
</h:form>
<BR><BR><BR>
<P>
Taken from 
<A HREF="http://www.coreservlets.com/JSF-Tutorial/">
the coreservlets.com JSF 1.x and JSF 2.0 tutorials</A>.
</CENTER></BODY></HTML>
</f:view>