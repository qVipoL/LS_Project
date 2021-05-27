const express = require('express');
const employeeRouter = require('./Routers/employeeRouter');
const authRouter = require('./Routers/authRouter');

const app = express();
const port = 4000;

app.use(express.json());

app.use('/employees', employeeRouter);

app.use('/auth', authRouter);

app.use((req, res) => {
	res.status(404).send('Not Found');
});

app.listen(port, () => {
	console.log(`Api started on port ${port}`);
});
