import { SET_GLOBAL_ALERT_MODAL } from "./globarAlertModalAction";

const initialState = {
  show: false,
  type: "warning",
  message: "Normal Condition",
};

const globalModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GLOBAL_ALERT_MODAL:
      return action.payload;
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
export default globalModalReducer;
