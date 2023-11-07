import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/index.js';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Loader from '../loader/loader.jsx';

function App() {

  const ingredients = useSelector(state => state.ingredients);
  
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  

  const { data, isLoading, hasError } = ingredients;
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading && (<Loader/>)}
        {hasError && (<h3>Произошла ошибка</h3>)}
        {!isLoading &&
          !hasError &&
          data.length > 0 && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor />
            </DndProvider>
          )}
      </main>
    </div>
  );
}

export default App;
