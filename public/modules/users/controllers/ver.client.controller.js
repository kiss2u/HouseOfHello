'use strict';

angular.module('users').controller('VeriCtl', ['$scope', '$http', 'veriNo',
	function($scope, $http, $location, veriNo) {
		$scope.veriNo = veriNo;

		// If user is signed in then redirect back home
		//if ($scope.verification.user) $location.path('/');

		
	}
]);