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

	accountName: {
		type: String,
		required: true,
		lowercase: true,
	},

	accountNo: {
		type: String,
		required: true,
		lowercase: true,
	},

	bank: {
		type: Object,
		required: true,
		lowercase: true,
	},

	walletBalance: {
		type: String,
		required: true,
		lowercase: true,
		default: "0"
	},

	transactionLog: [
		{
			type: { type: String},
			details: { type: Object},
			time: { type: Date, default: new Date().getTime()},
			amount: { type: String},
			walletBalanceAfter: { type: String}
		}
	],

	createdDate: { type: Date, default: new Date() },

});

module.exports = mongoose.model('Accounts', AccountSchema);
