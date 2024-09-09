/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

/* token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyNTYyMDUwOX0
IfSQTDSvmyTqY614gSGzl2WIWdAp8G9IsZ1o4Ce-l0w
*/

const initialData = localStorage.getItem('userId') !== 'undefined'
  ? JSON.parse(localStorage.getItem('userId'))
  : null;

const initialState = {
  username: initialData ? initialData.username : '',
  loggedIn: false,
  token: initialData ? initialData.token : '',
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
