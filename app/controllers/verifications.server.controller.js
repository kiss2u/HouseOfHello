'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Verification = mongoose.model('Verification'),
	_ = require('lodash');

/**
 * Create a Verification
 */
exports.create = function(req, res) {
	var verification = new Verification(req.body);
	verification.user = req.user;

	verification.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(verification);
		}
	});
};

/**
 * Show the current Verification
 */
exports.read = function(req, res) {
	res.jsonp(req.verification);
};

/**
 * Update a Verification
 */
exports.update = function(req, res) {
	var verification = req.verification ;

	verification = _.extend(verification , req.body);

	verification.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(verification);
		}
	});
};

/**
 * Delete an Verification
 */
exports.delete = function(req, res) {
	var verification = req.verification ;

	verification.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(verification);
		}
	});
};

/**
 * List of Verifications
 */
exports.list = function(req, res) { 
	Verification.find().sort('-created').populate('user', 'displayName').exec(function(err, verifications) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(verifications);
		}
	});
};

/**
 * Verification middleware
 */
exports.verificationByID = function(req, res, next, id) { 
	Verification.findById(id).populate('user', 'displayName').exec(function(err, verification) {
		if (err) return next(err);
		if (! verification) return next(new Error('Failed to load Verification ' + id));
		req.verification = verification ;
		next();
	});
};

/**
 * Verification authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.verification.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
