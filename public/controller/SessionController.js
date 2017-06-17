(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('SessionController', SessionController);


	function SessionController(){
		console.log('Inside SessionController');
		var sessionVm = this;
		sessionVm.currentUser = null;
		sessionVm.message = null;
		sessionVm.status = false;

		init();
		function init(){
			
		}

		
	}
})();

