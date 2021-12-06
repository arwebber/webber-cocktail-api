const { CocktailDBService } = require('../../services');

class CocktailDBController {

    async addCocktail(req, res, next) {
		try {
                  const cocktailDBService = new CocktailDBService()
                  const { cocktail } = req.body;

                  const response = await cocktailDBService.addCocktail(cocktail);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      async updateCocktail(req, res, next) {
		try {
                  const cocktailDBService = new CocktailDBService()
                  const { cocktail } = req.body;

                  const response = await cocktailDBService.updateCocktail(cocktail);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      async deleteCocktail(req, res, next) {
		try {
                  const cocktailDBService = new CocktailDBService()
                  const { cocktailId } = req.params;

                  const response = await cocktailDBService.deleteCocktail(cocktailId);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

}

module.exports = CocktailDBController