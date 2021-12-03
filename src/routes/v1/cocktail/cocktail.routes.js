const Router = require('express');
const { CocktailController } = require('../../../controllers');

class CocktailRoutes {
	controller = new CocktailController();
	router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes() {
        /** Get cocktails by name */
        this.router.get(
            '/name/:cocktailName',
            this.controller.getCocktailsByName
        );
		
		/** Get cocktails by first letter */
		this.router.get(
			'/firstletter/:firstLetter',
			this.controller.getCocktailsByFirstLetter
		);

		/** Get an ingredient by name */
		this.router.get(
			'/ingredient/details/name/:ingredientName',
			this.controller.getIngredientDetailsByName
		);
		
		/** Get an ingredient by an id */
		this.router.get(
			'/ingredient/details/id/:ingredientId',
			this.controller.getIngredientDetailsById
		);

		/** Get a specific cocktail by ID */
		this.router.get(
			'/details/id/:id',
			this.controller.getCocktailById
		);
    }
}

module.exports = CocktailRoutes