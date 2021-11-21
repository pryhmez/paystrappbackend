const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');

module.exports = (req, res, next) => {
	let token = req.header('X-auth-token');
	// console.log(token);
	try {
		const decoded = jwt.verify(token, process.env.JWTSECRET);
		if (decoded.exp > Date.now() / 1000) {
			// console.log(decoded);
			req.body.user = decoded.userId;
			req.body.email = decoded.email;
			next();
		} else {
			return next(new AppError('access denied session ended please signin again', 401));
		}
	} catch (err) {
		if (err) {
			return next(new AppError(`Authentication failed ${err} + ${token}`, 403));
		}
	}
};
