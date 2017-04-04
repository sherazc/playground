<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s" %>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form" %>
<ul class="nav nav-tabs">
    <c:choose>
        <c:when test="${userListingNavActiveTab eq 'user-listing'}">
            <li role="presentation" class="active">
                <a href="${contextPath}/user-listing">All Documents</a>
            </li>
        </c:when>
        <c:otherwise>
            <li role="presentation">
                <a href="${contextPath}/user-listing">All Documents</a>
            </li>
        </c:otherwise>
    </c:choose>

    <c:choose>
        <c:when test="${userListingNavActiveTab eq 'processed-documents'}">
            <li role="presentation" class="active">
                <a href="${contextPath}/user-listing/processed-documents">Processed Documents</a>
            </li>
        </c:when>
        <c:otherwise>
            <li role="presentation">
                <a href="${contextPath}/user-listing/processed-documents">Processed Documents</a>
            </li>
        </c:otherwise>
    </c:choose>

    <c:choose>
        <c:when test="${userListingNavActiveTab eq 'unprocessed-documents'}">
            <li role="presentation" class="active">
                <a href="${contextPath}/user-listing/unprocessed-documents">Unprocessed Documents</a>
            </li>
        </c:when>
        <c:otherwise>
            <li role="presentation">
                <a href="${contextPath}/user-listing/unprocessed-documents">Unprocessed Documents</a>
            </li>
        </c:otherwise>
    </c:choose>

    <c:choose>
        <c:when test="${userListingNavActiveTab eq 'uploaded-document'}">
            <li role="presentation" class="active">
                <a href="${contextPath}/user-listing/upload-document">Upload Document</a>
            </li>
        </c:when>
        <c:otherwise>
            <li role="presentation">
                <a href="${contextPath}/user-listing/upload-document">Upload Document</a>
            </li>
        </c:otherwise>
    </c:choose>
</ul>