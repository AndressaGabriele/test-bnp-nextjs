// Em Lista.tsx
import styles from '../styles/lista.module.css'
import { useEffect, useState } from 'react';
import { IUser } from '@/types/user';

export default function Lista() {
	const [users, setUsers] = useState<Array<IUser>>([]);

	async function getUsersList() {
		try {
			const response = await fetch('/api/users');
			const data = await response.json();

			if (!response.ok) throw new Error('Erro ao obter os dados');

			setUsers(data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getUsersList();
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de usuários</h2>
				<div data-list-container>
					{users.map((user) => (
						<div key={user.id} data-list-item>
							ID {user.id} - {user.name} ({user.email})
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
