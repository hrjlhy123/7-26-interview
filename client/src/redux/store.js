// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import taskReducer from './taskSlice'; // ✅ 新增

export const store = configureStore({
  reducer: {
    user: userReducer,
    task: taskReducer, // ✅ 注册 task reducer
  },
});