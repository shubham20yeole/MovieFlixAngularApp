(function(){
  'use strict';
  
   angular
    .module('mainApp')
    .service('MovieService', MovieService);
    
    MovieService.$inject = ['$http', '$q'];
    
    function MovieService($http, $q){
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