import {WebsocketStatus} from "../../utils/orders-feed";
import { Order } from "../../utils/types";
import {
    ORDERS_FEED_WS_CLOSE,
    ORDERS_FEED_WS_CONNECTING,
    ORDERS_FEED_WS_ERROR,
    ORDERS_FEED_WS_MESSAGE,
    ORDERS_FEED_WS_OPEN,
    OrdersFeedActions
} from "../actions/orders-feed";

type OrdersFeedData = {
    orders: Order[];
    total: number;
    totalToday: number
}

type OrdersFeedStore = {
    status: string;
    data: OrdersFeedData;
    connectingError: string;
}

const initialState: OrdersFeedStore = {
    status: WebsocketStatus.OFFLINE,
    data: {
        total: 0,
        orders: [],
        totalToday: 0
    },
    connectingError: ''
};

export const OrdersFeedReducer = (state = initialState, action: OrdersFeedActions): OrdersFeedStore => {
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