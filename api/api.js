const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const employeeRouter = require('./Routers/employeeRouter');
const authRouter = require('./Routers/authRouter');

const app = express();
const store = new session.MemoryStore();
const port = 4000;
const dbConnection =
	'mongodb+srv://Andrey:By0QUL87ebIMq8uu@cluster0.gmzcd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

app.use(
	session({
		secret: 'a1b2c3d4',
		cookie: { maxAge: 24 * 60 * 60 * 1000 },
		saveUninitialized: false,
		store
	})
);

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
