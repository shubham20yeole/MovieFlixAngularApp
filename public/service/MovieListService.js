(function(){
  'use strict';
  
   angular
    .module('mainApp')
    .service('MovieListService', MovieListService);
    
    MovieListService.$inject = ['$http', '$q'];
    
    function MovieListService($http, $q){
      var self = this;
      self.getMovies = getMovies;
      self.getPaginationData = getPaginationData;
      self.getTopRatedMovies = getTopRatedMovies;
      self.getPaginatedMovies = getPaginatedMovies;
      self.getTopRatedSeries = getTopRatedSeries;
      
      function getMovies(pageNo){
        var $ans = $http.get('/getMovies/'+pageNo);
        $ans.then(function(){
          
          });
          return $ans;
      }

      function getPaginatedMovies(pageNo){
        var $ans = $http.get('/getMovies/'+pageNo);
        $ans.then(function(){
          
          });
          return $ans;
      }

      function getPaginationData(pageNo){
        var $ans = $http.get('/getPaginationData/'+pageNo);
        $ans.then(function(){
          
          });
          return $ans;
      }

      function getTopRatedMovies(){
        var $ans = $http.get('/getTopRatedMovies');
        $ans.then(function(){
          
          });
          return $ans;
      }

      function getTopRatedSeries(){
        var $ans = $http.get('/getTopRatedSeries');
        $ans.then(function(){
          
          });
          return $ans;
      }
    }
    
})();