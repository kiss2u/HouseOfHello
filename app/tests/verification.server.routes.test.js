'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Verification = mongoose.model('Verification'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, verification;

/**
 * Verification routes tests
 */
describe('Verification CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Verification
		user.save(function() {
			verification = {
				name: 'Verification Name'
			};

			done();
		});
	});

	it('should be able to save Verification instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Verification
				agent.post('/verifications')
					.send(verification)
					.expect(200)
					.end(function(verificationSaveErr, verificationSaveRes) {
						// Handle Verification save error
						if (verificationSaveErr) done(verificationSaveErr);

						// Get a list of Verifications
						agent.get('/verifications')
							.end(function(verificationsGetErr, verificationsGetRes) {
								// Handle Verification save error
								if (verificationsGetErr) done(verificationsGetErr);

								// Get Verifications list
								var verifications = verificationsGetRes.body;

								// Set assertions
								(verifications[0].user._id).should.equal(userId);
								(verifications[0].name).should.match('Verification Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Verification instance if not logged in', function(done) {
		agent.post('/verifications')
			.send(verification)
			.expect(401)
			.end(function(verificationSaveErr, verificationSaveRes) {
				// Call the assertion callback
				done(verificationSaveErr);
			});
	});

	it('should not be able to save Verification instance if no name is provided', function(done) {
		// Invalidate name field
		verification.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Verification
				agent.post('/verifications')
					.send(verification)
					.expect(400)
					.end(function(verificationSaveErr, verificationSaveRes) {
						// Set message assertion
						(verificationSaveRes.body.message).should.match('Please fill Verification name');
						
						// Handle Verification save error
						done(verificationSaveErr);
					});
			});
	});

	it('should be able to update Verification instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Verification
				agent.post('/verifications')
					.send(verification)
					.expect(200)
					.end(function(verificationSaveErr, verificationSaveRes) {
						// Handle Verification save error
						if (verificationSaveErr) done(verificationSaveErr);

						// Update Verification name
						verification.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Verification
						agent.put('/verifications/' + verificationSaveRes.body._id)
							.send(verification)
							.expect(200)
							.end(function(verificationUpdateErr, verificationUpdateRes) {
								// Handle Verification update error
								if (verificationUpdateErr) done(verificationUpdateErr);

								// Set assertions
								(verificationUpdateRes.body._id).should.equal(verificationSaveRes.body._id);
								(verificationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Verifications if not signed in', function(done) {
		// Create new Verification model instance
		var verificationObj = new Verification(verification);

		// Save the Verification
		verificationObj.save(function() {
			// Request Verifications
			request(app).get('/verifications')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Verification if not signed in', function(done) {
		// Create new Verification model instance
		var verificationObj = new Verification(verification);

		// Save the Verification
		verificationObj.save(function() {
			request(app).get('/verifications/' + verificationObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', verification.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Verification instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Verification
				agent.post('/verifications')
					.send(verification)
					.expect(200)
					.end(function(verificationSaveErr, verificationSaveRes) {
						// Handle Verification save error
						if (verificationSaveErr) done(verificationSaveErr);

						// Delete existing Verification
						agent.delete('/verifications/' + verificationSaveRes.body._id)
							.send(verification)
							.expect(200)
							.end(function(verificationDeleteErr, verificationDeleteRes) {
								// Handle Verification error error
								if (verificationDeleteErr) done(verificationDeleteErr);

								// Set assertions
								(verificationDeleteRes.body._id).should.equal(verificationSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Verification instance if not signed in', function(done) {
		// Set Verification user 
		verification.user = user;

		// Create new Verification model instance
		var verificationObj = new Verification(verification);

		// Save the Verification
		verificationObj.save(function() {
			// Try deleting Verification
			request(app).delete('/verifications/' + verificationObj._id)
			.expect(401)
			.end(function(verificationDeleteErr, verificationDeleteRes) {
				// Set message assertion
				(verificationDeleteRes.body.message).should.match('User is not logged in');

				// Handle Verification error error
				done(verificationDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Verification.remove().exec();
		done();
	});
});