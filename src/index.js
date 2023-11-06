import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { rootReducer as reducer } from './services/reducers/index.js';
import { configureStore } from '@reduxjs/toolkit';

import BunImg from "./images/bun-01.jpg";


const preloadedState = {
  ingredients: {
    isLoading: false,
    hasError: false,
    data: []
  },
  constructorData: {
    bun: {
      name: 'Выберите и перетяните булку',
      image: BunImg,
      price: null
    },
    stuff: [],

  },
  order: {
    order: null
  },
  tab: {
    current: 'one',
  },

  viewedIngredient: {
    
  }

}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
