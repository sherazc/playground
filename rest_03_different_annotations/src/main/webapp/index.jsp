<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jstl/core" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>JSP</title>
</head>
<body>
@Path
<br/>
<a href="rest/users">rest/users</a>
<br/>
<a href="rest/users/vip">rest/user/vip</a>
<br/>
<a href="rest/users/sheraz">rest/users/{name}=rest/users/sheraz</a>
<br/>
<a href="rest/users/999">rest/users/{id : \\d+}=rest/users/999</a>
<br/>
<a href="rest/users/username/a9">rest/username/{username : [a-zA-Z][a-zA-Z_0-9]}=rest/users/username/a9</a>
<br/>
<a href="rest/users/books/3234234">rest/books/{isbn : \\d+}=rest/users/books/3234234</a>
<hr/>
@PathParam
<br/>
<a href="rest/users2/string/1/1/1">rest/string/{year}/{month}/{day} = rest/users2/string/1/1/1</a>
<hr/>
@QueryParam
<br/>
<a href="rest/query/q1?from=120&to=123&orderBy=a&orderBy=b">/rest/query/q1?from=120&to=123&orderBy=a&orderBy=b</a>
<br/>
<a href="rest/query/q2?from=120&to=123&orderBy=a&orderBy=b">/rest/query/q2?from=120&to=123&orderBy=a&orderBy=b</a>
<br/>
@DefaultValue
<br/>
<a href="rest/query/q3">/rest/query/q3</a>
<hr/>
@Path @POST @FormParam
<br/>
rest/users4/add
<br/>
<form action="rest/users4/add" method="post">
Name: <input type="text" name="name"/>
<br/>
Age: <input type="text" name="age"/>
<br/>
<input type="submit" value="Add User" />
</form>
<br/>

<hr/>

</body>
</html>