(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['LoginService'];

	function LoginController(LoginService){
		console.log('Inside LoginController');
		var loginVm = this;
		loginVm.message = "LOGIN PAGE FROM BACKEND";

		loginVm.addUser = addUser;

		loginVm.deleteMovie = deleteMovie;
		init();
		function init(){
			
		}

		function addUser(){
			loginVm.newUser.type = "user";
			var st = JSON.stringify(loginVm.newUser);
			// console.log("In add movie method: "+st);
			LoginService.addUser(loginVm.newUser)
			// loginVm.movies.push(loginVm.newMovie);
			loginVm.newUser=null;
		}

		function deleteMovie(title){
			_.remove(loginVm.movies, function(movie){
				console.log(title);
				return movie.title===title;
			})
		}
	}
})();

