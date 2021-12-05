const { CocktailService, CocktailDBService, CocktailEndpointService } = require('../../services/');

// Initialize the cocktail endpoint service
const cocktailEndpointService = new CocktailEndpointService();
const cocktailService = new CocktailService();
class CocktailController {
	async getCocktailsByName(req, res, next) {
		try {
                  const { cocktailName } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailEndpointService.getAllCocktailsByName(pageSize, pageIndex, cocktailName);

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByFirstLetter(req, res, next) {
		try {
                  const { firstLetter } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailEndpointService.getAllCocktailsByFirstLetter(pageSize, pageIndex, firstLetter);

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailById(req, res, next) {
		try {
                  const { id } = req.params;

                  const response = await cocktailEndpointService.getAllCocktailsByID(id);

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getIngredientDetailsByName(req, res, next) {
		try {
                  const { ingredientName } = req.params;
                  const response = await cocktailService.getIngredientDetailsByName(ingredientName);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getIngredientDetailsById(req, res, next) {
		try {
                  const { ingredientId } = req.params;
                  const response = await cocktailService.getIngredientDetailsById(ingredientId);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getRandomCocktail(req, res, next) {
		try {
                  const response = await cocktailEndpointService.getAllRandomCocktail();

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByIngredientNames(req, res, next) {
		try {
                  const ingredients = req.query.ingredients

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  if (ingredients === null || ingredients === '') {
                        return res.json({status: 200, body: 'fail'});
                  }

                  let ingredientsArray = ingredients.split(',');

                  const response = await cocktailEndpointService.getAllCocktailsByIngredientNames(pageSize, pageIndex, ingredientsArray);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByAlcoholic(req, res, next) {
		try {
                  const { alcoholic } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  // const response = await cocktailService.getCocktailsByAlcoholic(pageSize, pageIndex, alcoholic);

                  const response = await cocktailEndpointService.getAllCocktailsByAlcoholic(pageSize, pageIndex, alcoholic);

                  // user db reponse
                  // const responseDB = await cocktailDBService.getCocktailsByAlcoholic(alcoholic);

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByCategories(req, res, next) {
		try {
                  const categories = req.query.categories

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  if (categories === null || categories === '') {
                        return res.json({status: 200, body: 'fail'});
                  }

                  let categoriesArray = categories.split(',');

                  const response = await cocktailEndpointService.getAllCocktailsByCategories(pageSize, pageIndex, categoriesArray);

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByGlass(req, res, next) {
		try {
                  const { glass } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailEndpointService.getAllCocktailsByGlass(pageSize, pageIndex, glass);

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getFilterListByFilter(req, res, next) {
		try {
                  const { filter } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getFilterListByFilter(pageSize, pageIndex, filter);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}
}

module.exports = CocktailController