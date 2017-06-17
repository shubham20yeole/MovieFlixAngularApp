(function(){
  'use strict';
  
   angular
    .module('mainApp')
    .service('LoginService', LoginService);
    
    LoginService.$inject = ['$http', '$q'];
    
    function LoginService($http, $q){
      var self = this;
       
      self.addUser = addUser;
      self.login = login;
      self.checkLogin = checkLogin;

      function addUser(newUser){
        var st = JSON.stringify(newUser);
        console.log("In User Service: "+st); 
        var $ans = $http.post('/newuser',newUser);
        $ans.then(function (response) {
              console.log('success');
              console.log("then : " + JSON.stringify(response));
          }, function (response) { // optional
                console.log('failed');
        });
        return $ans;
        
      }


      function login(user){
        var result = "";
        var $ans = $http.post('/login',user);
        $ans.then(function (response) {});
        return $ans;
      }

      function checkLogin(){
        var result = "";
        var $ans = $http.get('/checkLogin');
        $ans.then(function (response) {});
        return $ans;
      }

      

    }
})();