import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const countryApi = createApi({
  reducerPath: "countryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://localhost:44352/api/v1/",
  }),
  tagTypes: ["Countrys"],
  endpoints: (builder) => ({
    getCountrys: builder.query({
      query: () => ({
        url: "CountryAPI/GetCountrys",
      }),
      providesTags: ["Countrys"],
    }),
    getCountryById: builder.query({
      query: (id) => ({
        url: `CountryAPI/GetCountry/${id}`,
      }),
      providesTags: ["Countrys"],
    }),
    createCountry: builder.mutation({
      query: (data) => ({
        url: "CountryAPI/CreateCountry",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Countrys"],
    }),
    updateCountry: builder.mutation({
      query: ({ data, id }) => ({
        url: "CountryAPI/UpdateCountry/" + id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Countrys"],
    }),
    deleteCountry: builder.mutation({
      query: (id) => ({
        url: "CountryAPI/DeleteCountry/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Countrys"],
    }),
  }),
});

export const {
  useGetCountrysQuery,
  useGetCountryByIdQuery,
  useCreateCountryMutation,
  useUpdateCountryMutation,
  useDeleteCountryMutation,
} = countryApi;
export default countryApi;
