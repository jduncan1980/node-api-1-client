import React from 'react';

import {
	makeStyles,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	IconButton,
	Paper,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';

const useStyles = makeStyles({
	table: {
		width: '100%',
	},
	tableInner: {
		backgroundColor: '#3e3549',
	},
	tableCell: {
		color: 'white',
		fontSize: '30px',
	},
	tableHead: {
		color: 'white',
		fontSize: '50px',
		marginBottom: '10px',
	},
});

export default function UserTable({
	users,
	setUsers,
	setEditing,
	setUserToEdit,
}) {
	const classes = useStyles();

	const handleDelete = (id) => {
		axios
			.delete(`https://node-api-4-duncan.herokuapp.com/api/users/${id}`)
			.then((res) => {
				console.log(res);
				const newUserList = users.filter((user) => res.data.id !== user.id);
				setUsers(newUserList);
			});
	};

	const handleEdit = (user) => {
		setEditing(true);
		setUserToEdit(user);
	};

	return (
		<TableContainer component={Paper} className={classes.table}>
			<Table className={classes.tableInner} aria-label='simple table'>
				<TableHead>
					<TableRow>
						<TableCell className={classes.tableHead}>Name </TableCell>
						<TableCell className={classes.tableHead} align='right'>
							Bio
						</TableCell>
						<TableCell className={classes.tableHead} align='right'>
							Edit{' '}
						</TableCell>
						<TableCell className={classes.tableHead} align='right'>
							Delete{' '}
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users.map((user) => (
						<TableRow key={user.id}>
							<TableCell
								className={classes.tableCell}
								component='th'
								scope='row'
							>
								{user.name}
							</TableCell>
							<TableCell className={classes.tableCell} align='right'>
								"{user.bio}"
							</TableCell>
							<TableCell className={classes.tableCell} align='right'>
								<IconButton onClick={() => handleEdit(user)}>
									<EditIcon className={classes.tableCell} />
								</IconButton>
							</TableCell>
							<TableCell align='right'>
								<IconButton onClick={() => handleDelete(user.id)}>
									<DeleteForeverIcon className={classes.tableCell} />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
