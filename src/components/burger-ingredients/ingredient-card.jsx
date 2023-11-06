import styles from "./ingredient-card.module.css";
import { 
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../utils/prop-types.js';
import Modal from "../modal/modal.jsx";
import IngredientDetails from "./ingredient-details.jsx";
import {useModal} from "../../hooks/useModal";
import { useDispatch, useSelector } from 'react-redux';
import { SET_VIEWED_INGREDIENT } from '../../services/actions';
import { useDrag } from "react-dnd";

function IngredientCard({data}) {

  const [{isDrag}, dragRef] = useDrag({
    type: 'ingredient',
    item: data,
    collect: monitor => ({
        isDrag: monitor.isDragging()
    })
});


  const dispatch = useDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();

  const handleClick = () => {
    dispatch({
      type: SET_VIEWED_INGREDIENT,
      ingredient: data
    })
    openModal();    
  }

  

   return (
    <>
      <article className={`${styles.ingredientCard}` } onClick={handleClick} ref={dragRef}>
        { data.count !== 0
        ?  (<Counter count={data.count} size="default" extraClass="m-1" className={styles.counter} />)
        : ""}
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
          <IngredientDetails/>
        </Modal> 
        } 
    </>
    
  );
}

IngredientCard.propTypes = {
  data: ingredientPropType,
}

export default IngredientCard;