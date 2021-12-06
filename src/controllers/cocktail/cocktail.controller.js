const { CocktailAPIService, CocktailService } = require('../../services/');

// Initialize the cocktail endpoint service
const cocktailService = new CocktailService();
const cocktailAPIService = new CocktailAPIService();

class CocktailController {

      /**
       * Get all cocktails by name.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param cocktailName the cocktail name to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
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

      /**
       * Get all cocktails by first letter.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param firstLetter the cocktail first letter to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
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

      /**
       * Get all cocktails by id.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param cocktailId the cocktail id  to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
      async getCocktailById(req, res, next) {
		try {
                  const { cocktailId } = req.params;
                  const response = await cocktailService.getAllCocktailsByID(cocktailId);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      /**
       * Get cocktail ingredient details by ingredient name.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param ingredientName the ingredient name to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
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

      /**
       * Get cocktail ingredient details by ingredient id.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param ingredientId the ingredient id to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
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

      /**
       * Get a random cocktail.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
      async getRandomCocktail(req, res, next) {
		try {
                  const response = await cocktailService.getAllRandomCocktail();
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      /**
       * Get all cocktails by ingredient names.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param ingredients the ingredients to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
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

      /**
       * Get all cocktails by alcoholic type.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param alcoholic the alcoholic type to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
      async getCocktailsByAlcoholic(req, res, next) {
		try {
                  const { alcoholic } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getAllCocktailsByAlcoholic(pageSize, pageIndex, alcoholic);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      /**
       * Get all cocktails by category names.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param category the categories to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
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

      /**
       * Get all cocktails by glass type.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param glass the glass type to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
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

      /**
       * Get all filter options by filter type.
       * @param pageSize the size to return.
       * @param pageIndex the page to return.
       * @param filter the filter type to search on.
       * @param {*} req the request.
       * @param {*} res api response.
       * @param {*} next 
       * @returns response.
       */
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