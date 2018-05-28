<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
</head>
<body>
<h1> 
	All Customers
</h1>
<c:forEach items="${customers}" var="customer">
	<p/> id=${customer.id} 
	<br/>
	name=${customer.name} 
	<br/>
	email=${customer.email} 
	<br/>
	salary=${customer.salary}
	<hr> 
</c:forEach>
</body>
</html>
