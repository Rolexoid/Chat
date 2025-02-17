import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ROUTES_API } from '../utils/routes';

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ROUTES_API.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().users;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ROUTES_API.messages,
      providesTags: ['Message'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: ROUTES_API.messages,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Message'],
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
