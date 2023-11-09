export const getIngredientsRequest = () => {
  return fetch('https://norma.nomoreparties.space/api/ingredients')
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  })
}

export const getOrderRequest = (body) => {
  return fetch(`https://norma.nomoreparties.space/api/orders`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'charset': 'utf-8'
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    })
}