const { CocktailService } = require('../../services/');

class CocktailController {
	async getCocktailsByName(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { cocktailName } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByName(pageSize, pageIndex, cocktailName);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByFirstLetter(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { firstLetter } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByFirstLetter(pageSize, pageIndex, firstLetter);
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

      async getCocktailById(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { id } = req.params;
                  const response = await cocktailService.getCocktailById(id);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getRandomCocktail(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const response = await cocktailService.getRandomCocktail();
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByIngredient(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { ingredient } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByIngredientName(pageSize, pageIndex, ingredient);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByAlcoholic(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { alcoholic } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByAlcoholic(pageSize, pageIndex, alcoholic);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByCategory(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { category } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByCategory(pageSize, pageIndex, category);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByGlass(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { glass } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByGlass(pageSize, pageIndex, glass);
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