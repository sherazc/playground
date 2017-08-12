<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <title>Example 05</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
    <script src="${contextPath}/resources/lib/simple_ajax_uploaders/SimpleAjaxUploader.min.js"></script>
</head>
<body>
<div id="sm_main_middle">


    <div class="row">

        <div class="col-lg-8 col-lg-offset-2">

            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Upload New Document</h3>
                </div>
                <div class="panel-body">
                    <div class="input-group">
                        <span class="input-group-btn">
                            <button id="uploadButton" class="btn btn-default" type="button">Upload</button>
                        </span>
                        <span id="fileNameBox" class="form-control" style="text-align: center">
                            Ready to upload.
                        </span>
                    </div>

                    <div id="progressOuter1" class="progress" style="margin-top: 20px;">
                        <div id="progressBar1"
                             class="progress-bar progress-bar-info progress-bar-striped active"
                             role="progressbar"
                             aria-valuemin="0" aria-valuemax="100" style="width: 0%;">
                        </div>
                    </div>
                    <div id="progressOuter2" class="progress" style="display: none; margin-top: 20px;">
                        <div id="progressBar2"
                             class="progress-bar progress-bar-success"
                             role="progressbar" aria-valuenow="100"
                             aria-valuemin="0" aria-valuemax="100" style="width: 100%;">
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </div>

    <script>
        window.onload = function () {
            var uploadButton = document.getElementById('uploadButton');
            var progressBar1 = document.getElementById('progressBar1');
            var progressBar2 = document.getElementById('progressBar2');
            var progressOuter1 = document.getElementById('progressOuter1');
            var progressOuter2 = document.getElementById('progressOuter2');
            var fileNameBox = document.getElementById('fileNameBox');


            var uploader = new ss.SimpleUpload({
                button: uploadButton,
                url: '${contextPath}/example05-submit',
                name: 'fileName',
                startXHR: function () {
                    this.setProgressBar(progressBar1);
                },
                onSubmit: function(fileName) {
                    progressOuter1.style.display = 'block';
                    progressOuter2.style.display = 'none';
                    fileNameBox.innerHTML = "Uploading " + fileName + "...";

                },
                onComplete: function (fileName, response) {
                    var resultJson = JSON.parse(response);
                    fileNameBox.innerHTML = "Uploaded " + fileName;
                    progressBar1.style.width = '0%';
                    progressOuter1.style.display = 'none';
                    progressOuter2.style.display = 'block';
                },
                onError: function (fileName) {
                    fileNameBox.innerHTML = "Unable to upload " + fileName + ".";
                    progressBar1.style.width = '0%';
                    progressOuter1.style.display = 'block';
                    progressOuter2.style.display = 'none';
                }

            });
        }
    </script>

</div>
</body>
</html>

