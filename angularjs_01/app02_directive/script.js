var app = angular.module("myApp", []);

app.controller("myController", function($scope) {
    $scope.fName = "Sheraz";
    $scope.lName = "Chaudhry"
});

app.directive("directiveA", directiveA);
app.directive("directiveB", directiveB);

function directiveA() {
    return {
        restrict: "EA",
        template: "I am directive A: {{fName}} {{lName}}"
    }
}

function directiveB() {
    return {
        restrict: "E",
        templateUrl: "./directiveBTemplate.html"
    }
}