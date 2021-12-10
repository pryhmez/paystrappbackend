
const AppError = require('../utils/appError');
const bcrypt = require("bcrypt");

const userModel = require('../models/user');
const accountModel = require('../models/account');
const { signInUser } = require('../services/authServices');


module.exports = (req, res, next) => {
	try {
		let pin = req.header('pin');
		// console.log(pin, req.body.email);

		signInUser(req.body).then((user) => {

			if (!user) {
				// return next(new AppError('Email does not exist in our Database, please sign up', 401));
				res
				  .status(401)
				  .send({
					 successful: false,
					 message: "Email does not exist in our Database, please sign up",
					 data: req.body.email,
						pin
				  })
				  .end();
				return;
			 }		
			 
			 bcrypt.compare(pin, user.transactionPin, (err, result) => {

				if(result) {
					next()
				} else {
					res.status(401).send({
						successful: false,
						message: "Incorrect Pin",
						data: req.body
					})
				}

			 })
			 
		})



	} catch (err) {
		if (err) {
			return next(new AppError(`Authentication failed ${err} + ${pin}`, 400));
		}
	}
};
