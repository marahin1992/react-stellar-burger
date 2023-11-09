import uuid from 'react-uuid';
import { getIngredientsRequest, getOrderRequest } from '../api.js'
//ingredients
export const GET_INGREDIENTS_LOADING = 'GET_INGREDIENTS_LOADING';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

//constructorData
export const ADD_BUN = 'ADD_BUN';
export const ADD_STUFF = 'ADD_STUFF';
export const DEL_STUFF = 'DEL_STUFF';
export const MOVE_STUFF = 'MOVE_STUFF';
export const CLEAN_CONSTRUCTOR = 'CLEAN_CONSTRUCTOR';


//order
export const GET_ORDER_LOADING = 'GET_ORDER_LOADING';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_ERROR = 'GET_ORDER_ERROR';

//tab
export const SET_TAB = 'SET_TAB';

//counter
export const INCR_COUNTER = 'INCR_COUNTER';
export const DECR_COUNTER = 'DECR_COUNTER';
export const INCR_BUN_COUNTER = 'INCR_BUN_COUNTER';
export const DECR_BUN_COUNTER = 'DECR_BUN_COUNTER';
export const RESET_COUNTERS = 'RESET_COUNTERS';

//VIEWED_INGREDIENT
export const SET_VIEWED_INGREDIENT = 'SET_VIEWED_INGREDIENT';

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_LOADING
    })
    getIngredientsRequest()
      .then(res => {
        const dataWithCount = res['data'].map((item) => { return { ...item, count: 0 } })
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: dataWithCount
        })
      })
      .catch(e => {
        dispatch({
          type: GET_INGREDIENTS_ERROR
        })
        console.log(e);
      });
  };
}

export function cleanConstructor() {
  return function (dispatch) {
    dispatch({type: CLEAN_CONSTRUCTOR});
    dispatch({type: RESET_COUNTERS});
  };
}

export function getOrder(body) {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_LOADING
    })
    getOrderRequest(body)
      .then(data => {
        const order = data.order;
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: order.number
        });
        dispatch(cleanConstructor());
      })
      .catch(e => {
        dispatch({
          type: GET_ORDER_ERROR
        })
        console.log(e);
      });
  };
}



export function deleteStuff(id, key) {
  return function (dispatch) {
    dispatch({
      type: DECR_COUNTER,
      _id: id
    });
    dispatch({
      type: DEL_STUFF,
      key: key
    });
  };
}

export function moveStuff(dragIndex, hoverIndex) {
  return {
    type: MOVE_STUFF,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex
  }
}

export function addBun(item, prevItem) {
  return function (dispatch) {
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
      _id: prevItem._id
    })
  };
}

export function addStuff(item) {
  return function (dispatch) {
    dispatch({
      type: ADD_STUFF,
      data: {...item, key: uuid()}      
    });
    dispatch({
      type: INCR_COUNTER,
      _id: item._id
    });
  };
}

export function setTab(tab) {
  return {
    type: SET_TAB,
    tab: tab
  }
}

export function setViewedIngredient(data) {
  return {
    type: SET_VIEWED_INGREDIENT,
    ingredient: data
  }
}




