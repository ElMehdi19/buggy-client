import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
} from "../actions/constants";

const initState = {
  loggedIn: false,
  loginError: null,
};

export type LoginState = {
  loggedIn: boolean;
  loginError: string;
};

type loginActionType =
  | {
      type: "LOGIN_ERROR";
      message: string;
    }
  | { type: "LOGIN_SUCCESS" | "LOGOUT_SUCCESS" };

const loginRequestReducer = (state = initState, action: loginActionType) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, loggedIn: true, loginError: null };
    case LOGIN_ERROR:
      return { ...state, loggedIn: false, loginError: action.message };
    case LOGOUT_SUCCESS:
      return { ...state, loggedIn: false, loginError: null };
    default:
      return state;
  }
};

export default loginRequestReducer;
