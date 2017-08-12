<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<table border="0" style="font-size:x-small;">
<tr>
<td style="font-weight: bold;" align="left" width="45%">
Total: ${searchCount} | Students registered before ${searchDateString}.
</td>
<c:if test="${empty saveLinkCount}">
	<c:set var="saveLinkCount" value="1" scope="request"/>
</c:if>

<td align="center" width="10%" class="nowrap" style="height: 18px;">
	<a href="javascript:feeSaveForm.submit()" id="saveFeeLink${saveLinkCount}" style="display: none;">
		<img alt="" src="${contextPath}/resources/images/save.png" width="14" height="14" border="0">
		Save
	</a>
	
</td>
<td align="right" width="45%">
<c:set var="exportURL">${contextPath}/export/${selectedPaidType}/${selectedYear}/${selectedMonth}/${searchQuery}/</c:set>

<a href="${exportURL}">Export <img alt="export" src="${contextPath}/resources/images/exporticon.png" class="sorticon" /></a> |
<c:if test="${pageCount > 1}">
	<c:if test="${(pageNumber + 1) > 1}">
		<a href="javascript:redirectSearchURL(${pageNumber - 1})">Previous</a>
	</c:if>
	Page:
	${pageNumber + 1}/${pageCount}
	<c:if test="${(pageNumber + 1) < pageCount}">
		<a href="javascript:redirectSearchURL(${pageNumber + 1})">Next</a>
	</c:if>
</c:if>

</td>
</tr>
</table>
<c:set var="saveLinkCount" value="${saveLinkCount + 1}" scope="request" />