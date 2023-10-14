import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import { 
    CloseIcon,
  } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";

const modalRoot = document.getElementById("react-modals");

function Modal({onClose, children}) {

    React.useEffect(() => {
        const close = (evt) => {
          if(evt.key === 'Escape'){
            onClose()
          }
        }
        window.addEventListener('keydown', close)
      return () => window.removeEventListener('keydown', close)
    },[])

    return ReactDOM.createPortal(
          (
                <div className={styles.modalContainer}>
                    <div className={styles.modal}>
                        <button className={styles.button} onClick={onClose}>
                            <CloseIcon type="primary" />
                        </button>
                        {children}
                    </div>
                    <ModalOverlay onClose={onClose}/>
                </div>
            ),
            modalRoot
    )
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.element,
  }

export default Modal;