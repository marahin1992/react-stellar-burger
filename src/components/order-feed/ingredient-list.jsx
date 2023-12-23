import styles from "./ingredient-list.module.css";
import { useDispatch, useSelector } from 'react-redux';
import OrderIngredient from "./order-ingredient";
import PropTypes from "prop-types";

function IngredientList({ data }) {

  const ingredients = useSelector(state => state.ingredients.data);

  const ingredientsAmount = data.reduce((acc, el) => {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  const orderIngredients = Object.keys(ingredientsAmount);




  return (
    <ul className={`${styles.ingredients} custom-scroll pl-2`}>
      {orderIngredients.map((id, index) => {
        const ingredient = ingredients.find(item => item._id == id);
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

IngredientList.propTypes = {
  data: PropTypes.array,
}

export default IngredientList;
