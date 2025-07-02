import { configureStore } from '@reduxjs/toolkit';
import notesReducer from "./features/notesSlices"

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});