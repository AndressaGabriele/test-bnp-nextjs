import { useEffect, useState } from 'react';

type CounterProps = {
  initialCount: number;
  onCounterUpdate: (count: number) => void;
};

export const Counter = ({ initialCount, onCounterUpdate }: CounterProps) => {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('onCounterMount'));

    return () => {
      window.dispatchEvent(new CustomEvent('onCounterUnmount'));
    };
  }, []);

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('onCounterUpdate', { detail: count }));
    onCounterUpdate(count);
  }, [count]);

  const increment = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={increment}>Incrementar +2</button>
    </div>
  );
};
