import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS_LOADING,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    ADD_BUN,
    ADD_STUFF,
    SET_TAB,
    INCR_COUNTER,
    DECR_COUNTER,
    INCR_BUN_COUNTER,
    DECR_BUN_COUNTER,
    DEL_STUFF,
    MOVE_STUFF,
    SET_VIEWED_INGREDIENT,
    CLEAN_CONSTRUCTOR,
    RESET_COUNTERS,
    GET_ORDER_LOADING,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR
} from '../actions/index.js'

import BunImg from "../../images/bun-01.jpg";
import user from './user.js';

//ingredients
const initialIngredients = {
    isLoading: false,
    hasError: false,
    data: []
}

const ingredients = (state = initialIngredients, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_LOADING: {
            return {
                ...state,
                isLoading: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return { ...state, hasError: false, data: action.data, isLoading: false };
        }
        case GET_INGREDIENTS_ERROR: {
            return { ...state, hasError: true, isLoading: false };
        }
        case INCR_COUNTER: {
            return {
                ...state,
                data: [...state.data].map(item => item._id === action._id ? { ...item, count: item.count + 1 } : item
                )
            };
        }
        case DECR_COUNTER: {
            return {
                ...state,
                data: [...state.data].map(item =>
                    item._id === action._id ? { ...item, count: item.count - 1 } : item
                )
            };
        }
        case INCR_BUN_COUNTER: {
            return {
                ...state,
                data: [...state.data].map(item => item._id === action._id ? { ...item, count: item.count + 2 } : item
                )
            };
        }
        case DECR_BUN_COUNTER: {
            return {
                ...state,
                data: [...state.data].map(item =>
                    item._id === action._id ? { ...item, count: item.count - 2 } : item
                )
            };
        }
        case RESET_COUNTERS: {
            return {
                ...state,
                data: [...state.data].map(item => {return {...item, count: 0}})
            };
        }
        default: {
            return state;
        }
    }
}

//constructorData

const initialConstructorData = {
    bun: {
        name: 'Выберите космо-булку, пожалуйста',
        price: 0,
        image: BunImg,
    },
    stuff: [],
}

const constructorData = (state = initialConstructorData, action) => {
    switch (action.type) {
        case ADD_BUN: {
            return {
                ...state,
                bun: {
                    type: action['data']['type'],
                    name: action['data']['name'],
                    price: action['data']['price'],
                    image: action['data']['image'],
                    _id: action['data']['_id']
                }
            };
        }
        case ADD_STUFF: {
            return {
                ...state,
                stuff: [...state.stuff, {
                    type: action['data']['type'],
                    name: action['data']['name'],
                    price: action['data']['price'],
                    image: action['data']['image'],
                    _id: action['data']['_id'],
                    key: action['data']['key'],
                }]
            };
        }
        case DEL_STUFF: {
            return {
                ...state,
                stuff: state.stuff.filter((element) => element.key !== action.key)
            };
        }

        case MOVE_STUFF: {
            const dragCard = state['stuff'][action.dragIndex]
            const newStuff = [...state.stuff];
            newStuff.splice(action.dragIndex, 1);
            newStuff.splice(action.hoverIndex, 0, dragCard);
            return {
                ...state,
                stuff: newStuff
            };
        }

        case CLEAN_CONSTRUCTOR: {
            return initialConstructorData;
        }

        default: {
            return state;
        }
    }
}

const initialOrder = {
    isLoading: false,
    hasError: false,
    order: null,
}

const order = (state = initialOrder, action) => {
    switch (action.type) {
        case GET_ORDER_LOADING: {
            return {
                ...state,
                isLoading: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return { ...state, hasError: false, order: action.order, isLoading: false };
        }
        case GET_ORDER_ERROR: {
            return { ...state, hasError: true, isLoading: false };
        }
        default: {
            return state;
        }
    }
}

const initialTab = 'one';

const tab = (state = initialTab, action) => {
    switch (action.type) {
        case SET_TAB: {
            return {
                ...state,
                current: action.tab
            };
        }
        default: {
            return state;
        }
    }
}



const initialViewedIngredient = {
    ingredient: {},
}

const viewedIngredient = (state = initialViewedIngredient, action) => {
    switch (action.type) {
        case SET_VIEWED_INGREDIENT: {
            return {
                ...state,
                ingredient: action.ingredient
            };
        }
        default: {
            return state;
        }
    }
}

export const rootReducer = combineReducers({
    ingredients,
    constructorData,
    order,
    tab,
    viewedIngredient,
    user,
})