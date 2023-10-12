import React from 'react';
import styles from "./ingredient-card.module.css";
import { 
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../utils/prop-types.js';
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import {useModal} from "../../hooks/useModal";

function IngredientCard({data}) {

  const { isModalOpen, openModal, closeModal } = useModal();

   return (
    <>
      <article className={`${styles.ingredientCard}` } onClick={openModal} >
        <img className={`${styles.image}`} src={data.image} alt={data.name} />
        <div className={styles.price}>
          <p className="text text_type_digits-default">{data.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`${styles.name} text text_type_main-default`}>
          {data.name}
        </p>
         
      </article>
      {
        isModalOpen && 
        <Modal onClose={closeModal}>
          <IngredientDetails data={data}/>
        </Modal> 
        } 
    </>
    
  );
}

IngredientCard.propTypes = {
  data: ingredientPropType,
}

export default IngredientCard;