<%@ taglib uri="http://java.sun.com/jsf/core" prefix="f" %>
<%@ taglib uri="http://java.sun.com/jsf/html" prefix="h" %>
<f:view>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>
Resume for <h:outputText value="#{resumeBean.name}"/>
</TITLE></HEAD>
<BODY TEXT="<h:outputText value="#{resumeBean.fgColor}"/>"
      BGCOLOR="<h:outputText value="#{resumeBean.bgColor}"/>">
<H1 ALIGN="CENTER">
<h:outputText value="#{resumeBean.name}"/><BR>
<SMALL><h:outputText value="#{resumeBean.jobTitle}"/>
</SMALL></H1>
Experienced <h:outputText value="#{resumeBean.jobTitle}"/>
seeks challenging position doing something.
<H2>Employment History</H2>
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
<H2>Education</H2>
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
<H2>Publications and Awards</H2>
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
Blah, blah, blah, blah. Yadda, yadda, yadda, yadda.
</BODY></HTML>
</f:view>