import styles from "./total-price.module.css";
import {
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo } from "react";
import { useSelector } from "../../services/store";
import { IngredientWithCount } from "../../utils/types";

type TotalPriceProps = {
  data: string[];
  type: string;
}

function TotalPrice({ data, type }: TotalPriceProps) {
  const ingredients = useSelector(state => state.ingredients);


  const totalPrice = useMemo(() => {
      let total = 0;
      data.forEach((dataIndex) => {
        const ingredient = ingredients.data.find((item: IngredientWithCount) => item._id === dataIndex)!;
        total = total + ingredient.price;
      })
      return total;
  }, [data]);


  return (
    <div className={styles.price}>
      <p className={`text ${type === 'constructor' ? `text_type_digits-medium` : `text_type_digits-default`}`}>{totalPrice}</p>
      <CurrencyIcon type="primary" />
    </div>

  );
}

export default TotalPrice;