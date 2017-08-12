<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Home</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
</head>
<body>
<div id="sm_main_middle">
    <div class="row">
        <div class="col-sm-5 col-sm-offset-1">
            <img src="${contextPath}/resources/image/home_big.jpeg" width="278" height="300">
        </div>
        <div class="col-sm-5">
            <br/>
            <br/>

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Login</h3>
                </div>
                <div class="panel-body">




                    <form class="form-horizontal" role="form" action="${contextPath}/j_spring_security_check" method='POST'>

                        <c:if test="${not empty authError}">
                            <div class="alert alert-danger" role="alert">
                                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span class="sr-only">Error:</span>
                                ${authError}
                            </div>
                        </c:if>

                        <c:if test="${not empty logoutMessage}">
                            <div class="alert alert-info" role="alert">
                                <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                                <span class="sr-only">Error:</span>
                                    ${logoutMessage}
                            </div>
                        </c:if>

                        <div class="form-group" style="white-space: nowrap;">
                            <label class="control-label col-sm-3" for="j_username">User id:</label>

                            <div class="col-sm-9">
                                <input type="text" class="form-control" name="j_username" id="j_username" placeholder="Enter user id">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label col-sm-3" for="j_password">Password:</label>

                            <div class="col-sm-9">
                                <input type="password" class="form-control" name="j_password" id="j_password" placeholder="Enter password.">
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <button type="submit" class="btn btn-default">Submit</button>
                            </div>
                        </div>
                    </form>





                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-sm-6">
            <h3>
                Website Description
            </h3>

            <p>
                Lorem ipsum dolor sit amet, pri te ponderum scripserit. Ei animal integre constituam nec, quis dico
                omittantur ut his. Graeci habemus ne eos. Odio sumo mei ex, ea summo assentior vel.
            </p>

            <p>
                Nulla commodo concludaturque eum cu, ea nec diam utamur nonumes. Nullam oportere gloriatur vel ei,
                omnium impedit reformidans an sea, graece postulant nec ne. Solet scripserit neglegentur nam ei. Ex
                ceteros disputationi eos, te sea scripta intellegat.
            </p>
        </div>
        <div class="col-sm-6">
            <h3>
                More Description
            </h3>

            <p>
                Lorem ipsum dolor sit amet, pri te ponderum scripserit. Ei animal integre constituam nec, quis dico
                omittantur ut his. Graeci habemus ne eos. Odio sumo mei ex, ea summo assentior vel.
            </p>

            <p>
                Nulla commodo concludaturque eum cu, ea nec diam utamur nonumes. Nullam oportere gloriatur vel ei,
                omnium impedit reformidans an sea, graece postulant nec ne. Solet scripserit neglegentur nam ei. Ex
                ceteros disputationi eos, te sea scripta intellegat.
            </p>
        </div>
    </div>
</div>
</body>
</html>