import React from 'react';
import styles from "./ingredient-card.module.css";
import { 
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../utils/prop-types.js';
import PropTypes from "prop-types";
import Modal from "../modal/modal.jsx";

function IngredientCard({data}) {

  const[visible, setVisible] = React.useState(false);

  const openModal = () => {
    setVisible(true);
  }

  const closeModal = () => {
    setVisible(false);
  };

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
        visible && <Modal onClose={closeModal} type={'ingredient'} data={data} /> 
        } 
    </>
    
  );
}

IngredientCard.propTypes = {
  data: ingredientPropType,
}

export default IngredientCard;