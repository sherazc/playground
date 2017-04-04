<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>Health Plan Signup</TITLE>
<LINK REL="STYLESHEET"
      HREF="./css/styles.css"
      TYPE="text/css">
</HEAD>
<BODY>
<CENTER>
<TABLE BORDER=5>
  <TR><TH CLASS="TITLE">Health Plan Signup</TH></TR>
</TABLE>
<P>
<h:form>
  First name: <h:inputText/><BR>
  Last name: <h:inputText/><BR>
  SSN: <h:inputText/><BR>
  Complete medical history since the day you were born:<BR>
  <h:inputTextarea/><BR>
  <h:commandButton 
    value="Sign Me Up!" 
    action="#{healthPlanController.signup}"/>
</h:form>
</CENTER></BODY></HTML>
</f:view>