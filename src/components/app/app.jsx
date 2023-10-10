import React from 'react';
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header.jsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.jsx";
import BurgerIngredients from "../burger-ingredients/burger-ingredients.jsx";



function App() {

  const [state, setState] = React.useState({ 
    isLoading: false,
    hasError: false,
    data: []
  })

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch('https://norma.nomoreparties.space/api/ingredients')
      .then(res => res.json())
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
      <main className={`${styles.main} pl-5 pr-5`}>
        {isLoading && <h3>Загрузка...</h3>}
        {hasError && <h3>Произошла ошибка</h3>}
        {!isLoading &&
          !hasError &&
          data.length && (
            <>
              <BurgerIngredients data={state.data} />
              <BurgerConstructor data={state.data} />
            </>
          )}        
      </main>
      
    </div>
  );
}

export default App;
