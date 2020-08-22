import { combineReducers } from "redux";
import loginRequestReducer from "./authReducer";

const rootReducer = combineReducers({
  login: loginRequestReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
