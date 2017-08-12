<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<%
request.setAttribute("cp", request.getContextPath());
%>
<head>
<title>Template Simple</title>
<style>
    body {
        background-color: mistyrose;
        margin: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    }
    header {

    }
    footer {
        width: 100%;
        background-color: slategray;
        text-align: center;
        height: 100px;
        color: snow;
    }
    .vertical_align_middle {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }

    nav ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        overflow: hidden;
        background-color: #333;
    }
    nav li {
        float: left;
        border-right:1px solid #bbb;
    }

    nav li:last-child {
        border-right: none;
    }

    nav li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
    }

    nav li a:hover:not(.active) {
        background-color: #111;
    }
    .active {
        background-color: #4CAF50;
    }
    .right_menu {
        float:right;
        border-left:1px solid #bbb;
    }
    .rail_left {
        float: left;
        /*width: 15%;*/
        background-color: navajowhite;
        /*display: inline;*/
    }
    .rail_right {
        float: right;
        /*width: 15%;*/
        background-color: thistle;
        /*display: inline;*/
    }
    .content {
        /*width: 70%;*/
        background-color: whitesmoke;
        display: block;

    }
    .clearfix:after {
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }

    .clearfix {display: inline-block;}

    /* Hides from IE-mac \*/
    * html .clearfix {height: 1%;}
    .clearfix {display: block;}
    /* End hide from IE-mac */

</style>
<script>

</script>
</head>
<body>
<header>
<nav>
    <ul>
        <li id="logo"><a href="#">Logo</a></li>
        <li class="active"><a href="#">Home</a></li>
        <li><a href="#">Product</a></li>
        <li><a href="#">Services</a></li>
        <li class="right_menu"><a href="#">Login</a></li>
        <li class="right_menu"><a href="#">About</a></li>
    </ul>
</nav>
</header>
<div class="container clearfix">
    <div class="rail_left">
        Rail Left
    </div>
    <div class="content">
        Content
    </div>
    <div class="rail_right">
        Rail Right
    </div>
    <div class="clearfix"></div>
</div>
<footer>
    <div class="vertical_align_middle">
        Footer
    </div>
</footer>
</body>
</html>
