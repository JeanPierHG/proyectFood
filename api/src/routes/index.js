const { Router } = require('express');
const recipes = require('./recipes');
const type = require('./type');

const router = Router();

router.use('/recipes', recipes);
router.use('/type', type);

module.exports = router;
