export const API_URL = import.meta.env.VITE_API_URL;

export const endpoints = {
    eventsAll: `${API_URL}/api/events/all`,
    events: `${API_URL}/api/events`,
    userRegister: `${API_URL}/api/users/register`,
    members: `${API_URL}/api/users/members`,
};