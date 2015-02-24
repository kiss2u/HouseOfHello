'use strict';


angular.module('core').controller('HomeController', ['$scope',
	function($scope) {
		// This provides Authentication context.
		//$scope.authentication = Authentication;

		$scope.myInterval = 500;
  		var slides = $scope.slides = [
  			{
  				image: 'http://www.houseofhello.com.hk/media/wysiwyg/slider_img_5.jpg',
  				text: 'purple'
  			},
  			{
  				image: 'http://www.houseofhello.com.hk/media/wysiwyg/slider_img_2.jpg',
  				text: 'black'
  			},
  			{
  				image: 'http://www.houseofhello.com.hk/media/wysiwyg/slider_img.jpg',
  				text: 'green'
  			}
  		];
	}
]);