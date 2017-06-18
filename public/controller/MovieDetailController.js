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
    	init($routeParams.id);

		function init(id){
			window.scrollTo(230, 230);
			MovieDetailService.getMovie(id)
			.then(function(movie){
				var st = JSON.stringify(movie);
				console.log("MovieDetailController.init.getMovie: "+movie.data);
				movieDetailVm.movie = movie.data;
			})

			MovieDetailService.getLatestMovies()
			.then(function(latestMovies){
				var st = JSON.stringify(latestMovies);
				console.log("MovieDetailController.init.getLatestMovies: "+latestMovies.data);
				movieDetailVm.latestMovies = latestMovies.data;
			})
		}

		function addMovie(){
			console.log("In add movie method: "+movieDetailVm.newMovie);
			// movieDetailVm.movies.push(movieDetailVm.newMovie);
			movieDetailVm.movies.unshift(movieDetailVm.newMovie);
			movieDetailVm.newMovie=null;
		}
	}
})();

