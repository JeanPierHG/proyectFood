const axios = require('axios');
const getDataDb = require('./getDataDb');
const searchRecipes = async (title) => {
  title = title[0].toUpperCase() + title.slice(1);
  const dataApi = await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?query=${title}&number=5&addRecipeInformation=true&apiKey=${process.env.API_KEY}`
    )
    .then((d) => d.data);

  const db = await getDataDb();
  let dataDB = [];
  if (Array.isArray(db)) {
    dataDB = db.filter((d) => d.title.includes(title));
  }
  const recipes = [...dataDB, ...dataApi.results];
  return recipes;
};

module.exports = searchRecipes;
