import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carXFeatureApi = createApi({
  reducerPath: "carXFeatureApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["CarXFeatures"],
  endpoints: (builder) => ({
    getCarXFeatures: builder.query({
      query: () => ({
        url: "CarXFeatureAPI/GetCarXFeatures",
      }),
      providesTags: ["CarXFeatures"],
    }),
    getCarXFeatureById: builder.query({
      query: (id) => ({
        url: `CarXFeatureAPI/GetCarXFeature/${id}`,
      }),
      providesTags: ["CarXFeatures"],
    }),
    createCarXFeature: builder.mutation({
      query: (data) => ({
        url: "CarXFeatureAPI/CreateCarXFeature",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CarXFeatures"],
    }),
    updateCarXFeature: builder.mutation({
      query: ({ data, id }) => ({
        url: "CarXFeatureAPI/UpdateCarXFeature/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CarXFeatures"],
    }),
    deleteCarXFeature: builder.mutation({
      query: (id) => ({
        url: "CarXFeatureAPI/DeleteCarXFeature/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CarXFeatures"],
    }),
    getCarXFeatureByCarId: builder.query({
      query: (carId) => ({
        url: `CarXFeatureAPI/GetCarXFeatureByCarId/${carId}`,
      }),
      providesTags: ["CarXFeatures"],
    }),
  }),
});

export const {
  useGetCarXFeaturesQuery,
  useGetCarXFeatureByCarIdQuery,
  useGetCarXFeatureByIdQuery,
  useCreateCarXFeatureMutation,
  useUpdateCarXFeatureMutation,
  useDeleteCarXFeatureMutation,
} = carXFeatureApi;

export default carXFeatureApi;
