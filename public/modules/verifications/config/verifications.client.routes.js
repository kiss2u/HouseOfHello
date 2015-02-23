'use strict';

//Setting up route
angular.module('verifications').config(['$stateProvider',
	function($stateProvider) {
		// Verifications state routing
		$stateProvider.
		state('listVerifications', {
			url: '/verifications',
			templateUrl: 'modules/verifications/views/list-verifications.client.view.html'
		}).
		state('createVerification', {
			url: '/verifications/create',
			templateUrl: 'modules/verifications/views/create-verification.client.view.html'
		}).
		state('viewVerification', {
			url: '/verifications/:verificationId',
			templateUrl: 'modules/verifications/views/view-verification.client.view.html'
		}).
		state('editVerification', {
			url: '/verifications/:verificationId/edit',
			templateUrl: 'modules/verifications/views/edit-verification.client.view.html'
		}).
		state('verifyByNo',{
			url: '/verify/:veriNo',
			templateUrl: 'modules/users/views/VER/ver.client.view.html'
		});

	}
]);