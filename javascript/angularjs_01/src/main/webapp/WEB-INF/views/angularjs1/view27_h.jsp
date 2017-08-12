<!DOCTYPE html>
<%
	request.setAttribute("contextPath", request.getContextPath());
%>
<html>
<head>
<script src="${contextPath}/resources/scripts/libs/angular.js"></script>
<link rel="stylesheet" href="${contextPath}/resources/css/bootstrap.css">
<link rel="stylesheet" href="${contextPath}/resources/css/foundation.css">
<link rel="stylesheet" href="${contextPath}/resources/css/main.css">
<title>Example</title>
</head>
<body>

<h1>Isolate Scope Review</h1>

<div ng-app="phoneApp">
    <div ng-controller="AppCtrl">
        <phone number="555-1234" network="network" make-call="leaveVoicemail(number, message)"></phone>
        <phone number="867-5309" network="network" make-call="leaveVoicemail(number, message)"></phone>
        <phone number="911" network="network" make-call="leaveVoicemail(number, message)"></phone>
    </div>
  </div>


<script type="text/javascript">
// https://egghead.io/lessons/angularjs-isolate-scope-review
var app = angular.module("phoneApp", []);

app.controller("AppCtrl", function($scope) {
    $scope.leaveVoicemail = function(number, message) {
        alert("Number: " + number + " said: " + message)
    }
})

app.directive("phone", function() {
    return {
        restrict: "E",
        scope: {
            number: "@",
            network: "=",
            makeCall: "&"
        },
        template: '<div class="panel">Number: {{number}} Network:<select ng-model="network" ng-options="net for net in networks">' +
          '<input type="text" ng-model="value">' +
          '<div class="button" ng-click="makeCall({number: number, message: value})">Call home!</div></div>',

        link: function(scope) {
            scope.networks = ["Verizon", "AT&T", "Sprint"];
            scope.network = scope.networks[0]
        }
    }
})
</script>
</body>
</html>