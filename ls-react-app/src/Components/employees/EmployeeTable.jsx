import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EmployeeTableRow from './EmployeeTableRow';
import { useEffect, useState } from 'react';
import Auth from '../../Auth/auth';

const columns = [
	{
		id: 'firstName',
		label: 'First Name',
		style: { minWidth: 50 },
		align: 'center'
	},
	{
		id: 'lastName',
		label: 'Last Name',
		style: { minWidth: 80 }
	},
	{
		id: 'phone',
		label: 'Phone ',
		style: { minWidth: 80 }
	},
	{
		id: 'adress',
		label: 'Address',
		style: { minWidth: 100 }
	},
	{
		id: 'role',
		label: 'Role',
		style: { minWidth: 100 }
	},
	{
		id: 'startDate',
		label: 'Start Date',
		style: { minWidth: 100 }
	},
	{
		id: 'edit',
		label: '',
		style: { minWidth: 50 }
	},
	{
		id: 'delete',
		label: '',
		style: { minWidth: 50 }
	}
];

function formatEmployee(employee) {
	const date = new Date(employee.startDate);
	const startDate = date.toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
	const { _id, email, firstName, lastName, phone, adress } = employee;
	return { firstName, lastName, phone, adress, role: 'HR', startDate, email, id: _id };
}

export default function EmployeeTable(props) {
	const { classes } = props;
	const [ data, setData ] = useState({ employees: [] });

	useEffect(() => {
		async function getEmployees() {
			const response = await fetch('http://localhost:4000/employees', {
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

			const res = await response.json();

			if (res.err === 'not_authorized') {
				Auth.logout();
				props.history.push('/login');
				return;
			}

			let resArr = [];

			res.forEach((employee) => {
				resArr.push(formatEmployee(employee));
			});

			setData({ employees: resArr });
		}

		getEmployees();
	});

	return (
		<TableContainer className={classes.container}>
			<Table stickyHeader aria-label="sticky table">
				<TableHead>
					<TableRow>
						<TableCell key="avatar" />
						{columns.map((column) => (
							<TableCell key={column.id} align={column.align} style={column.style}>
								{column.label}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.employees.map((employee) => {
						return (
							<EmployeeTableRow
								columns={columns}
								employee={employee}
								key={employee.id}
								classes={classes}
							/>
						);
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
