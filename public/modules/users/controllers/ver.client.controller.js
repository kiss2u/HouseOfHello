'use strict';

// Verifications controller
angular.module('verifications').controller('veriCtrl', ['$scope', '$stateParams', 'Verifications',
	function($scope, $stateParams, Verifications) {
		// Create new Verification
		$scope.create = function() {
			// Create new Verification object
			var veri = new Verifications ({
				veriNo: this.veriNo,
				material: this.material,
				style: this.style,
				size: this.size,
				veins: this.veins,
				color: this.color,
				agentID: this.agentID

			});

		// Find existing Verification
		$scope.findOne = function() {
			$scope.veri = Verifications.get({ 
				veriNo: $stateParams.veriNo
			});
		};

	}
]);