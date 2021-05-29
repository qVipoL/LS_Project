function authMiddleware(req, res, next) {
	if (!req.session.authenticated) return res.json({ err: 'not_authorized' });

	next();
}

module.exports = authMiddleware;
