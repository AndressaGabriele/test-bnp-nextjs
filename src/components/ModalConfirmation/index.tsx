
import React from 'react';
import styles from './style.module.css';

interface ModalProps {
    isOpen: boolean;
    title: string;
    content: string;
    onClose: () => void; // Aqui definimos que onClose é uma função sem parâmetros e sem retorno
}

const ModalConfirmation: React.FC<ModalProps> = ({ isOpen, title, content, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.header}>
                    <h2>{title}</h2>
                    <button onClick={onClose}>Fechar</button>
                </div>
                <div className={styles.body}>
                    <p>{content}</p>
                </div>
            </div>
        </div>
    );
};

export default ModalConfirmation;
