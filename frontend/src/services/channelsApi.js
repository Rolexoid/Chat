import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ROUTES_API } from '../routes';

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: ROUTES_API.baseUrl,
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().users;
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Channel'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ROUTES_API.channels,
      providesTags: ['Channel'],
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: ROUTES_API.channels,
        method: 'POST',
        body: channel,
      }),
      invalidatesTags: ['Channel'],
    }),
    editChannel: builder.mutation({
      query: ({ id, body }) => ({
        url: `${ROUTES_API.channels}/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Channel'],
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: `${ROUTES_API.channels}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channel'],
    }),
  }),
});

export const {
  useGetChannelsQuery, useAddChannelMutation, useEditChannelMutation, useRemoveChannelMutation,
} = channelsApi;
