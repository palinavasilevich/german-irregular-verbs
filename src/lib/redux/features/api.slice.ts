import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { addVerbs } from "./verb.slice";
import { Verb } from "@/types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: (builder) => ({
    getVerbs: builder.query<Verb[], void>({
      query: () => "verbs",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(addVerbs(data));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetVerbsQuery } = apiSlice;
