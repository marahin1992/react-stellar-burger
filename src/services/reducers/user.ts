import { UserData } from '../../utils/types';
import { SET_AUTH_CHECKED, SET_USER, UserActions } from '../actions/user';

type UserState = {
  user: null | UserData;
  isAuthChecked: boolean;
}

const initialState:UserState = {
    user: null,
    isAuthChecked: false,
};

const user = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state;    
  }
};

export default user; 