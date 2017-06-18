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
      self.voteUp = voteUp;
      self.rateUp = rateUp;

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

      function voteUp(movId, uId){
        var $ans = $http.get('/voteUp/'+movId+'-'+uId);
        $ans.then(function(){
          
          });
          return $ans;
      }

      function rateUp(data){
        console.log("MovieDetailService.rateUp: "+data);
        var $ans = $http.get('/rateUp/'+data);
        $ans.then(function(){
          
        });
          return $ans;
      }


    }
    
})();