import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    sort: 'title',
    order: 'asc',
};

const sortEventsSlice = createSlice({
    name: 'sortEvents',
    initialState,
    reducers: {
        setSortEvents: (state, action) => {
            state.sort = action.payload.sort;
            state.order = action.payload.order;
        },
    },
});

export const { setSortEvents } = sortEventsSlice.actions;

export const getSortedEvents = (state) => state.sortEvents;

export default sortEventsSlice.reducer;
