import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const featureTypeApi = createApi({
  reducerPath: "featureTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["FeatureTypes"],
  endpoints: (builder) => ({
    getFeatureTypes: builder.query({
      query: () => ({
        url: "FeatureTypeAPI/GetFeatureTypes",
      }),
      providesTags: ["FeatureTypes"],
    }),
    getFeatureTypeById: builder.query({
      query: (id) => ({
        url: `FeatureTypeAPI/GetFeatureType/${id}`,
      }),
      providesTags: ["FeatureTypes"],
    }),
    createFeatureType: builder.mutation({
      query: (data) => ({
        url: "FeatureTypeAPI/CreateFeatureType",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FeatureTypes"],
    }),
    updateFeatureType: builder.mutation({
      query: ({ data, id }) => ({
        url: "FeatureTypeAPI/UpdateFeatureType/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FeatureTypes"],
    }),
    deleteFeatureType: builder.mutation({
      query: (id) => ({
        url: "FeatureTypeAPI/DeleteFeatureType/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["FeatureTypes"],
    }),
  }),
});

export const {
  useGetFeatureTypesQuery,
  useGetFeatureTypeByIdQuery,
  useCreateFeatureTypeMutation,
  useUpdateFeatureTypeMutation,
  useDeleteFeatureTypeMutation,
} = featureTypeApi;

export default featureTypeApi;
