import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carTypeApi = createApi({
  reducerPath: "carTypeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["CarTypes"],
  endpoints: (builder) => ({
    getCarTypes: builder.query({
      query: () => ({
        url: "CarTypeAPI/GetCarTypes",
      }),
      providesTags: ["CarTypes"],
    }),
    getCarTypeById: builder.query({
      query: (id) => ({
        url: `CarTypeAPI/GetCarType/${id}`,
      }),
      providesTags: ["CarTypes"],
    }),
    createCarType: builder.mutation({
      query: (data) => ({
        url: "CarTypeAPI/CreateCarType",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CarTypes"],
    }),
    updateCarType: builder.mutation({
      query: ({ data, id }) => ({
        url: "CarTypeAPI/UpdateCarType/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CarTypes"],
    }),
    deleteCarType: builder.mutation({
      query: (id) => ({
        url: "CarTypeAPI/DeleteCarType/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CarTypes"],
    }),
  }),
});

export const {
  useGetCarTypesQuery,
  useGetCarTypeByIdQuery,
  useCreateCarTypeMutation,
  useUpdateCarTypeMutation,
  useDeleteCarTypeMutation,
} = carTypeApi;

export default carTypeApi;
