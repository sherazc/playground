var myApp = angular.module("myApp", ["ngRoute"]);
myApp.config(function($routeProvider) {
    
    $routeProvider
        .when("/home", {
            templateUrl: "./partial_views/home.html"
        })
        .when("/employee", {
            templateUrl: "./partial_views/employee.html",
            controller: "employeeController"
        })
        .when("/department", {
            templateUrl: "./partial_views/department.html",
            controller: "departmentController"
            
        })
        .otherwise({
            redirectTo: "/home"
        });
        
});

myApp.controller("employeeController", function($scope) {
    $scope.employees = ["Sheraz", "Tariq", "Chaudhry"];
});

myApp.controller("departmentController", function($scope) {
    $scope.managments = ["IT", "Managment"];
});