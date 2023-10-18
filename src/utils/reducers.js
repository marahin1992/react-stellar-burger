export function reducerTotal(state, action) {
  switch (action.type) {
    case "bun":
      return state + (action.price * 2) - (action.prev * 2);
    case "stuff":
      return state + action.price;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}