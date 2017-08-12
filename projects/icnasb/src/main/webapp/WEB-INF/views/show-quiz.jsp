<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>

<html>
<head>
    <meta charset="UTF-8">
    <title>Quiz</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="${contextPath}/resources/lib/bootstrap-3.3.2/css/bootstrap.min.css">
    <script src="${contextPath}/resources/lib/jquery/jquery-1.11.2.min.js"></script>
    <script src="${contextPath}/resources/lib/bootstrap-3.3.2/js/bootstrap.min.js"></script>
</head>
<body>
<div id="sm_main_middle">
    <script src="${contextPath}/resources/lib/datatables/js/jquery.dataTables.min.js"></script>
    <link rel="stylesheet" href="${contextPath}/resources/lib/datatables/css/jquery.dataTables.min.css">

    <h2>
        ${book.documentName}
    </h2>
    <fmt:formatDate value="${book.uploadedDate}"/>
    <p>
        ${book.documentDescription}
    </p>

    <div class="row">

        <div class="col-lg-6 col-lg-offset-3" style="text-align: center">
            <div class="input-group">
                <input id="generateQuizCount" type="number" value="${defaultNumberOfSamples}" class="form-control" placeholder="Enter number of words..."/>

                <span class="input-group-btn">
                    <button id="generateQuizButton" class="btn btn-default" type="button">Generate New Quiz</button>
                </span>
            </div>
        </div>
    </div>

    <hr/>
    <div id="quizTableDiv">
        <jsp:include page="/WEB-INF/views/components/quiz-table.jsp" />
    </div>

    <script>
        $(document).ready(function () {
            $("#generateQuizButton").click(function () {
                var generateQuizCount = document.getElementById('generateQuizCount').value;
                // alert(generateQuizCount);
                var refreshQuizUrl = '${contextPath}/quiz/refresh/${book.id}/' + generateQuizCount;
                $.ajax({
                    url: refreshQuizUrl,
                    success: function (data) {
                        $('#quizTableDiv').html(data);
                    }
                });
            });
        });
    </script>
</div>
</body>
</html>