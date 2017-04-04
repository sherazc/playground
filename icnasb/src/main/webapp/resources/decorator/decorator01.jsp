<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="s" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="security" uri="http://www.springframework.org/security/tags" %>

<%
    request.setAttribute("contextPath", request.getContextPath());
%>
<html>
<head>
    <title>Spelling Bee - <sitemesh:write property="title"/></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
    <link rel="stylesheet" href="${contextPath}/resources/css/main.css">
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top" style="box-shadow: 0px 2px 4px #888888;">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle"
                    data-toggle="collapse"
                    data-target="#desktopNavBar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>

            <security:authorize access="isAnonymous()">
            <a href="${contextPath}/home" class="navbar-brand">
                <img src="${contextPath}/resources/image/logo_white.png" width="25" height="25">

            </a>
            </security:authorize>
            <security:authorize access="isAuthenticated()">
                <a href="${contextPath}/user-listing" class="navbar-brand">
                    <img src="${contextPath}/resources/image/logo_white.png" width="25" height="25">

                </a>
            </security:authorize>
        </div>

        <div class="collapse navbar-collapse" id="desktopNavBar">
            <ul class="nav navbar-nav">
                <li class="active"><a href="${contextPath}/user-listing">Home</a></li>
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        Documents
                        <span class="caret"></span>
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <a href="${contextPath}/user-listing">
                                <span class="glyphicon glyphicon-list-alt"></span>
                                All
                            </a>
                        </li>
                        <li>
                            <a href="${contextPath}/user-listing/processed-documents">
                                <span class="glyphicon glyphicon-list"></span>
                                Processed
                            </a>
                        </li>
                        <li>
                            <a href="${contextPath}/user-listing/unprocessed-documents">
                                <span class="glyphicon glyphicon-tasks"></span>
                                Unprocessed
                            </a>
                        </li>
                        <li role="presentation" class="divider"></li>
                        <li>
                            <a href="${contextPath}/user-listing/upload-document">
                                <span class="glyphicon glyphicon-open"></span>
                                Upload
                            </a>
                        </li>
                    </ul>
                </li>
                <li><a href="${contextPath}/static/about-us">About</a></li>
            </ul>

            <security:authorize access="isAnonymous()">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="${contextPath}/register">
                            <span class="glyphicon glyphicon-user"></span>
                            Sign Up
                        </a>
                    </li>
                    <li>
                        <a href="/home">
                            <span class="glyphicon glyphicon-log-in"></span>
                            Login
                        </a>
                    </li>
                </ul>
            </security:authorize>

            <security:authorize access="isAuthenticated()">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="${contextPath}/update-profile">
                            <span class="glyphicon glyphicon-user"></span>
                            Update profile
                        </a>
                    </li>
                    <li>
                        <a href="${contextPath}/j_spring_security_logout">
                            <span class="glyphicon glyphicon-log-out"></span>
                            Logout
                        </a>
                    </li>
                </ul>
            </security:authorize>


        </div>
    </div>
</nav>


<div class="container">
    <sitemesh:write property="div.sm_main_middle"/>
    <!-- Start Generic Message Modal -->
    <div class="modal fade" id="genericMessageModal" tabindex="-1" role="dialog"
         aria-labelledby="genericMessageModalLabel"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="genericMessageModalLabel"></h4>
                </div>
                <div class="modal-body" id="genericMessageModalBody"></div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Generic Message Modal -->

    <script>
        function showGenericMessage(title, message) {
            $('#genericMessageModalLabel').html(title);
            $('#genericMessageModalBody').html(message);
            $('#genericMessageModal').modal('show')
        }
    </script>
</div>
<footer class="footer">
    <div class="container-fluid" style="background-color: #262626">
        <div class="row">
            <div class="col-xs-12">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-10">
                            Spelling Bee Footer &copy;
                        </div>
                        <div class="col-lg-2">
                            <img style="float: right; margin-top: -40px;"
                                 src="${contextPath}/resources/image/footer_image_icon.jpg" height="100" width="100"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>
</body>
</html>
