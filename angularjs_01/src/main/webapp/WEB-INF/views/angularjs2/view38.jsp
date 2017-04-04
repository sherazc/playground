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
Adding content to $templateCache in applicationModule.run() method.
<hr/>
<div ng-app="applicationModule">
	<templatedirective1></templatedirective1>
	<templatedirective2></templatedirective2>
</div>

<script type="text/javascript">
var applicationModule = angular.module("applicationModule", []);

// treat this method as init method.
// this method is angular life cycle method that runs right after view's dom is setup.
applicationModule.run(function($templateCache) {
	$templateCache.put("template01", "<div class='panel'>Template 01 Content</div>");
	$templateCache.put("template02", "<div class='panel'>Template 02 Content</div>");
});

var applicationClass = {};
applicationClass.controllers = {};
applicationClass.directives = {};

applicationModule.controller(applicationClass.controllers);
applicationModule.directive(applicationClass.directives);

applicationClass.directives.templatedirective1 = function($templateCache) {
	return {
		restrict: "E",
		template: $templateCache.get("template01")
	};
};


applicationClass.directives.templatedirective2 = function() {
	return {
		restrict: "E",
		templateUrl: "template02"
	};
};

</script>
</body>
</html>