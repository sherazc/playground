<%@taglib prefix="template" tagdir="/WEB-INF/tags/template" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<template:template_main title="Sheraz Home Page">
    <jsp:body>
        <h1>Home Page</h1>
        <h3>Persons changed</h3>
        <ol>
            <c:forEach items="${persons}" var="person">
            <li>${person}</li>
            </c:forEach>
        </ol>
    </jsp:body>
</template:template_main>