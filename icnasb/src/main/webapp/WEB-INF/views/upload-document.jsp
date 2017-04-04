<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <title>User Listing</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
</head>
<body>
<div id="sm_main_middle">
    <script src="${contextPath}/resources/lib/simple_ajax_uploaders/SimpleAjaxUploader.min.js"></script>

    <h4>User Listing</h4>

    <c:set var="userListingNavActiveTab" value="uploaded-document" scope="request"/>
    <jsp:include page="/WEB-INF/views/components/user-listing-nav.jsp" />

    <form action="${contextPath}/user-listing/submit-document" method="post">
        <input id="serverFileName" name="serverFileName" type="hidden">
        <input id="uploadSuccessful" name="uploadSuccessful" type="hidden">
        <div class="row" style="margin-top: 40px;">

            <div class="col-lg-8 col-lg-offset-2">

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Upload New Document</h3>
                    </div>
                    <div class="panel-body">

                        <div class="form-group" style="margin-top: 10px">
                            <label for="documentName">
                                Name
                            </label>
                            <input id="documentName" name="documentName" type="text" class="form-control">
                        </div>

                        <div class="form-group" style="margin-top: 20px">
                            <label for="documentDescription">
                                Description
                            </label>
                            <textarea id="documentDescription" name="documentDescription" type="text"
                                      class="form-control"></textarea>
                        </div>

                        <div class="input-group" style="margin-top: 30px">
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
                        <div class="text-center" style="margin-top: 30px">
                            <input type="submit" class="btn btn-default" value="Submit">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>

    <script>
        window.onload = function () {
            var uploadButton = document.getElementById('uploadButton');
            var progressBar1 = document.getElementById('progressBar1');
            var progressBar2 = document.getElementById('progressBar2');
            var progressOuter1 = document.getElementById('progressOuter1');
            var progressOuter2 = document.getElementById('progressOuter2');
            var fileNameBox = document.getElementById('fileNameBox');
            var serverFileName = document.getElementById('serverFileName');
            var uploadSuccessful = document.getElementById('uploadSuccessful');

            var uploader = new ss.SimpleUpload({
                button: uploadButton,
                url: '${contextPath}/user-listing/upload-document/submit',
                name: 'fileName',
                startXHR: function () {
                    this.setProgressBar(progressBar1);
                },
                onSubmit: function (fileName) {
                    progressOuter1.style.display = 'block';
                    progressOuter2.style.display = 'none';
                    fileNameBox.innerHTML = "Uploading " + fileName + "...";

                },
                onComplete: function (fileName, response) {
                    var resultJson = JSON.parse(response);
                    fileNameBox.innerHTML = resultJson.message;
                    uploadSuccessful.value = resultJson.successful;
                    serverFileName.value = resultJson.parameters['serverFileName'];
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

    <div class="row">
        <div class="">
            <h3>Upload Description</h3>

            <p>
                Lorem ipsum dolor sit amet, te iusto semper corrumpit est, mea nulla salutandi an. Iisque dignissim eam
                ad. Te legere abhorreant pri, id nostrum molestie dissentiet pri, te inani mollis impetus nam. An vim
                probo accumsan delectus, in laudem insolens ius. Solum nobis tacimates ex sea, sit maiorum dolores
                invenire te. No nam timeam quaeque hendrerit, simul lucilius maluisset mel an, nec eu omnes principes.
                Cu simul commodo per, utinam laudem tritani vel te. No melius fuisset duo, per nihil placerat ei. Eum
                eligendi accusata ne, his cu periculis sadipscing referrentur. Vix no diceret accusam facilisi, has
                eripuit definiebas dissentias ei. Eius tempor ponderum vim ut, no nibh putent possim his, no alii rebum
                concludaturque sed. Ius ad possit hendrerit, his salutatus scripserit ex. Et has suas praesent
                pertinacia, vis et dolore sensibus, ea ius propriae molestie. Te vero veritus eum, simul placerat
                conceptam in has. Eu has regione equidem euripidis, vel ea illum vivendum partiendo. Eum delenit tibique
                repudiare ne, at duo consul ornatus. Ad cum solum ullum appellantur, eu eam repudiare efficiendi,
                delenit disputando eloquentiam nec cu. Sed te errem aperiri definiebas. Mea ex atomorum voluptatibus.
                Quas nostrum propriae mel no, aliquando prodesset ad has, omnium blandit vel et. Usu splendide
                vituperata no, no pro vide noluisse iracundia. Aeque expetenda dissentiet eam ei, et ius omnesque
                persecuti. No habeo verear duo, at viris vidisse adipisci eos. An mel impedit maiestatis, his labore
                option in, ut vel quando regione petentium. Melius partiendo elaboraret an duo, elit cibo admodum ad
                sed. Cum cu facer delicata cotidieque, posse summo scripta has cu, ei regione laoreet hendrerit sed. Te
                quo posse nominavi deleniti.
            </p>
        </div>
    </div>


</div>
</body>
</html>
