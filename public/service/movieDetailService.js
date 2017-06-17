(function(){
  'use strict';
  
   angular
    .module('mainApp')
    .service('MovieDetailService', MovieDetailService);
    
    MovieDetailService.$inject = ['$http', '$q'];
    
    function MovieDetailService($http, $q){
      var self = this;
      self.getMovies = getMovies;
      
      function getMovies(){
    	  var $ans = $http.get('http://localhost:8002/movieflix/api/dashboard');
    	  $ans.then(function(){
    		  
          });
          return $ans;
      }
    }
    
})();