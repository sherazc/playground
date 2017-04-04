<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<table id="wordDataTable" class="display" cellspacing="0" width="100%" border="1">
    <thead>
    <tr>
        <th>Word</th>
        <th>Book References</th>
    </tr>
    </thead>
    <tbody>
    <c:forEach var="word" items="${wordSamples}">
        <tr>
            <td nowrap="">
                <button type="button" class="btn btn-default btn-default"
                        data-toggle="modal" data-target="#wordDefinitionModal"
                        onclick="populateWordDefinitionModal('${word.word}')">
                        ${word.word} (${word.totalWordReferences})
                    <span class="glyphicon glyphicon-info-sign"></span>
                </button>
            </td>
            <td>
                <c:set var="countReference" value="0"/>
                <c:forEach var="wordReference" items="${word.wordReferences}">
                    <c:set var="countReference" value="${countReference + 1}"/>
                    Page Number: ${wordReference.pageNumber},
                    Line Number: ${wordReference.lineNumber}
                    <br/>
                    ${wordReference.wordReferenceLine}
                    <c:if test="${word.totalWordReferences > 1 and countReference != word.totalWordReferences}">
                        <hr/>
                    </c:if>
                </c:forEach>
            </td>
        </tr>
    </c:forEach>
    </tbody>
</table>
<script>
    $(document).ready(function () {
        $('#wordDataTable').DataTable({
            "bStateSave": true
        });
    });

    function populateWordDefinitionModal(word) {
        $("#wordDefinitionModalLabel").html(word);
        var wordDefinitionRequestUrl = "${contextPath}/quiz/define/" + word;
        // var wordDefinitionRequestUrl = "${contextPath}/quiz/define/test";
        $.ajax({
            url: wordDefinitionRequestUrl,
            success: function(responseDefinitions) {
                var resultHtml = "";
                if (responseDefinitions.length > 0) {
                    for (i=0; i < responseDefinitions.length; i++) {
                        var wordDetail = responseDefinitions[i];
                        resultHtml += "<b>Word:</b> " + wordDetail.word + "</b>";
                        resultHtml += "<br/>";
                        if (wordDetail.sound) {
                            resultHtml += "<b>Sound:</b> " + wordDetail.sound;
                            resultHtml += "<br/>";
                        }
                        if (wordDetail.pronunciation) {
                            resultHtml += "<b>Pronunciation:</b> " + wordDetail.pronunciation;
                            resultHtml += "<br/>";
                        }
                        if (wordDetail.functionalLabel) {
                            resultHtml += "<b>Functional Label:</b> " + wordDetail.functionalLabel;
                            resultHtml += "<br/>";
                        }
                        if (wordDetail.definitions && wordDetail.definitions.length > 0) {
                            for (j=0; j < wordDetail.definitions.length; j++) {
                                var definition = wordDetail.definitions[j];

                                if (definition.text) {
                                    resultHtml += "<b>Definition " + (j + 1) + "</b>: " + definition.text;
                                    resultHtml += "<br/>";

                                    if (definition.usages && definition.usages.length > 0) {
                                        for (k=0; k < definition.usages.length; k++) {
                                            usage = definition.usages[k];
                                            if (usage) {
                                                resultHtml += "<b>Usage " + (k + 1) + "</b>: " + usage;
                                                resultHtml += "<br/>";
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        resultHtml += "<hr/>";
                    }
                } else {
                    resultHtml = "Definition not found"
                }

                $("#wordDefinitionModalBody").html(resultHtml);
            }
        });

    }
</script>


<!-- Start Word Definition Modal -->
<div class="modal fade" id="wordDefinitionModal" tabindex="-1" role="dialog"
     aria-labelledby="wordDefinitionModalLabel"
     aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                        aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="wordDefinitionModalLabel"></h4>
            </div>
            <div class="modal-body" id="wordDefinitionModalBody"></div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Ok</button>
            </div>
        </div>
    </div>
</div>
<!-- End Word Definition Modal -->