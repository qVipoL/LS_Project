const Employee = require('../Model/Employee');

function login(req, res) {
	const { email, password } = req.body;

	if (!email || !password) return res.status(400).send('No data passed');

	if (req.session.authenticated) return res.json(req.session);

	Employee.findOne({ email }, (err, employee) => {
		if (err) return res.status(403).send('User does not exits');

		if (employee.password !== password) return res.status(403).send('Invalid password');

		const { firstName, lastName, email } = employee;

		req.session.authenticated = true;

		req.session.employee = { firstName, lastName, email };

		res.json(req.session);
	});
}

function register(req, res) {
	if (req.session.authenticated) return res.json(req.session);

	if (!req.body) return res.status(400).send('No data passed');

	const { firstName, lastName, email, password, phone, adress } = req.body;

	const employee = new Employee({ firstName, lastName, email, password, phone, adress });

	employee.save((err, employee) => {
		if (err) return res.json(err);

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
