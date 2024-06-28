// pages/context-api.tsx
import React from 'react';
import { useMessage } from '@/context/MessageContext';
import styles from '@/styles/context-api.module.css';

export default function ContextApi() {
  const { addMessage } = useMessage();

  const handleSuccessButtonClick = () => {
    addMessage({
      id: Date.now().toString(),
      message: 'Mensagem de sucesso',
      type: 'success',
    });
  };

  const handleErrorButtonClick = () => {
    addMessage({
      id: Date.now().toString(),
      message: 'Mensagem de erro',
      type: 'error',
    });
  };

  return (
    <div className={styles.container}>
      <button type="button" onClick={handleSuccessButtonClick}>
        Disparar mensagem de sucesso
      </button>
      <button type="button" onClick={handleErrorButtonClick}>
        Disparar mensagem de erro
      </button>
    </div>
  );
}
