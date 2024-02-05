import styles from "./ingredient-list.module.css";
import { useDispatch, useSelector } from '../../services/store';
import OrderIngredient from "./order-ingredient";
import { IngredientWithCount } from "../../utils/types";

type IngredientListProps = {
  data: string[];
}

type ingredientWithAmount = {
  [key: string]: number;
}


function IngredientList({ data }: IngredientListProps) {

  const ingredients = useSelector(state => state.ingredients.data);

  const ingredientsAmount = data.reduce((acc: ingredientWithAmount, el) => {
    
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});


  const orderIngredients = Object.keys(ingredientsAmount);




  return (
    <ul className={`${styles.ingredients} custom-scroll pl-2`}>
      {orderIngredients.map((id, index) => {
        const ingredient = ingredients.find((item: IngredientWithCount) => item._id == id)!;
        return (<OrderIngredient
          image={ingredient.image_mobile}
          amount={ingredientsAmount[id]}
          price={ingredient.price}
          key={index}
        />)
      })}
    </ul>

  );
}


export default IngredientList;
