import React, { Component } from "react";
import ProjectTask from "./ProjectTasks/ProjectTask";

class Backlog extends Component {
  render() {
    const { project_tasks_prop } = this.props;

    /* In this way we can devided using status  */

    // const todoTasks = project_tasks_prop.map(
    //   (project_task) =>
    //     project_task.status === "TO_DO" && (
    //       <ProjectTask key={project_task.id} project_task={project_task} />
    //     )
    // );
    // const inProgressTask = project_tasks_prop.map(
    //   (project_task) =>
    //     project_task.status === "IN_PROGRESS" && (
    //       <ProjectTask key={project_task.id} project_task={project_task} />
    //     )
    // );
    // const doneTasks = project_tasks_prop.map(
    //   (project_task) =>
    //     project_task.status === "DONE" && (
    //       <ProjectTask key={project_task.id} project_task={project_task} />
    //     )
    // );

    /* OR */

    const tasks = project_tasks_prop.map((project_task) => (
      <ProjectTask key={project_task.id} project_task={project_task} />
    ));

    let todoTasks = [],
      inProgressTask = [],
      doneTasks = [];

    for (let i = 0; i < tasks.length; i++) {
      console.log("Tasks ", tasks[i]);
      if (tasks[i].props.project_task.status === "TO_DO")
        todoTasks.push(tasks[i]);
      else if (tasks[i].props.project_task.status === "IN_PROGRESS")
        inProgressTask.push(tasks[i]);
      else if (tasks[i].props.project_task.status === "DONE")
        doneTasks.push(tasks[i]);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-secondary text-white">
                <h3>TO DO</h3>
              </div>
            </div>
            {todoTasks}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-primary text-white">
                <h3>In Progress</h3>
              </div>
            </div>
            {inProgressTask}
          </div>
          <div className="col-md-4">
            <div className="card text-center mb-2">
              <div className="card-header bg-success text-white">
                <h3>Done</h3>
              </div>
            </div>
            {doneTasks}
          </div>
        </div>
      </div>
    );
  }
}
export default Backlog;
