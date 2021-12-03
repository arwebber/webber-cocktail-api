const { CocktailService } = require('../../services/');

class CocktailController {
	async getCocktailsByName(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { cocktailName } = req.params;
                  const response = await cocktailService.getCocktailsByName(cocktailName);
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
                  const response = await cocktailService.getCocktailsByFirstLetter(firstLetter);
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
}

module.exports = CocktailController