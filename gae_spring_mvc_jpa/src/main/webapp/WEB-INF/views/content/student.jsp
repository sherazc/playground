<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>

<s:url value="/student/addstudent" var="adduseraction" />
<s:url value="/student" var="studentLink" />
<a href="${studentLink}">Refresh Students</a>
<p/>
<form:form commandName="studentCommand" method="get" action="${studentLink}/addstudent">
	<form:errors path="*" cssStyle="color:red;" element="div" />
	User Id 
	<form:input path="name" />
	<form:errors path="name" cssStyle="color:red;" />
	<br />
	<input type="submit" />
	<c:if test="${not empty allStudents}">
	<table border="1">
		<tr><th>Id</th><th>Name</th><th>Delete</th></tr>
		<c:forEach items="${allStudents}" var="student">
			<tr><td>${student.id}</td><td>${student.name}</td><td><a href="${studentLink}/delete?studentId=${student.id}">X</a></td></tr>
		</c:forEach>
	</table>
	</c:if>
</form:form>