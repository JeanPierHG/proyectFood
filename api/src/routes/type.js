const { Router } = require('express');
const { Diets, conn } = require('../db');

const router = Router();

const diets = [
  'gluten free',
  'dairy free',
  'lacto ovo vegetarian',
  'vegan',
  'paleolithic',
  'primal',
  'whole 30',
  'pescatarian',
  'ketogenic',
  'fodmap friendly',
];

router.get('/', (req, res) => {
  res.send('Hola diets');
});

router.get('/diets/', async (req, res, next) => {
  try {
    const typeDiets = [];
    for (let index = 0; index < diets.length; index++) {
      const diet = await Diets.create({
        name: diets[index],
      });
      typeDiets.push(diet);
    }
    res.json({ typeDiets });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
