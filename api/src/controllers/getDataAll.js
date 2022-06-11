const getDataApi = require('./getDataApi');
const getDataDb = require('./getDataDb');

const getAllRecipes = async () => {
  let allRecipes = [];
  const dataApi = await getDataApi();
  const datadb = await getDataDb();

  if (Array.isArray(datadb)) {
    if (dataApi.length === 0 && datadb.length === 0) {
      allRecipes = 'There are no prescriptions available.';
    } else if (dataApi.length > 0 && datadb.length === 0) {
      allRecipes = dataApi;
    } else if (datadb.length > 0 && dataApi.length === 0) {
      allRecipes = datadb;
    } else {
      allRecipes = [...dataApi, ...datadb];
    }
  } else {
    if (dataApi.length === 0) {
      allRecipes = 'There are no prescriptions available.';
    } else {
      allRecipes = dataApi;
    }
  }

  return allRecipes;
};

module.exports = getAllRecipes;
