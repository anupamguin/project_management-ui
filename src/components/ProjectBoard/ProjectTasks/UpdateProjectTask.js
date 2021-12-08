import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogActions";

class UpdateProjectTask extends Component {
  constructor(props) {
    super(props);

    this.state = {
      acceptanceCriteria: "",
      created_At: "",
      dueDate: "",
      id: "",
      priority: "",
      projectIdentifier: "",
      projectSequence: "",
      status: "",
      summary: "",

      errors: {},
    };
  }

  componentDidMount() {
    const { backlog_id, pt_id } = this.props.match.params;
    this.props.getProjectTask(backlog_id, pt_id, this.props.history);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    const {
      acceptanceCriteria,
      created_At,
      dueDate,
      id,
      priority,
      projectIdentifier,
      projectSequence,
      status,
      summary,
    } = nextProps.project_task;

    this.setState({
      acceptanceCriteria,
      created_At,
      dueDate,
      id,
      priority,
      projectIdentifier,
      projectSequence,
      status,
      summary,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const UpdateProjectTask = {
      acceptanceCriteria: this.state.acceptanceCriteria,
      created_At: this.state.created_At,
      dueDate: this.state.dueDate,
      id: this.state.id,
      priority: this.state.priority,
      projectIdentifier: this.state.projectIdentifier,
      projectSequence: this.state.projectSequence,
      status: this.state.status,
      summary: this.state.summary,
    };
    console.log(UpdateProjectTask);

    this.props.updateProjectTask(
      this.state.projectIdentifier,
      this.state.projectSequence,
      UpdateProjectTask,
      this.props.history
    );
  };

  render() {
    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${this.state.projectIdentifier}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                Project Name {this.state.projectIdentifier} + Project Task ID:{" "}
                {this.state.projectSequence}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group mt-4">
                  <input
                    type="text"
                    className={
                      this.state.errors.summary
                        ? "form-control form-control-lg is-invalid"
                        : "form-control form-control-lg"
                    }
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {this.state.errors.summary && (
                    <div className="invalid-feedback">
                      {this.state.errors.summary}
                    </div>
                  )}
                </div>
                <div className="form-group mt-4">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="Acceptance Criteria"
                    name="acceptanceCriteria"
                    value={this.state.acceptanceCriteria}
                    onChange={this.onChange}
                  ></textarea>
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    name="dueDate"
                    value={this.state.dueDate}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group mt-4">
                  <select
                    className="form-control form-control-lg"
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                </div>

                <div className="form-group mt-4">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
