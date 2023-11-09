import React, { useRef } from "react";
import styles from "./burger-ingredients.module.css";

import TabLine from "./tab-line.jsx";
import IngredientCard from "./ingredient-card.jsx";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { setTab } from "../../services/actions";



function BurgerIngredients() {

  const dispatch = useDispatch();


  const bunRef = useRef();
  const sauceRef = useRef();
  const mainRef = useRef();
  const containerRef = useRef();

  function scrollToSection(tab) {
    switch (tab) {
      case 'one': {
        bunRef.current.scrollIntoView({ behavior: 'smooth' });
        return
      }
      case 'two': {
        sauceRef.current.scrollIntoView({ behavior: 'smooth' });
        return

      }
      case 'three': {
        mainRef.current.scrollIntoView({ behavior: 'smooth' });
        return
      }
    }
  }

  function onIngridientViev() {
    const bunCoord = Math.abs(containerRef.current.getBoundingClientRect().top - bunRef.current.getBoundingClientRect().top);
    const sauceCoord = Math.abs(containerRef.current.getBoundingClientRect().top - sauceRef.current.getBoundingClientRect().top);
    const mainCoord = Math.abs(containerRef.current.getBoundingClientRect().top - mainRef.current.getBoundingClientRect().top);
    if (bunCoord < sauceCoord && bunCoord < mainCoord) {
      dispatch(setTab('one'));
    } else {
      if (sauceCoord < mainCoord) {
        dispatch(setTab('two'));
      } else {
        dispatch(setTab('three'));
      }

    }
  }

  const ingredients = useSelector(state => state.ingredients);

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
      <TabLine scrollTo={scrollToSection} />
      <ul className={`${styles.list} custom-scroll`} onScroll={onIngridientViev} ref={containerRef}>
        <li className={`${styles.category}`} ref={bunRef}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`} id='bunSection'>Булки</h3>
          <ul className={`${styles.ingredients} pr-4 pl-4`}>
            {
              buns.map((card) => <IngredientCard key={card._id} data={card} />

              )
            }
          </ul>
        </li>
        <li className={`${styles.category}`} ref={sauceRef}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`} id='sauceSection'>Соусы</h3>
          <ul className={`${styles.ingredients}  pr-4 pl-4`}>
            {
              sauces.map((card) => <IngredientCard key={card._id} data={card} />

              )
            }
          </ul>
        </li>
        <li className={`${styles.category}`} ref={mainRef}>
          <h3 className={`${styles.title} text text_type_main-medium pb-6 pt-10`} id='mainSection'>Начинки</h3>
          <ul className={`${styles.ingredients}  pr-4 pl-4`}>
            {
              mains.map((card) => <IngredientCard key={card._id} data={card} />

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