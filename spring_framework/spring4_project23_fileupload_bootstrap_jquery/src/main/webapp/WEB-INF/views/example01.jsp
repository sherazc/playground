<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <title>Title</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
    <script src="${contextPath}/resources/lib/simple_ajax_uploaders/SimpleAjaxUploader.min.js"></script>
</head>
<body>
<div id="sm_main_middle">
    <%--
      Upload example obtained from:
      http://www.abeautifulsite.net/whipping-file-inputs-into-shape-with-bootstrap-3/
      --%>
    <style>
        .btn-file {
            position: relative;
            overflow: hidden;
        }

        .btn-file input[type=file] {
            position: absolute;
            top: 0;
            right: 0;
            min-width: 100%;
            min-height: 100%;
            font-size: 100px;
            text-align: right;
            filter: alpha(opacity=0);
            opacity: 0;
            outline: none;
            background: white;
            cursor: inherit;
            display: block;
        }

    </style>

    <script>

        $(document).on('change', '.btn-file :file', function () {
            var input = $(this),
                    numFiles = input.get(0).files ? input.get(0).files.length : 1,
                    label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });

        $(document).ready(function () {
            $('.btn-file :file').on('fileselect', function (event, numFiles, label) {

                var input = $(this).parents('.input-group').find(':text'),
                        log = numFiles > 1 ? numFiles + ' files selected' : label;

                if (input.length) {
                    input.val(log);
                } else {
                    if (log) alert(log);
                }

            });
        });
    </script>

    <div class="row">

        <div class="col-sm-6 col-sm-offset-3">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title">Upload new document</h3>
                </div>

                <div class="panel-body">

                    <form method="post" action="${contextPath}/example01-submit" enctype="multipart/form-data">
                        <div class="input-group">
                            <span class="input-group-btn">
                                <span class="btn btn-default btn-file">
                                    Browse&hellip; <input type="file" multiple name="multipartFile">
                                </span>
                            </span>
                            <input type="text" class="form-control" name="fileName" readonly >
                        </div>

                        <button class="btn btn-default center-block" style="margin-top: 10px"
                                onclick="submit()">Upload</button>
                    </form>

                </div>
            </div>
        </div>


    </div>
</div>
</body>
</html>
