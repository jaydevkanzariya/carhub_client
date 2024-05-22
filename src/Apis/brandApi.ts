import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const brandApi = createApi({
  reducerPath: "brandApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Brands"],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "BrandAPI/GetBrands",
      }),
      providesTags: ["Brands"],
    }),
    getBrandById: builder.query({
      query: (id) => ({
        url: `BrandAPI/GetBrand/${id}`,
      }),
      providesTags: ["Brands"],
    }),
    createBrand: builder.mutation({
      query: (data) => ({
        url: "BrandAPI/CreateBrand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    updateBrand: builder.mutation({
      query: ({ data, id }) => ({
        url: "BrandAPI/UpdateBrand/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),
    deleteBrand: builder.mutation({
      query: (id) => ({
        url: "BrandAPI/DeleteBrand/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApi;

export default brandApi;
