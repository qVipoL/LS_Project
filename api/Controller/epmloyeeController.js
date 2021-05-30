const Employee = require('../Model/Employee');

function createEmployee(req, res) {
	if (!req.body) return res.json({ err: 'no_data' });

	const { firstName, lastName, email, password, phone, address } = req.body;

	if (!firstName || !lastName || !email || !password) return res.json({ err: 'invalid_data' });

	const employee = new Employee({ firstName, lastName, email, password, phone, address });

	employee.save((err, employee) => {
		if (err) return res.json({ err: 'User Already Exists' });

		res.json(employee);
	});
}

function updateEmployee(req, res) {
	if (!req.body) return res.json({ err: 'no_data' });

	const { id } = req.params;

	const { firstName, lastName, email, phone, address } = req.body;

	const newEmployee = { firstName, lastName, email, phone, address };

	Employee.findByIdAndUpdate(id, newEmployee, { new: true }, (err, employee) => {
		if (err) return res.json({ err: 'not_found' });
		res.json(employee);
	});
}

function deleteEmployee(req, res) {
	const { id } = req.params;

	Employee.findByIdAndDelete(id, (err, employee) => {
		if (err) return res.json({ err: 'not_found' });

		res.json(employee);
	});
}

function getEmployee(req, res) {
	const { id } = req.params;
	Employee.findById(id, (err, employee) => {
		if (err) return res.status(400).send('Employee not found');
		res.json(employee);
	});
}

function getAllEmployees(req, res) {
	Employee.find({}, (err, employees) => {
		if (err) return res.status(400).send('No Employees were found');

		res.json(employees);
	});
}

module.exports = {
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
	getAllEmployees
};
