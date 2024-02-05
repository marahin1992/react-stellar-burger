import { LoginData, Token, UserData, UserDataWithPassword } from "../../utils/types";
import {
  getUserRequest,
  loginRequest,
  logoutRequest,
  patchUserRequest,
  registerRequest
} from "../api";
import { AppDispatch } from "../store";

export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const SET_USER: "SET_USER" = "SET_USER";

export type SetAuthCheckedAction = {
  type: typeof SET_AUTH_CHECKED;
  payload: boolean;
}

export type SetUserAction = {
  type: typeof SET_USER;
  payload: UserData | null;
}

export type UserActions = 
  | SetAuthCheckedAction
  | SetUserAction;

export const setAuthChecked = (value: boolean): SetAuthCheckedAction => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user: UserData | null): SetUserAction => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch: AppDispatch) => {
    return getUserRequest().then((res) => {
      dispatch(setUser(res.user));
    })
    .catch(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
      
    })
    .finally(() => dispatch(setAuthChecked(true)));;
  };
};

export const patchUser = (body: UserDataWithPassword) => {
  return (dispatch: AppDispatch) => {
    return patchUserRequest(body).then((res) => {
      dispatch(setUser(res.user));
    })
    .catch(e => console.log(e));
  };
};


export const login = (body: LoginData) => {
  return (dispatch: AppDispatch) => {
    return loginRequest(body).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    }).catch(e => console.log(e));
  };
};

export const register = (body: UserDataWithPassword) => {
  return (dispatch: AppDispatch) => {
    return registerRequest(body).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    }).catch(e => console.log(e));
  };
};



export const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        /*.catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));*/
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};


export const logout = (body: Token) => {
  //@ts-ignore
  return (dispatch) => {
    return logoutRequest(body).then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};