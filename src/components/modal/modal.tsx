import React, {  ReactNode } from 'react';
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import {
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "./modal-overlay";

const modalRoot = document.getElementById("react-modals");

type ModalProps = {
  onClose: () => void;
  children?: ReactNode;
}

function Modal({ onClose, children }: ModalProps) {

  
  React.useEffect(() => {
    const close = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }
  , [])

  return ReactDOM.createPortal(
    (
      <div className={styles.modalContainer}>
        <div className={styles.modal}>
          <button className={styles.button} onClick={onClose} type={'button'} title={''}>
            <CloseIcon type="primary" />
          </button>
          {children}
        </div>
        <ModalOverlay onClose={onClose} />
      </div>
    ),
    modalRoot!
  )
}



export default Modal;