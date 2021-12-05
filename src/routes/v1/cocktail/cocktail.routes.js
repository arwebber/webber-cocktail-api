const Router = require('express');
const { CocktailController, CocktailDBController } = require('../../../controllers');

class CocktailRoutes {
	cocktailController = new CocktailController();
	cocktailDBController = new CocktailDBController();
	router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes() {
        /** Get cocktails by name */
        this.router.get(
            '/details/name/:cocktailName',
            this.cocktailController.getCocktailsByName
        );

		/** Get a specific cocktail by ID */
		this.router.get(
			'/details/id/:id',
			this.cocktailController.getCocktailById
		);

		/** Get cocktails by first letter */
		this.router.get(
			'/details/firstletter/:firstLetter',
			this.cocktailController.getCocktailsByFirstLetter
		);

		/** Get a cocktail by ingredient */
		// this.router.get(
		// 	'/details/ingredient/:ingredient',
		// 	this.cocktailController.getCocktailsByIngredientName
		// );

		/** Get a cocktail by multiple ingredients */
		this.router.get(
			'/details/ingredients/',
			this.cocktailController.getCocktailsByIngredientNames
		);

		/** Get cocktails by category */
		// this.router.get(
		// 	'/details/category/:category',
		// 	this.cocktailController.getCocktailsByCategory
		// );

		/** Get cocktails by categories */
		this.router.get(
			'/details/categories',
			this.cocktailController.getCocktailsByCategories
		);

		/** Get cocktails by category */
		this.router.get(
			'/details/glass/:glass',
			this.cocktailController.getCocktailsByGlass
		);

		/** Get an ingredient by name */
		this.router.get(
			'/ingredient/details/name/:ingredientName',
			this.cocktailController.getIngredientDetailsByName
		);
		
		/** Get an ingredient by an id */
		this.router.get(
			'/ingredient/details/id/:ingredientId',
			this.cocktailController.getIngredientDetailsById
		);

		/** Get a random cocktail */
		this.router.get(
			'/random',
			this.cocktailController.getRandomCocktail
		);

		/** Get cocktails by alcololic */
		this.router.get(
			'/alcoholic/:alcoholic',
			this.cocktailController.getCocktailsByAlcoholic
		);

		/** Get a list of options for a filter */
		this.router.get(
			'/filter/:filter',
			this.cocktailController.getFilterListByFilter
		);

		/** Get a list of options for a filter */
		this.router.post(
			'/add',
			this.cocktailDBController.addCocktail
		);

		/** Get a list of options for a filter */
		this.router.put(
			'/update',
			this.cocktailDBController.updateCocktail
		);

		/** Get a list of options for a filter */
		this.router.delete(
			'/delete/:cocktailId',
			this.cocktailDBController.deleteCocktail
		);
    }
}

module.exports = CocktailRoutes