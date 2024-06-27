import styles from './style.module.css';

type ModalProps = {
    children: React.ReactNode;
    title: string;
    isOpen: boolean;
    onClose?: (type: 'click' | 'esc', target: EventTarget | null) => void;
    onConfirm?: () => void;
    footer?: {
        hidden?: boolean;
        confirmText?: string;
        cancelText?: string;
    };
};

/* 
    Modal

    - Ao clicar no wrapper do modal, o modal deve ser fechado, porém esta ação deve ser ignorada caso o usuário clique em qualquer elemento dentro do modal
*/

export const Modal: React.FC<ModalProps> = ({ children, title, isOpen, ...props }) => {
    function handleCloseClick(e: React.MouseEvent) {
        if (e.target === e.currentTarget) {
            props.onClose?.('click', e.target);
        }
    }

    function handleConfirmClick() {
        props.onConfirm?.();
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Escape') props.onClose?.('esc', e.target);
    }

    if (!isOpen) return null;

    return (
        <div
            data-modal-wrapper
            className={styles.wrapper}
            onClick={handleCloseClick}
            onKeyDown={handleKeyDown}
        >
            <div data-modal-container className={styles.container}>
                <header data-modal-header>
                    <h2>{title}</h2>

                    <button data-modal-close onClick={(e) => props.onClose?.('click', e.currentTarget)}>
                        X
                    </button>
                </header>

                {children}

                {!props.footer?.hidden && (
                    <div data-modal-footer>
                        <button data-modal-cancel onClick={(e) => props.onClose?.('click', e.currentTarget)}>
                            {props.footer?.cancelText ?? 'Cancelar'}
                        </button>

                        <button data-modal-confirm onClick={handleConfirmClick} data-type="confirm">
                            {props.footer?.confirmText ?? 'Confirmar'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};