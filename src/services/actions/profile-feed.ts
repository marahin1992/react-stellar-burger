export const PROFILE_FEED_CONNECT: 'PROFILE_FEED_CONNECT' = 'PROFILE_FEED_CONNECT';
export const PROFILE_FEED_DISCONNECT: 'PROFILE_FEED_DISCONNECT' = 'PROFILE_FEED_DISCONNECT';
export const PROFILE_FEED_WS_CONNECTING: 'PROFILE_FEED_WS_CONNECTING' = 'PROFILE_FEED_WS_CONNECTING';
export const PROFILE_FEED_WS_OPEN: 'PROFILE_FEED_WS_OPEN' = 'PROFILE_FEED_WS_OPEN';
export const PROFILE_FEED_WS_CLOSE: 'PROFILE_FEED_WS_CLOSE' = 'PROFILE_FEED_WS_CLOSE';
export const PROFILE_FEED_WS_MESSAGE: 'PROFILE_FEED_WS_MESSAGE' = 'PROFILE_FEED_WS_MESSAGE';
export const PROFILE_FEED_WS_ERROR: 'PROFILE_FEED_WS_ERROR' = 'PROFILE_FEED_WS_ERROR';

export type ProfileConnectAction = {
    type: typeof PROFILE_FEED_CONNECT;
    payload: string;
}

export type ProfileDisconnectAction = {
    type: typeof PROFILE_FEED_DISCONNECT;
}

export type ProfileFeedMiddlewareActions =
    | ProfileConnectAction
    | ProfileDisconnectAction;

export const connect = (url: string): ProfileConnectAction => ({
    type: PROFILE_FEED_CONNECT,
    payload: url
});

export const disconnect = (): ProfileDisconnectAction => ({
    type: PROFILE_FEED_DISCONNECT,
});

export type ProfileFeedActions = 
        | {
            type: typeof PROFILE_FEED_WS_CONNECTING;
        }
        | {
            type: typeof PROFILE_FEED_WS_OPEN;
        }
        | {
            type: typeof PROFILE_FEED_WS_CLOSE; 
        }
        | {
            type: typeof PROFILE_FEED_WS_ERROR;
            payload: string;

        }
        | {
            type: typeof PROFILE_FEED_WS_MESSAGE;
            payload: any;
        }
