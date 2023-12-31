import React from 'react';
import styles from "./home.module.css";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients.jsx";
import { useDispatch, useSelector } from 'react-redux';

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from '../../components/loader/loader.jsx';
import LoaderWithCondition from '../../components/loader-with-condition/loader-with-condition';

function Home() {

  const ingredients = useSelector(state => state.ingredients);

  const dispatch = useDispatch();

  React.useEffect(() => {

  }, []);



  const { data, isLoading, hasError } = ingredients;
  return (
      <LoaderWithCondition
        isLoading={isLoading}
        error={hasError}
        completed={!isLoading &&
          !hasError &&
          data.length > 0}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </LoaderWithCondition>
  );
}

export default Home;