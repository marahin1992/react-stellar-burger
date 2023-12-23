export function CheckingOrder(order, ingredients) {
  const orderIngredients = order.ingredients;
  if (orderIngredients.length < 3) {
    return false
  } 
  const bunTop = ingredients.find(item => item._id === orderIngredients[0]);
  const bunBottom = ingredients.find(item => item._id === orderIngredients[orderIngredients.length - 1]);

  if (!(bunTop.type === 'bun' && bunBottom.type === 'bun')) {
    return false;
  }
  return true;
}