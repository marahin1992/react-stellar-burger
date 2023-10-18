import React, {useContext} from "react";
import styles from "./burger-ingredients.module.css";

import TabLine from "../tab-line/tab-line.jsx";
import IngredientCard from "../ingredient-card/ingredient-card.jsx";
import PropTypes from "prop-types";
import { IngredientContext } from "../../services/appContext.js";




function BurgerIngredients() {

  const { ingredients } = useContext(IngredientContext);

  const sauces = React.useMemo(() => {
    return ingredients.data.filter(item => item.type === "sauce");
  }, [ingredients]);

  const buns = React.useMemo(() => {
    return ingredients.data.filter(item => item.type === "bun");
  }, [ingredients]);
  
  const mains = React.useMemo(() => {
    return ingredients.data.filter(item => item.type === "main");
  }, [ingredients]);



  return (
    <section className={`${styles.burgerIngredients}`}>
      <h2 className={`${styles.title} text text_type_main-large pb-5 pt-10`}>
        Соберите бургер
      </h2>
      <TabLine />
      <ul className={`${styles.list} custom-scroll`}>
        <li className={`${styles.category}`}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`}>Булки</h3>
            <ul className={`${styles.ingredients} pr-4 pl-4`}>
            {
            buns.map((card) => <IngredientCard key={card._id} data={card}/>

            )
            } 
            </ul>
        </li>
        <li className={`${styles.category}`}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`}>Соусы</h3>
            <ul className={`${styles.ingredients}  pr-4 pl-4`}>
            {
            sauces.map((card) => <IngredientCard key={card._id} data={card}/>

            )
            } 
            </ul>
        </li>
        <li className={`${styles.category}`}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`}>Начинки</h3>
            <ul className={`${styles.ingredients}  pr-4 pl-4`}>
            {
            mains.map((card) => <IngredientCard key={card._id} data={card}/>

            )
            } 
            </ul>
        </li>
        
        
      </ul>
      
    </section>
  );
}


BurgerIngredients.propTypes = {
  data: PropTypes.array,
}

export default BurgerIngredients;