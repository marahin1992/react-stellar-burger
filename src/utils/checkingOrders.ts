import { IngredientWithCount, Order } from "./types";

export function CheckingOrder(order: Order, ingredients: IngredientWithCount[]) {
  const orderIngredients = order.ingredients;
  if (orderIngredients.length < 3) {
    return false
  } 
  const bunTop = ingredients.find((item: IngredientWithCount) => item._id === orderIngredients[0]);
  const bunBottom = ingredients.find((item: IngredientWithCount) => item._id === orderIngredients[orderIngredients.length - 1]);

  if (bunTop !== undefined && bunBottom !== undefined && !(bunTop.type === 'bun' && bunBottom.type === 'bun')) {
    return false;
  }
  return true;
}