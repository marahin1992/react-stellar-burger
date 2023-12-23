const BASE_URL = 'https://norma.nomoreparties.space/api'

const checkResponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


export const getIngredientsRequest = () => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    }
  })
  .then (res => checkResponse(res));
}



export const loginRequest = (body) => {
  return fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    },
    body: JSON.stringify(body)
  })
    .then (res => checkResponse(res));
};

export const logoutRequest = (body) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    },
    body: JSON.stringify(body)
  })
    .then (res => checkResponse(res));
};

export const registerRequest = (body) => {
  return fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    },
    body: JSON.stringify(body)
  })
    .then (res => checkResponse(res));
};

export const forgotPasswordRequest = (body) => {
  return fetch(`${BASE_URL}/password-reset`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    },
    body: JSON.stringify(body)
  })
    .then (res => checkResponse(res));
};

export const resetPasswordRequest = (body) => {
  return fetch(`${BASE_URL}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    },
    body: JSON.stringify(body)
  })
    .then (res => checkResponse(res));
};

export const refreshToken = () => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkResponse);
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserRequest = () => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8',
      authorization: localStorage.getItem('accessToken')
    }
  })
}

export const patchUserRequest = (body) => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(body)
  })
}

export const getOrderRequest = (body) => {
  return fetchWithRefresh(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(body)
  })
}

export const getOrderByNumberRequest = (number) => {
  return fetch(`${BASE_URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    }
  })
  .then (res => checkResponse(res));
}