'use strict';


angular.module('core').controller('HomeController', '$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		//$scope.authentication = Authentication;

		$scope.myInterval = 5000;
  		var slides = $scope.slides = [
  			{
  				image: 'modules/core/img/sildes/sildes-1.jpg',
  				text: 'kelly'
  			},
  			{
  				image: 'modules/core/img/sildes/sildes-2.jpg',
  				text: 'sonia'
  			},
  			{
  				image: 'modules/core/img/sildes/sildes-3.jpg',
  				text: 'ares'
  			},
  			{
  				image: 'modules/core/img/sildes/sildes-4.jpg',
  				text: 'justin'
  			},
  		];
	}
);