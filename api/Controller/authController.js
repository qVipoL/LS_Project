const Employee = require('../Model/Employee');

function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) return res.json({ err: 'invalid_data' });

	if (req.session.authenticated) return res.json(req.session);

	Employee.findOne({ email }, (err, employee) => {
		if (err || !employee) return res.json({ err: 'Bad Credentials' });

		if (employee.password !== password) return res.json({ err: 'Bad Credentials' });

		const { firstName, lastName, email } = employee;

		req.session.authenticated = true;

		req.session.employee = { firstName, lastName, email };

		res.json(req.session);
	});
}

function register(req, res) {
	if (req.session.authenticated) return res.json(req.session);

	const { firstName, lastName, email, password } = req.body;

	if (!firstName || !lastName || !email || !password) return res.json({ err: 'invalid_data' });

	const employee = new Employee({ firstName, lastName, email, password });

	employee.save((err, employee) => {
		if (err) return res.json({ err: 'User Already Exists' });

		req.session.authenticated = true;

		req.session.employee = { firstName, lastName, email };

		res.json(req.session);
	});
}

function logout(req, res) {
	req.session.authenticated = false;

	return res.json({ msg: 'logged_out' });
}

module.exports = {
	login,
	register,
	logout
};
