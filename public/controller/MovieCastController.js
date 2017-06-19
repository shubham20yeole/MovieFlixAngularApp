(function(){
  'use strict';

  angular
  .module('mainApp')
  .controller('MovieCastController', MovieCastController);

  MovieCastController.$inject = ['MovieDetailService', '$location', '$routeParams'];

  function MovieCastController(MovieDetailService, $location, $routeParams){
    console.log('Inside MovieCastController');
    var movieCastVm = this;

      movieCastVm.updateMovie = updateMovie;

      init($routeParams.id);
      function init(id){
        // window.scrollTo(230, 230);
        MovieDetailService.getMovie(id)
        .then(function(movie){
          var st = JSON.stringify(movie);
          console.log("MovieCastController.init.getMovie: "+movie.data);
          movieCastVm.movie = movie.data;
          movieCastVm.newMovie = movie.data;
        })
      }

      function updateMovie(){
        var newMovie = movieCastVm.newMovie;
        MovieDetailService.updateMovie(newMovie)
        .then(function(newMovie){
          var jsonToString = JSON.stringify(newMovie);
          console.log("AdminController.updateMovie: "+jsonToString);
          movieCastVm.newMovie = newMovie.data;
          movieCastVm.movie = newMovie.data;
          $location.path('/admin');
        })
      }
  }
})();
