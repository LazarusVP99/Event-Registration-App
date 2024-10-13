import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from '../../config/api';
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
        getPaginatedEvents: build.query({
            query: ({ limit, order, page, sort }) => ({
                url: endpoints.eventsAll,
                method: 'GET',
                params: { limit, order, page, sort },
            }),
        }),
        getEventById: build.query({
            query: ({ id }) =>  `${endpoints.events}/${id}`,
        }),
    }),
});

export const { useLazyGetPaginatedEventsQuery, useGetEventByIdQuery } = eventsApi;

export default eventsApi;
