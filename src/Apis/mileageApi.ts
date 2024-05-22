import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const mileageApi = createApi({
  reducerPath: "mileageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Mileages"],
  endpoints: (builder) => ({
    getMileages: builder.query({
      query: () => ({
        url: "MileageAPI/GetMileages",
      }),
      providesTags: ["Mileages"],
    }),
    getMileageById: builder.query({
      query: (id) => ({
        url: `MileageAPI/GetMileage/${id}`,
      }),
      providesTags: ["Mileages"],
    }),
    getMileageByCarId: builder.query({
      query: (id) => ({
        url: `MileageAPI/GetMileageByCarId/${id}`,
      }),
      providesTags: ["Mileages"],
    }),
    createMileage: builder.mutation({
      query: (data) => ({
        url: "MileageAPI/CreateMileage",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Mileages"],
    }),
    updateMileage: builder.mutation({
      query: ({ data, id }) => ({
        url: "MileageAPI/UpdateMileage/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Mileages"],
    }),
    deleteMileage: builder.mutation({
      query: (id) => ({
        url: "MileageAPI/DeleteMileage/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Mileages"],
    }),
  }),
});

export const {
  useGetMileagesQuery,
  useGetMileageByCarIdQuery,
  useGetMileageByIdQuery,
  useCreateMileageMutation,
  useUpdateMileageMutation,
  useDeleteMileageMutation,
} = mileageApi;

export default mileageApi;
