import { configureStore } from '@reduxjs/toolkit';
import spoonReducer from './spoonacular/spoonacularSlice';
export const store = configureStore({
  reducer: {
    spoon: spoonReducer,
  },
});
