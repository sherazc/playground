<%@taglib prefix="components" tagdir="/WEB-INF/tags/template/components" %>
<%@attribute name="title" required="true" rtexprvalue="true" %>
<%@attribute name="active_view" required="false" %>
<html>
<head>
    <%
        response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        response.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        response.setHeader("Expires", "0"); // Proxies.

    %>
    <title>${title}</title>
    <link href="${pageContext.servletContext.contextPath}/resources/css/main.css" rel="stylesheet">
</head>
<body>
<components:header active_view="${active_view}"/>
<div id="content">
    <jsp:doBody/>
</div>
<components:footer/>
<script type="application/javascript" src="${pageContext.servletContext.contextPath}/resources/js/main.js"></script>
</body>
</html>
