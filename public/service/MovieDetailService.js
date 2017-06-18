(function(){
  'use strict';
  
   angular
    .module('mainApp')
    .service('MovieDetailService', MovieDetailService);
    
    MovieDetailService.$inject = ['$http', '$q'];
    
    function MovieDetailService($http, $q){
      var self = this;
      self.getMovie = getMovie;

      function getMovie(id){
        var $ans = $http.get('/getMovie/'+id);
        $ans.then(function(){
          
          });
          return $ans;
      }
    }
    
})();