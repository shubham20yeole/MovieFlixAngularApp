(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('MovieListController', MovieListController);

	MovieListController.$inject = ['MovieListService', '$location'];

	function MovieListController(MovieListService, $location ){
		console.log('Inside MovieListController');
		var movieListVm = this;
		movieListVm.message = "MOVIE LIST PAGE FROM BACKEND";

		movieListVm.addMovie = addMovie;
		movieListVm.deleteMovie = deleteMovie;
		movieListVm.detailView = detailView;

		init();
		function init(){
			window.scrollTo(230, 230);
			movieListVm.header = 'NetFlix';
			MovieListService.getMovies()
			.then(function(movies){
				var st = JSON.stringify(movies);
				console.log("MovieListController.init"+movies.data);
				movieListVm.movies = movies.data;
			})
		}

		function addMovie(){
			console.log("MovieListController.addMovie: "+movieListVm.newMovie);
			// movieListVm.movies.push(movieListVm.newMovie);
			movieListVm.movies.unshift(movieListVm.newMovie);
			movieListVm.newMovie=null;
		}

		function detailView(id){
			console.log("MovieListController.detailView: "+id);
			$location.path('/movieDetail/'+id);
		}

		function deleteMovie(title){
			_.remove(movieListVm.movies, function(movie){
				console.log(title);
				return movie.title===title;
			})
		}
	}
})();

