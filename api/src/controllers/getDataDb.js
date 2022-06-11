const { Recipe, Diets } = require('../db');

const getRecipesDB = async () => {
  let data = await Recipe.findAll({
    include: {
      model: Diets,
      through: {
        attributes: [],
      },
    },
  });

  if (data.length === 0) {
    data = 'No existen datos en la db';
    return data;
  } else {
    const recipeDB = data.map((r) => {
      return {
        id: r.id,
        title: r.title,
        summary: r.summary,
        healthScore: r.healthScore,
        image: r.image,
        analyzedInstructions: r.analyzedInstructions,
        diets: r.diets.map((d) => {
          return d.name;
        }),
      };
    });
    return recipeDB;
  }
};

module.exports = getRecipesDB;
