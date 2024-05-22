import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import {
    FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE,
    persistReducer, persistStore
} from 'redux-persist';

import storage from 'redux-persist/lib/storage';
import registerApi from './api/event.register';
import eventsApi from './api/events';
import currentPageSlice from './features/currentPage';
import eventDataSlice from './features/eventData';
import sortEventsSlice from './features/sortEvents';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['eventData']
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
    eventData: eventDataSlice,
    sortEvents: sortEventsSlice,
    currentPage: currentPageSlice,
    [registerApi.reducerPath]: registerApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
}));

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(registerApi.middleware, eventsApi.middleware),
});

const persistor = persistStore(store);

setupListeners(store.dispatch);
// persistor.purge('currentPage');

export { persistor, store };

