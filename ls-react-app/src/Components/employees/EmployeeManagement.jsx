import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import EmployeeTable from './EmployeeTable';
import { Button, Typography } from '@material-ui/core';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import AddEmployeeModal from './AddEmployeeModal';

const useStyles = makeStyles({
	root: {
		width: '70%',
		marginTop: 60,
		height: '70%'
	},
	container: {
		maxHeight: 650
	},
	table: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	tableRow: {
		paddingTop: 50,
		paddingBottom: 50
	},
	header: {
		width: '85%',
		marginTop: 70,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	avatar: {
		width: 60,
		height: 60
	}
});

export default function EmployeeManagement(props) {
	const classes = useStyles();
	const [ open, setOpen ] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.table}>
			<div className={classes.header}>
				<Typography variant="h4" component="h1" style={{ fontWeight: 500 }}>
					Managing Employees
				</Typography>
				<Button variant="contained" color="primary" onClick={handleOpen}>
					{'+ Add Employee'}
				</Button>
			</div>

			<Paper className={classes.root}>
				<EmployeeTable classes={classes} {...props} open={open} />
			</Paper>

			<Modal open={open} onClose={handleClose}>
				<AddEmployeeModal handleClose={handleClose} />
			</Modal>
		</div>
	);
}
