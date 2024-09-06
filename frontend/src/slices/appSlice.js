/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: { id: '1', name: 'general', removable: false },
  modalInfo: { type: null, item: null },
};

const appSlice = createSlice({
  name: 'appControl',
  initialState,
  reducers: {
    setActiveChannel(state, { payload }) {
      state.activeChannel = payload;
    },
    showModal(state, { payload }) {
      state.modalInfo = payload;
    },
    hideModal(state) {
      state.modalInfo = { type: null, item: null };
    },
  },
});

export const { setActiveChannel, showModal, hideModal } = appSlice.actions;
export default appSlice.reducer;
