angular.module('angularblog.controllers', [])
    .controller('AllPostsController', ['$scope', 'Post', function ($scope, Post) {

        $scope.posts = Post.query();

    }])
    .controller('ComposeController', ['$scope', 'User', 'Category', 'Post', function ($scope, User, Category, Post) {
        $scope.user = User.query();
        $scope.category = Category.query();
        $scope.postPost = function () {
            var payload = {
                content: $scope.newContent,
                userid: $scope.newUserid,
                categoryid: $scope.newCategoryId,
                title: $scope.newTitle
            }
            var p = new Post(payload);
            p.$save(function (success) {
                $scope.newContent = '';
                $scope.newUserid = '';
                $scope.newCategoryId = '';
                $scope.newTitle = '';
                window.history.back();
            }, function (err) {
                console.log(err);
            });
        }
    }])
    .controller('SingleViewController', ['$scope', 'Post', '$location', '$routeParams', function ($scope, Post, $location, $routeParams) {
        $scope.post = Post.get({ id: $routeParams.someId });
        $scope.deletePost = function () {
            if (confirm('Are you sure you want to delete this post?')) {
                $scope.post.$delete(function () {
                    $location.replace().path('/posts');
                }, function (err) {
                    console.log(err);
                })
            }
        }
        $scope.updatePost = function () {
            $location.path('/' + $routeParams.someId + '/update');
        }

    }])
    .controller('UpdateController', ['$scope', 'Post', 'Category', '$routeParams', '$location', function ($scope, Post, Category, $routeParams, $location) {
        $scope.post = Post.get({ id: $routeParams.someId }, function(){
            $scope.post.categoryid = String($scope.post.categoryid);
        });
        
        $scope.category = Category.query();
        $scope.updatePost = function () {
            $scope.post.$update(function () {
                window.history.back();
            }, function (err) {
                console.log(err);
            });
        }
    }])
    .controller('HomeController', ['$scope', function ($scope) {

    }])
    .controller('UserListController', ['$scope', 'User', 'UserService', function ($scope, User, UserService) {
        UserService.requireLogin();
        $scope.users = User.query();
    }])
    .controller('LoginController', ['$scope', '$location', 'UserService', function ($scope, $location, UserService) {
        UserService.me().then(function (success) {
            redirect();
        });
        function redirect() {
            var dest = $location.search().dest;
            if (!dest) {
                dest = '/'
            }
            $location.replace().path(dest).search('dest', null);
        }

        $scope.login = function () {
            UserService.login($scope.email, $scope.password)
                .then(function () {
                    redirect();
                }, function (err) {
                    console.log(err);
                });
        }
    }])