export const ORDERS_FEED_CONNECT: 'ORDERS_FEED_CONNECT' = 'ORDERS_FEED_CONNECT';
export const ORDERS_FEED_DISCONNECT: 'ORDERS_FEED_DISCONNECT' = 'ORDERS_FEED_DISCONNECT';
export const ORDERS_FEED_WS_CONNECTING: 'ORDERS_FEED_WS_CONNECTING' = 'ORDERS_FEED_WS_CONNECTING';
export const ORDERS_FEED_WS_OPEN: 'ORDERS_FEED_WS_OPEN' = 'ORDERS_FEED_WS_OPEN';
export const ORDERS_FEED_WS_CLOSE: 'ORDERS_FEED_WS_CLOSE' = 'ORDERS_FEED_WS_CLOSE';
export const ORDERS_FEED_WS_MESSAGE: 'ORDERS_FEED_WS_MESSAGE' = 'ORDERS_FEED_WS_MESSAGE';
export const ORDERS_FEED_WS_ERROR: 'ORDERS_FEED_WS_ERROR' = 'ORDERS_FEED_WS_ERROR';

export type FeedConnectAction = {
    type: typeof ORDERS_FEED_CONNECT;
    payload: string;
}

export type FeedDisconnectAction = {
    type: typeof ORDERS_FEED_DISCONNECT;
}

export type OrdersFeedMiddlewareActions = 
    | FeedConnectAction
    | FeedDisconnectAction;

export const connect = (url: string): FeedConnectAction => ({
    type: ORDERS_FEED_CONNECT,
    payload: url
});

export const disconnect = (): FeedDisconnectAction => ({
    type: ORDERS_FEED_DISCONNECT,
});

export type OrdersFeedActions = 
        | {
            type: typeof ORDERS_FEED_WS_CONNECTING;
        }
        | {
            type: typeof ORDERS_FEED_WS_OPEN;
        }
        | {
            type: typeof ORDERS_FEED_WS_CLOSE; 
        }
        | {
            type: typeof ORDERS_FEED_WS_ERROR;
            payload: string;

        }
        | {
            type: typeof ORDERS_FEED_WS_MESSAGE;
            payload: any;
        }
