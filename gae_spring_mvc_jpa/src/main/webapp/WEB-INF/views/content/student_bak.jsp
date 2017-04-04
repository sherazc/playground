<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<s:url value="/student/addstudent" var="adduseraction"/>

<form:form commandName="studentCommand" method="get" action="adduseraction">
	<form:errors path="*" cssStyle="color:red;" element="div" />
	User Id 
	<form:input path="name" />
	<form:errors path="userId" cssStyle="color:red;"/>
	<br />
	
	<input type="submit" />
</form:form>