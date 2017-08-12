<%@taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<s:url value="/user/edit/current-user-confirmation" var="editUserContactAction"/>

<form:form action="${editUserContactAction}" commandName="editUserContact" method="POST">
	<form:errors path="*" cssStyle="color:red;" element="div" />
	<form:hidden path="id"/>
	<form:hidden path="userId"/>
	User Id: ${editUserContact.userId }
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