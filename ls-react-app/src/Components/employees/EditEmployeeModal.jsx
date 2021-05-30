import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

const useStyles = makeStyles({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: 'white',
		top: '15%',
		left: '35%',
		paddingTop: 50,
		paddingBottom: 50,
		paddingLeft: 90,
		paddingRight: 90
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	exitButton: {
		color: 'black'
	},
	submitButton: {
		paddingLeft: 50,
		paddingRight: 50,
		marginTop: 30
	},
	heading: {
		fontSize: 20,
		fontWeight: 600
	},
	header: {
		width: '100%',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
});

async function requestCreateUser(data) {
	const response = await fetch(`http://localhost:4000/employees/${data.id}`, {
		method: 'PUT',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data)
	});

	return await response.json();
}

export default function EditEmployeeModal(props) {
	const { employee, handleReRender } = props;
	const classes = useStyles();
	const [ values, setValues ] = useState({
		firstName: employee.firstName,
		lastName: employee.lastName,
		email: employee.email,
		phone: employee.phone === null ? '' : employee.phone,
		address: employee.address === null ? '' : employee.address
	});

	const [ errors, setErros ] = useState({
		firstNameErr: '',
		lastNameErr: '',
		emailErr: ''
	});

	const handleChange = (prop) => (event) => {
		setErros({
			firstNameErr: '',
			lastNameErr: '',
			emailErr: ''
		});
		setValues({ ...values, [prop]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { firstName, lastName, email } = values;
		let errs = {};

		if (!firstName) errs.firstNameErr = 'No first name';
		if (!lastName) errs.lastNameErr = 'No last name';
		if (!validateEmail(email)) errs.emailErr = 'Invalid email';

		if (Object.keys(errs).length === 0) {
			values.id = employee.id;
			const res = await requestCreateUser(values);

			if (res.err) {
				setErros({
					...errors,
					emailErr: res.err
				});
			}
		} else {
			setErros({ ...errors, ...errs });
		}

		handleReRender();
	};

	return (
		<Paper className={classes.paper}>
			<div className={classes.header}>
				<Typography className={classes.heading}>Edit Employee</Typography>
				<IconButton className={classes.exitButton} onClick={props.handleClose}>
					<CloseIcon color="inherit" fontSize="large" />
				</IconButton>
			</div>
			<form className={classes.form} noValidate autoComplete="off">
				<TextField
					margin="normal"
					fullWidth
					id="firstName"
					label="First Name"
					name="firstName"
					value={values.firstName}
					autoFocus
					onChange={handleChange('firstName')}
					className={classes.inputField}
					error={errors.firstNameErr !== ''}
					helperText={errors.firstNameErr}
				/>

				<TextField
					margin="normal"
					fullWidth
					id="lastName"
					label="Last Name"
					name="lastName"
					value={values.lastName}
					onChange={handleChange('lastName')}
					className={classes.inputField}
					error={errors.lastNameErr !== ''}
					helperText={errors.lastNameErr}
				/>

				<TextField
					margin="normal"
					fullWidth
					id="email"
					label="Email"
					name="email"
					value={values.email}
					onChange={handleChange('email')}
					className={classes.inputField}
					error={errors.emailErr !== ''}
					helperText={errors.emailErr}
				/>

				<TextField
					margin="normal"
					fullWidth
					id="phone"
					label="Phone"
					name="phone"
					value={values.phone}
					onChange={handleChange('phone')}
					className={classes.inputField}
				/>

				<TextField
					margin="normal"
					fullWidth
					id="address"
					label="Address"
					name="address"
					value={values.address}
					onChange={handleChange('address')}
					className={classes.inputField}
				/>

				<Button variant="contained" color="primary" className={classes.submitButton} onClick={handleSubmit}>
					Edit
				</Button>
			</form>
		</Paper>
	);
}
