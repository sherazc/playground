<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <title>Example 02</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
    <script src="${contextPath}/resources/lib/simple_ajax_uploaders/SimpleAjaxUploader.min.js"></script>
</head>
<body>
<div id="sm_main_middle">

    <div class="row">
        <div class="col-sm-12">
            <button id="upload_button" class="btn btn-danger">Upload</button>
            <p>
                Upload a text file.
            </p>
        </div>
    </div>


    <script>
        var uploader = new ss.SimpleUpload({
            button: 'upload_button',
            url: '${contextPath}/example03-submit',
            name: 'fileName',
            onComplete: function (fileNameBox, response) {
                var responseJson = JSON.parse(response);
                document.getElementById("fileNameBox").innerHTML = fileNameBox;
                document.getElementById("fileContentBox").innerHTML = responseJson.msg;
            }
        });
    </script>

    <h4>File Name</h4>
    <div id="fileNameBox" class="alert alert-danger"></div>

    <h4>File Content</h4>
    <div id="fileContentBox" class="alert alert-info"></div>
</div>
</body>
</html>
