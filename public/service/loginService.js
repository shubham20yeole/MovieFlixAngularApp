(function(){
  'use strict';
  
   angular
    .module('mainApp')
    .service('LoginService', LoginService)
    .config(function ($httpProvider) {
      $httpProvider.defaults.headers.common = {};
      $httpProvider.defaults.headers.post = {};
      $httpProvider.defaults.headers.put = {};
      $httpProvider.defaults.headers.patch = {};
    });;
    
    LoginService.$inject = ['$http', '$q'];
    
    function LoginService($http, $q){
      var self = this;
      self.getMovies = getMovies;
      self.addUser = addUser;
      
      function getMovies(){
    	  var $ans = $http.get('http://localhost:8002/movieflix/api/dashboard');
    	  $ans.then(function(){
    		  
          });
          return $ans;
      }

      function addUser(newUser){
        var st = JSON.stringify(newUser);
        console.log("In User Service: "+st); 

        return $http({
                url: '/newUser',
                method: "POST",
                data: newUser,
                headers: { 'Content-Type': 'application/JSON' }
            }).then(function (response) {
                // success
                console.log('success');
                console.log("then : " + JSON.stringify(response));
            }, function (response) { // optional
                // failed
                console.log('failed');
                // console.log(JSON.stringify(response));
            });
      }
    }
})();