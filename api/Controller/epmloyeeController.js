const Employee = require('../Model/Employee');

function createEmployee(req, res) {
	if (!req.body) return res.status(400).send('No data passed');

	const { firstName, lastName, email, password, phone, adress } = req.body;

	const employee = new Employee({ firstName, lastName, email, password, phone, adress });

	employee.save((err, employee) => {
		if (err) return res.json(err);

		res.json(employee);
	});
}

function updateEmployee(req, res) {
	if (!req.body) return res.status(400).send('No data passed');

	const { id } = req.params;

	const { firstName, lastName, email, password, phone, adress } = req.body;

	const newEmployee = { firstName, lastName, email, password, phone, adress };

	Employee.findByIdAndUpdate(id, newEmployee, { new: true }, (err, employee) => {
		if (err) return res.json(err);
		res.json(employee);
	});
}

function deleteEmployee(req, res) {
	const { id } = req.params;

	Employee.findByIdAndDelete(id, (err, employee) => {
		if (err) return res.status(400).send('Employee not found');

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
