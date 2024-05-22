import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewXCommentApi = createApi({
  reducerPath: "reviewXCommentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["ReviewXComments"],
  endpoints: (builder) => ({
    getReviewXComments: builder.query({
      query: () => ({
        url: "ReviewXCommentAPI/GetReviewXComments",
      }),
      providesTags: ["ReviewXComments"],
    }), 
    getReviewXCommentById: builder.query({
      query: (id) => ({
        url: `ReviewXCommentAPI/GetReviewXComment/${id}`,
      }),
      providesTags: ["ReviewXComments"],
    }),
    createReviewXComment: builder.mutation({
      query: (data) => ({
        url: "ReviewXCommentAPI/CreateReviewXComment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ReviewXComments"],
    }),
    updateReviewXComment: builder.mutation({
      query: ({ data, id }) => ({
        url: "ReviewXCommentAPI/UpdateReviewXComment/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["ReviewXComments"],
    }),
    deleteReviewXComment: builder.mutation({
      query: (id) => ({
        url: "ReviewXCommentAPI/DeleteReviewXComment/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["ReviewXComments"],
    }),
  }),
});

export const {
  useGetReviewXCommentsQuery,
  useGetReviewXCommentByIdQuery,
  useCreateReviewXCommentMutation,
  useUpdateReviewXCommentMutation,
  useDeleteReviewXCommentMutation,
} = reviewXCommentApi;

export default reviewXCommentApi;
