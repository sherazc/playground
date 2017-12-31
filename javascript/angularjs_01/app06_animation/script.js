var myApp = angular.module("myApp", ["ngRoute", "ngAnimate"]);
myApp.config(function($routeProvider) {
    $routeProvider
        .when("/v01_ng-show", {templateUrl: "./views/v01_ng-show.html"})
        .when("/v02_ng-repeat", {templateUrl: "./views/v02_ng-repeat.html"});
});