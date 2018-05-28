<%@taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<s:url value="/user/registration-confirmation" var="registerAction"/>

<form:form action="${registerAction}" commandName="registerUserContact" method="POST">
	<form:errors path="*" cssStyle="color:red;" element="div" />
	User Id <form:input path="userId" />
	<form:errors path="userId" cssStyle="color:red;"/>
	<br />
	Password <form:input path="userPassword" />
	<form:errors path="userPassword" cssStyle="color:red;"/>
	<br />
	First Name <form:input path="firstName" />
	<form:errors path="firstName" cssStyle="color:red;"/>
	<br />
	Last Name <form:input path="lastName" />
	<form:errors path="lastName" cssStyle="color:red;"/>
	<br />
	<input type="submit" />
</form:form>