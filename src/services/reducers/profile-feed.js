import {WebsocketStatus} from "../../utils/orders-feed.js";
import {
    PROFILE_FEED_WS_CLOSE,
    PROFILE_FEED_WS_CONNECTING,
    PROFILE_FEED_WS_ERROR,
    PROFILE_FEED_WS_MESSAGE,
    PROFILE_FEED_WS_OPEN
} from "../actions/profile-feed.js";

const initialState = {
    status: WebsocketStatus.OFFLINE,
    data: {orders: []},
    connectingError: ''
};

export const ProfileFeedReducer = (state = initialState, action) => {
    switch (action.type)
    {
        case PROFILE_FEED_WS_CONNECTING:
            return {
                ...state,
                status: WebsocketStatus.CONNECTING
            };
        case PROFILE_FEED_WS_OPEN:
            return {
                ...state,
                status: WebsocketStatus.ONLINE,
                connectingError: ''
            };
        case PROFILE_FEED_WS_CLOSE:
            return {
                ...state,
                status: WebsocketStatus.OFFLINE,
            };
        case PROFILE_FEED_WS_ERROR:
            return {
                ...state,
                connectingError: action.payload
            };
        case PROFILE_FEED_WS_MESSAGE:
            return {
                ...state,
                data: action.payload,
            }
        default:
            return state;
    }
}