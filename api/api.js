const express = require('express');
const employeeRouter = require('./Routers/employeeRouter');
const authRouter = require('./Routers/authRouter');
const mongoose = require('mongoose');

const app = express();
const port = 4000;
const dbConnection =
	'mongodb+srv://Andrey:By0QUL87ebIMq8uu@cluster0.gmzcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(express.json());

app.use('/employees', employeeRouter);

app.use('/auth', authRouter);

app.use((req, res) => {
	res.status(404).send('Endpoint not found');
});

mongoose.connect(dbConnection, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false }, (err) => {
	if (err) return console.log(err);

	app.listen(port, () => {
		console.log(`Api started on port ${port}`);
	});
});
