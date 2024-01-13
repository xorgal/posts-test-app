import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiUrl } from './constants';

function setHeaders() {
  return {
    'Content-Type': 'application/json',
  };
}

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: apiUrl }),
  endpoints: (builder) => ({
    fetchPosts: builder.query<PostEntry[], null>({
      query: () => ({
        url: '/posts',
        method: 'GET',
        headers: setHeaders(),
      }),
    }),
    fetchPostDetail: builder.query<PostEntry, PostQueryRequest>({
      query: ({ id }) => ({
        url: `/posts/${id ?? null}`,
        method: 'GET',
        headers: setHeaders(),
      }),
    }),
  }),
});

export const { useFetchPostsQuery, useFetchPostDetailQuery } = api;
