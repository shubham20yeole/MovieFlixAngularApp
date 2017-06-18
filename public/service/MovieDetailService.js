(function(){
  'use strict';
  
   angular
    .module('mainApp')
    .service('MovieDetailService', MovieDetailService);
    
    MovieDetailService.$inject = ['$http', '$q'];
    
    function MovieDetailService($http, $q){
      var self = this;
      self.getMovie = getMovie;
      self.getLatestMovies = getLatestMovies;

      function getMovie(id){
        var $ans = $http.get('/getMovie/'+id);
        $ans.then(function(){
          
          });
          return $ans;
      }

      function getLatestMovies(){
        var $ans = $http.get('/getLatestMovies');
        $ans.then(function(){
          
          });
          return $ans;
      }
    }
    
})();