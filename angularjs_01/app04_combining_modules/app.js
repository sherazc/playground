var myServicesModule = angular.module("myServicesModule", []);
myServicesModule.service("myService", function() {
    this.add = function(a, b) {
        return a + b;
    }
});

var myDirectiveModule = angular.module("myDirectiveModule", []);
myDirectiveModule.directive("myDirective", ["myService", function(myService) {return {
    template: "{{result}}",
    link: function (scope, element, attributes) {
        scope.result = scope.num1 + " + " + scope.num2 
            + " = " + myService.add(scope.num1, scope.num2);
    }
}}]);

var myAppModule = angular.module("myAppModule", ["myServicesModule", "myDirectiveModule"]);
myAppModule.controller("myAppController", ["$scope", function($scope) {
    $scope.num1 = 3;
    $scope.num2 = 5;
}]);
