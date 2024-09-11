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
  loggedIn: !!initialData,
  token: initialData ? initialData.token : '',
};

const authorizationSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setlogInUser(state, { payload }) {
      state.username = payload.username;
      state.loggedIn = true;
      state.token = payload.token;
    },
    setlogOutUser(state) {
      state.loggedIn = false;
      state.token = null;
    },
  },
});

export const { setlogInUser, setlogOutUser } = authorizationSlice.actions;
export default authorizationSlice.reducer;
