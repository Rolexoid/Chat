import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ROUTES_API } from '../routes';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: ROUTES_API.baseUrl }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (userData) => ({
        url: ROUTES_API.login,
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginUserMutation } = usersApi;
