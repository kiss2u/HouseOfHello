'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var verifications = require('../../app/controllers/verifications.server.controller');
	//var verifyByNo = require('module/users/controllers/ver.client.controller');

	// Verifications Routes
	app.route('/verifications')
		.get(verifications.list)
		.post(users.requiresLogin, verifications.create);

	app.route('/verifications/:verificationId')
		.get(verifications.read)
		.put(users.requiresLogin, verifications.hasAuthorization, verifications.update)
		.delete(users.requiresLogin, verifications.hasAuthorization, verifications.delete);

	// Finish by binding the Verification middleware
	app.route('/verify')
		.get(verifications.list);


	app.param('verificationId', verifications.verificationByID);

};
