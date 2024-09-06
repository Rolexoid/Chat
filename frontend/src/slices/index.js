import { configureStore } from '@reduxjs/toolkit';
import authorizationReducer from './authorizationSlice';
import appReducer from './appSlice';
import { usersApi } from '../services/usersApi';
import { channelsApi } from '../services/channelsApi';
import { messagesApi } from '../services/messagesApi';

export default configureStore({
  reducer: {
    users: authorizationReducer,
    appControl: appReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    usersApi.middleware,
    channelsApi.middleware,
    messagesApi.middleware,
  ),
});
