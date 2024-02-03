import uuid from 'react-uuid';
import { getIngredientsRequest, getOrderByNumberRequest, getOrderRequest } from '../api'
import { ConstructorElementData, IngredientWithCount, Order } from '../../utils/types';
import { AppDispatch } from '../store';
//ingredients
export const GET_INGREDIENTS_LOADING: 'GET_INGREDIENTS_LOADING' = 'GET_INGREDIENTS_LOADING';
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR: 'GET_INGREDIENTS_ERROR' = 'GET_INGREDIENTS_ERROR';

//constructorData
export const ADD_BUN: 'ADD_BUN' = 'ADD_BUN';
export const ADD_STUFF: 'ADD_STUFF' = 'ADD_STUFF';
export const DEL_STUFF: 'DEL_STUFF' = 'DEL_STUFF';
export const MOVE_STUFF: 'MOVE_STUFF' = 'MOVE_STUFF';
export const CLEAN_CONSTRUCTOR: 'CLEAN_CONSTRUCTOR' = 'CLEAN_CONSTRUCTOR';


//order
export const GET_ORDER_LOADING: 'GET_ORDER_LOADING' = 'GET_ORDER_LOADING';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR: 'GET_ORDER_ERROR' = 'GET_ORDER_ERROR';

//tab
export const SET_TAB: 'SET_TAB' = 'SET_TAB';

//counter
export const INCR_COUNTER: 'INCR_COUNTER' = 'INCR_COUNTER';
export const DECR_COUNTER: 'DECR_COUNTER' = 'DECR_COUNTER';
export const INCR_BUN_COUNTER: 'INCR_BUN_COUNTER' = 'INCR_BUN_COUNTER';
export const DECR_BUN_COUNTER: 'DECR_BUN_COUNTER' = 'DECR_BUN_COUNTER';
export const RESET_COUNTERS: 'RESET_COUNTERS' = 'RESET_COUNTERS';

//VIEWED_INGREDIENT
export const SET_VIEWED_INGREDIENT: 'SET_VIEWED_INGREDIENT' = 'SET_VIEWED_INGREDIENT';

//selectedOrder
export const GET_SELECTED_ORDER_LOADING: 'GET_SELECTED_ORDER_LOADING' = 'GET_SELECTED_ORDER_LOADING';
export const GET_SELECTED_ORDER_SUCCESS: 'GET_SELECTED_ORDER_SUCCESS' = 'GET_SELECTED_ORDER_SUCCESS';
export const GET_SELECTED_ORDER_ERROR: 'GET_SELECTED_ORDER_ERROR' = 'GET_SELECTED_ORDER_ERROR';

//ActionTypes

export type SetTabAction = {
  type: typeof SET_TAB;
  tab: string;
}

//ingredientsActionsTypes

export type GetIngredientsLoadingAction = {
  type: typeof GET_INGREDIENTS_LOADING;
}

export type GetIngredientsSuccessAction = {
  type: typeof GET_INGREDIENTS_SUCCESS;
  data: IngredientWithCount[];
}

export type GetIngredientsErrorAction = {
  type: typeof GET_INGREDIENTS_ERROR;
}

export type IncrBunCounterAction = {
  type: typeof INCR_BUN_COUNTER;
  _id: string;
}

export type DecrBunCounterAction = {
  type: typeof DECR_BUN_COUNTER;
  _id: string;
}

export type ResetCountersAction = {
  type: typeof RESET_COUNTERS;
}

export type IncrCounterAction = {
  type: typeof INCR_COUNTER;
  _id: string;
}

export type DecrCounterAction = {
  type: typeof DECR_COUNTER;
  _id: string;
}

export type IngredientsActions =
  | GetIngredientsLoadingAction
  | GetIngredientsSuccessAction
  | GetIngredientsErrorAction
  | IncrBunCounterAction
  | DecrBunCounterAction
  | ResetCountersAction
  | IncrCounterAction
  | DecrCounterAction;

//constructorActionTypes
export type ResetConstructorAction = {
  type: typeof CLEAN_CONSTRUCTOR;
}

export type MoveStuffAction = {
  type: typeof MOVE_STUFF;
  dragIndex: number;
  hoverIndex: number;
}

export type DeleteStuffAction = {
  type: typeof DEL_STUFF;
  key: string | undefined;
}

export type AddBunAction = {
  type: typeof ADD_BUN;
  data: IngredientWithCount;
}

export type AddStuffAction = {
  type: typeof ADD_STUFF;
  data: IngredientWithCount;
}

export type ConstructorActions =
  | ResetConstructorAction
  | MoveStuffAction
  | DeleteStuffAction
  | AddBunAction
  | AddStuffAction;

//orderActionsTypes
export type GetOrderLoadingAction = {
  type: typeof GET_ORDER_LOADING;
}

export type GetOrderSuccessAction = {
  type: typeof GET_ORDER_SUCCESS;
  order: number;
}

export type GetOrderErrorAction = {
  type: typeof GET_ORDER_ERROR;
}

export type OrderActions = 
  | GetOrderLoadingAction
  | GetOrderSuccessAction
  | GetOrderErrorAction;



export type SetViewedIngredientAction = {
  type: typeof SET_VIEWED_INGREDIENT;
  ingredient: IngredientWithCount;
}

//selectedOrderActionsTypes
export type GetSelectedOrderLoadingAction = {
  type: typeof GET_SELECTED_ORDER_LOADING;
}

export type GetSelectedOrderSuccessAction = {
  type: typeof GET_SELECTED_ORDER_SUCCESS;
  orders: Order[];
}

export type GetSelectedOrderErrorAction = {
  type: typeof GET_SELECTED_ORDER_ERROR;
}

export type SelectedOrderActions = 
  | GetSelectedOrderLoadingAction
  | GetSelectedOrderSuccessAction
  | GetSelectedOrderErrorAction;

//Actions

export function setTab(tab: string): SetTabAction {
  return {
    type: SET_TAB,
    tab: tab
  }
}

export function setViewedIngredient(data: IngredientWithCount): SetViewedIngredientAction {
  return {
    type: SET_VIEWED_INGREDIENT,
    ingredient: data
  }
}

//getIngredientsActions

export function getIngredientsLoading(): GetIngredientsLoadingAction {
  return {
    type: GET_INGREDIENTS_LOADING,
  }
}

export function getIngredientsSuccess(data: IngredientWithCount[]): GetIngredientsSuccessAction {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    data: data
  }
}

export function getIngredientsError(): GetIngredientsErrorAction {
  return {
    type: GET_INGREDIENTS_ERROR,
  }
}

//resetConstructorActions

export function resetConstructor(): ResetConstructorAction {
  return {
    type: CLEAN_CONSTRUCTOR,
  }
}

export function resetCounters(): ResetCountersAction {
  return {
    type: RESET_COUNTERS,
  }
}

//getOrderActions

export function getOrderLoading(): GetOrderLoadingAction {
  return {
    type: GET_ORDER_LOADING,
  }
}

export function getOrderSuccess(order: number): GetOrderSuccessAction {
  return {
    type: GET_ORDER_SUCCESS,
    order: order
  }
}

export function getOrderError(): GetOrderErrorAction {
  return {
    type: GET_ORDER_ERROR,
  }
}

export function moveStuff(dragIndex: number, hoverIndex: number): MoveStuffAction {
  return {
    type: MOVE_STUFF,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
}

export function decrCounter(id: string): DecrCounterAction {
  return {
    type: DECR_COUNTER,
    _id: id
  }
}

export function delStuff(key: string | undefined): DeleteStuffAction {
  return {
    type: DEL_STUFF,
    key: key
  }
}

export function addNewBun(data: IngredientWithCount): AddBunAction {
  return {
    type: ADD_BUN,
    data: data
  }
}

export function incrBunCounter(id: string): IncrBunCounterAction {
  return {
    type: INCR_BUN_COUNTER,
    _id: id
  }
}

export function decrBunCounter(id: string): DecrBunCounterAction {
  return {
    type: DECR_BUN_COUNTER,
    _id: id
  }
}

export function addNewStuff(data: IngredientWithCount): AddStuffAction {
  return {
    type: ADD_STUFF,
    data: data
  }
}

export function incrCounter(id: string): IncrCounterAction {
  return {
    type: INCR_COUNTER,
    _id: id
  }
}

export function getSelectedOrderLoading(): GetSelectedOrderLoadingAction {
  return {
    type: GET_SELECTED_ORDER_LOADING,
  }
}

export function getSelectedOrderSuccess(data: Order[]): GetSelectedOrderSuccessAction {
  return {
    type: GET_SELECTED_ORDER_SUCCESS,
    orders: data
  }
}

export function getSelectedOrderError(): GetSelectedOrderErrorAction {
  return {
    type: GET_SELECTED_ORDER_ERROR,
  }
}

//Thunks

export function getIngredients() {
  return function (dispatch: AppDispatch) {
    dispatch(getIngredientsLoading())
    getIngredientsRequest()
      .then(res => {
        const dataWithCount = res['data'].map((item) => { return { ...item, count: 0 } })
        dispatch(getIngredientsSuccess(dataWithCount))
      })
      .catch(e => {
        dispatch(getIngredientsError())
        console.log(e);
      });
  };
}

export function cleanConstructor() {
  return function (dispatch: AppDispatch) {
    dispatch(resetConstructor());
    dispatch(resetCounters());
  };
}

export function getOrder(body: string[]) {
  return function (dispatch: AppDispatch) {
    dispatch(getOrderLoading())
    getOrderRequest(body)
      .then(data => {
        const order = data.order;
        dispatch(getOrderSuccess(order.number));
        dispatch(cleanConstructor());
      })
      .catch(e => {
        dispatch(getOrderError())
        console.log(e);
      });
  };
}


export function deleteStuff(id: string, key: string | undefined) {
  return function (dispatch: AppDispatch) {
    dispatch(decrCounter(id));
    dispatch(delStuff(key));
  };
}

export function addBun(item: IngredientWithCount, prevItem: ConstructorElementData) {
  return function (dispatch: AppDispatch) {
    dispatch(addNewBun(item));
    dispatch(incrBunCounter(item._id));
    dispatch(decrBunCounter(prevItem._id))
  };
}

export function addStuff(item: IngredientWithCount) {
  return function (dispatch: AppDispatch) {
    dispatch(addNewStuff({ ...item, key: uuid() }));
    dispatch(incrCounter(item._id));
  };
}




export function getOrderByNumber(number: number) {
  return function (dispatch: AppDispatch) {
    dispatch(getSelectedOrderLoading())
    getOrderByNumberRequest(number)
      .then(res => {
        dispatch(getSelectedOrderSuccess(res.orders))
      })
      .catch(e => {
        dispatch(getSelectedOrderError())
        console.log(e);
      });
  };
}






