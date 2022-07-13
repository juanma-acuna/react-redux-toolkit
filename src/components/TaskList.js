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
        <div key={task.id}>
          <h3>{task.completed ? <del>{task.title}</del> : task.title}</h3>
          <p>
            {task.completed ? <del>{task.description}</del> : task.description}
          </p>
          <button onClick={() => handleDelete(task.id)}>Delete</button>{" "}
          {!task.completed && (
            <>
              <button onClick={() => handleEdit(task.id)}>Edit</button>{" "}
            </>
          )}
          <button onClick={() => handleCompleted(task.id)}>
            Mark as {!task.completed ? "completed" : "not completed"}
          </button>
          <br />
        </div>
      );
    });
  };

  return (
    <div>
      <button onClick={handleNewTask}>Create a new task</button>
      <br />
      <button onClick={handleOnlyNotCompleted}>
        {onlyNotCompleted ? "Show all tasks" : "Show only non completed tasks"}
      </button>
      <h2>Tasks: {tasks.length}</h2>
      {List()}
    </div>
  );
};

export default TaskList;
