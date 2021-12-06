const { CocktailAPIService, CocktailDBService, CocktailService } = require('../../services/');

// Initialize the cocktail endpoint service
const cocktailService = new CocktailService();
const cocktailAPIService = new CocktailAPIService();
class CocktailController {
	async getCocktailsByName(req, res, next) {
		try {
                  const { cocktailName } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getAllCocktailsByName(pageSize, pageIndex, cocktailName);

                  return res.json(response);
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

                  const response = await cocktailService.getAllCocktailsByFirstLetter(pageSize, pageIndex, firstLetter);

                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailById(req, res, next) {
		try {
                  const { id } = req.params;

                  const response = await cocktailService.getAllCocktailsByID(id);

                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getIngredientDetailsByName(req, res, next) {
		try {
                  const { ingredientName } = req.params;
                  const response = await cocktailAPIService.getIngredientDetailsByName(ingredientName);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getIngredientDetailsById(req, res, next) {
		try {
                  const { ingredientId } = req.params;
                  const response = await cocktailAPIService.getIngredientDetailsById(ingredientId);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getRandomCocktail(req, res, next) {
		try {
                  const response = await cocktailService.getAllRandomCocktail();

                  return res.json(response);
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

                  const response = await cocktailService.getAllCocktailsByIngredientNames(pageSize, pageIndex, ingredientsArray);
                  return res.json(response);
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

                  // const response = await cocktailAPIService.getCocktailsByAlcoholic(pageSize, pageIndex, alcoholic);

                  const response = await cocktailService.getAllCocktailsByAlcoholic(pageSize, pageIndex, alcoholic);

                  // user db reponse
                  // const responseDB = await cocktailDBService.getCocktailsByAlcoholic(alcoholic);

                  return res.json(response);
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

                  const response = await cocktailService.getAllCocktailsByCategories(pageSize, pageIndex, categoriesArray);

                  return res.json(response);
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

                  const response = await cocktailService.getAllCocktailsByGlass(pageSize, pageIndex, glass);

                  return res.json(response);
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

                  const response = await cocktailAPIService.getFilterListByFilter(pageSize, pageIndex, filter);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}
}

module.exports = CocktailController