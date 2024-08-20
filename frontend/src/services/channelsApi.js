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
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => ROUTES_API.channels,
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;
