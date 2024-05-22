import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewApi = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => ({
        url: "ReviewAPI/GetReviews",
      }),
      providesTags: ["Reviews"],
    }),
    getReviewById: builder.query({
      query: (id) => ({
        url: `ReviewAPI/GetReview/${id}`,
      }),
      providesTags: ["Reviews"],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: "ReviewAPI/CreateReview",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    updateReview: builder.mutation({
      query: ({ data, id }) => ({
        url: "ReviewAPI/UpdateReview/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reviews"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: "ReviewAPI/DeleteReview/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Reviews"],
    }),
    getReviewByCarId: builder.query({
      query: (id) => ({
        url: `ReviewAPI/GetReviewByCarId/${id}`,
      }),
      providesTags: ["Reviews"],
    }),
    LikeCount: builder.mutation({
      query: (id) => ({
        url: `ReviewAPI/LikeCount/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Reviews"],
    }),
    DisLikeCount: builder.mutation({
      query: (id) => ({
        url: `ReviewAPI/DisLikeCount/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Reviews"],
    })
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewByIdQuery,
  useGetReviewByCarIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useLikeCountMutation,
  useDisLikeCountMutation,

} = reviewApi;

export default reviewApi;
