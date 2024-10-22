import React from 'react';
import styles from './Snackbar.module.scss';

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({ message, isOpen, onClose }) => {
  return (
    <div className={`${styles.snackbar} ${isOpen ? styles.show : ''}`}>
      {message}
      <button onClick={onClose} className={styles.closeButton}>×</button>
    </div>
  );
};

export default Snackbar;
