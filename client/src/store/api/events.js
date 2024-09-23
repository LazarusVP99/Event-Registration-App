import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Available Events
 */

export const eventsApi = createApi({
    reducerPath: 'availableEvents',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (build) => ({
        getPaginatedEvents: build.mutation({
            query: ({ limit, order, page, sort }) => ({
                url: 'events/all',
                method: 'POST',
                body: {
                    limit, order, page, sort,
                },
            }),
        }),
        getEventById: build.query({
            query: ({ id }) =>  `events/${id}`,
        }),
    }),
});

export const { useGetPaginatedEventsMutation, useGetEventByIdQuery } = eventsApi;

export default eventsApi;
