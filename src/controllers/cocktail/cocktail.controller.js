const { CocktailService, CocktailDBService, CocktailEndpointService } = require('../../services/');

class CocktailController {
	async getCocktailsByName(req, res, next) {
		try {
                  const cocktailEndpointService = new CocktailEndpointService();
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
                  const cocktailEndpointService = new CocktailEndpointService();
                  const { firstLetter } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailEndpointService.getAllCocktailsByName(pageSize, pageIndex, firstLetter);

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailById(req, res, next) {
		try {
                  const cocktailEndpointService = new CocktailEndpointService();
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
                  const cocktailService = new CocktailService()
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
                  const cocktailService = new CocktailService()
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
                  const cocktailEndpointService = new CocktailEndpointService();
                  const response = await cocktailEndpointService.getAllRandomCocktail();

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByIngredientNames(req, res, next) {
		try {
                  const cocktailEndpointService = new CocktailEndpointService();
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
                  const cocktailEndpointService = new CocktailEndpointService();
                  const cocktailDBService = new CocktailDBService();
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
                  // const cocktailService = new CocktailService()
                  const cocktailEndpointService = new CocktailEndpointService();
                  const categories = req.query.categories

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  if (categories === null || categories === '') {
                        return res.json({status: 200, body: 'fail'});
                  }

                  let categoriesArray = categories.split(',');

                  // const response = await cocktailService.getCocktailsByCategory(pageSize, pageIndex, category);
                  const response = await cocktailEndpointService.getAllCocktailsByCategories(pageSize, pageIndex, categoriesArray);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByGlass(req, res, next) {
		try {
                  // const cocktailService = new CocktailService()
                  const cocktailEndpointService = new CocktailEndpointService();
                  const { glass } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  // const response = await cocktailService.getCocktailsByGlass(pageSize, pageIndex, glass);
                  const response = await cocktailEndpointService.getAllCocktailsByGlass(pageSize, pageIndex, glass);


                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getFilterListByFilter(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
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