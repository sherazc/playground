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
        <div class="col-lg-2">
            <button id="uploadButton" class="btn btn-info">Upload</button>
        </div>
        <div class="col-lg-10">
            <div id="progressOuter1" class="progress" style="display: none;">
                <div id="progressBar1"
                     class="progress-bar progress-bar-info progress-bar-striped active"
                     role="progressbar"
                     aria-valuemin="0" aria-valuemax="100" style="width: 0%">
                </div>
            </div>
            <div id="progressOuter2" class="progress" style="display: none;">
                <div id="progressBar2"
                     class="progress-bar progress-bar-success"
                     role="progressbar" aria-valuenow="100"
                     aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                </div>
            </div>
        </div>
    </div>
    <div id="resultBox" class="row">
        <div class="col-lg-4">
            <h4>File Name</h4>

            <div id="fileNameBox" class="alert alert-danger" style="text-align: center"></div>
        </div>
        <div class="col-lg-8">
            <h4>Result</h4>

            <div id="messageBox" class="alert alert-info" style="text-align: center"></div>
        </div>
    </div>

    <script>
        window.onload = function () {
            var uploadButton = document.getElementById('uploadButton');
            /*
            Using 2 progress bars because when uploading 2nd file and setting progress bar to zero then bootstrap
            animates back to zero. This animation takes time and it looks like progress bar do not starts from zero.

            On complete, 2nd progress bar which is hardcoded to 100%, is displyed and 1st one is hidden and set to zero.

            */
            var progressBar1 = document.getElementById('progressBar1');
            var progressBar2 = document.getElementById('progressBar2');
            var progressOuter1 = document.getElementById('progressOuter1');
            var progressOuter2 = document.getElementById('progressOuter2');
            var fileNameBox = document.getElementById('fileNameBox');
            var messageBox = document.getElementById('messageBox');

            var uploader = new ss.SimpleUpload({
                button: uploadButton,
                url: '${contextPath}/example04-submit',
                name: 'fileName',
                startXHR: function () {
                    this.setProgressBar(progressBar1);
                },
                onSubmit: function() {
                    progressOuter1.style.display = 'block';
                    progressOuter2.style.display = 'none';
                    fileNameBox.innerHTML = '';
                    messageBox.innerHTML = '';

                },
                onComplete: function (fileName, response) {
                    var resultJson = JSON.parse(response);
                    fileNameBox.innerHTML = fileName;
                    messageBox.innerHTML = resultJson.msg;
                    progressBar1.style.width = '0%';
                    progressOuter1.style.display = 'none';
                    progressOuter2.style.display = 'block';
                    progressBar2.innerHTML = "Uploaded " + fileName;
                },
                onError: function () {
                    fileNameBox.innerHTML = 'NA';
                    messageBox.innerHTML = 'Unable to upload';
                    progressOuter1.style.display = 'none';
                    progressOuter2.style.display = 'none';
                }

            });
        }
    </script>

</div>
</body>
</html>

