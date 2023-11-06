import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { ADD_BUN, ADD_STUFF, INCR_COUNTER, getIngredients, INCR_BUN_COUNTER, DECR_BUN_COUNTER } from '../../services/actions/index.js';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  const ingredients = useSelector(state => state.ingredients);

  const constructorData = useSelector(state => state.constructorData);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  const handleDrop = (item) => {
    if (item.type == "bun") {
      const prevBun = constructorData.bun;
      if (!(prevBun.name === data.name)) {
        dispatch({
          type: ADD_BUN,
          data: item
        });
        dispatch({
          type: INCR_BUN_COUNTER,
          _id: item._id
        });
        dispatch({
          type: DECR_BUN_COUNTER,
          _id: prevBun._id
        })
      }

    } else {
      dispatch({
        type: ADD_STUFF,
        data: item
      });
      dispatch({
        type: INCR_COUNTER,
        _id: item._id
      });
    };
  }

  const { data, isLoading, hasError } = ingredients;
  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading && (<h3>Загрузка...</h3>)}
        {hasError && (<h3>Произошла ошибка</h3>)}
        {!isLoading &&
          !hasError &&
          data.length <= 0 &&
          (<h3>что-то пошло не так</h3>)}
        {!isLoading &&
          !hasError &&
          data.length > 0 && (
            <DndProvider backend={HTML5Backend}>
              <BurgerIngredients />
              <BurgerConstructor onDropHandler={handleDrop} />
            </DndProvider>
          )}
      </main>
    </div>
  );
}

export default App;
