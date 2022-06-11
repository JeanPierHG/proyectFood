import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    totalRecipes: [],
    recipeDetails: [],
    diets: [],
  },
  pending: false,
  error: false,
};

export const spoonSlice = createSlice({
  name: 'spoonData',
  initialState,
  reducers: {
    startGetData: (state) => {
      state.pending = true;
    },
    getRecipes: (state, action) => {
      state.pending = false;
      state.data.totalRecipes = action.payload;
    },
    getRecipesDetails: (state, action) => {
      state.pending = false;
      state.data.recipeDetails = action.payload;
    },
    getDiets: (state, action) => {
      state.pending = false;
      state.data.diets = action.payload;
    },
    errorGetData: (state) => {
      state.pending = false;
      state.error = true;
    },
  },
});

export const {
  startGetData,
  getRecipes,
  getRecipesDetails,
  getDiets,
  errorGetData,
} = spoonSlice.actions;

export default spoonSlice.reducer;
