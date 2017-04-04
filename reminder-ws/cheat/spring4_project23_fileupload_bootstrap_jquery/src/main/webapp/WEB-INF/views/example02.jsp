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

    <div class="row" style="padding-top:10px;">
        <div class="col-xs-2">
            <button id="uploadBtn" class="btn btn-large btn-primary">Choose File</button>
        </div>
        <div class="col-xs-10">
            <div id="progressOuter" class="progress progress-striped active" style="display:none;">
                <div id="progressBar" class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="45"
                     aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                </div>
            </div>
        </div>
    </div>
    <div class="row" style="padding-top:10px;">
        <div class="col-xs-10">
            <div id="msgBox">
            </div>
        </div>
    </div>

    <style>
        .container {
            /*width: auto;
            max-width: 680px;
            padding: 0 15px;*/
        }

        .progress {
            margin-bottom: 0;
            margin-top: 6px;
            margin-left: 10px;
        }

        .btn.focus {
            outline: thin dotted #333;
            outline: 5px auto -webkit-focus-ring-color;
            outline-offset: -2px;
        }

        .btn.hover {
            color: #ffffff;
            background-color: #3276b1;
            border-color: #285e8e;
        }
    </style>

    <script>
        function escapeTags(str) {
            return String(str)
                    .replace(/&/g, '&amp;')
                    .replace(/"/g, '&quot;')
                    .replace(/'/g, '&#39;')
                    .replace(/</g, '&lt;')
                    .replace(/>/g, '&gt;');
        }

        window.onload = function () {
            var btn = document.getElementById('uploadBtn');
            var progressBar = document.getElementById('progressBar');
            var progressOuter = document.getElementById('progressOuter');
            var msgBox = document.getElementById('msgBox');

            var uploader = new ss.SimpleUpload({
                button: btn,
                url: '${contextPath}/example02-submit',
                name: 'multipartFile',
                hoverClass: 'hoverClass',
                focusClass: 'focus',
                responseType: 'json',
                multipart: true,
                startXHR: function () {
                    progressBar.style.display = 'block';
                    this.setProgressBar(progressBar);
                },
                onSubmit: function () {
                    msgBox.innerHTML = '';
                    btn.innerHTML = 'Uploading...';
                },
                onComplete: function () {
                    btn.innerHTML = 'Choose another file'
                    progressOuter.style.display = 'none';

                    if (!response) {
                        msgBox.innerHTML = 'Unable to upload file'
                        return;
                    }

                    if (response.success === true) {
                        msgBox.innerHTML = '<strong>' + escapeTags(filename) + '</strong>' + ' successfully uploaded.';
                    } else {
                        if (response.msg) {
                            msgBox.innerHTML = escapeTags(response.msg);

                        } else {
                            msgBox.innerHTML = 'An error occurred and the upload failed.';
                        }
                    }

                },
                onError: function () {

                    progressOuter.style.display = 'none';
                    msgBox.innerHTML = 'Error: Unable to upload file';
                }
            });
        }
    </script>
</div>
</body>
</html>
