import { combineReducers } from 'redux';
import {
    GET_INGREDIENTS_LOADING,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_ERROR,
    ADD_BUN,
    ADD_STUFF,
    SET_ORDER,
    SET_TAB,
    INCR_COUNTER,
    DECR_COUNTER,
    INCR_BUN_COUNTER,
    DECR_BUN_COUNTER,
    DEL_STUFF,
    MOVE_STUFF,
    SET_VIEWED_INGREDIENT
} from '../actions/index.js'

import uuid from 'react-uuid';

import BunImg from "../../images/bun-01.jpg";

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
                    key: uuid()
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

        default: {
            return state;
        }
    }
}

const initialOrder = {
    order: null,
}

const order = (state = initialOrder, action) => {
    switch (action.type) {
        case SET_ORDER: {
            return {
                ...state,
                order: action.order
            };
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
    viewedIngredient
})