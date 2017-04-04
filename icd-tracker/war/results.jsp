<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<c:if test="${not empty results}">
<ul>
	<c:forEach items="${results}" var="result">
	  <li>${result}</li>
	</c:forEach>
</ul>
</c:if>