import { combineReducers } from "redux";
import backlogReducer from "./backlogReducer";
import errorReducer from "./errorReducer";
import projectReducer from "./projectReducer";
import globalModalReducer from "../components/GlobalAlertModal/globalAlertModalReducer";
import securityReducer from "./securityReducer";
export default combineReducers({
  errors: errorReducer,
  project: projectReducer,
  backlog: backlogReducer,
  globalModalReducer,
  securityReducer,
});
