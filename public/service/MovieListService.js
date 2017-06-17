(function(){
  'use strict';
  
   angular
    .module('mainApp')
    .service('MovieListService', MovieListService);
    
    MovieListService.$inject = ['$http', '$q'];
    
    function MovieListService($http, $q){
      var self = this;
      self.getMovies = getMovies;
      
      function getMovies(){
    	  var $ans = $http.get('/getMovies');
    	  $ans.then(function(){
    		  
          });
          return $ans;
      }
    }
    
})();