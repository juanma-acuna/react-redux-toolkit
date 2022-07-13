import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, editTask } from "../features/tasks/tasksSlice";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = {
    title: "",
    description: "",
  };
  const t = useSelector((state) => state.tasks.find((task) => task.id === id));

  const [task, setTask] = useState(t || initialState);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() !== "") {
      if (id) {
        dispatch(editTask(task));
      } else {
        dispatch(addTask({ ...task, id: uuidv4(), completed: false }));
      }
    }
    navigate("/");
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="title"
        name="title"
        onChange={handleChange}
        value={task.title}
      />
      <br />
      <textarea
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={task.description}
      />
      <br />
      <button onClick={handleCancel}>Cancel</button>{" "}
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
