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
    <script src="${contextPath}/resources/lib/datatables/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="${contextPath}/resources/lib/datatables/css/jquery.dataTables.min.css">
    <h4>User Listing</h4>

    <c:set var="userListingNavActiveTab" value="unprocessed-documents" scope="request"/>
    <jsp:include page="/WEB-INF/views/components/user-listing-nav.jsp"/>

    <br/>
    <table id="documentsDataTable" class="display" cellspacing="0" width="100%">
        <thead>
        <tr>
            <th>Name</th>
            <th>File</th>
            <th>Description</th>
            <th>Uploaded Date</th>
            <th>Processing Status</th>
            <th>Action</th>
        </tr>
        </thead>
        <tbody>
        <c:forEach var="book" items="${books}">
            <tr>
                <td>${book.documentName}</td>
                <td>${book.clientFileName}</td>
                <td>${book.documentDescription}</td>
                <td>
                    <fmt:formatDate value="${book.uploadedDate}"/>
                </td>
                <td>${book.displayStatus}</td>
                <td nowrap="">
                    <button class="btn btn-default" data-toggle="modal" data-target="#deleteModal"
                            onclick="setupDeleteModel('${book.documentName}', '${book.id}')">
                        <span class="glyphicon glyphicon-remove-circle"></span>
                    </button>

                    <c:choose>
                        <c:when test="${book.processStatus eq 'NOT_PROCESSED'}">
                            <button id="processDocumentStartButton_${book.id}" data-toggle="modal" data-target="#processModal"
                                    onclick="setupProcessModal('${book.id}')" class="btn btn-default">
                                <span class="glyphicon glyphicon-refresh"></span>
                            </button>
                            <span id="processingDocumentButton_${book.id}" class="btn btn-default" style="display: none">
                                <img src="${contextPath}/resources/image/ajax-loader.gif"/>
                            </span>
                        </c:when>
                        <c:otherwise>
                            <span id="processingDocumentButton_${book.id}" class="btn btn-default">
                                <img src="${contextPath}/resources/image/ajax-loader.gif"/>
                            </span>
                        </c:otherwise>
                    </c:choose>
                </td>
            </tr>
        </c:forEach>
        </tbody>
    </table>


    <!-- Start Delete Modal -->
    <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="deleteModalLabel">Are you sure?</h4>
                </div>
                <div class="modal-body">
                    Are you sure you want to delete
                    <span id="deleteModalDocumentName" style="font-weight: bold"></span>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                    <a id="deleteModalDeleteURL" href="#" type="button" class="btn btn-default">Yes</a>
                </div>
            </div>
        </div>
    </div>
    <!-- End Delete Modal -->

    <!-- Start Process Modal -->
    <div class="modal fade" id="processModal" tabindex="-1" role="dialog" aria-labelledby="processModalLabel"
         aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                            aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title" id="processModalLabel">Process document now?</h4>
                </div>
                <div class="modal-body">
                    Processing document could take several minutes. It depends on the size of document.
                    <br/>
                    You can navigate away from this page and document processing will continue on the server.
                    <input type="hidden" id="processDocumentId">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">No</button>
                    <button id="processModalDeleteURL" onclick="processDocument()" class="btn btn-default"
                            data-dismiss="modal">Yes
                    </button>
                </div>
            </div>
        </div>
    </div>
    <!-- End Process Modal -->


    <script>
        function setupDeleteModel(documentName, documentId) {
            var deleteModalDocumentName = document.getElementById('deleteModalDocumentName');
            var deleteModalDeleteURL = document.getElementById('deleteModalDeleteURL');
            deleteModalDeleteURL.href = "${contextPath}/user-listing/delete-document?id=" + documentId
            + "&redirect=unprocessed-documents";

            deleteModalDocumentName.innerHTML = documentName;
        }

        function setupProcessModal(documentId) {
            $('#processDocumentId').val(documentId);
        }

        function processDocument() {
            var documentId = $('#processDocumentId').val();
            var processDocumentStartButton = document.getElementById("processDocumentStartButton_" + documentId);
            var processingDocumentButton = document.getElementById("processingDocumentButton_" + documentId);

            var processURL = '${contextPath}/user-listing/process-document?id=' + documentId;
            var request = $.ajax({
                url: processURL
            });
            request.done(function (response) {
                if (response.successful) {
                    processDocumentStartButton.style.display = 'none';
                    processingDocumentButton.style.display = '';
                } else {
                    showGenericMessage("Failed Start Document Processing.", response.message);
                }
            });
        }

        $(document).ready(function () {
            $('#documentsDataTable').DataTable({
                "bStateSave": true
            });
        });
    </script>
</div>
</body>
</html>
