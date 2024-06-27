import React, { useEffect } from 'react';
import styles from './style.module.css';

type SuccessPopupProps = {
    message: string;
    onClose: () => void; 
};

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); 
        }, 3000); 

        return () => clearTimeout(timer); 
    }, [onClose]);

    return (
        <div className={styles.successPopup}>
            <p>{message}</p>
        </div>
    );
};

export default SuccessPopup;
