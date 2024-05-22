import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const dealerApi = createApi({
  reducerPath: "dealerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Dealers"],
  endpoints: (builder) => ({
    getDealers: builder.query({
      query: () => ({
        url: "DealerAPI/GetDealers",
      }),
      providesTags: ["Dealers"],
    }),
    getDealerById: builder.query({
      query: (id) => ({
        url: `DealerAPI/GetDealer/${id}`,
      }),
      providesTags: ["Dealers"],
    }),
    createDealer: builder.mutation({
      query: (data) => ({
        url: "DealerAPI/CreateDealer",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dealers"],
    }),
    updateDealer: builder.mutation({
      query: ({ data, id }) => ({
        url: "DealerAPI/UpdateDealer/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Dealers"],
    }),
    deleteDealer: builder.mutation({
      query: (id) => ({
        url: "DealerAPI/DeleteDealer/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Dealers"],
    }),
  }),
});

export const {
  useGetDealersQuery,
  useGetDealerByIdQuery,
  useCreateDealerMutation,
  useUpdateDealerMutation,
  useDeleteDealerMutation,
} = dealerApi;

export default dealerApi;
