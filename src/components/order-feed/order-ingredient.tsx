import styles from "./order-ingredient.module.css";
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientImage from "./ingredient-image";

type OrderIngredientProps = {
  image: string;
  amount: number;
  price: number;
}

function OrderIngredient({ image, amount, price }: OrderIngredientProps) {

  return (<li className={styles.card}>
    <IngredientImage image={image} index={0} />
    <div className={styles.price}>
      <p className={`${styles.digits} text_type_digits-default`}>{`${amount} x ${price}`}</p>
      <CurrencyIcon type="primary" />
    </div>
  </li>);
}


export default OrderIngredient;