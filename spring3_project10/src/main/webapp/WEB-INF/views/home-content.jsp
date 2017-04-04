<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ page session="false" %>
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
	<br/>
	<s:url value="/customerdetail/edit" var="customerDetailUrl">
		<s:param name="customerId" value="${customer.id}"/>
	</s:url>
	<a href="${customerDetailUrl}">Customer Detail</a>
	<hr> 
</c:forEach>
