import { Ingredient, LoginData, Order, PasswordAndToken, Token, UserData, UserDataWithPassword } from "../utils/types";

const BASE_URL: string = 'https://norma.nomoreparties.space/api'

type SuccessData = {
  success: boolean;
}

type ResponseWithMessage<T>  = SuccessData & {
  message: T;
}

type ResponseWithToken = SuccessData & {
  accessToken: string;
  refreshToken: string;
}

type OrderResponse = SuccessData & {
  order: Order;
}

type IngredientsResponse = SuccessData & {
  data: Ingredient[];
}

type UserResponse = SuccessData & {
  user: UserData;
}

type UserResponseWithToken = ResponseWithToken & {
  user: UserData;
}

type SelectedOrderResponse = SuccessData & {
  orders: Order[];
}


const checkResponse = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


export const getIngredientsRequest = (): Promise<IngredientsResponse> => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    }
  })
  .then (res => checkResponse(res));
}



export const loginRequest = (body: LoginData): Promise<UserResponseWithToken> => {
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



export const logoutRequest = (body: Token): Promise<ResponseWithMessage<"Successful logout">> => {
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

export const registerRequest = (body: UserDataWithPassword): Promise<UserResponseWithToken> => {
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

export const forgotPasswordRequest = (body: Pick<UserData, 'email'>): Promise<ResponseWithMessage<"Reset email sent">> => {
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

export const resetPasswordRequest = (body: PasswordAndToken): Promise<ResponseWithMessage<"Password successfully reset">> => {
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

export const refreshToken = (): Promise<ResponseWithToken> => {
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(res => checkResponse(res));
};

export const fetchWithRefresh = async <T>(url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err instanceof Error) && (err.message === "jwt expired")) {
      const refreshData = await refreshToken(); //обновляем токен
      console.log(refreshData)
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      //@ts-ignore
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const getUserRequest = (): Promise<UserResponse> => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8',
      authorization: localStorage.getItem('accessToken')!
    }
  })
}

export const patchUserRequest = (body: UserDataWithPassword): Promise<UserResponse> => {
  return fetchWithRefresh(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8',
      authorization: localStorage.getItem('accessToken')!
    },
    body: JSON.stringify(body)
  })
}

export const getOrderRequest = (body: string[]): Promise<OrderResponse> => {
  return fetchWithRefresh(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8',
      authorization: localStorage.getItem('accessToken')!
    },
    body: JSON.stringify({ingredients: body})
  })
}

export const getOrderByNumberRequest = (number: number): Promise<SelectedOrderResponse> => {
  return fetch(`${BASE_URL}/orders/${number}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    }
  })
  .then (res => checkResponse(res));
}