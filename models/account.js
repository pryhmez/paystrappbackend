var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
	userId: {
		type: String,
		required: true,
		trim: true
	},

	transactionPin: {
		type: String,
		trim: true,
		
	},

	email: {
		type: String,
		required: true,
		lowercase: true,
		// index: {unique: true, dropDups: true},
		unique: true
	},

	walletBalance: {
		type: String,
		required: true,
		lowercase: true,
		default: "0"
	},

	timer: {
		type: String,
		required: true,
		trim: truef
	},

	transactionLog: [
		{
			type: { type: String},
			time: { type: Date, default: new Date().now},
			amount: { type: String},
			walletBalanceAfter: { type: String}
		}
	],

	createdDate: { type: Date, default: new Date() },

});

module.exports = mongoose.model('Accounts', AccountSchema);
