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

      async getIngredientByName(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { ingredient } = req.params;
                  const response = await cocktailService.getIngredientByName(ingredient);
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


      async getCocktailsByIngredient(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { ingredient } = req.params;
                  const response = await cocktailService.getCocktailsByIngredient(ingredient);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}
}

module.exports = CocktailController