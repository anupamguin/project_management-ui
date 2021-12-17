import "./App.css";
import Dashboard from "./components/Dashboard";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddProject from "./components/Project/AddProject";
import { Provider } from "react-redux";
import store from "./store";
import UpdateProject from "./components/Project/UpdateProject";
import ProjectBoard from "./components/ProjectBoard/ProjectBoard";
import AddProjectTask from "./components/ProjectBoard/ProjectTasks/AddProjectTask";
import axios from "axios";
import { SET_GLOBAL_ALERT_MODAL } from "./components/GlobalAlertModal/globarAlertModalAction";
import GlobalAlertModal from "./components/GlobalAlertModal/globalAlertModal";
import UpdateProjectTask from "./components/ProjectBoard/ProjectTasks/UpdateProjectTask";
import Landing from "./components/Layout/Landing";
import Login from "./components/UserManagement/Login";
import Register from "./components/UserManagement/Register";

// For any backend error
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    try {
      if (401 === error.response.status) {
        console.warn("401 Error Came ");
        let endpoint = error.response.config.url.split("/")[3];
        store.dispatch({
          type: SET_GLOBAL_ALERT_MODAL,
          payload: {
            show: true,
            type: "warning",
            title: `Error with ${endpoint} endpoint`,
            message: `${endpoint} endpoint is unresponsive , Something Error`,
          },
        });
      } else if (404 === error.response.status) {
        console.warn("404 Error Came ");
        let endpoint = error.response.config.url.split("/")[3];
        store.dispatch({
          type: SET_GLOBAL_ALERT_MODAL,
          payload: {
            show: true,
            type: "warning",
            title: `Error with ${endpoint} endpoint`,
            message: `${endpoint} endpoint is unresponsive , Please contact to admin`,
          },
        });
      } else if (500 === error.response.status) {
        let endpoint = error.response.config.url.split("/")[3];
        console.log(endpoint, "    ", error.response.config.url);
        store.dispatch({
          type: SET_GLOBAL_ALERT_MODAL,
          payload: {
            show: true,
            type: "info",
            title: `Error with ${endpoint} endpoint`,
            message: `${endpoint} endpoint is unresponsive , Please contact to admin`,
          },
        });
      } else return Promise.reject(error);
    } catch (err) {
      console.log("error came in index.js");
    }
  }
);

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalAlertModal />
        <Router>
          <div className="App">
            <Header />
            {/* Public Routes */}
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />

            {/*  Private Routes */}
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="/addProject" component={AddProject} />
            <Route exact path="/updateProject/:id" component={UpdateProject} />
            <Route exact path="/projectBoard/:id" component={ProjectBoard} />
            <Route
              exact
              path="/addProjectTask/:id"
              component={AddProjectTask}
            />
            <Route
              exact
              path="/updateProjectTask/:backlog_id/:pt_id"
              component={UpdateProjectTask}
            />
          </div>
        </Router>
      </Provider>
    </>
  );
}

export default App;
