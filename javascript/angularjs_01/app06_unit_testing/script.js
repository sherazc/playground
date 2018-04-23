// https://www.youtube.com/watch?v=ivwY-nGOHiA&list=PLqL-uCNdScf9wnt4YUKK5cTVpjb-qicVW&index=2
var myApp = angular.module("myApp", []);

myApp.controller("myController", function($scope, myService) {
    
    $scope.inputModel = {
        num1: undefined,
        num2: undefined,
    };

    $scope.calculate = function(operation) {
        $scope.result = myService.calculate($scope.inputModel.num1, operation, $scope.inputModel.num2);
    }
});

myApp.service("myService", function() {
    this.calculate = function(num1, operation, num2) {
        console.log(operation, num1, num2);
        if (operation === '+') {
            return num1 + num2;
        } else if (operation === '-') {
            return num1 - num2;
        } else {
            return 0;
        }
    }
});