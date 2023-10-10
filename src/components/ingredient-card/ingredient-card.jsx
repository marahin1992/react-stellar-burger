import styles from "./ingredient-card.module.css";
import { 
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {ingredientPropType} from '../../utils/prop-types.js';
import PropTypes from "prop-types";

function IngredientCard({data}) {

   return (
    <article className={`${styles.ingredientCard}`}>
      <img className={`${styles.image}`} src={data.image} alt={data.name}/>
      <div className={styles.price}>
        <p className="text text_type_digits-default">{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.name} text text_type_main-default`}>
        {data.name}
      </p>
      
    </article>
  );
}

IngredientCard.propTypes = {
  data: ingredientPropType,
}

export default IngredientCard;