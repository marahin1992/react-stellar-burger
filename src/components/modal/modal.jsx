import React from 'react';
import ReactDOM from 'react-dom';
import styles from "./modal.module.css";
import PropTypes from "prop-types";
import {ingredientPropType} from '../../utils/prop-types.js';
import { 
    CloseIcon,
  } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from "../modal-overlay/modal-overlay.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import OrderDetails from "../order-details/order-details.jsx";

const modalRoot = document.getElementById("react-modals");

function Modal({onClose, type, data}) {

    React.useEffect(() => {
        const close = (evt) => {
          if(evt.keyCode === 27){
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
                        {
                            type === 'ingredient' 
                            ? (<IngredientDetails data={data}/>)
                            : (<OrderDetails/>)
                        }
                    </div>
                    <ModalOverlay onClose={onClose}/>
                </div>
            ),
            modalRoot
    )
}

Modal.propTypes = {
    onClose: PropTypes.func,
    type: PropTypes.string,
    data: ingredientPropType,

  }

export default Modal;