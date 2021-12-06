import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    const { project_tasks_prop } = this.props;

    const todotasks = project_tasks_prop.map(
      (project_task) =>
        project_task.status === "TO_DO" && (
          <ProjectTask key={project_task.id} project_task={project_task} />
        )
    );
    const inProgresstasks = project_tasks_prop.map(
      (project_task) =>
        project_task.status === "IN_PROGRESS" && (
          <ProjectTask key={project_task.id} project_task={project_task} />
        )
    );
    const donetasks = project_tasks_prop.map(
      (project_task) =>
        project_task.status === "DONE" && (
          <ProjectTask key={project_task.id} project_task={project_task} />
        )
    );
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todotasks}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgresstasks}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {donetasks}
          </div>
        </div>
      </div>
    );
  }
}
export default Backlog;
