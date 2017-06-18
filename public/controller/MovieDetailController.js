(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('MovieDetailController', MovieDetailController);

	MovieDetailController.$inject = ['MovieDetailService', '$routeParams'];

	function MovieDetailController(MovieDetailService, $routeParams){
		console.log('Inside MovieDetailController');
		var movieDetailVm = this;
		movieDetailVm.message = "MOVIEDETAIL PAGE FROM BACKEND";

		movieDetailVm.addMovie = addMovie;
		movieDetailVm.deleteMovie = deleteMovie;
		movieDetailVm.deleteMovie = deleteMovie;
    	init($routeParams.id);

		function init(id){
			MovieDetailService.getMovie(id)
			.then(function(movie){
				var st = JSON.stringify(movie);
				console.log("MovieDetailController.init: "+movie.data);
				movieDetailVm.movie = movie.data;
			})
		}

		function addMovie(){
			console.log("In add movie method: "+movieDetailVm.newMovie);
			// movieDetailVm.movies.push(movieDetailVm.newMovie);
			movieDetailVm.movies.unshift(movieDetailVm.newMovie);
			movieDetailVm.newMovie=null;
		}

		function deleteMovie(title){
			_.remove(movieDetailVm.movies, function(movie){
				console.log(title);
				return movie.title===title;
			})
		}
	}
})();

