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
        overflow: hidden;

    }
    div#column1 {
        width: 70%;
        float: left;
        background-color: #1b6d85;
        min-height: 300px;

    }
    div#sidebar {
        background-color: #9acfea;
        min-height: 350px;
        margin-left: 70%;
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
        <div id="column1">
            This is column 1
        </div>
        <div id="sidebar">
            this is sidebar
        </div>
    </div>

    <footer>
        THis is footer
    </footer>

</div>
</body>
</html>
