import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const carXColorApi = createApi({
  reducerPath: "carXColorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["CarXColors"],
  endpoints: (builder) => ({
    getCarXColors: builder.query({
      query: () => ({
        url: "CarXColorAPI/GetCarXColors",
      }),
      providesTags: ["CarXColors"],
    }),

    getCarXColorById: builder.query({
      query: (id) => ({
        url: `CarXColorAPI/GetCarXColor/${id}`,
      }),
      providesTags: ["CarXColors"],
    }),

    getCarXColorByCarId: builder.query({
      query: (carId) => ({
        url: `CarXColorAPI/GetCarXColorByCarId/${carId}`,
      }),
      providesTags: ["CarXColors"],
    }),

    createCarXColor: builder.mutation({
      query: (data) => ({
        url: "CarXColorAPI/CreateCarXColor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CarXColors"],
    }),

    updateCarXColor: builder.mutation({
      query: ({ data, id }) => ({
        url: "CarXColorAPI/UpdateCarXColor/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CarXColors"],
    }),
    
    deleteCarXColor: builder.mutation({
      query: (id) => ({
        url: "CarXColorAPI/DeleteCarXColor/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["CarXColors"],
    }),
  }),
});

export const {
  useGetCarXColorsQuery,
  useGetCarXColorByIdQuery,
  useCreateCarXColorMutation,
  useUpdateCarXColorMutation,
  useDeleteCarXColorMutation,
  useGetCarXColorByCarIdQuery,
} = carXColorApi;
export default carXColorApi;
