// pages/index.js

import { useState } from 'react';
import styles from '@/styles/modal.module.css';
import ModalConfirmation from '@/components/ModalConfirmation';

export default function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <main className={styles.container}>
                <button type="button" onClick={openModal}>
                    Abrir modal de confirmação
                </button>
            </main>

            <ModalConfirmation
                isOpen={modalIsOpen}
                title="Confirmação"
                content="Tem certeza de que deseja prosseguir com esta ação?"
                onClose={closeModal}
            />
        </>
    );
}
