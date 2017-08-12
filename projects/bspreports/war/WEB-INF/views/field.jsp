<%@ page language="java" contentType="text/html; charset=ISO-8859-1" pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>


<form:form method="GET" commandName="fieldCommand" action="/field/add">

<form:input path="field"/>

<input type="submit" value="Add"/>

</form:form>