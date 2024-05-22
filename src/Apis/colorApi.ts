import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const colorApi = createApi({
  reducerPath: "colorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Colors"],
  endpoints: (builder) => ({
    getColors: builder.query({
      query: () => ({
        url: "ColorAPI/GetColors",
      }),
      providesTags: ["Colors"],
    }),
    getColorById: builder.query({
      query: (id) => ({
        url: `ColorAPI/GetColor/${id}`,
      }),
      providesTags: ["Colors"],
    }),
    createColor: builder.mutation({
      query: (data) => ({
        url: "ColorAPI/CreateColor",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Colors"],
    }),
    updateColor: builder.mutation({
      query: ({ data, id }) => ({
        url: "ColorAPI/UpdateColor/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Colors"],
    }),
    deleteColor: builder.mutation({
      query: (id) => ({
        url: "ColorAPI/DeleteColor/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Colors"],
    }),
  }),
});

export const {
  useGetColorsQuery,
  useGetColorByIdQuery,
  useCreateColorMutation,
  useUpdateColorMutation,
  useDeleteColorMutation,
} = colorApi;

export default colorApi;
