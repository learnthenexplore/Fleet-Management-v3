import { createSlice } from '@reduxjs/toolkit';

// Load user from localStorage if available
const savedUser = JSON.parse(localStorage.getItem('user'));

const initialState = {
  user: savedUser || null, // will hold { name, employeeType, permissions, ... }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload)); // persist to localStorage
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('user'); // remove from localStorage
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;

