import { Dispatch } from "redux";

type LOGIN_ACTION =
  | {
      type: "LOGIN_SUCCESS";
      userId: number;
    }
  | {
      type: "LOGIN_ERROR";
      message: string;
    };

type LOGOUT_ACTION = {
  type: "LOGOUT_SUCCESS";
};

const loginUser = (action: LOGIN_ACTION | LOGOUT_ACTION) => {
  return (dispatch: Dispatch) => {
    return dispatch({ ...action });
  };
};

export default loginUser;
