import styles from "./total-price.module.css";
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function TotalPrice({ data, type }) {

  const ingredients = useSelector(state => state.ingredients);


  const totalPrice = useMemo(() => {
    if (type === 'constructor') {
      return data['bun']['price'] * 2 + data['stuff'].reduce((acc, item) => acc + item.price, 0)
    } else {
      let total = 0;
      data.forEach((dataIndex) => {
        const ingredient = ingredients.data.find(item => item._id === dataIndex);
        total = total + ingredient.price;
      })
      return total;
    }
  }, [data]);


  return (
    <div className={styles.price}>
      <p className={`text ${type === 'constructor' ? `text_type_digits-medium` : `text_type_digits-default`}`}>{totalPrice}</p>
      <CurrencyIcon type="primary" />
    </div>

  );
}

TotalPrice.propTypes = {
  type: PropTypes.string
}

export default TotalPrice;