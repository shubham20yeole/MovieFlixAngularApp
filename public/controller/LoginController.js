(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('LoginController', LoginController);

	LoginController.$inject = ['LoginService', '$location', '$window'];

	function LoginController(LoginService, $location, $window){
		console.log('Inside LoginController');
		var loginVm = this;
		loginVm.message = "Register/Login";

		loginVm.addUser = addUser;
		loginVm.login = login;

		loginVm.deleteMovie = deleteMovie;
		init();
		function init(){
			// LoginService.getUsers()
			// .then(function(movies){
			// 	var st = JSON.stringify(movies);
			// 	console.log("checkSessionServer is "+movies.data);
			// 	movieDetailVm.movies = movies.data;
			// })
		}

		function addUser(){
			LoginService.addUser(loginVm.newUser)
			.then(function(user){
				loginVm.message = user.data;
			})
			loginVm.newUser=null;
		}

		function login(){
			LoginService.login(loginVm.user)
			 .then(function(user){
				var st = JSON.stringify(user);
				var type = typeof user.data;
				if(type==="string"){
					loginVm.message = "Credentials incorrect.";
				}else{
					$window.location.reload();
					loginVm.message = "Welcome "+user.data.fullName;
					$location.path('/movieList/'+0);
				}
			})
		}

		function deleteMovie(title){
			_.remove(loginVm.movies, function(movie){
				console.log(title);
				return movie.title===title;
			})
		}
	}
})();

