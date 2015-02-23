'use strict';

(function() {
	// Verifications Controller Spec
	describe('Verifications Controller Tests', function() {
		// Initialize global variables
		var VerificationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Verifications controller.
			VerificationsController = $controller('VerificationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Verification object fetched from XHR', inject(function(Verifications) {
			// Create sample Verification using the Verifications service
			var sampleVerification = new Verifications({
				name: 'New Verification'
			});

			// Create a sample Verifications array that includes the new Verification
			var sampleVerifications = [sampleVerification];

			// Set GET response
			$httpBackend.expectGET('verifications').respond(sampleVerifications);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.verifications).toEqualData(sampleVerifications);
		}));

		it('$scope.findOne() should create an array with one Verification object fetched from XHR using a verificationId URL parameter', inject(function(Verifications) {
			// Define a sample Verification object
			var sampleVerification = new Verifications({
				name: 'New Verification'
			});

			// Set the URL parameter
			$stateParams.verificationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/verifications\/([0-9a-fA-F]{24})$/).respond(sampleVerification);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.verification).toEqualData(sampleVerification);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Verifications) {
			// Create a sample Verification object
			var sampleVerificationPostData = new Verifications({
				name: 'New Verification'
			});

			// Create a sample Verification response
			var sampleVerificationResponse = new Verifications({
				_id: '525cf20451979dea2c000001',
				name: 'New Verification'
			});

			// Fixture mock form input values
			scope.name = 'New Verification';

			// Set POST response
			$httpBackend.expectPOST('verifications', sampleVerificationPostData).respond(sampleVerificationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Verification was created
			expect($location.path()).toBe('/verifications/' + sampleVerificationResponse._id);
		}));

		it('$scope.update() should update a valid Verification', inject(function(Verifications) {
			// Define a sample Verification put data
			var sampleVerificationPutData = new Verifications({
				_id: '525cf20451979dea2c000001',
				name: 'New Verification'
			});

			// Mock Verification in scope
			scope.verification = sampleVerificationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/verifications\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/verifications/' + sampleVerificationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid verificationId and remove the Verification from the scope', inject(function(Verifications) {
			// Create new Verification object
			var sampleVerification = new Verifications({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Verifications array and include the Verification
			scope.verifications = [sampleVerification];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/verifications\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleVerification);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.verifications.length).toBe(0);
		}));
	});
}());