const initState = { show: false };

export type notificationState = { show: boolean };

export type notificationsActionType = {
  type: "SHOW_NOTIFICATIONS" | "HIDE_NOTIFICATIONS";
};

const notificationReducer = (
  state = initState,
  action: notificationsActionType
) => {
  switch (action.type) {
    case "SHOW_NOTIFICATIONS":
      return { ...state, show: true };
    case "HIDE_NOTIFICATIONS":
      return { ...state, show: false };
    default:
      return state;
  }
};

export default notificationReducer;
