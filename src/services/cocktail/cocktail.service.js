const dotenv = require('dotenv');
const { CocktailAPIService, CocktailDBService } = require('..');

// Configure the env file
dotenv.config({ path: '.env' });

const cocktailAPIService = new CocktailAPIService();
const cocktailDBService = new CocktailDBService();

class CocktailService {
    /**
     * Get all cocktails by name from both backends and combine their responses.
     * @param {string} pageSize the page size to return.
     * @param {string} pageIndex the page index to return.
     * @param {string} cocktailName 
     * @returns response
     */
    async getAllCocktailsByName(pageSize, pageIndex, cocktailName) {
        return new Promise(async function(resolve, reject) {
            let response = {}

            if (!cocktailName) {
                response.status = 503;
                response.errMsg = 'Cocktail name cannot be blank.';
                return resolve(response);
            }

            // Parse the page size and int.
            let pageSizeInt = parseInt(pageSize);
            let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503.
            if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
                response.status = 503;
                response.errMsg = 'Error parsing pageSize or pageIndex.';
                return resolve(response);
            }

            // Cocktail DB API Response.
            const cocktailDBResponse = await cocktailAPIService.getCocktailsByName(cocktailName);

            // User created cocktail reponse.
            const userDBResponse = await cocktailDBService.getCocktailsByName(cocktailName);

            // If there was an error with either service, response with 503 and include both responses in body.
            if (cocktailDBResponse.status != 200 || userDBResponse.status != 200) {
                response = {
                    status: 503,
                    cocktailDB: {
                        ...cocktailDBResponse
                    },
                    userDB: {
                        ...cocktailDBResponse
                    }
                }
            }

            const paginatedResponseBody = paginateResponse(pageSize, pageIndex, cocktailDBResponse.hits, userDBResponse.hits);

            response = {
                status: 200,
                ...paginatedResponseBody
            }

            return resolve(response);
        });
    }
    
    /**
     * Get all cocktails by first letter from both backends and combine their responses.
     * @param {string} pageSize the page size to return.
     * @param {string} pageIndex the page index to return.
     * @param {string} cocktailFirstLetter 
     * @returns response
     */
    async getAllCocktailsByFirstLetter(pageSize, pageIndex, cocktailFirstLetter) {
        return new Promise(async function(resolve, reject) {
            let response = {}

            if (!cocktailFirstLetter) {
                response.status = 503;
                response.errMsg = 'Cocktail first letter cannot be blank.';
                return resolve(response);
            }

            // Parse the page size and int.
            let pageSizeInt = parseInt(pageSize);
            let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503.
            if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
                response.status = 503;
                response.errMsg = 'Error parsing pageSize or pageIndex.';
                return resolve(response);
            }

            // Cocktail DB API Response.
            const cocktailDBResponse = await cocktailAPIService.getCocktailsByFirstLetter(cocktailFirstLetter);

            // User created cocktail reponse.
            const userDBResponse = await cocktailDBService.getCocktailsByFirstLetter(cocktailFirstLetter);

            // If there was an error with either service, response with 503 and include both responses in body.
            if (cocktailDBResponse.status != 200 || userDBResponse.status != 200) {
                response = {
                    status: 503,
                    cocktailDB: {
                        ...cocktailDBResponse
                    },
                    userDB: {
                        ...cocktailDBResponse
                    }
                }
            }

            const paginatedResponseBody = paginateResponse(pageSize, pageIndex, cocktailDBResponse.hits, userDBResponse.hits);

            response = {
                status: 200,
                ...paginatedResponseBody
            }

            return resolve(response);
        });
    }

    /**
     * Get cocktail by cocktail id from either backend.
     * @param {string} cocktailId 
     * @returns response
     */
    async getAllCocktailsByID(cocktailId) {
        return new Promise(async function(resolve, reject) {
            let response = {}

            if (!cocktailId) {
                response.status = 503;
                response.errMsg = 'Cocktail first letter cannot be blank.';
                return resolve(response);
            }

            // Cocktail DB API Response.
            const cocktailDBResponse = await cocktailAPIService.getCocktailById(cocktailId);

            // If there was a hit on the ID for the cocktail db api, return that cocktail.
            if (cocktailDBResponse.total > 0) {
                return resolve(cocktailDBResponse);
            }

            // User created cocktail reponse.
            const userDBResponse = await cocktailDBService.getCocktailById(cocktailId);

            // If there was a hit on the ID for the cocktail db api, return that cocktail.
            if (userDBResponse.total > 0) {
                return resolve(userDBResponse);
            }

            // If there was an error with either service, response with 503 and include both responses in body.
            if (cocktailDBResponse.status != 200 || userDBResponse.status != 200) {
                response = {
                    status: 503,
                    cocktailDB: {
                        ...cocktailDBResponse
                    },
                    userDB: {
                        ...cocktailDBResponse
                    }
                }
            }

            // There were no cocktails found
            response = {
                status: 200,
                hits: [],
                total: 0
            }

            return resolve(response);
        });
    }

    /**
     * Get all cocktails by ingredients from both backends and combine their responses.
     * @param {string} pageSize the page size to return.
     * @param {string} pageIndex the page index to return.
     * @param {string} ingredients 
     * @returns response
     */
    async getAllCocktailsByIngredientNames(pageSize, pageIndex, ingredients) {
        return new Promise(async function(resolve, reject) {
            let response = {};

            // Initialize filtered drink lists
            let cocktailDBFilteredDrinks;
            let userDBFilteredDBDrinks;

            // Loop through the ingredient list and call the cocktail db each time with a single ingredient
            for (let i = 0; i < ingredients.length; i++) {
                // Call cocktail db service.
                const singleIngredientCocktailDBResponse = await cocktailAPIService.getCocktailsByIngredientName(ingredients[i]);
                // First set the cocktail db filtered drink list to the first reponse
                // This is used for single ingredient response
                if (undefined === cocktailDBFilteredDrinks) {
                    cocktailDBFilteredDrinks = singleIngredientCocktailDBResponse.hits;
                } else {
                    // Initialize a temp variable that clones the total list of cocktail 
                    let loopFilteredDrinks = [...cocktailDBFilteredDrinks]
                    // Reset the filtered list array
                    cocktailDBFilteredDrinks = [];
                    // Loop through the cloned list of filtered drinks.
                    loopFilteredDrinks.forEach((ing) => {
                        singleIngredientCocktailDBResponse.hits.forEach((singleIng) => {
                            // If the latest response from cocktail db has the same drinkId that is in our cloned filtered list, add it to the total filtered list.  
                            if (ing.idDrink === singleIng.idDrink) {
                                cocktailDBFilteredDrinks.push(ing);
                            }
                        })
                    });
                }
            }

            // Loop through the ingredient list and call the user db each time with a single ingredient
            for (let i = 0; i < ingredients.length; i++) {
                const singleIngredientUserDBResponse = await cocktailDBService.getCocktailsByIngredientName(ingredients[i]);
                
                if (undefined === userDBFilteredDBDrinks) {
                    userDBFilteredDBDrinks = singleIngredientUserDBResponse.hits;
                } else {
                        let loopFilteredDrinks = [...userDBFilteredDBDrinks]
                        userDBFilteredDBDrinks = [];
                        loopFilteredDrinks.forEach((ing) => {
                            singleIngredientUserDBResponse.hits.forEach((singleIng) => {
                                    if (ing.idDrink === singleIng.idDrink) {
                                        userDBFilteredDBDrinks.push(ing);
                                    }
                            })
                        });
                }
            }

            const paginatedResponseBody = paginateResponse(pageSize, pageIndex, cocktailDBFilteredDrinks, userDBFilteredDBDrinks);

            response = {
                status: 200,
                ...paginatedResponseBody
            }

            return resolve(response);
        });
    }

    /**
     * Get all cocktails by categories from both backends and combine their responses.
     * @param {string} pageSize the page size to return.
     * @param {string} pageIndex the page index to return.
     * @param {string} categories 
     * @returns response
     */
    async getAllCocktailsByCategories(pageSize, pageIndex, categories) {
        return new Promise(async function(resolve, reject) {
            let response = {};

            // Initialize filtered drink lists
            let cocktailDBCategoryDrinks = [];
            let userDBCategoryDrinks = [];

            // Loop through the category list and call the cocktail db each time with a single category
            for (let i = 0; i < categories.length; i++) {
                // Call cocktail db service.
                const singleIngredientCocktailDBResponse = await cocktailAPIService.getCocktailsByCategory(categories[i]);
                
                singleIngredientCocktailDBResponse.hits.forEach((singleIng) => {
                    cocktailDBCategoryDrinks.push(singleIng);
                });
            }

            // Loop through the category list and call the cocktail db each time with a single category
            for (let i = 0; i < categories.length; i++) {
                // Call cocktail db service.
                const singleIngredientCocktailDBResponse = await cocktailDBService.getCocktailsByCategory(categories[i]);

                singleIngredientCocktailDBResponse.hits.forEach((singleIng) => {
                    userDBCategoryDrinks.push(singleIng);
                });
            }

            const paginatedResponseBody = paginateResponse(pageSize, pageIndex, cocktailDBCategoryDrinks, userDBCategoryDrinks);

            response = {
                status: 200,
                ...paginatedResponseBody
            }

            return resolve(response);
        });
    }

    /**
     * Get all cocktails by categories from both backends and combine their responses.
     * @param {string} pageSize the page size to return.
     * @param {string} pageIndex the page index to return.
     * @param {string} categories 
     * @returns response
     */
     async getAllCocktailsByIngredientsAndCategories(pageSize, pageIndex, ingredients, categories) {
        return new Promise(async function(resolve, reject) {
            let response = {};

            /** CATEGORY SECTION */

            // Initialize filtered drink lists
            let cocktailDBCategoryDrinks = [];
            let userDBCategoryDrinks = [];

            
            // Loop through the ingredient list and call the cocktail db each time with a single ingredient
            for (let i = 0; i < categories.length; i++) {
                // Call cocktail db service.
                const singleIngredientCocktailDBResponse = await cocktailAPIService.getCocktailsByCategory(categories[i]);

                // if (singleIngredientCocktailDBResponse.hits)
                
                singleIngredientCocktailDBResponse.hits.forEach((singleIng) => {
                    cocktailDBCategoryDrinks.push(singleIng);
                });
            }

            // Loop through the ingredient list and call the cocktail db each time with a single ingredient
            for (let i = 0; i < categories.length; i++) {
                // Call cocktail db service.
                const singleIngredientCocktailDBResponse = await cocktailDBService.getCocktailsByCategory(categories[i]);

                singleIngredientCocktailDBResponse.hits.forEach((singleIng) => {
                    userDBCategoryDrinks.push(singleIng);
                });
            }

            /** END CATEGORY SECTION */

            /** START INGREDIENT SECTION */

            // Initialize filtered drink lists
            let cocktailDBFilteredDrinks;
            let userDBFilteredDBDrinks;

            // Loop through the ingredient list and call the cocktail db each time with a single ingredient
            for (let i = 0; i < ingredients.length; i++) {
                // Call cocktail db service.
                const singleIngredientCocktailDBResponse = await cocktailAPIService.getCocktailsByIngredientName(ingredients[i]);
                // First set the cocktail db filtered drink list to the first reponse
                // This is used for single ingredient response
                if (undefined === cocktailDBFilteredDrinks) {
                    cocktailDBFilteredDrinks = singleIngredientCocktailDBResponse.hits;
                } else {
                    // Initialize a temp variable that clones the total list of cocktail 
                    let loopFilteredDrinks = [...cocktailDBFilteredDrinks]
                    // Reset the filtered list array
                    cocktailDBFilteredDrinks = [];
                    // Loop through the cloned list of filtered drinks.
                    loopFilteredDrinks.forEach((ing) => {
                        singleIngredientCocktailDBResponse.hits.forEach((singleIng) => {
                            // If the latest response from cocktail db has the same drinkId that is in our cloned filtered list, add it to the total filtered list.  
                            if (ing.idDrink === singleIng.idDrink) {
                                cocktailDBFilteredDrinks.push(ing);
                            }
                        })
                    });
                }
            }
            
            // Loop through the ingredient list and call the user db each time with a single ingredient
            for (let i = 0; i < ingredients.length; i++) {
                const singleIngredientUserDBResponse = await cocktailDBService.getCocktailsByIngredientName(ingredients[i]);
                
                if (undefined === userDBFilteredDBDrinks) {
                    userDBFilteredDBDrinks = singleIngredientUserDBResponse.hits;
                } else {
                        let loopFilteredDrinks = [...userDBFilteredDBDrinks]
                        userDBFilteredDBDrinks = [];
                        loopFilteredDrinks.forEach((ing) => {
                            singleIngredientUserDBResponse.hits.forEach((singleIng) => {
                                    if (ing.idDrink === singleIng.idDrink) {
                                        userDBFilteredDBDrinks.push(ing);
                                    }
                            })
                        });
                }
            }

            /** END INGREDIENT SECTION */

            // Combine the reponses into a single array for category and ingredients
            const responseArrayCategories = [...cocktailDBCategoryDrinks, ...userDBCategoryDrinks];
            const responseArrayIngredients = [...cocktailDBFilteredDrinks, ...userDBFilteredDBDrinks];

            let combinedArray = [];

            // Loop through the two combined arrays and push matches into the combinedArray
            responseArrayCategories.forEach((ing) => {
                responseArrayIngredients.forEach((singleIng) => {
                    if (ing.idDrink === singleIng.idDrink) {
                        combinedArray.push(ing);
                    }
                })
            });

            // Get paginated response, we send a second array as an empty array to reuse the same function
            const paginatedResponseBody = paginateResponse(pageSize, pageIndex, combinedArray, []);

            response = {
                status: 200,
                ...paginatedResponseBody
            }

            return resolve(response);
        });
    }

    /**
     * Get all cocktails by alcoholic type from both backends and combine their responses.
     * @param {string} pageSize the page size to return.
     * @param {string} pageIndex the page index to return.
     * @param {string} alcoholic 
     * @returns response
     */
    async getAllCocktailsByAlcoholic(pageSize, pageIndex, alcoholic) {
        return new Promise(async function(resolve, reject) {
            let response = {}

            if (!alcoholic) {
                response.status = 503;
                response.errMsg = 'Cocktail alcoholic type cannot be blank.';
                return resolve(response);
            }

            // Parse the page size and int.
            let pageSizeInt = parseInt(pageSize);
            let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503.
            if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
                response.status = 503;
                response.errMsg = 'Error parsing pageSize or pageIndex.';
                return resolve(response);
            }

            // Cocktail DB API Response.
            const cocktailDBResponse = await cocktailAPIService.getCocktailsByAlcoholic(alcoholic);

            // User created cocktail reponse.
            const userDBResponse = await cocktailDBService.getCocktailsByAlcoholic(alcoholic);

            // If there was an error with either service, response with 503 and include both responses in body.
            if (cocktailDBResponse.status != 200 || userDBResponse.status != 200) {
                response = {
                    status: 503,
                    cocktailDB: {
                        ...cocktailDBResponse
                    },
                    userDB: {
                        ...cocktailDBResponse
                    }
                }
            }

            const paginatedResponseBody = paginateResponse(pageSize, pageIndex, cocktailDBResponse.hits, userDBResponse.hits);

            response = {
                status: 200,
                ...paginatedResponseBody
            }

            return resolve(response);
        });
    }

    /**
     * Get all cocktails by glass type from both backends and combine their responses.
     * @param {string} pageSize the page size to return.
     * @param {string} pageIndex the page index to return.
     * @param {string} glass 
     * @returns response
     */
    async getAllCocktailsByGlass(pageSize, pageIndex, glass) {
        return new Promise(async function(resolve, reject) {
            let response = {}

            if (!glass) {
                response.status = 503;
                response.errMsg = 'Cocktail glass type cannot be blank.';
                return resolve(response);
            }

            // Parse the page size and int.
            let pageSizeInt = parseInt(pageSize);
            let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503.
            if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
                response.status = 503;
                response.errMsg = 'Error parsing pageSize or pageIndex.';
                return resolve(response);
            }

            // Cocktail DB API Response.
            const cocktailDBResponse = await cocktailAPIService.getCocktailsByGlass(glass);

            // User created cocktail reponse.
            const userDBResponse = await cocktailDBService.getCocktailsByGlass(glass);

            // If there was an error with either service, response with 503 and include both responses in body.
            if (cocktailDBResponse.status != 200 || userDBResponse.status != 200) {
                response = {
                    status: 503,
                    cocktailDB: {
                        ...cocktailDBResponse
                    },
                    userDB: {
                        ...cocktailDBResponse
                    }
                }
            }

            const paginatedResponseBody = paginateResponse(pageSize, pageIndex, cocktailDBResponse.hits, userDBResponse.hits);

            response = {
                status: 200,
                ...paginatedResponseBody
            }

            return resolve(response);
        });
    }

    /**
     * Get a random cocktail from either backend.
     * @param {string} pageSize the page size to return.
     * @param {string} pageIndex the page index to return.
     * @param {string} alcoholic 
     * @returns response
     */
    async getAllRandomCocktail() {
        return new Promise(async function(resolve, reject) {
            let response = {}

            // Random number to determine if we will respond with cocktail db or user db cocktail
            const randomNumber = Math.round(Math.random());

            if (randomNumber === 0) {
                response = await cocktailAPIService.getRandomCocktail();
            } else {
                response = await cocktailDBService.getRandomCocktail();
            }

            return resolve(response);
        });
    }
}

/**
 * Helper function to combine response drinks, sort and paginate response.
 * @param {string} pageSizeInt the page size to return.
 * @param {string} pageIndexInt the page index to return.
 * @param {array} array1 the first response array.
 * @param {array} array2 the second response array.
 * @returns response
 */
function paginateResponse(pageSizeInt, pageIndexInt, array1, array2) {
    // Combine the two responses.
    let combinedArray = [...array1, ...array2];
    let combinedArrayLength = combinedArray.length;

    // Sort the array by date modified to ensure consistent paginated results.
    combinedArray.sort((a, b) => (a.dateModified < b.dateModified) ? 1 : -1)

    // Determine which drinks to return for paginated results.
    const responseStartIndex = pageSizeInt * pageIndexInt;
    const responseStopIndex = responseStartIndex + pageSizeInt;

    responseBody = {
        hits: combinedArray.slice(responseStartIndex, responseStopIndex),
        total: combinedArrayLength,
        pageIndex: pageIndexInt,
        pageSize: pageSizeInt
    }
    return responseBody;
}

module.exports = CocktailService;