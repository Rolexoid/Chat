import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { ROUTES_API } from '../routes';

/* const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
}; */

export const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().users;
      headers.set('Authorization', `Bearer: ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '/channels',
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;
