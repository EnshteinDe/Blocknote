import { configureStore } from '@reduxjs/toolkit';
import blocknotesReducer from './slices/blocknotes/BlocknotesSlice';
import notesReducer from './slices/notes/notesSlice';
import userReducer from './slices/user/UserSlice';

export const store = configureStore({
  reducer: {
    blocknotes: blocknotesReducer,
    notes: notesReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
