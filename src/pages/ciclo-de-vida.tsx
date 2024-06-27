import { GetServerSideProps } from 'next/types';
import styles from '@/styles/ciclo-de-vida.module.css';
import { Counter } from '@/components/Counter';
import { useEffect, useState, useRef } from 'react';

type CicloDeVidaProps = {
	initialCount: number;
};

export default function CicloDeVida({ initialCount }: CicloDeVidaProps) {
	const [showCounter, setShowCounter] = useState(false);
	const eventListenersAdded = useRef(false);

	const handleOcultCounterClick = () => {
		setShowCounter((prevState) => !prevState);
	};

	const handleCounterMount = (event: CustomEventInit) => {
		console.log('onCounterMount');
	};

	const handleCounterUnmount = (event: CustomEventInit) => {
		console.log('onCounterUnmount');
	};

	const handleCounterUpdate = (event: CustomEventInit) => {
		console.log('onCounterUpdate');
	};

	useEffect(() => {
		if (!eventListenersAdded.current) {
			window.addEventListener('onCounterMount', handleCounterMount);
			window.addEventListener('onCounterUnmount', handleCounterUnmount);
			window.addEventListener('onCounterUpdate', handleCounterUpdate);

			eventListenersAdded.current = true;
		}

		return () => {
			window.removeEventListener('onCounterMount', handleCounterMount);
			window.removeEventListener('onCounterUnmount', handleCounterUnmount);
			window.removeEventListener('onCounterUpdate', handleCounterUpdate);
		};
	}, []);

	return (
		<div className={styles.container}>
			<div>
				<button type="button" onClick={handleOcultCounterClick}>
					{showCounter ? 'Ocultar contador' : 'Mostrar contador'}
				</button>

				{showCounter && (
					<>
						<h1>Exemplo de Ciclo de vida</h1>

						<div data-content>
							<Counter initialCount={initialCount} />
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<CicloDeVidaProps> = async () => {
	return {
		props: {
			initialCount: 0,
		},
	};
};
