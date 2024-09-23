import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    page: 1,
    limit: 12,
};

const currentPageSlice = createSlice({
    name: 'currentPage',
    initialState,
    reducers: {
        setCurrentPage: (state, action) => {
            const { page, limit } = action.payload;
            state.page = page;
            state.limit = limit;
        },
    },
});

export const { setCurrentPage } = currentPageSlice.actions;

export const getCurrentPage = (state) => state.currentPage;

export default currentPageSlice.reducer;
