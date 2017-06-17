(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('MovieDetailController', MovieDetailController);

	MovieDetailController.$inject = ['MovieDetailService'];

	function MovieDetailController(MovieDetailService){
		console.log('Inside MovieDetailController');
		var movieDetailVm = this;
		movieDetailVm.message = "MOVIEDETAIL PAGE FROM BACKEND";

		movieDetailVm.addMovie = addMovie;
		movieDetailVm.deleteMovie = deleteMovie;

		init();
		function init(){
			movieDetailVm.header = 'NetFlix';
			MovieDetailService.getMovies()
			.then(function(movies){
				var st = JSON.stringify(movies);
				console.log("checkSessionServer is "+movies.data);
				movieDetailVm.movies = movies.data;
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

