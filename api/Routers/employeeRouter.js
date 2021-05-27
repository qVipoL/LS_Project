const express = require('express');
const epmloyeeController = require('../Controller/epmloyeeController');
const authMiddleware = require('../Middleware/authMiddleware');

const employeeRouter = express.Router();

employeeRouter.use(authMiddleware);

employeeRouter.post('/', epmloyeeController.createEmployee);

employeeRouter.put('/:id', epmloyeeController.updateEmployee);

employeeRouter.delete('/:id', epmloyeeController.deleteEmployee);

employeeRouter.get('/:id', epmloyeeController.getEmployee);

employeeRouter.get('/', epmloyeeController.getAllEmployees);

module.exports = employeeRouter;
