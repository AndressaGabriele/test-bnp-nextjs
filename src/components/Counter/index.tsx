import { useEffect, useState } from 'react';

type CounterProps = {
	initialCount: number;
};

export function Counter({ initialCount }: CounterProps) {
	const [count, setCount] = useState(initialCount);

	// Dispara o evento de montagem
	useEffect(() => {
		const mountEvent = new CustomEvent('onCounterMount');
		window.dispatchEvent(mountEvent);

		return () => {
			const unmountEvent = new CustomEvent('onCounterUnmount');
			window.dispatchEvent(unmountEvent);
		};
	}, []);

	useEffect(() => {
		const updateEvent = new CustomEvent('onCounterUpdate', { detail: { count } });
		window.dispatchEvent(updateEvent);

		if (count >= 10) {
			const unmountEvent = new CustomEvent('onCounterUnmount');
			window.dispatchEvent(unmountEvent);
		}
	}, [count]);

	const increment = () => {
		setCount(prevCount => prevCount + 1);
	};

	if (count >= 11) {
		return null;
	}

	return (
		<div>
			<p>Counter: {count}</p>
			<button onClick={increment}>Incrementar +</button>
		</div>
	);
}
