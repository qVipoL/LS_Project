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
		alignItems: 'center'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		paddingTop: 5,
		paddingBottom: 5,
		paddingLeft: 50,
		paddingRight: 50
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
	}
}));

async function loginRequest(data) {
	const response = await fetch('http://localhost:4000/auth/login', {
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

export default function Login(props) {
	const classes = useStyles();

	const [ values, setValues ] = useState({
		email: '',
		password: '',
		showPassword: false,
		disableSubmit: true,
		emailError: '',
		passwordError: ''
	});

	const handleChange = (prop) => (event) => {
		let disableSubmit = !values.email || !values.password;

		setValues({ ...values, [prop]: event.target.value, disableSubmit, emailError: '', passwordError: '' });
	};

	const handleClickShowPassword = () => {
		setValues({ ...values, showPassword: !values.showPassword });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { email, password } = values;
		let emailError = '';
		let passwordError = '';

		if (!validateEmail(email)) {
			emailError = 'Invalid Email';
		}

		if (password.length < 8) {
			passwordError = 'Password too short';
		}

		if (emailError || passwordError) {
			setValues({ ...values, emailError, passwordError });
		} else {
			const data = { email, password };

			const res = await loginRequest(data);

			if (res.err) {
				setValues({ ...values, emailError: res.err, passwordError: res.err });
			} else {
				Auth.login(res.employee);
				props.history.push('/employees');
			}
		}
	};

	return (
		<Container component="main" maxWidth="sm" className={classes.container}>
			<Typography component="h1" variant="h4" className={classes.heading}>
				Sign In
			</Typography>

			<div className={classes.paper}>
				<Avatar className={classes.avatar} />

				<form className={classes.form} noValidate autoComplete="off">
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

					<Button
						disabled={values.disableSubmit}
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Sign In
					</Button>

					<Link href="#" variant="body2" className={classes.formFooter}>
						Forgot password?
					</Link>
				</form>
			</div>

			<Box>
				<Typography className={classes.signUp} component="h6" variant="h6">
					Don't have an account? {' '}
					<a href="/register" className={classes.signUpLink}>
						Sign Up
					</a>
				</Typography>
			</Box>

			<Box mt={8}>
				<Link href="#" variant="body2" className={classes.buttomLink}>
					Our terms of Use and Privacy Policy
				</Link>
			</Box>
		</Container>
	);
}
