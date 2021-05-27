function createEmployee(req, res) {
	console.log('createEmp');
}

function updateEmployee(req, res) {
	const { id } = req.params;

	console.log(`updateEmp id : ${id}`);
}

function deleteEmployee(req, res) {
	const { id } = req.params;

	console.log(`deleteEmp id : ${id}`);
}

function getEmployee(req, res) {
	const { id } = req.params;

	console.log(`getEmp id : ${id}`);
}

function getAllEmployees(req, res) {
	console.log('getAllEmp');
}

module.exports = {
	createEmployee,
	updateEmployee,
	deleteEmployee,
	getEmployee,
	getAllEmployees
};
