const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const router = Router();
const crypto = require("crypto");

const {
  getDataApi,
  getDataDb,
  getDataAll,
  sortAsc,
  sortDesc,
  searchRecipes,
  getDataById,
} = require("../controllers");

/***************/
/* ROUTES */

/* GET */
router.get("/", async (req, res, next) => {
  try {
    const allRecipes = await getDataAll();
    res.json(allRecipes);
  } catch (error) {
    next(error);
  }
});

router.get("/api", async (req, res, next) => {
  try {
    const allRecipesApi = await getDataApi();
    if (allRecipesApi) {
      res.json(allRecipesApi);
    } else {
      throw new Error("No se encontraron datos.");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/db", (req, res, next) => {
  try {
    getDataDb().then((data) => {
      if (data.length > 0) {
        res.json(data);
      } else {
        res.send("No se encontraron datos en la api");
      }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/diet/:d", async (req, res, next) => {
  const { d } = req.params;
  try {
    const recipes = await getDataAll();
    const recipesWithDiet = recipes.filter((r) => r.diets.includes(d));
    res.json(recipesWithDiet);
  } catch (error) {
    next(error);
  }
});

router.get("/asc", async (req, res, next) => {
  try {
    const recipes = await getDataAll();
    const recipesAsc = recipes.sort(sortAsc);
    res.json(recipesAsc);
  } catch (error) {
    next(error);
  }
});

router.get("/desc", async (req, res, next) => {
  try {
    const recipes = await getDataAll();
    const recipesDesc = recipes.sort(sortDesc);
    res.json(recipesDesc);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const recipeById = await getDataById(id);
    res.json([recipeById]);
  } catch (error) {
    next(error);
  }
});

router.get("/search/:title", async (req, res, next) => {
  const { title } = req.params;
  try {
    const recibeByTitle = await searchRecipes(title);
    res.json(recibeByTitle);
  } catch (error) {
    next(error);
  }
});

/* POST */

router.post("/createRecipe", async (req, res, next) => {
  const { title, summary, healthScore, image, analyzedInstructions, diets } =
    req.body;

  console.log(req.body);
  try {
    const id = crypto.randomUUID();
    await Recipe.create({
      id,
      title,
      summary,
      healthScore,
      image,
      analyzedInstructions,
    });
    const recipe = await Recipe.findByPk(id);
    recipe.addDiets(diets);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
