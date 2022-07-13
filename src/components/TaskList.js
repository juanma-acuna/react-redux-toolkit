import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, completeTask } from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [onlyNotCompleted, setOnlyNotCompleted] = useState(false);
  let tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

  const handleCompleted = (id) => {
    dispatch(completeTask(id));
  };

  const handleNewTask = () => {
    navigate("/create-task");
  };

  const handleOnlyNotCompleted = () => {
    setOnlyNotCompleted(!onlyNotCompleted);
  };

  if (onlyNotCompleted) {
    tasks = tasks.filter((task) => !task.completed);
  }

  const List = () => {
    return tasks.map((task) => {
      return (
        <div key={task.id} className="card">
          <div className="card-title">
            {task.completed ? <del>{task.title}</del> : task.title}
          </div>
          <p className="card-description">
            {task.completed ? <del>{task.description}</del> : task.description}
          </p>
          <div className="card-actions">
            <button
              onClick={() => handleDelete(task.id)}
              className="btn-delete"
            >
              Delete
            </button>{" "}
            {!task.completed && (
              <>
                <button
                  onClick={() => handleEdit(task.id)}
                  className="btn-edit"
                >
                  Edit
                </button>{" "}
              </>
            )}
            <button
              onClick={() => handleCompleted(task.id)}
              className="btn-completed"
            >
              {!task.completed ? "Completed" : "Not completed"}
            </button>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-4/5">
      <div className="list-header">Tasks: {tasks.length}</div>
      <div className="flex justify-center pb-4">
        <button onClick={handleNewTask} className="btn-primary">
          Create a new task
        </button>
        <button onClick={handleOnlyNotCompleted} className="btn-secondary">
          {onlyNotCompleted
            ? "Show all tasks"
            : "Show only non completed tasks"}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3">{List()}</div>
    </div>
  );
};

export default TaskList;
