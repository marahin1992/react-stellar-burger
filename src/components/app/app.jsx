import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import { DataContext, TotalContext, IngredientContext } from "../../services/appContext.js";
import BunImg from "../../images/bun-01.jpg";
import { reducerTotal } from '../../utils/reducers.js';

const totalInitialState = 0;



function App() {

  const [ingredients, setIngredients] = React.useState({ 
    isLoading: false,
    hasError: false,
    data: []
  });

  const [total, totalDispatch] = React.useReducer(reducerTotal, totalInitialState);

  const [constructorData, setConstructorData] = React.useState({
    bun:{
      name: 'Выберите космо-булку, пожалуйста',
      price: 0,
      image: BunImg,
    },
    stuff:[],
    order: '',
  });

  const getIngredients = () => {
    setIngredients({ ...ingredients, hasError: false, isLoading: true });
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
      .then(datas => {
        setIngredients({ ...ingredients, data: datas.data, isLoading: false });
        
      })
      .catch(e => {
        setIngredients({ ...ingredients, hasError: true, isLoading: false });
        console.log(e);
      });
    };
  
  React.useEffect(() => {    
    getIngredients();
  },[]);

  const { data, isLoading, hasError } = ingredients;
  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientContext.Provider value={{ingredients, setIngredients}}>
        <DataContext.Provider value={{constructorData, setConstructorData}}>
          <TotalContext.Provider value={{total, totalDispatch}}>
            <main className={`${styles.main} pl-5 pr-5`}>
              {isLoading && <h3>Загрузка...</h3>}
              {hasError && <h3>Произошла ошибка</h3>}
              {!isLoading &&
                !hasError &&
                data.length && (
                  <>
                    <BurgerIngredients/>
                    <BurgerConstructor />
                  </>
                )}        
              </main>
            </TotalContext.Provider>
        </DataContext.Provider>
      </IngredientContext.Provider>
    </div>
  );
}

export default App;
