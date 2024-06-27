import { useForm } from 'react-hook-form';
import styles from '@/styles/formulario.module.css';
import { useState } from 'react';
import SuccessPopup from '@/components/SuccessPopUp';

type FormData = {
	name: string;
	email: string;
};

type FormProps = {
	onUserAdded: () => void; 
};

const Form: React.FC<FormProps> = ({ onUserAdded }) => {
	const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
	const [showSuccess, setShowSuccess] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const onSubmit = async (data: FormData) => {
		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error('Failed to create user');
			}
			const result = await response.json();
			console.log('User created', result);

			setShowSuccess(true);
			reset();

			if (typeof onUserAdded === 'function') {
				onUserAdded();
			} else {
				console.error('onUserAdded is not a function');
			}
		} catch (error) {
			console.error('Error:', error);
			setErrorMessage('Erro ao enviar o formulário. Tente novamente mais tarde.');

			setTimeout(() => {
				setErrorMessage(null);
			}, 5000);
		}
	};

	const handleCloseSuccessPopup = () => {
		setShowSuccess(false);
	};

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Formulario</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.errorName}>
						<input
							type="text"
							placeholder="Name"
							{...register('name', { required: 'O campo de nome é obrigatório' })}
						/>
						{errors.name && <span className="error-message">{errors.name.message}</span>}
					</div>
					<div className={styles.errorEmail}>
						<input
							type="email"
							placeholder="E-mail"
							{...register('email', { required: 'O campo de email é obrigatório' })}
						/>
						{errors.email && <span className="error-message">{errors.email.message}</span>}
					</div>
					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>
			</div>

			{errorMessage && (
				<div className="error-message">
					{errorMessage}
				</div>
			)}

			{showSuccess && (
				<SuccessPopup
					message="Enviado com sucesso!"
					onClose={handleCloseSuccessPopup}
				/>
			)}
		</div>
	);
};

export default Form;
