import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints } from '../../config/api';

/**
 * User Registration Fetch
 */

export const registerApi = createApi({
    reducerPath: 'userRegistration',
    baseQuery: fetchBaseQuery({
        baseUrl: '/api/',
        prepareHeaders: (headers) => {
            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    endpoints: (build) => ({
        registeredUser: build.mutation({
            query: (
                { fullName, email, eventSeeker, dateOfBirth, eventId }
            ) => ({
                url: endpoints.userRegister,
                method: 'POST',
                body: JSON.stringify({
                    fullName, email, eventSeeker, dateOfBirth, eventId,
                })
            }),
        }),
        getRegisteredEventMembers: build.query({
            query: ({ eventId }) =>  `${endpoints.members}/${eventId}`,
        }),
    }),
});

export const {
    useGetRegisteredEventMembersQuery,
    useRegisteredUserMutation
} = registerApi;

export default registerApi;
