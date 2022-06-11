const axios = require('axios');

/* const fs = require('fs'); */

/* const allRecipes = JSON.parse(
  fs.readFileSync(__dirname + '/random.json', 'utf-8')
); */

const getAllRecipes = async () => {
  let info = await axios
    .get(
      `https://api.spoonacular.com/recipes/complexSearch?number=2&addRecipeInformation=true&apiKey=${process.env.API_KEY}`
    )
    .then((d) => d.data);

  /* let info = allRecipes */

  if (Array.isArray(info.results)) {
    if (info.length === 0) {
      info = 'No hay información en la api';
    } else {
      return info.results;
    }
  } else {
    throw new Error('Errores en api');
  }
};

module.exports = getAllRecipes;
