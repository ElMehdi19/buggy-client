import { combineReducers } from "redux";
import loginRequestReducer from "./authReducer";
import notificationReducer from "./notificationReducer";

const rootReducer = combineReducers({
  login: loginRequestReducer,
  notifications: notificationReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
