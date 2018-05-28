<%@ page import="java.util.Enumeration" %>
<html>
<body>
<div id="sm_main_content">
<h1>Request</h1>
<%
    Enumeration<String> attributeNames = request.getAttributeNames();
    while (attributeNames.hasMoreElements()) {
        String attributeName = attributeNames.nextElement();
        out.println(attributeName + " = " + request.getAttribute(attributeName));
        out.println("<hr/>");
    }
%>

<h1>Session</h1>
<%
    attributeNames = session.getAttributeNames();
    while (attributeNames.hasMoreElements()) {
        String attributeName = attributeNames.nextElement();
        out.println(attributeName + " = " + request.getAttribute(attributeName));
        out.println("<hr/>");
    }
%>

<h1>Application</h1>
<%
    attributeNames = application.getAttributeNames();
    while (attributeNames.hasMoreElements()) {
        String attributeName = attributeNames.nextElement();
        out.println(attributeName + " = " + request.getAttribute(attributeName));
        out.println("<hr/>");
    }
%>
</div>
</body>
</html>
