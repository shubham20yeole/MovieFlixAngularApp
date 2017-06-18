var mainApp = angular.module("mainApp", ['ngRoute']);
      mainApp.config(['$routeProvider', function($routeProvider) {
         $routeProvider.
            
         when('/movieList', {
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
         when('/contact', {
            templateUrl: 'contact.html',
            controller: 'ContactController'
         }).
         otherwise({
            redirectTo: '/movieList'
   });
}]);