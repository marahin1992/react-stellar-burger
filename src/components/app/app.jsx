import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";
import { DataContext, TotalContext } from "../../services/appContext.js";
import BunImg from "../../images/bun-01.jpg";

const totalInitialState = 0;

function reducer(state, action) {
  switch (action.type) {
    case "bun":
      return state + (action.price * 2) - (action.prev * 2);
    case "stuff":
      return state + action.price;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}


function App() {

  const [state, setState] = React.useState({ 
    isLoading: false,
    hasError: false,
    data: []
  });

  const [total, totalDispatch] = React.useReducer(reducer, totalInitialState);

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
    setState({ ...state, hasError: false, isLoading: true });
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    })
      .then(datas => {
        setState({ ...state, data: datas.data, isLoading: false });
        
      })
      .catch(e => {
        setState({ ...state, hasError: true, isLoading: false });
        console.log(e);
      });
    };
  
  React.useEffect(() => {    
    getIngredients();
  },[]);

  const { data, isLoading, hasError } = state;
  return (
    <div className={styles.app}>
      <AppHeader />
      <DataContext.Provider value={{constructorData, setConstructorData}}>
        <TotalContext.Provider value={{total, totalDispatch}}>
          <main className={`${styles.main} pl-5 pr-5`}>
            {isLoading && <h3>Загрузка...</h3>}
            {hasError && <h3>Произошла ошибка</h3>}
            {!isLoading &&
              !hasError &&
              data.length && (
                <>
                  <BurgerIngredients data={state.data} />
                  <BurgerConstructor />
                </>
              )}        
            </main>
          </TotalContext.Provider>
      </DataContext.Provider>
    </div>
  );
}

export default App;
