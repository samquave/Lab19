angular.module('angularblog.controllers', [])
.controller('AllPostsController', ['$scope', 'Post', function($scope, Post){
    function getPosts() {
        $scope.post = Post.query();
    }
    getPosts();

 


}]);

