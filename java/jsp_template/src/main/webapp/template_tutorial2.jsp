<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html lang="en">
<head>
    <title>Title</title>

<style>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        background-color: mistyrose;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }

    div#container {

    }

    div#main {
        background-color: yellow;
        min-height: 300px;
        /*if we dont do overflow hidden then floating div will overlap its bottom footer*/
        overflow: hidden;
    }
    div#sidebar1 {
        background-color: #9acfea;
        min-height: 300px;
        float: left;
        width: 200px;
    }
    div#sidebar2 {
        background-color: #c299ea;
        min-height: 300px;
        float: right;
        width: 250px;
    }

    div#column1 {
        background-color: #1b6d85;
        min-height: 350px;
        margin-left: 200px;
        margin-right: 250px;
    }
    header {
        background-color: red;
        min-height: 80px;
    }
    footer {
        background-color: #090;
        min-height: 60px;
    }
</style>
</head>
<body>
<div id="container">

    <header>
        THis is header
    </header>

    <div id="main">
        <%--
        First put the floating divs and then the div that will take rest of the space.
        --%>
        <div id="sidebar1">
            this is sidebar 1
        </div>
        <div id="sidebar2">
            this is sidebar 2
        </div>
        <div id="column1">
            This is column 1
        </div>
    </div>

    <footer>
        THis is footer
    </footer>

</div>
</body>
</html>
