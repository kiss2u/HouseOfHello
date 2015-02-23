'use strict';

//Verifications service used to communicate Verifications REST endpoints
angular.module('verifications').factory('Verifications', ['$resource',
	function($resource) {
		return $resource('verifications/:verificationId', { verificationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);