import styles from '@/styles/ciclo-de-vida.module.css';
import { Counter } from '@/components/Counter';
import { useState, useRef, useEffect } from 'react';
import { GetServerSideProps } from 'next/types';

type CicloDeVidaProps = {
  initialCount: number;
};

export default function CicloDeVida({ initialCount }: CicloDeVidaProps) {
  const [count, setCount] = useState(initialCount); // Gerencia o valor do contador
  const [showCounter, setShowCounter] = useState(false);
  const eventListenersRegistered = useRef(false);

  function handleOcultCounterClick() {
    setShowCounter((prevState) => !prevState);
  }

  function handleCounterUnmount(): void {
    // Lógica para desmontar o contador (se necessário)
  }

  useEffect(() => {
    if (!eventListenersRegistered.current) {
      window.addEventListener('onCounterMount', () => {
        console.log('onCounterMount');
      });

      window.addEventListener('onCounterUnmount', () => {
        console.log('onCounterUnmount');
        handleCounterUnmount?.(); 
      });

      window.addEventListener('onCounterUpdate', (event: CustomEventInit) => {
        handleCounterUpdate(event.detail); 
      });

      eventListenersRegistered.current = true;
    }
  }, []);

  const handleCounterUpdate = (newCount: number) => {
    setCount((prevState) => {
      const updatedCount = newCount >= 10 ? 0 : newCount; 
      return updatedCount;
    });
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.button} type="button" onClick={handleOcultCounterClick}>
          {showCounter ? 'Ocultar contador' : 'Mostrar contador'}
        </button>

        {showCounter && (
          <>
            <h1 className={styles.title}>Exemplo de Ciclo de vida</h1>

            <div className={styles.content}>
              <Counter
                onCounterUpdate={handleCounterUpdate}
                initialCount={initialCount}
              />
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
