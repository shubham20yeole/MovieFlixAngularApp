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
		movieDetailVm.voteUp = voteUp;
		movieDetailVm.rateUp = rateUp;
		movieDetailVm.test = test;

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

		function voteUp(ids){
			var id = ids.split("-");
			var movId = id[0];
			var userId = id[1];
			console.log("MovieDetailController.voteUp: "+id[0]+", "+id[1]);
			MovieDetailService.voteUp(movId, userId)
			.then(function(voted){
				movieDetailVm.movie.imdbVotes = voted.data.imdbVotes;
				var st = JSON.stringify(voted);
				console.log("MovieDetailController.voteUp: "+voted.data.imdbVotes);
			})
		}

		function rateUp(data){
			MovieDetailService.rateUp(data)
			.then(function(rated){
				movieDetailVm.movie.imdbRating = rated.data.imdbRating;
				var st = JSON.stringify(rated);
				console.log("MovieDetailController.rateUp: "+rated.data.imdbRating);
			})
		}

		function addMovie(){
			console.log("MovieDetailController.addMovie: "+movieDetailVm.newMovie);
			// movieDetailVm.movies.push(movieDetailVm.newMovie);
			movieDetailVm.movies.unshift(movieDetailVm.newMovie);
			movieDetailVm.newMovie=null;
		}

		function test(id){
			console.log("TESTED RATING BUTTON: "+id)
		}

		
	}
})();



function flipLike(x) {
	x.classList.toggle("fa-thumbs-down");
}
