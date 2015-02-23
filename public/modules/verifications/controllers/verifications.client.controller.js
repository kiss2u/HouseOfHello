'use strict';

// Verifications controller
angular.module('verifications').controller('VerificationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Verifications',
	function($scope, $stateParams, $location, Authentication, Verifications) {
		$scope.authentication = Authentication;

		// Create new Verification
		$scope.create = function() {
			// Create new Verification object
			var verification = new Verifications ({
				veriNo: this.veriNo,
				material: this.material,
				style: this.style,
				size: this.size,
				veins: this.veins,
				color: this.color,
				agentID: this.agentID

			});

			// Redirect after save
			verification.$save(function(response) {
				$location.path('verifications/' + response._id);

				// Clear form fields
				$scope.veriNo = '';
				$scope.material = '';
				$scope.style = '';
				$scope.size = '';
				$scope.veins = '';
				$scope.color = '';
				$scope.agentID = '';

			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Verification
		$scope.remove = function(verification) {
			if ( verification ) { 
				verification.$remove();

				for (var i in $scope.verifications) {
					if ($scope.verifications [i] === verification) {
						$scope.verifications.splice(i, 1);
					}
				}
			} else {
				$scope.verification.$remove(function() {
					$location.path('verifications');
				});
			}
		};

		// Update existing Verification
		$scope.update = function() {
			var verification = $scope.verification;

			verification.$update(function() {
				$location.path('verifications/' + verification._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Verifications
		$scope.find = function() {
			$scope.verifications = Verifications.query();
		};

		// Find existing Verification
		$scope.findOne = function() {
			$scope.verification = Verifications.get({ 
				verificationId: $stateParams.verificationId
			});
		};
	}
]);