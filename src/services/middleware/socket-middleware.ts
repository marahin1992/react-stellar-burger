import { Middleware } from "redux";
import { refreshToken } from "../api";
import { RootState } from "../store";

type MiddlewareParams = {
    wsConnect: string;
    wsSendMessage?: string;
    onOpen: string;
    onClose: string;
    onError: string;
    onMessage: string;
    wsConnecting: string;
    wsDisconnect: string;
}

export const socketMiddleware = (wsActions: MiddlewareParams): Middleware<{}, RootState> => {
    return (store) => {
        let socket: null | WebSocket = null;
        let closing = false;
        let url = '';

        return next => action => {
            const { dispatch } = store;
            const { type } = action;
            const {
                wsConnect,
                wsSendMessage,
                onOpen,
                onClose,
                onError,
                onMessage,
                wsConnecting,
                wsDisconnect,
            } = wsActions;

            if (type === wsConnect) {
                url = action.payload;
                socket = new WebSocket(action.payload);
                dispatch({ type: wsConnecting });
            }

            if (socket) {
                socket.onopen = () => {
                    dispatch({ type: onOpen });
                };

                socket.onerror = () => {
                    dispatch({ type: onError, payload: 'Error' });
                };

                socket.onmessage = event => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);

                    if (data?.message === 'Invalid or missing token') {
                        refreshToken().then(res => {
                            localStorage.setItem("refreshToken", res.refreshToken);
                            localStorage.setItem("accessToken", res.accessToken);
                            let index = url.indexOf('?token=');
                            let token = localStorage.getItem('accessToken')!;
                            token = token.replace('Bearer ', '');
                            url = url.substring(0, index);
                            url = url + `?token=${token}`;
                        })
                    } else {
                        dispatch({ type: onMessage, payload: parsedData });
                    }


                };

                socket.onclose = () => {
                    if (closing) {
                        dispatch({ type: onClose });
                    } else {
                        dispatch({ type: wsConnect, payload: url })
                    }

                };

                if (type === wsSendMessage) {
                    socket.send(JSON.stringify(action.payload));
                }

                if (type === wsDisconnect) {
                    closing = true;
                    socket.close();
                    socket = null;
                }
            }

            next(action);
        };
    };
};