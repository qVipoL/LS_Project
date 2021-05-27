function authMiddleware(req, res, next) {
	if (!req.session.authenticated) return res.status(403).send('Not authorized');

	next();
}

module.exports = authMiddleware;
