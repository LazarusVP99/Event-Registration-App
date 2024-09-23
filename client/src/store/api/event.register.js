import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../config/api';

/**
 * User Registration Fetch
 */

export const registerApi = createApi({
    reducerPath: 'userRegistration',
    baseQuery: fetchBaseQuery({
        baseUrl: API_URL,
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
                url: 'users/register',
                method: 'POST',
                body: JSON.stringify({
                    fullName, email, eventSeeker, dateOfBirth, eventId,
                })
            }),
        }),
        getRegisteredEventMembers: build.query({
            query: ({ eventId }) =>  `users/members/${eventId}`,
        }),
    }),
});

export const {
    useGetRegisteredEventMembersQuery,
    useRegisteredUserMutation
} = registerApi;

export default registerApi;
