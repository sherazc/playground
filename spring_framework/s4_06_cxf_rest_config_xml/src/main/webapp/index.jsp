<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Index of all services</title>
    <style>
        #cemp {
            background: #e3ece1;
            width: 300px;
            padding: 10px;
            border-radius: 2px;
            box-shadow: 1px 1px 1px 1px #c1c1c1;
            margin: 5px;
        }

        #cemp label {
            width: 100px;
            display: inline-block;
            margin: 0 5px;
        }

        #cemp input, #cemp select {
            margin: 5px auto;
            padding: 2px;
        }

        #cemp input[type=submit] {
            margin: 10px auto;
            display: block;
        }
    </style>
</head>
<body>
<strong>Service Tests</strong>
<%
    request.setAttribute("company_ep", application.getContextPath() + "/rest/company");
%>
<ul>
    <li><a href="${company_ep}/employees01">${company_ep}/employees01</a></li>
    <li><a href="${company_ep}/employees01-xml/100">${company_ep}/employees01-xml/100</a></li>
    <li><a href="${company_ep}/employees01-json/100">${company_ep}/employees01-json/100</a></li>
</ul>
<strong>Exception Tests</strong>
<ul>
    <li><a href="${company_ep}/employees01-exception/100">No Exception <br/>${company_ep}/employees01-exception/100</a>
    </li>
    <li><a href="${company_ep}/employees01-exception/-10">Server Exception <br/>${company_ep}/employees01-exception/-10</a>
    </li>
    <li><a href="${company_ep}/employees01-exception/2000">ID Not found
        <br/>${company_ep}/employees01-exception/2000</a></li>
    <li><a href="${company_ep}/employees01-exception/800">Business Logic error <br/>${company_ep}/employees01-exception/800</a>
    </li>
    <li><a href="${company_ep}/BAD_SERVICE_NAME">Bad Service name <br/>${company_ep}/BAD_SERVICE_NAME</a></li>
</ul>

<strong>Construct Employee</strong>
<form id="cemp" action="${company_ep}/employees02/construct/333" method="post">
    <div>
        In addition to the fields below you can also post "esecret-seed" custom header.
        Set Number in "esecret-seed" using chrome plugin postman
    </div>
    <div>
        <label for="ename">
            Name:
        </label>
        <input id="ename" name="ename">
    </div>
    <div>
        <label for="eage">
            Age:
        </label>
        <input id="eage" name="eage" type="number">
    </div>
    <div>
        <label for="elocations">
            Locations:
        </label>
        <select id="elocations" name="elocations" size="5" multiple>
            <option>Location 1</option>
            <option>Location 2</option>
            <option>Location 3</option>
            <option>Location 4</option>
            <option>Location 5</option>
        </select>
    </div>
    <div>
        <input type="submit" value="submit">
    </div>
</form>
</body>
</html>