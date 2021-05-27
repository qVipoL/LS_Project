const express = require('express');
const authController = require('../Controller/authController');
const authMiddleware = require('../Middleware/authMiddleware');

const authRouter = express.Router();

authRouter.post('/login', authController.login);

authRouter.post('/register', authController.register);

authRouter.get('/logout', authMiddleware, authController.logout);

module.exports = authRouter;
