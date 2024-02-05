export type Ingredient = {
  _id: string;
  _v: number;
  type: 'bun' | 'sauce' | 'main';
  proteins: number;
  carbohydrates: number;
  fat: number;
  calories: number;
  name: string;
  image: string;
  image_large: string;
  image_mobile: string;
  price: number;
}

export type IngredientWithCount = Ingredient & {
 count: number;
 key?: string;
}

export type ConstructorElementData = Pick<Ingredient, 'type' | 'name' | 'price' | 'image' | '_id'> & {key?: string}

export type Order = {
  createdAt: Date;
  ingredients: string[];
  name: string;
  number: number;
  updatedAt: Date;
  _id: string;
  status: 'done' |  'pending' | 'created';
}

export type LoginData = {
  email: string;
  password: string;
}

export type UserData = {
  email: string;
  name: string;
}

export type UserDataWithPassword = UserData & {
  password: string;
}

export type Token = {
  token: string;
}

export type PasswordAndToken =Token & {
  password: string;
}

export type OrdersData = {
  success?: boolean;
  orders: Order[];
  total: number;
  totalToday: number;
}