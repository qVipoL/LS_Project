import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Auth from '../../Auth/auth';
import { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import EditEmployeeModal from './EditEmployeeModal';

async function deleteRequest(id) {
	const response = await fetch(`http://localhost:4000/employees/${id}`, {
		method: 'DELETE',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json'
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	});

	return await response.json();
}

export default function EmployeeTableRow(props) {
	const { employee, columns, classes, handleReRender } = props;
	const [ open, setOpen ] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const deleteHandler = async (event) => {
		event.preventDefault();
		await deleteRequest(employee.id);

		if (employee.email === Auth.getData().email) {
			Auth.logout();
			props.history.push('/login');
		} else {
			handleReRender();
		}
	};

	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell key={'avatar'}>
				<Avatar className={classes.avatar} style={{ marginLeft: '30%' }} />
			</TableCell>
			{columns.map((column) => {
				const value = employee[column.id];

				return (
					<TableCell key={column.id} align={column.align}>
						{column.id === 'avatar' ? (
							<Avatar className={classes.avatar} />
						) : column.id === 'edit' ? (
							<IconButton onClick={handleOpen} style={{ color: 'black' }}>
								<EditIcon color="inherit" />
							</IconButton>
						) : column.id === 'delete' ? (
							<IconButton onClick={deleteHandler} style={{ color: 'black' }}>
								<DeleteForeverIcon color="inherit" />
							</IconButton>
						) : (
							value
						)}
					</TableCell>
				);
			})}

			<Modal open={open} onClose={handleClose}>
				<EditEmployeeModal handleClose={handleClose} employee={employee} handleReRender={handleReRender} />
			</Modal>
		</TableRow>
	);
}
