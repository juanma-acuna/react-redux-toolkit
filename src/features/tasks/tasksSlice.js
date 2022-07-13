import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  {
    id: "1",
    title: "Task 1",
    description: "Task 1 description",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    description: "Task 2 description",
    completed: false,
  },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    editTask: (state, action) => {
      const foundedtask = state.find((task) => task.id === action.payload.id);
      foundedtask.title = action.payload.title;
      foundedtask.description = action.payload.description;
      foundedtask.completed = action.payload.completed;
    },
    deleteTask: (state, action) => {
      console.log("action.payload", action.payload);
      const index = state.findIndex((task) => task.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    completeTask: (state, action) => {
      const foundedtask = state.find((task) => task.id === action.payload);
      foundedtask.completed = !foundedtask.completed;
    },
  },
});

// Action creators
export const { addTask, deleteTask, editTask, completeTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
