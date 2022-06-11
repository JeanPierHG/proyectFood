import axios from 'axios';
import {
  startGetData,
  getRecipes,
  getRecipesDetails,
  getDiets,
  errorGetData,
} from './spoonacularSlice';

export const apiGetRecipes = (dispatch) => {
  dispatch(startGetData());
  try {
    axios.get('/recipes').then((res) => dispatch(getRecipes(res.data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetRecipesAsc = (dispatch) => {
  dispatch(startGetData());
  try {
    axios.get('/recipes/asc').then((res) => dispatch(getRecipes(res.data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetRecipesDesc = (dispatch) => {
  dispatch(startGetData());
  try {
    axios.get('/recipes/desc').then((res) => dispatch(getRecipes(res.data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetRecipesByDiet = (dispatch, diets) => {
  dispatch(startGetData());
  try {
    axios
      .get(`/recipes/diet/${diets}`)
      .then((res) => dispatch(getRecipes(res.data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetRecipeScore = (dispatch, order) => {
  dispatch(startGetData());
  console.log('Entre a getRecipeScore');
  try {
    axios.get('/recipes/').then((res) => {
      let recipeScore = [];
      if (order === 'highScoreASC') {
        recipeScore = res.data.sort(function (x, y) {
          if (x.healthScore > y.healthScore) {
            return -1;
          }
          if (x.healthScore < y.healthScore) {
            return 1;
          }
          return 0;
        });
      } else if (order === 'highScoreDESC') {
        recipeScore = res.data.sort(function (x, y) {
          if (x.healthScore < y.healthScore) {
            return -1;
          }
          if (x.healthScore > y.healthScore) {
            return 1;
          }
          return 0;
        });
      }
      dispatch(getRecipes(recipeScore));
    });
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiSearchRecipes = (dispatch, title) => {
  dispatch(startGetData());
  try {
    axios
      .get(`/recipes/search/${title}`)
      .then((res) => dispatch(getRecipes(res.data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiRecipeById = (dispatch, id) => {
  dispatch(startGetData());
  try {
    axios
      .get(`/recipes/${id}`)
      .then((res) => dispatch(getRecipesDetails(res.data)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const apiGetDiets = (dispatch) => {
  dispatch(startGetData());
  try {
    axios
      .get('/type/diets')
      .then((res) => dispatch(getDiets(res.data.typeDiets)));
  } catch (error) {
    dispatch(errorGetData());
  }
};

export const postRecipe = (dispatch, data) => {
  dispatch(startGetData());
  try {
    axios.post('/recipes/createRecipe', data);
  } catch (error) {
    dispatch(errorGetData());
  }
};
