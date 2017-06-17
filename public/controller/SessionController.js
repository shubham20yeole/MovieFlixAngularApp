(function(){
	'use strict';

	angular
	.module('mainApp')
	.controller('SessionController', SessionController);

	SessionController.$inject = ['LoginService', '$location'];

	function SessionController(LoginService, $location){
		console.log('Inside SessionController');
		var sessionVm = this;
		sessionVm.currentUser = null;
		sessionVm.message = null;
		sessionVm.status = false;

		init();
		function init(){
			LoginService.checkLogin()
			.then(function(status){
				var st = JSON.stringify(status);
				console.log("Check Login: "+status.data);
				var type = typeof status.data;
				if(type==="string"){
					sessionVm.currentUser = null;
					sessionVm.message = "No login found";
					sessionVm.status = false;
				}else{
					sessionVm.currentUser = status.data;
					sessionVm.message = "Welcome "+status.data.fullName;
					sessionVm.status = true;
				}
			})
		}

		
	}
})();

