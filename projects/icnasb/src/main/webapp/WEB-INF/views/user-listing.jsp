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

    <c:set var="userListingNavActiveTab" value="user-listing" scope="request"/>
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
                    <c:if test="${book.processStatus eq 'SUCCESSFULLY_PROCESSED'}">
                        <a href="${contextPath}/quiz/${book.id}" class="btn btn-default">
                            <img src="${contextPath}/resources/image/small_bee_icon.png"/>
                            Generate Quiz
                        </a>
                    </c:if>
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


    <script>
        function setupDeleteModel(documentName, documentId) {
            var deleteModalDocumentName = document.getElementById('deleteModalDocumentName');
            var deleteModalDeleteURL = document.getElementById('deleteModalDeleteURL');
            deleteModalDeleteURL.href = "${contextPath}/user-listing/delete-document?id=" + documentId
                    + "&redirect=processed-documents";
            deleteModalDocumentName.innerHTML = documentName;
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
