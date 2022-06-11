const axios = require('axios');
const getDataBase = require('./getDataDb');
const getDataById = async (id) => {
  let recipeById = {};

  recipeById = await axios
    .get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`
    )
    .then((res) => {
      return res.data;
    })
    .catch(() => 'hola');

  if (typeof recipeById !== 'object') {
    console.log(typeof recipeById);
    const recipes = await getDataBase();
    recipeById = recipes.filter((r) => r.id === id)[0];
  }
  return recipeById;
};

module.exports = getDataById;
