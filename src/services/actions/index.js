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


//order
export const SET_ORDER = 'SET_ORDER';

//tab
export const SET_TAB = 'SET_TAB';

//counter
export const INCR_COUNTER = 'INCR_COUNTER';
export const DECR_COUNTER = 'DECR_COUNTER';
export const INCR_BUN_COUNTER = 'INCR_BUN_COUNTER';
export const DECR_BUN_COUNTER = 'DECR_BUN_COUNTER';

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
};

export function getOrder(body) {
  return function (dispatch) {
    getOrderRequest(body)
      .then(data => {
        const order = data.order;
        console.log(order);
        dispatch({
          type: SET_ORDER,
          order: order.number
        });

      })
      .catch(e => {
        console.log(e);
      });
  };
};
