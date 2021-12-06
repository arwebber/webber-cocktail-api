const { CocktailDBService } = require('../../services');

// Initialize the cocktailDBService
const cocktailDBService = new CocktailDBService();
class CocktailDBController {

      /**
       * Add a cocktail to the user database. 
       * This calls the cockatilDB service and adds the db service response to the api response.
       * @param {*} req request contains the cocktail details.
       * @param {*} res api response.
       * @param {*} next
       * @returns response from cocktailDBservice.
       */
      async addCocktail(req, res, next) {
		try {
                  // Cocktail is sent in request body
                  const { cocktail } = req.body;

                  // Get response from cocktailDBService addCocktail
                  const response = await cocktailDBService.addCocktail(cocktail);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      /**
       * Update a cocktail in the user database.
       * This supports partial and full updates.
       * This calls the cockatilDB service and adds the db service response to the api response.
       * @param {*} req request contains the cocktailId to update and update fields.
       * @param {*} res api response.
       * @param {*} next
       * @returns response from cocktailDBservice.
       */
      async updateCocktail(req, res, next) {
		try {
                  // Cocktail updates are sent in request body
                  const { cocktail } = req.body;

                  // Get response from cocktailDBService updateCocktail
                  const response = await cocktailDBService.updateCocktail(cocktail);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

      /**
       * Delete a cocktail from the user database. 
       * This calls the cockatilDB service and adds the db service response to the api response.
       * @param {*} req request contains the cocktailId to delete.
       * @param {*} res api response.
       * @param {*} next
       * @returns response from cocktailDBservice.
       */
      async deleteCocktail(req, res, next) {
		try {
                   // Cocktail updates are sent in request body
                  const { cocktailId } = req.params;

                  // Get response from cocktailDBService deleteCocktail
                  const response = await cocktailDBService.deleteCocktail(cocktailId);
                  return res.json(response);
            } 
            catch (err) {
                  return next(err);
            }
	}

}

module.exports = CocktailDBController