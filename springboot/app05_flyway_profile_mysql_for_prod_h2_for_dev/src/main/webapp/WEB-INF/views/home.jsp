<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SB</title>
</head>
<body>
<h1>Persons</h1>
<ol>
    <c:forEach items="${persons}" var="person">
        <li>${person}</li>
    </c:forEach>
</ol>
</body>
</html>