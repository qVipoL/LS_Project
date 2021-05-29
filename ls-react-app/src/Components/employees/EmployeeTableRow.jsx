import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

async function updateRequest(data) {}

async function deleteRequest(id) {}

export default function EmployeeTableRow(props) {
	const { employee, columns, classes } = props;

	const editHandler = async (event) => {
		event.preventDefault();
	};

	const deleteHandler = async (event) => {
		event.preventDefault();
		await deleteRequest(employee.id);
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
							<IconButton onClick={editHandler} style={{ color: 'black' }}>
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
		</TableRow>
	);
}
