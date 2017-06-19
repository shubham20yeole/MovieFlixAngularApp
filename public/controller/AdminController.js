(function(){
	'use strict';

	angular.module('mainApp').controller('AdminController', AdminController);

	AdminController.$inject = ['LoginService', 'MovieListService', '$location', '$window'];

	function AdminController(LoginService, MovieListService, $location, $window){
		console.log('Inside AdminController');
		var adminVm = this;

		adminVm.addMovie = addMovie;
		adminVm.removeMovie = removeMovie;
		adminVm.updateMovie = updateMovie;
		
		init();
		function init(){
			MovieListService.getAllMovies()
			.then(function(movies){
				var jsonToString = JSON.stringify(movies);
				console.log("AdminController.init.getMovies: "+movies);
				adminVm.movies = movies.data;
			})
		}

		function addMovie(){
			var newMovie = adminVm.newMovie;
			var jsonToString = JSON.stringify(newMovie);
			console.log("AdminController.addMovie: "+jsonToString);
			MovieListService.addMovie(newMovie)
			.then(function(movie){
				adminVm.movies = movie.data;
			})
		}

		function removeMovie(id){
			var r = confirm("Are you sure you want to remove this movie?");
			if (r == true) {
				console.log("AdminController.removeMovie: "+id);
				MovieListService.removeMovie(id)
				.then(function(movie){
					adminVm.movies = movie.data;
				})
			}
		}

		function updateMovie(id){
			console.log("AdminController.removeMovie: "+id);
			MovieListService.removeMovie(id)
			.then(function(movie){
				adminVm.movies = movie.data;
			})
		}

	}
})();

