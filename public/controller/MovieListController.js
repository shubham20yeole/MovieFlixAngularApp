(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('MovieListController', MovieListController);

	MovieListController.$inject = ['MovieListService', '$location', '$routeParams'];

	function MovieListController(MovieListService, $location, $routeParams){
		console.log('Inside MovieListController');
		var movieListVm = this;
		movieListVm.message = "MOVIE LIST PAGE FROM BACKEND";

		movieListVm.addMovie = addMovie;
		movieListVm.deleteMovie = deleteMovie;
		movieListVm.detailView = detailView;
		movieListVm.getTopRatedMovies = getTopRatedMovies;
		movieListVm.getPaginatedMovies = getPaginatedMovies;
		movieListVm.getTopRatedSeries = getTopRatedSeries;
		movieListVm.setOrder = setOrder;

		init($routeParams.id);
		function init(pageno){
			movieListVm.header = 'NetFlix';
			MovieListService.getMovies(pageno)
			.then(function(movies){
				var st = JSON.stringify(movies);
				console.log("MovieListController.init.getMovies"+movies.data);
				movieListVm.movies = movies.data;
			})
			MovieListService.getPaginationData(pageno)
			.then(function(pageData){
				movieListVm.first = pageData.data.first;
				movieListVm.prev = pageData.data.prev;
				movieListVm.next = pageData.data.next;
				movieListVm.last = pageData.data.last;
				movieListVm.pager = pageData.data.pager;
				movieListVm.curr = pageData.data.curr;
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

		function getTopRatedMovies(){
			console.log("MovieListController.getTopRatedMovies: ");
			MovieListService.getTopRatedMovies()
			.then(function(topRatedMovies){
				var st = JSON.stringify(topRatedMovies);
				console.log("MovieListController.init.getMovies"+st.data);
				movieListVm.movies = topRatedMovies.data;
			})
		}

		function getTopRatedSeries(){
			console.log("MovieListController.getTopRatedSeries: ");
			MovieListService.getTopRatedSeries()
			.then(function(topRatedSeries){
				var st = JSON.stringify(topRatedSeries);
				console.log("MovieListController.init.getMovies"+st.data);
				movieListVm.movies = topRatedSeries.data;
			})
		}

		function getPaginatedMovies(id){
			console.log("MovieListController.getPaginatedMovies: ");
			MovieListService.getPaginatedMovies(id)
			.then(function(PaginatedMovies){
				var st = JSON.stringify(PaginatedMovies);
				console.log("MovieListController.init.getMovies"+st.data);
				movieListVm.movies = PaginatedMovies.data;
			})

			MovieListService.getPaginationData(id)
			.then(function(pageData){
				movieListVm.first = pageData.data.first;
				movieListVm.prev = pageData.data.prev;
				movieListVm.next = pageData.data.next;
				movieListVm.last = pageData.data.last;
				movieListVm.pager = pageData.data.pager;
				movieListVm.curr = pageData.data.curr;
			})

		}

		function deleteMovie(title){
			_.remove(movieListVm.movies, function(movie){
				console.log(title);
				return movie.title===title;
			})
		}

		function setOrder(order){
			console.log(order)
			movieListVm.order = order;
		}
	}
})();

function getCssClass(one, two){
	console.log("WHAT TO RETURN: "+one+", "+two)
	if(one===two) return "active";
	else return "";
}
