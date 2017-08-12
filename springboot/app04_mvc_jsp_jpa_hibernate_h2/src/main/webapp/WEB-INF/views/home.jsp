<%@taglib prefix="template" tagdir="/WEB-INF/tags/template" %>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<template:template_main title="Sheraz Home Page" active_view="home">
    <jsp:body>
        <h3>Items</h3>
        <ol>
            <c:forEach items="${items}" var="item">
                <li>${item}</li>
            </c:forEach>
        </ol>
        <hr/>
        <h3>Addresses</h3>
        <ol>
            <c:forEach items="${addresses}" var="address">
                <li>${address}</li>
            </c:forEach>
        </ol>
        <hr/>
        <h3>Customers</h3>
        <ol>
            <c:forEach items="${customers}" var="customer">
                <li>${customer}</li>
            </c:forEach>
        </ol>
        <hr/>
        <h3>Customer Orders</h3>
        <ol>
            <c:forEach items="${customerOrders}" var="customerOrder">
                <li>${customerOrder}</li>
            </c:forEach>
        </ol>
        <hr/>
    </jsp:body>
</template:template_main>