import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: 'white',
		top: '20%',
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

export default function AddEmployeeModal(props) {
	const classes = useStyles();
	const [ values, setValues ] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		phone: '',
		address: ''
	});

	const handleChange = (prop) => (event) => {
		setValues({ ...values, [prop]: event.target.value });
	};

	return (
		<Paper className={classes.paper}>
			<div className={classes.header}>
				<Typography className={classes.heading}>Add Employee</Typography>
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
				/>

				<TextField
					margin="normal"
					fullWidth
					id="password"
					label="Password"
					name="password"
					value={values.password}
					onChange={handleChange('password')}
					className={classes.inputField}
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

				<Button variant="contained" color="primary" className={classes.submitButton}>
					Add
				</Button>
			</form>
		</Paper>
	);
}
