<%@ taglib prefix="s" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<%
	request.setAttribute("contextPath", request.getContextPath());
%>
<html>
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css"/>
<link rel="stylesheet" href="${contextPath}/resources/css/main.css"/>
<title>Example</title>
</head>
<body>
<h4>$templateCache</h4>
instead of using templateUrl: we are getting the content from $templateCache and passing it to template:
<hr/>
<div ng-app="applicationModule">

	<script type="text/ng-template" id="template01">
		<div>This is content of template 01</div>
	</script>

	<templatedirective1></templatedirective1>
</div>

<script type="text/javascript">
var applicationModule = angular.module("applicationModule", []);

var applicationClass = {};
applicationClass.controllers = {};
applicationClass.directives = {};

applicationModule.controller(applicationClass.controllers);
applicationModule.directive(applicationClass.directives);

applicationClass.directives.templatedirective1 = function($templateCache) {
	return {
		restrict: "E",
		// instead of using templateUrl: we are getting the content from $templateCache and passing it to template:
		template: $templateCache.get("template01")
	};
}


</script>
</body>
</html>