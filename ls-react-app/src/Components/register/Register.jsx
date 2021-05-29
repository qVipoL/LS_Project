import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import IconButton from '@material-ui/core/IconButton';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useState } from 'react';
import Auth from '../../Auth/auth';

function validateEmail(email) {
	const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

async function registerRequest(data) {
	const response = await fetch('http://localhost:4000/auth/register', {
		method: 'POST',
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

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	heading: {
		marginTop: 100,
		fontWeight: 'bold'
	},
	paper: {
		backgroundColor: 'white',
		width: '70%',
		marginTop: theme.spacing(13),
		paddingTop: 60,
		paddingLeft: 60,
		paddingRight: 60,
		paddingBottom: 20,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	inputField: {
		marginTop: 10
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: '#dbdada',
		position: 'absolute',
		top: 250,
		width: 110,
		height: 110
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'left'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		width: '40%',
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 10,
		paddingRight: 10
	},
	formFooter: {
		marginTop: 30
	},
	signUp: {
		marginTop: 50
	},
	signUpLink: {
		color: '#3f51b5',
		textDecoration: 'none'
	},
	subTopic: {
		fontSize: 18,
		marginTop: 30,
		marginBottom: 10
	},
	buttomLink: {
		marginBottom: 50
	}
}));

export default function Login(props) {
	const classes = useStyles();
	const [ values, setValues ] = useState({
		email: '',
		password: '',
		repeatPassword: '',
		firstName: '',
		lastName: '',
		showPassword: false,
		disableSubmit: true,
		emailError: '',
		passwordError: ''
	});

	const handleChange = (prop) => (event) => {
		let disableSubmit = !values.email || !values.password || !values.firstName || !values.lastName;

		setValues({ ...values, [prop]: event.target.value, disableSubmit, emailError: '', passwordError: '' });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password, firstName, lastName, repeatPassword } = values;
		let emailError = '';
		let passwordError = '';

		if (!validateEmail(email)) {
			emailError = 'Invalid Email';
		}

		if (password.length < 8) {
			passwordError = 'Password too short';
		}

		if (repeatPassword !== password) {
			passwordError = "Password don't match";
		}

		if (emailError || passwordError || !firstName || !lastName) {
			setValues({ ...values, emailError, passwordError });
		} else {
			const data = { email, password, firstName, lastName };

			const res = await registerRequest(data);

			if (res.err) {
				setValues({ ...values, emailError: res.err });
			} else {
				Auth.login(res.employee);
				props.history.push('/employees');
			}
		}
	};

	return (
		<Container component="main" maxWidth="sm" className={classes.container}>
			<Typography component="h1" variant="h4" className={classes.heading}>
				Sign Up
			</Typography>

			<div className={classes.paper}>
				<Avatar className={classes.avatar} />

				<form className={classes.form} noValidate autoComplete="off">
					<Typography className={classes.subTopic}>Personal Info</Typography>

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
						error={values.firstName === '' && !values.disableSubmit}
						helperText={values.firstName === '' && !values.disableSubmit ? 'No first name' : ''}
					/>

					<TextField
						margin="normal"
						fullWidth
						id="lastName"
						label="Last Name"
						name="lastName"
						value={values.lastName}
						autoFocus
						onChange={handleChange('lastName')}
						className={classes.inputField}
						error={values.lastName === '' && !values.disableSubmit}
						helperText={values.lastName === '' && !values.disableSubmit ? 'No first name' : ''}
					/>

					<TextField
						margin="normal"
						fullWidth
						id="email"
						label="Email"
						name="email"
						value={values.email}
						autoFocus
						onChange={handleChange('email')}
						className={classes.inputField}
						error={values.emailError !== ''}
						helperText={values.emailError}
					/>

					<Typography className={classes.subTopic}>Password</Typography>

					<FormControl fullWidth className={classes.inputField} error={values.passwordError !== ''}>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="password"
							type={values.showPassword ? 'text' : 'password'}
							value={values.password}
							onChange={handleChange('password')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
									>
										{values.showPassword ? (
											<VisibilityOutlinedIcon />
										) : (
											<VisibilityOffOutlinedIcon />
										)}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText>{values.passwordError}</FormHelperText>
					</FormControl>

					<FormControl
						fullWidth
						className={classes.inputField}
						error={values.password !== values.repeatPassword}
					>
						<InputLabel htmlFor="repeatPassword">Repeat Password</InputLabel>
						<Input
							id="repeatPassword"
							type={values.showPassword ? 'text' : 'password'}
							value={values.repeatPassword}
							onChange={handleChange('repeatPassword')}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
									>
										{values.showPassword ? (
											<VisibilityOutlinedIcon />
										) : (
											<VisibilityOffOutlinedIcon />
										)}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText>
							{values.password !== values.repeatPassword ? "Password don't match" : ''}
						</FormHelperText>
					</FormControl>

					<Button
						disabled={values.disableSubmit}
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign Up
					</Button>
				</form>
			</div>

			<Box>
				<Typography className={classes.signUp} component="h6" variant="h6">
					Already have an account?{' '}
					<a href="/login" className={classes.signUpLink}>
						Sign In
					</a>
				</Typography>
			</Box>

			<Box mt={8} className={classes.buttomLink}>
				<Link href="#" variant="body2">
					Our terms of Use and Privacy Policy
				</Link>
			</Box>
		</Container>
	);
}
