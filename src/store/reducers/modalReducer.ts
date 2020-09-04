export type modalState = {
  showModal: boolean;
};

export type modalActionType = {
  type: "SHOW_MODAL" | "HIDE_MODAL";
};

const initState = {
  showModal: false,
};

const modalReducer = (
  state = initState,
  action: modalActionType
): modalState => {
  switch (action.type) {
    case "SHOW_MODAL":
      return { ...state, showModal: true };
    case "HIDE_MODAL":
      return { ...state, showModal: false };
    default:
      return state;
  }
};

export default modalReducer;
