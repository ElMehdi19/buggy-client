import { Dispatch } from "redux";
import {
  notificationState,
  notificationsActionType,
} from "../reducers/notificationReducer";

const notificationAction = (currentState: notificationState) => {
  return (dispatch: Dispatch<notificationsActionType>) => {
    if (currentState.show) return dispatch({ type: "HIDE_NOTIFICATIONS" });
    return dispatch({ type: "SHOW_NOTIFICATIONS" });
  };
};

export default notificationAction;
