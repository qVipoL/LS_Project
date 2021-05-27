const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	email: {
		type: String,
		unique: true,
		required: true
	},
	password: {
		type: String,
		default: null
	},
	phone: {
		type: String,
		default: null
	},
	adress: {
		type: String,
		default: null
	},
	startDate: {
		type: Date,
		default: Date.now()
	}
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
