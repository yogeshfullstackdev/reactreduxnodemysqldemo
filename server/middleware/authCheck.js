const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = (req, res, next) => {

	try {

		if (!req.headers.authorization) {
			return res.status(401).end();
		}
	
		const token = req.headers.authorization.split(' ')[1];
	
		return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
	
			if (err) { 
				return res.status(401).end(); 
			}
	
			req.userData = {};
			req.userData.tokenID  = token;
			req.userData.userid = decoded.id;
			req.userData.username = decoded.username;
	
			return next();
	
	
		});

		/* const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(
		  token,
		  'SECRETKEY'
		);
		req.userData = decoded;
		next(); */

	} catch (err) {
		return res.status(401).send({
		  msg: 'Your session is not valid!'
		});
	}

};

/* module.exports = (req, res, next) => {

	if (!req.headers.authorization) {
		return res.status(401).end();
	}

	const token = req.headers.authorization.split(' ')[1];

	return jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {

		if (err) { 
			return res.status(401).end(); 
		}

		req.userData = {};
		req.userData.tokenID  = token;
		req.userData.userid = decoded.id;
		req.userData.username = decoded.username;

	  	return next();


	});

}; */
