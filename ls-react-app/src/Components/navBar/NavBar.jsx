import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Auth from '../../Auth/auth';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	navBar: {
		backgroundColor: 'white',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-end'
	},
	userLabel: {
		fontSize: 16,
		color: 'black',
		marginRight: 30,
		fontWeight: 500
	},
	logoutButton: {
		color: 'black',
		marginRight: 50
	},
	userPicture: {
		marginRight: 20
	}
}));

async function logout() {
	await fetch('http://localhost:4000/auth/logout', {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	});

	Auth.logout();
}

const NavBar = (props) => {
	const classes = useStyles();

	const handleLogoutClick = async (event) => {
		event.preventDefault();

		await logout();

		props.history.push('/');
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" className={classes.navBar}>
				<Toolbar>
					{Auth.isAuthenticated() && (
						<React.Fragment>
							<Avatar className={classes.userPicture} />
							<Typography className={classes.userLabel}>{`${Auth.getData().firstName}  ${Auth.getData()
								.lastName}`}</Typography>
							<IconButton className={classes.logoutButton} onClick={handleLogoutClick}>
								<ExitToAppIcon color="inherit" />
							</IconButton>
						</React.Fragment>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default withRouter(NavBar);
