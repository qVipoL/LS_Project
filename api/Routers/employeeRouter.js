const express = require('express');
const epmloyeeController = require('../Controller/epmloyeeController');

const employeeRouter = express.Router();

// TODO: Add middleware that checks authariztion

employeeRouter.post('/', epmloyeeController.createEmployee);

employeeRouter.put('/:id', epmloyeeController.updateEmployee);

employeeRouter.delete('/:id', epmloyeeController.deleteEmployee);

employeeRouter.get('/:id', epmloyeeController.getEmployee);

employeeRouter.get('/', epmloyeeController.getAllEmployees);

module.exports = employeeRouter;
