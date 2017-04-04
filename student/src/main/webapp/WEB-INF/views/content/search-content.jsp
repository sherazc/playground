<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/tags" prefix="s"%>
<!-- ############################## Start Search Content ############################## -->
<jsp:include page="/WEB-INF/views/component/search-bar.jsp" />
<br/>
<div id="searchResults">
<c:choose>
	<c:when test="${searchCount > 0 }">
		<jsp:include page="/WEB-INF/views/component/search-grid.jsp" />
	</c:when>
	<c:otherwise>
		<br/>
		No Students found.
		<br/><br/>
	</c:otherwise>
</c:choose>
</div>
<!-- ############################## End Search Content ############################## -->