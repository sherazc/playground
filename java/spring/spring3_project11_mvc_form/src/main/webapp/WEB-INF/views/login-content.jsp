<%@taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<s:url value="/user/authenticate" var="loginAction"/>

<form:form commandName="loginFormCommand" action="${loginAction}" method="GET">
	<form:errors path="*" cssStyle="color:red;" element="div" />
	User Id <form:input path="userId" />
	<form:errors path="userId" cssStyle="color:red;"/>
	<br />
	Password <form:input path="password" />
	<form:errors path="password" cssStyle="color:red;"/>
	<br />
	<input type="submit" />
	
</form:form>