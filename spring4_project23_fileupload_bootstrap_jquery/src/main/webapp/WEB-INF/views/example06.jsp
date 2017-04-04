<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <title>Example 06</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
    <script src="${contextPath}/resources/lib/simple_ajax_uploaders/SimpleAjaxUploader.min.js"></script>
</head>
<body>
<div id="sm_main_middle">
    <div class="row">
        <div class="col-md-4 col-md-offset-4">
            <form action="${contextPath}/example06">
               <div class="input-group">
                    <input name="tag" class="form-control" value="${tag}">
                    <div class="input-group-btn">
                        <button type="submit" class="btn btn-info">
                            <span class="glyphicon glyphicon-search"></span> Filter
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <div class="row">

        <div class="col-md-12">
            <ol>
            <c:forEach items="${files}" var="file">
                <li>
                    <a href="${contextPath}/example06delete?tag=${tag}&file-name=${file.name}" class="btn btn-danger">

                        <span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>
                        Delete
                    </a>
                    ${file.name}
                </li>
            </c:forEach>
            </ol>
        </div>



    </div>
</div>
</body>
</html>

