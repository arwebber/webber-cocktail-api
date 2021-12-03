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
            '/details/name/:cocktailName',
            this.controller.getCocktailsByName
        );

		/** Get a specific cocktail by ID */
		this.router.get(
			'/details/id/:id',
			this.controller.getCocktailById
		);

		/** Get cocktails by first letter */
		this.router.get(
			'/details/firstletter/:firstLetter',
			this.controller.getCocktailsByFirstLetter
		);

		/** Get a cocktail by ingredient */
		this.router.get(
			'/details/ingredient/:ingredient',
			this.controller.getCocktailsByIngredient
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

		/** Get a random cocktail */
		this.router.get(
			'/random',
			this.controller.getRandomCocktail
		);

		/** Get a random cocktail */
		this.router.get(
			'/alcoholic/:alcoholic',
			this.controller.getCocktailsByAlcoholic
		);
    }
}

module.exports = CocktailRoutes