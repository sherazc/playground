<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>Welcome</title>
</head>
<body>

<form action="/favorite_fruit" method="post">
    Please pick your favorite fruit:
    <#list fruits as fruit>
        <p>
            <input type="radio" name="fruit" value="${fruit}">${fruit}</input>
        </p>
    </#list>
    <input type="submit" value="Submit"/>
</form>

</body>
</html>