const jwt = require('jsonwebtoken');

const authentication = async (req, res, next) => {
	try {
		const token = req.
			header('Authorization').replace('Bearer ', '');
		const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
		req.token = token;
		req.userId = decode.aud;
		next();
	} catch (err) {
		const message = (err.name === 'JsonWebTokenError') ? 'Unauthorized' : err.message
		res.status(401).send({ message });
	}
}
const generateAccessToken = async (userId) => {
	try {
		const payload = {}
		const secret = process.env.ACCESS_TOKEN_KEY;
		const options = {
			expiresIn: '1h',
			audience: userId,
			issuer: 'chirag@gmail.com'
		}
		const token = jwt.sign(payload, secret, options);
		return token;
	} catch (err) {
		throw err
	}
}

const generateRefreshToken = async (userId) => {
	try {
		const payload = {}
		const secret = process.env.REFRESH_TOKEN_KEY;
		const options = {
			expiresIn: '1d',
			audience: userId,
			issuer: 'chirag@gmail.com'
		}
		const token = jwt.sign(payload, secret, options);
		return token;
	} catch (err) {
		throw err
	}
}

const authenticationRefreshToken = async (token) => {
	try {
		const decode = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
		const userId = decode.aud;
		return userId
	} catch (err) {
		throw err;
	}
}

module.exports = { authentication, generateAccessToken, generateRefreshToken, authenticationRefreshToken }