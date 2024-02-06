import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://stapi.co/api/v2/rest/" }),
    endpoints: (builder) => ({
        getSpacecrafts: builder.query<any, void>({
            query: () => "spacecraft/search",
        }),
    }),
});

export const { useGetSpacecraftsQuery } = api;
