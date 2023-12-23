import {WebsocketStatus} from "../../utils/orders-feed.js";
import {
    ORDERS_FEED_WS_CLOSE,
    ORDERS_FEED_WS_CONNECTING,
    ORDERS_FEED_WS_ERROR,
    ORDERS_FEED_WS_MESSAGE,
    ORDERS_FEED_WS_OPEN
} from "../actions/orders-feed.js";

const initialState = {
    status: WebsocketStatus.OFFLINE,
    data: {orders: []},
    connectingError: ''
};

export const OrdersFeedReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case ORDERS_FEED_WS_CONNECTING:
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        case ORDERS_FEED_WS_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE,
                connectingError: ''
            };
        case ORDERS_FEED_WS_CLOSE:
            return {
                ...state,
                status: WebsocketStatus.OFFLINE,
            };
        case ORDERS_FEED_WS_ERROR:
            return {
                ...state,
                connectingError: action.payload
            };
        case ORDERS_FEED_WS_MESSAGE:
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state;
    }
}