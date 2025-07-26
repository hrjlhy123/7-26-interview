// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
  },
  reducers: {
    registerUser: (state, action) => {
      console.log('Redux注册:', action.payload);
      state.currentUser = action.payload;
    },
    loginUser: (state, action) => {
      console.log('Redux登录:', action.payload);
      state.currentUser = action.payload;
    },
  },
});

export const { registerUser, loginUser } = userSlice.actions;
export default userSlice.reducer;