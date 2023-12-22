export const ORDERS_FEED_CONNECT = 'ORDERS_FEED_CONNECT';
export const ORDERS_FEED_DISCONNECT = 'ORDERS_FEED_DISCONNECT';
export const ORDERS_FEED_WS_CONNECTING = 'ORDERS_FEED_WS_CONNECTING';
export const ORDERS_FEED_WS_OPEN = 'ORDERS_FEED_WS_OPEN';
export const ORDERS_FEED_WS_CLOSE = 'ORDERS_FEED_WS_CLOSE';
export const ORDERS_FEED_WS_MESSAGE = 'ORDERS_FEED_WS_MESSAGE';
export const ORDERS_FEED_WS_ERROR = 'ORDERS_FEED_WS_ERROR';

export const connect = (url) => ({
    type: ORDERS_FEED_CONNECT,
    payload: url
});

export const disconnect = () => ({
    type: ORDERS_FEED_DISCONNECT,
});
