angular.module('angularblog', ['ngRoute', 'ngResource', 'angularblog.controllers', 'angularblog.factories'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/posts.html',
        controller: 'AllPostsController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html'
    });
       
}]);