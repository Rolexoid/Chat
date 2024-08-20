/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialData = JSON.parse(localStorage.getItem('userId'));

const initialState = {
  username: initialData.username || null,
  loggedIn: false,
  token: initialData.token || null,
};

const authorizationSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    logIn(state, { payload }) {
      state.username = payload.username;
      state.loggedIn = true;
      state.token = payload.token;
    },
    logOut(state) {
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { logIn, logOut } = authorizationSlice.actions;
export default authorizationSlice.reducer;
