import styles from "./order-ingredient.module.css";
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from "./ingredient-image";
import PropTypes from "prop-types";

function OrderIngredient({ image, amount, price }) {

  return (<li className={styles.card}>
    <IngredientImage image={image} index={0} />
    <div className={styles.price}>
      <p className={`${styles.digits} text_type_digits-default`}>{`${amount} x ${price}`}</p>
      <CurrencyIcon type="primary" />
    </div>
  </li>);
}

OrderIngredient.propTypes = { 
  image: PropTypes.string, 
  amount: PropTypes.number, 
  price: PropTypes.number 
}

export default OrderIngredient;