import { useState } from 'react';
import styles from '@/styles/modal.module.css';
import { Modal } from '@/components/Modal';
import SuccessPopup from '@/components/SuccessPopUp/SuccessPopup';

export default function Home() {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    function handleModalConfirm() {
        if (validateEmail(email)) {
            setModalIsOpen(false);
            setSuccessMessage('Usuário criado com sucesso ✅');
            setEmail(''); // Clear email field
        } else {
            setEmailError('Por favor, insira um e-mail válido.');
        }
    }

    function handleModalClose(type: 'click' | 'esc', target: EventTarget | null) {
        setModalIsOpen(false);
        setEmail(''); 
        setEmailError(''); 
    }

    function validateEmail(email: string): boolean {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    function renderModalContent() {
        return (
            <div data-modal-content className={styles['modal-form']}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <label htmlFor="input-name">Nome</label>
                        <input type="text" id="input-name" placeholder="Insira um nome" />
                    </div>

                    <div>
                        <label htmlFor="input-email">E-mail</label>
                        <input
                            type="email"
                            id="input-email"
                            placeholder="Insira um e-mail válido"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setEmailError('');
                            }}
                        />
                        {emailError && <span className={styles.error}>{emailError}</span>}
                    </div>
                </form>
            </div>
        );
    }

    return (
        <>
            <main className={styles.container}>
                <button type="button" onClick={() => setModalIsOpen(true)}>
                    Abrir modal
                </button>
                {successMessage && <SuccessPopup message={successMessage} onClose={() => setSuccessMessage('')} />}
            </main>

            {/* modal */}
            <Modal
                isOpen={modalIsOpen}
                title="Criar novo usuário"
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
                footer={{ confirmText: 'Criar usuário' }}
            >
                {renderModalContent()}
            </Modal>
        </>
    );
}
