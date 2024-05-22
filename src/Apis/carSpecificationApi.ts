import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carSpecificationApi = createApi({
  reducerPath: "carSpecificationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["CarSpecifications"],
  endpoints: (builder) => ({
    getCarSpecifications: builder.query({
      query: () => ({
        url: "CarSpecificationAPI/GetCarSpecifications",
      }),
      providesTags: ["CarSpecifications"],
    }),
    getCarSpecificationById: builder.query({
      query: (id) => ({
        url: `CarSpecificationAPI/GetCarSpecification/${id}`,
      }),
      providesTags: ["CarSpecifications"],
    }),
    createCarSpecification: builder.mutation({
      query: (data) => ({
        url: "CarSpecificationAPI/CreateCarSpecification",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CarSpecifications"],
    }),
    updateCarSpecification: builder.mutation({
      query: ({ data, id }) => ({
        url: "CarSpecificationAPI/UpdateCarSpecification/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CarSpecifications"],
    }),
    deleteCarSpecification: builder.mutation({
      query: (id) => ({
        url: "CarSpecificationAPI/DeleteCarSpecification/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CarSpecifications"],
    }),
  }),
});

export const {
  useGetCarSpecificationsQuery,
  useGetCarSpecificationByIdQuery,
  useCreateCarSpecificationMutation,
  useUpdateCarSpecificationMutation,
  useDeleteCarSpecificationMutation,
} = carSpecificationApi;

export default carSpecificationApi;
