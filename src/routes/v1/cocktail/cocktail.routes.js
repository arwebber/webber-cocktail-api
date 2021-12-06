const Router = require('express');
const { CocktailController, CocktailDBController } = require('../../../controllers');

/**
 * @swagger
 * tags:
 *  name: Cocktail
 *  description: Routes for cocktail db wrapper.
 */
class CocktailRoutes {
	cocktailController = new CocktailController();
	cocktailDBController = new CocktailDBController();
	router = Router();

	constructor() {
		this.initRoutes();
	}

	initRoutes() {
		/**
		 * @swagger
		 * /api/v1/cocktail/details/name/{cocktailName}:
		 *   get:
		 *     description: Get a list of cocktails by name.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: cocktailName
		 *         example: margarita
		 *         description: The name of the cocktail.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a list of cocktails that based on the provided cocktail name.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
        this.router.get(
                   '/details/name/:cocktailName',
                   this.cocktailController.getCocktailsByName
        );

		/**
		 * @swagger
		 * /api/v1/cocktail/details/id/{cocktailId}:
		 *   get:
		 *     description: Get a specific cocktails by id
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: cocktailId
		 *         example: 11118
		 *         description: The id of the cocktail.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a specific cocktail based on the provided id.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/details/id/:id',
			this.cocktailController.getCocktailById
		);

		/**
		 * @swagger
		 * /api/v1/cocktail/details/firstletter/{firstLetter}:
		 *   get:
		 *     description: Get a list of cocktails by the first letter of the cocktail.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: firstLetter
		 *         example: m
		 *         description: The first letter of the cocktail.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a list of cocktails based on the provided first letter.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/details/firstletter/:firstLetter',
			this.cocktailController.getCocktailsByFirstLetter
		);

		/**
		 * @swagger
		 * /api/v1/cocktail/details/ingredients:
		 *   get:
		 *     description: Get a list of cocktails matching multiple ingredients.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: ingredients
		 *         example: gin,dry_vermouth,anis
		 *         description: 'The ingredients to search on. You can search on a single ingredient or multiple, however, if searching multiple the value must be comma seperated, for example: gin,dry_vermouth'
	 	 *         in: query
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a list of cocktails based on the provided ingredients.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/details/ingredients/',
			this.cocktailController.getCocktailsByIngredientNames
		);

		/**
		 * @swagger
		 * /api/v1/cocktail/details/categories:
		 *   get:
		 *     description: Get a list of cocktails matching multiple categories.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: categories
		 *         example: cocktail,ordinary drink
		 *         description: 'The categories to search on. You can search on a single category or multiple, however, if searching multiple the value must be comma seperated, for example: cocktail,ordinary drink'
	 	 *         in: query
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a list of cocktails based on the provided categories.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/details/categories',
			this.cocktailController.getCocktailsByCategories
		);

		/**
		 * @swagger
		 * /api/v1/cocktail/details/glass/{glass}:
		 *   get:
		 *     description: Get a list of cocktails by the glass of the cocktail.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: glass
		 *         example: cocktail_glass
		 *         description: The glass of the cocktail.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a list of cocktails based on the provided glass.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/details/glass/:glass',
			this.cocktailController.getCocktailsByGlass
		);

		/**
		 * @swagger
		 * /api/v1/cocktail/ingredient/details/name/{ingredientName}:
		 *   get:
		 *     description: Get a specific cocktail ingredient by name.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: ingredientName
		 *         example: whiskey
		 *         description: The name of the cocktail ingredient.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a specific cocktail ingredient based on the provided ingredient name.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/ingredient/details/name/:ingredientName',
			this.cocktailController.getIngredientDetailsByName
		);
		
		/**
		 * @swagger
		 * /api/v1/cocktail/ingredient/details/id/{ingredientId}:
		 *   get:
		 *     description: Get a specific cocktail ingredient by id.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: ingredientId
		 *         example: 552
		 *         description: The ID of the cocktail ingredient.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a specific cocktail ingredient based on the provided ingredient id.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/ingredient/details/id/:ingredientId',
			this.cocktailController.getIngredientDetailsById
		);

		/**
		 * @swagger
		 * /api/v1/cocktail/random:
		 *   get:
		 *     description: Get a random cocktail.
		 *     tags: [Cocktail]
		 *     responses:
		 *       200:
		 *         description: Returns a random cocktails.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/random',
			this.cocktailController.getRandomCocktail
		);

		/**
		 * @swagger
		 * /api/v1/cocktail/alcoholic/{alcoholic}:
		 *   get:
		 *     description: Get a list of cocktails by alcoholic or non_alcoholic.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: alcoholic
		 *         example: alcoholic
		 *         description: Either alcoholic or non_alcoholic.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a list of cocktails based on the provided alcoholic type.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/alcoholic/:alcoholic',
			this.cocktailController.getCocktailsByAlcoholic
		);

		/**
		 * @swagger
		 * /api/v1/cocktail/filter/{filter}:
		 *   get:
		 *     description: Get a list of filter options by filter type.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: filter
		 *         example: categories
		 *         description: Either categories, glasses, ingredients or alcoholic.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns a list of filter options based on the provided filter type.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.get(
			'/filter/:filter',
			this.cocktailController.getFilterListByFilter
		);
          
		/**
		 * @swagger
		 * /api/v1/cocktail/add:
		 *   post:
		 *     description: Add a new cocktail recipe to the database.
		 *     tags: [Cocktail]
		 *     requestBody:
		 *       description: A cocktail object. Only the a creative name (field strDrink) is required! The rest are listed to indicate which can be added or updated.
 		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               cocktail:
		 *                 type: object
		 *                 properties:
		 *                   strDrink:
		 *                     type: string
		 *                     example: 'A new cocktail recipe from the swagger docs.'
		 *                   strDrinkAlternate:
		 *                     type: string
		 *                     default: null
		 *                   strTags:
		 *                     type: string
		 *                     default: null
		 *                   strVideo:
		 *                     type: string
		 *                     default: null
		 *                   strCategory:
		 *                     type: string
		 *                     default: null
		 *                   strIBA:
		 *                     type: string
		 *                     default: null
		 *                   strAlcoholic:
		 *                     type: string
		 *                     default: null
		 *                   strGlass:
		 *                     type: string
		 *                     default: null
		 *                   strInstructions:
		 *                     type: string
		 *                     default: null
		 *                   strInstructionsES:
		 *                     type: string
		 *                     default: null
		 *                   strInstructionsDE:
		 *                     type: string
		 *                     default: null
		 *                   strInstructionsFR:
		 *                     type: string
		 *                     default: null
		 *                   strInstructionsIT:
		 *                     type: string
		 *                     default: null
		 *                   'strInstructionsZH-HANS':
		 *                     type: string
		 *                     default: null
		 *                   'strInstructionsZH-HANT':
		 *                     type: string
		 *                     default: null
		 *                   strDrinkThumb:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient1:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient2:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient3:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient4:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient5:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient6:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient7:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient8:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient9:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient10:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient11:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient12:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient13:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient14:
		 *                     type: string
		 *                     default: null
		 *                   strIngredient15:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure1:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure2:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure3:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure4:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure5:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure6:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure7:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure8:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure9:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure10:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure11:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure12:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure13:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure14:
		 *                     type: string
		 *                     default: null
		 *                   strMeasure15:
		 *                     type: string
		 *                     default: null
		 *                   strImageSource:
		 *                     type: string
		 *                     default: null
		 *                   strImageAttribution:
		 *                     type: string
		 *                     default: null
		 *                   strCreativeCommonsConfirmed:
		 *                     type: string
		 *                     default: null
		 *     responses:
		 *       200:
		 *         description: Returns if the cocktail was added successfully.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.post(
			'/add',
			this.cocktailDBController.addCocktail
		);
		          
		/**
		 * @swagger
		 * /api/v1/cocktail/update:
		 *   put:
		 *     description: Update a new cocktail recipe to the database.
		 *     tags: [Cocktail]
		 *     requestBody:
		 *       description: A cocktail object to update. This can be a partial update. Only the cocktailId is required. 
 		 *       required: true
		 *       content:
		 *         application/json:
		 *           schema:
		 *             type: object
		 *             properties:
		 *               cocktail:
		 *                 type: object
		 *                 properties:
		 *                   idDrink:
		 *                     type: string
		 *                     example: '8a7622b8-564b-11ec-a6c6-0a3054738d59'
		 *                   strDrink:
		 *                     type: string
		 *                     example: 'The new name for the cocktail'
		 *                   strCategory:
		 *                     type: string
		 *                     example: 'cocktail'
		 *     responses:
		 *       200:
		 *         description: Returns if the cocktail was updated successfully.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.put(
			'/update',
			this.cocktailDBController.updateCocktail
		);

	    /**
		 * @swagger
		 * /api/v1/cocktail/delete/{cocktailId}:
		 *   delete:
		 *     description: Delete a specific cocktail from the database by the cocktail ID.
		 *     tags: [Cocktail]
		 *     parameters:
		 *       - name: cocktailId
		 *         description: The cocktail ID.
	 	 *         in: path
		 *         required: true
		 *         type: string
		 *     responses:
		 *       200:
		 *         description: Returns if the cocktail was deleted successfully.
		 *       503:
		 *         description: Error Executing query - see returned message.
		 */
		this.router.delete(
			'/delete/:cocktailId',
			this.cocktailDBController.deleteCocktail
		);
    }
}

module.exports = CocktailRoutes