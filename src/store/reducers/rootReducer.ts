import { combineReducers } from "redux";
import loginRequestReducer from "./authReducer";
import notificationReducer from "./notificationReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  login: loginRequestReducer,
  notifications: notificationReducer,
  modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
