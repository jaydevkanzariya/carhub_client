import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const featureApi = createApi({
  reducerPath: "featureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Features"],
  endpoints: (builder) => ({
    getFeatures: builder.query({
      query: () => ({
        url: "FeatureAPI/GetFeatures",
      }),
      providesTags: ["Features"],
    }),
    getFeatureById: builder.query({
      query: (id) => ({
        url: `FeatureAPI/GetFeature/${id}`,
      }),
      providesTags: ["Features"],
    }),
    createFeature: builder.mutation({
      query: (data) => ({
        url: "FeatureAPI/CreateFeature",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Features"],
    }),
    updateFeature: builder.mutation({
      query: ({ data, id }) => ({
        url: "FeatureAPI/UpdateFeature/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Features"],
    }),
    deleteFeature: builder.mutation({
      query: (id) => ({
        url: "FeatureAPI/DeleteFeature/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Features"],
    }),
  }),
});

export const {
  useGetFeaturesQuery,
  useGetFeatureByIdQuery,
  useCreateFeatureMutation,
  useUpdateFeatureMutation,
  useDeleteFeatureMutation,
} = featureApi;

export default featureApi;
