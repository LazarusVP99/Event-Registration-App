export const API_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
    eventsAll: `${API_URL}/events/all`,
    events: `${API_URL}/events`,
    userRegister: `${API_URL}/users/register`,
    members: `${API_URL}/users/members`,
};