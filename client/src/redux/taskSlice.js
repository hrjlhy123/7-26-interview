// src/redux/taskSlice.js
import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks.splice(action.payload, 1);
    },
    editTask: (state, action) => {
      const { index, text } = action.payload;
      state.tasks[index] = text;
    },
  },
});

export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskSlice.reducer;
