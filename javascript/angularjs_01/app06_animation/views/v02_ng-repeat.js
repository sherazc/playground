var myApp = angular.module("myApp");
myApp.controller("v02_ng-repeat", function($scope) {
    $scope.items = ["Item 1", "Item 2", "Item 3"];
    $scope.newItem = "";

    $scope.add = function() {
        $scope.items.push($scope.newItem);
    }

    $scope.remove = function(index) {
        $scope.items.splice(index, 1);
    }
});