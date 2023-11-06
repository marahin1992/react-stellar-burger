import styles from "./ingredient-details.module.css";
import {ingredientPropType} from '../../utils/prop-types.js';
import { useSelector } from "react-redux";


function IngredientDetails() {

  const data = useSelector(state => state['viewedIngredient']['ingredient']);

  return (
    <div className={`${styles.container} pt-10 pb-15 pr-10 pl-10`}>
      <h2 className={`${styles.modalTitle} text text_type_main-large pt-3 pb-3`}>Детали ингредиента</h2>
      <img className={styles.image} src={data.image_large} alt={data.name}/>
      <h3 className={`${styles.title} text text_type_main-medium pt-4 pb-8`}>{data.name}</h3>
      <ul className={`${styles.calorieContent}`}>
        <li className={styles.calorieContainer}>
          <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Калории, ккал</p>
          <p className={`${styles.calorieNumber} text text_type_digits-default text_color_inactive`}>{data.calories}</p>
        </li>
        <li className={styles.calorieContainer}>
          <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Белки, г</p>
          <p className={`${styles.calorieNumber} text text_type_digits-default text_color_inactive`}>{data.proteins}</p>
        </li>
        <li className={styles.calorieContainer}>
          <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Жиры, г</p>
          <p className={`${styles.calorieNumber} text text_type_digits-default text_color_inactive`}>{data.fat}</p>
        </li>
        <li className={styles.calorieContainer}>
          <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
          <p className={`${styles.calorieNumber} text text_type_digits-default text_color_inactive`}>{data.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  data: ingredientPropType,
}

export default IngredientDetails;