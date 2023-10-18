import React, {useContext} from 'react';
import styles from "./ingredient-card.module.css";
import { 
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../utils/prop-types.js';
import Modal from "../modal/modal.jsx";
import IngredientDetails from "../ingredient-details/ingredient-details.jsx";
import {useModal} from "../../hooks/useModal";
import { DataContext, TotalContext } from "../../services/appContext.js";


function IngredientCard({data}) {

  const { constructorData, setConstructorData } = useContext(DataContext);
  const { total, totalDispatch } = useContext(TotalContext);

  const handleClick = () => {
    if (data.type == "bun") {
      const prevBun = constructorData.bun;
      if (!(prevBun.name === data.name)) {
        setConstructorData(prevState =>{ return {...prevState, bun: data}});
        totalDispatch({type: "bun", price: data.price, prev: prevBun.price});}
      
    } else {
      setConstructorData(prevState =>{ return {...prevState, stuff: [...prevState.stuff, data]}});
      totalDispatch({type: "stuff", price: data.price});
    };
  }

  const { isModalOpen, openModal, closeModal } = useModal();

   return (
    <>
      <article className={`${styles.ingredientCard}` } onClick={handleClick} >
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