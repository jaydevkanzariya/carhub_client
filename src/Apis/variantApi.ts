import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const variantApi = createApi({
  reducerPath: "variantApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Variants"],
  endpoints: (builder) => ({
    getVariants: builder.query({
      query: () => ({
        url: "VariantAPI/GetVariants",
      }),
      providesTags: ["Variants"],
    }),
    getVariantById: builder.query({
      query: (id) => ({
        url: `VariantAPI/GetVariant/${id}`,
      }),
      providesTags: ["Variants"],
    }),
    createVariant: builder.mutation({
      query: (data) => ({
        url: "VariantAPI/CreateVariant",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Variants"],
    }),
    updateVariant: builder.mutation({
      query: ({ data, id }) => ({
        url: "VariantAPI/UpdateVariant/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Variants"],
    }),
    deleteVariant: builder.mutation({
      query: (id) => ({
        url: "VariantAPI/DeleteVariant/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Variants"],
    }),
  }),
});

export const {
  useGetVariantsQuery,
  useGetVariantByIdQuery,
  useCreateVariantMutation,
  useUpdateVariantMutation,
  useDeleteVariantMutation,
} = variantApi;

export default variantApi;
