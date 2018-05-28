<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<h3> 
    This is Home Page
</h3>
Home Page content
<s:url value="/static/test-static-view" var="staticView"/>
<s:url value="/json/sayhello?name=Sheraz" var="jsonView"/>
<ul>
	<li><a href="${staticView}">Static view</a></li>
	<li><a href="${jsonView}">JSON Hello World</a></li>
</ul>