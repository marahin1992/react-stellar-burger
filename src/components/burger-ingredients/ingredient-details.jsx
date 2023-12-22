import { useParams } from "react-router-dom";
import styles from "./ingredient-details.module.css";
import { useSelector } from "react-redux";
import Loader from '../loader/loader.jsx';
import PropTypes from "prop-types";


function IngredientDetails({ type }) {

  const { ingredientId } = useParams();

  const ingredients = useSelector(state => state.ingredients);

  const { data, isLoading, hasError } = ingredients;

  const ingredient = data.find(item => item._id === ingredientId);

  return (
    <>
      {isLoading && (<Loader />)}
      {hasError && (<h3>Произошла ошибка</h3>)}
      {!isLoading &&
        !hasError &&
        data.length > 0 && (<div className={type === 'modal' ? `${styles.container} pt-10 pb-15 pr-10 pl-10` : `${styles.container} pt-30 pb-15 pr-10 pl-10`}>
          <h2 className={type === 'modal' ? `${styles.modalTitle} text text_type_main-large pt-3 pb-3` : `text text_type_main-large pt-3 pb-3`}>Детали ингредиента</h2>
          <img className={styles.image} src={ingredient.image_large} alt={ingredient.name} />
          <h3 className={`${styles.title} text text_type_main-medium pt-4 pb-8`}>{ingredient.name}</h3>
          <ul className={`${styles.calorieContent}`}>
            <li className={styles.calorieContainer}>
              <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Калории, ккал</p>
              <p className={`${styles.calorieNumber} text text_type_digits-default text_color_inactive`}>{ingredient.calories}</p>
            </li>
            <li className={styles.calorieContainer}>
              <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Белки, г</p>
              <p className={`${styles.calorieNumber} text text_type_digits-default text_color_inactive`}>{ingredient.proteins}</p>
            </li>
            <li className={styles.calorieContainer}>
              <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Жиры, г</p>
              <p className={`${styles.calorieNumber} text text_type_digits-default text_color_inactive`}>{ingredient.fat}</p>
            </li>
            <li className={styles.calorieContainer}>
              <p className={`${styles.calorieName} text text_type_main-default text_color_inactive`}>Углеводы, г</p>
              <p className={`${styles.calorieNumber} text text_type_digits-default text_color_inactive`}>{ingredient.carbohydrates}</p>
            </li>
          </ul>
        </div>)}
    </>

  )
}

IngredientDetails.propTypes = {
  type: PropTypes.string, 
}

export default IngredientDetails;