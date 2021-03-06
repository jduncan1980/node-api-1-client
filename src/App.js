import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import UserTable from './components/UserTable';
import {
	Dialog,
	Container,
	makeStyles,
	Button,
	Typography,
} from '@material-ui/core';
import axios from 'axios';

const useStyles = makeStyles({
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: '50px',
	},
	button: {
		marginTop: '25px',
	},
	dialog: {
		margin: 'auto',
		overflow: 'hidden',
	},
	heading: {
		marginBottom: '50px',
		// display: 'block',
	},
});

function App() {
	const [users, setUsers] = useState([]);
	const [editing, setEditing] = useState(false);
	const [adding, setAdding] = useState(false);
	const [userToEdit, setUserToEdit] = useState({});
	const classes = useStyles();
	useEffect(() => {
		axios
			.get('https://node-api-4-duncan.herokuapp.com/api/users')
			.then((res) => {
				setUsers(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				alert(err.message);
			});
	}, []);

	return (
		<Container className={classes.container}>
			<Typography variant='h1' color='initial' className={classes.heading}>
				User List
			</Typography>
			<UserTable
				users={users}
				setUsers={setUsers}
				setEditing={setEditing}
				setUserToEdit={setUserToEdit}
			/>
			<Button
				onClick={() => setAdding(true)}
				variant='contained'
				color='primary'
				className={classes.button}
			>
				Add User
			</Button>
			<Dialog
				open={adding}
				onClose={() => setAdding(false)}
				aria-labelledby='Form Dialog'
				className={classes.dialog}
			>
				<Form
					title='Add User'
					edit={false}
					setAdding={setAdding}
					users={users}
					user={{ name: '', bio: '' }}
					setUsers={setUsers}
				/>
			</Dialog>
			<Dialog
				open={editing}
				onClose={() => setEditing(false)}
				aria-labelledby='Form Dialog'
				className={classes.dialog}
			>
				<Form
					title='Edit User'
					edit={true}
					setEditing={setEditing}
					user={userToEdit}
					users={users}
					setUsers={setUsers}
				/>
			</Dialog>
		</Container>
	);
}

export default App;
