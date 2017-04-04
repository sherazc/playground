<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<h3> 
    This is Home Page
</h3>
Home Page content

<br/>
<s:url value="/" var="cr"/>
<s:url value="/json/value1" var="value1"/>
<a href="${value1}">json/value1</a>
<br/>
<a href="${cr}/greeting?name=Sheraz">/greeting?name=Sheraz</a>
<br/>
<a href="${cr}/greeting">/greeting</a>