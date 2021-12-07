export const SET_GLOBAL_ALERT_MODAL = "SET_GLOBAL_ALERT_MODAL";

const updateGlobalAlertModal = (show, type, message) => ({
  type: SET_GLOBAL_ALERT_MODAL,
  payload: { show, type, message },
});
export default updateGlobalAlertModal;
