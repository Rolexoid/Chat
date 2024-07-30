import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';
import { usersApi } from '../services/usersApi';
import { channelsApi } from '../services/channelsApi';

export default configureStore({
  reducer: {
    users: authorizationReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    getDefaultMiddleware().concat(usersApi.middleware, channelsApi.middleware),
});
