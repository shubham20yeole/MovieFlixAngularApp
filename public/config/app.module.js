var mainApp = angular.module("mainApp", ['ngRoute']);
      mainApp.config(['$routeProvider', function($routeProvider) {
         $routeProvider.
            
         when('/movieList', {
            templateUrl: 'movieList.html',
            controller: 'MovieListController'
         }).
            
         when('/movieDetail', {
            templateUrl: 'movieDetail.html',
            controller: 'MovieDetailController'
         }).
         when('/login', {
            templateUrl: 'login.html',
            controller: 'LoginController'
         }).
         otherwise({
            redirectTo: '/movieList'
   });
}]);