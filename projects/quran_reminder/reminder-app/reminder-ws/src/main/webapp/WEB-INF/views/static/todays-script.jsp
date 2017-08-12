<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>

</head>
<body>
<h3>Testing Script</h3>
<%--http://alexmarandon.com/articles/web_widget_jquery/--%>

<!-- qrotd-widget -->
<div id="qrotd-widget-container"></div>
<script>
    var serviceURL = "${serverUrl}/today";
</script>
<script src="${serverUrl}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
<script src="${serverUrl}/resources/js/qrotd-widget-1.0.js" type="text/javascript"></script>
<!--/ qrotd-widget -->

<h3>Page Content</h3>
</body>
</html>
