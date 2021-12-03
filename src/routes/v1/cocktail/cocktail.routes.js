const Router = require('express');
const { CocktailController } = require('../../../controllers');

class CocktailRoutes {
	controller = new CocktailController();
	router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes() {
        /** Get a specific cocktail from cocktaildb */
        this.router.get(
            '/name/:cocktailName',
            this.controller.getCocktailsByName
        );
		
		/** Get a specific cocktail from cocktaildb */
		this.router.get(
			'/firstletter/:firstLetter',
			this.controller.getCocktailsByFirstLetter
		);

		/** Get a specific cocktail from cocktaildb */
		this.router.get(
			'/ingredient/:ingredient',
			this.controller.getCocktailsByIngredient
		);

		/** Get a specific cocktail by ID */
		this.router.get(
			'/details/id/:id',
			this.controller.getCocktailById
		);
    }
}

module.exports = CocktailRoutes