var mainApp = angular.module("mainApp", ['ngRoute']);
      mainApp.config(['$routeProvider', function($routeProvider) {
         $routeProvider.
            
         when('/', {
            redirectTo: '/movieList/0'
         }).
         when('/aboutme', {
            templateUrl: 'aboutme.html',
         }).
         when('/movieList/:id', {
            templateUrl: 'movieList.html',
            controller: 'MovieListController'
         }).
         when("/movieDetail/:id", {
           templateUrl: "movieDetail.html",
            controller: "MovieDetailController"
         }).
         when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
         }).
         when('/admin', {
            templateUrl: 'admin.html',
            controller: 'AdminController'
         }).
         when('/contact', {
            templateUrl: 'contact.html',
            controller: 'ContactController'
         }).
         when('/updateMovie/:id', {
            templateUrl: 'updateMovie.html',
            controller: 'AdminController'
         }).
         otherwise({
            redirectTo: '/movieList/0  '
         });
}]);