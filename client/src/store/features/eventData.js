import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  eventId: '',
  registeredUsers: {},
}

const eventDataSlice = createSlice({
  name: 'eventData',
  initialState,
  reducers: {
    setEventData: (state, action) => {
      const { eventId, registeredUsers } = action.payload;
      const registrationTime = new Date().getTime();

      // Update the state to include the new event ID and registered users with timestamp
      state.registeredUsers = {
        ...state.registeredUsers,
        [eventId]: {
          ...state.registeredUsers[eventId],
          [registrationTime]: [...(state.registeredUsers[eventId]?.[registrationTime] || []), ...registeredUsers],
        }
      }
    },
  },
});

export const { setEventData } = eventDataSlice.actions;

export const selectRegisteredUsers = (state) => state.eventData.registeredUsers;

export default eventDataSlice.reducer;
