import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from 'react-redux';
import { rootReducer as reducer } from './reducers/index';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { socketMiddleware } from "./middleware/socket-middleware";
import type { } from "redux-thunk/extend-redux";
import {
  ORDERS_FEED_CONNECT,
  ORDERS_FEED_WS_CLOSE,
  ORDERS_FEED_DISCONNECT,
  ORDERS_FEED_WS_CONNECTING,
  ORDERS_FEED_WS_ERROR,
  ORDERS_FEED_WS_MESSAGE,
  ORDERS_FEED_WS_OPEN,
  OrdersFeedActions,
  OrdersFeedMiddlewareActions
} from "./actions/orders-feed";

import {
  PROFILE_FEED_CONNECT,
  PROFILE_FEED_WS_CLOSE,
  PROFILE_FEED_DISCONNECT,
  PROFILE_FEED_WS_CONNECTING,
  PROFILE_FEED_WS_ERROR,
  PROFILE_FEED_WS_MESSAGE,
  PROFILE_FEED_WS_OPEN,
  ProfileFeedActions,
  ProfileFeedMiddlewareActions
} from "./actions/profile-feed";
import { ConstructorActions, IngredientsActions, OrderActions, SelectedOrderActions, SetTabAction, SetViewedIngredientAction } from "./actions";
import { UserActions } from "./actions/user";

export type RootState = ReturnType<typeof reducer>;

export type AppActions = 
  | SetTabAction
  | IngredientsActions
  | ConstructorActions
  | OrderActions
  | SetViewedIngredientAction
  | SelectedOrderActions
  | UserActions
  | OrdersFeedActions
  | ProfileFeedActions
  | OrdersFeedMiddlewareActions
  | ProfileFeedMiddlewareActions
  ;

  export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AppActions
>;

export type AppDispatch<TReturnType = void> = (
  action: AppActions | AppThunk<TReturnType>
) => TReturnType;

export const useDispatch: () => AppDispatch = dispatchHook;
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

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

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(OrderFeedMiddleware, ProfileFeedMiddleware)
  },
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
})

