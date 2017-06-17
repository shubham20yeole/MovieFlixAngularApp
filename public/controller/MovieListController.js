(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('MovieListController', MovieListController);

	MovieListController.$inject = ['MovieListService'];

	function MovieListController(MovieListService){
		console.log('Inside MovieListController');
		var movieListVm = this;
		movieListVm.message = "MOVIE LIST PAGE FROM BACKEND";

		movieListVm.addMovie = addMovie;
		movieListVm.deleteMovie = deleteMovie;

		init();
		function init(){
			movieListVm.header = 'NetFlix';
			MovieListService.getMovies()
			.then(function(movies){
				var st = JSON.stringify(movies);
				console.log("checkSessionServer is "+movies.data);
				movieListVm.movies = movies.data;
			})
		}

		function addMovie(){
			console.log("In add movie method: "+movieListVm.newMovie);
			// movieListVm.movies.push(movieListVm.newMovie);
			movieListVm.movies.unshift(movieListVm.newMovie);
			movieListVm.newMovie=null;
		}

		function deleteMovie(title){
			_.remove(movieListVm.movies, function(movie){
				console.log(title);
				return movie.title===title;
			})
		}
	}
})();

