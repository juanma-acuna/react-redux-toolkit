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
    <div className="w-4/5">
      <div className="flex justify-center pb-2">
        <div className="form-header">{id ? "Edit task" : "Create task"}</div>
      </div>
      <div className="form-body">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
            value={task.title}
            className="form-input"
          />
          <textarea
            name="description"
            placeholder="description"
            onChange={handleChange}
            value={task.description}
            className="form-textarea"
          />
          <br />
          <div className="form-actions">
            <button onClick={handleCancel} className="btn-secondary">
              Cancel
            </button>{" "}
            <button type="submit" className="btn-primary">
              {id ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
