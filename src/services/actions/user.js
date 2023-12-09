import {
  getUserRequest,
  loginRequest,
  logoutRequest,
  patchUserRequest,
  registerRequest
} from "../api";

export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const SET_USER = "SET_USER";

export const setAuthChecked = (value) => ({
  type: SET_AUTH_CHECKED,
  payload: value,
});

export const setUser = (user) => ({
  type: SET_USER,
  payload: user,
});

export const getUser = () => {
  return (dispatch) => {
    return getUserRequest().then((res) => {
      dispatch(setUser(res.user));
    });
  };
};

export const patchUser = (body) => {
  return (dispatch) => {
    return patchUserRequest(body).then((res) => {
      dispatch(setUser(res.user));
    });
  };
};


export const login = (body) => {
  return (dispatch) => {
    return loginRequest(body).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};

export const register = (body) => {
  return (dispatch) => {
    return registerRequest(body).then((res) => {
      localStorage.setItem("accessToken", res.accessToken);
      localStorage.setItem("refreshToken", res.refreshToken);
      dispatch(setUser(res.user));
      dispatch(setAuthChecked(true));
    });
  };
};



export const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(getUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};


export const logout = (body) => {
  return (dispatch) => {
    return logoutRequest(body).then(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      dispatch(setUser(null));
    });
  };
};