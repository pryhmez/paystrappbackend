var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: {
		type: String,
		required: true,
		trim: true
	},

	lastName: {
		type: String,
		required: true,
		trim: true
	},

	email: {
		type: String,
		required: true,
		lowercase: true,
		// index: {unique: true, dropDups: true},
		unique: true
	},

	phone: {
		type: String,
		required: true,
		lowercase: true,
		// index: {unique: true, dropDups: true},
		unique: true
	},

	password: {
		type: String,
		required: true,
		trim: true
	},

	transactionPin: {
		type: String,
		trim: true
	},

	emailVerified: {
		type: String,
		required: true,
		trim: true,
		default: "false"
	},

	phoneVerified: {
		type: String,
		required: true,
		trim: true,
		default: "false"
	},

	accountBalance: {
		type: String,
		required: true,
		trim: true,
		default: "0"
	},

	createdDate: { type: Date, default: new Date() },

});

module.exports = mongoose.model('User', UserSchema);
