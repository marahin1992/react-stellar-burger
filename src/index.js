import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from 'react-redux';
import { rootReducer as reducer } from './services/reducers/index.js';
import { configureStore } from '@reduxjs/toolkit';
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import { 
  ORDERS_FEED_CONNECT,
  ORDERS_FEED_WS_CLOSE,
  ORDERS_FEED_DISCONNECT,
  ORDERS_FEED_WS_CONNECTING,
  ORDERS_FEED_WS_ERROR,
  ORDERS_FEED_WS_MESSAGE,
  ORDERS_FEED_WS_OPEN
 } from "./services/actions/orders-feed";

 import { 
  PROFILE_FEED_CONNECT,
  PROFILE_FEED_WS_CLOSE,
  PROFILE_FEED_DISCONNECT,
  PROFILE_FEED_WS_CONNECTING,
  PROFILE_FEED_WS_ERROR,
  PROFILE_FEED_WS_MESSAGE,
  PROFILE_FEED_WS_OPEN
 } from "./services/actions/profile-feed";


const OrderFeedMiddleware = socketMiddleware({
  wsConnect: ORDERS_FEED_CONNECT,
  wsDisconnect: ORDERS_FEED_DISCONNECT,
  wsConnecting: ORDERS_FEED_WS_CONNECTING,
  onOpen: ORDERS_FEED_WS_OPEN,
  onClose: ORDERS_FEED_WS_CLOSE,
  onError: ORDERS_FEED_WS_ERROR,
  onMessage: ORDERS_FEED_WS_MESSAGE
});

const ProfileFeedMiddleware = socketMiddleware({
  wsConnect: PROFILE_FEED_CONNECT,
  wsDisconnect: PROFILE_FEED_DISCONNECT,
  wsConnecting: PROFILE_FEED_WS_CONNECTING,
  onOpen: PROFILE_FEED_WS_OPEN,
  onClose: PROFILE_FEED_WS_CLOSE,
  onError: PROFILE_FEED_WS_ERROR,
  onMessage: PROFILE_FEED_WS_MESSAGE
});

const preloadedState = {}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(OrderFeedMiddleware, ProfileFeedMiddleware)
},
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
})

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
