'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Verification Schema
 */
var VerificationSchema = new Schema({
	veriNo: {
		type: String,
		default: '',
		required: 'Please fill the Verification Number!',
		trim: true
	},
	material: {
		type: String,
		default: '',
		trim: true
	},
	style: {
		type: String,
		default: '',
		trim: true
	},
	size: {
		type: String,
		default: '',
		trim: true
	},
	veins: {
		type: String,
		default: '',
		trim: true
	},
	color: {
		type: String,
		default: '',
		trim: true
	},
	agentID: {
		type: String,
		default: '',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Verification', VerificationSchema);