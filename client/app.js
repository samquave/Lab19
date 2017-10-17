angular.module('angularblog', ['ngRoute', 'ngResource', 'angularblog.controllers', 'angularblog.factories', 'angularblog.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/home.html'
    })
    .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginController'
    })
    .when('/posts', {
        templateUrl: 'views/posts.html',
        controller: 'AllPostsController'
    })
    .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UserListController'
    })
    .when('/compose', {
        templateUrl: 'views/compose.html',
        controller: 'ComposeController'
    })
    .when('/:someId/update', {
        templateUrl: 'views/update.html',
        controller: 'UpdateController'
    })
    .when('/:someId', {
        templateUrl: 'views/single_view.html', 
        controller: 'SingleViewController'
    })
    .otherwise({
        redirectTo: '/'
    })
       
}]);