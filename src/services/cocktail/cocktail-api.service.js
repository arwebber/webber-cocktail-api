const request = require('request');
const dotenv = require('dotenv');

// Configure the env file
dotenv.config({ path: '.env' });
let COCKTAILDB_URI = process.env.COCKTAILDB_URI;

class CocktailAPIService {

    /**
     * Get cocktails from the cocktaildb api by name.
     * @param {string} name 
     * @returns reponse
     */
    async getCocktailsByName(name) {
        return new Promise(function(resolve, reject){
            let url = `${COCKTAILDB_URI}/search.php?s=${name}`;

            let response = {}

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };

            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;
                
                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);

                    response = {
                        ...response,
                        hits: apiResponseBody.drinks != null ? apiResponseBody.drinks : [],
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    /**
     * Get cocktails from the cocktaildb api by first letter.
     * @param {string} letter 
     * @returns reponse
     */
    async getCocktailsByFirstLetter(letter) {
        return new Promise(function(resolve, reject) {
            let url = `${COCKTAILDB_URI}/search.php?f=${letter}`;

            let response = {}

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };

            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;
                
                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);

                    response = {
                        ...response,
                        hits: apiResponseBody.drinks != null ? apiResponseBody.drinks : [],
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    /**
     * Get cocktails from the cocktaildb api by ingredient.
     * @param {string} ingredient 
     * @returns reponse
     */
    async getCocktailsByIngredientName(ingredient) {
        return new Promise(function(resolve, reject) {
            let url = `${COCKTAILDB_URI}/filter.php?i=${ingredient}`;
    
            let response = {}
    
            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };
    
            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;
    
                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }
    
                // Set the response to 200 since there was no error.
                response.status = res.statusCode;
    
                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);

                    response = {
                        ...response,
                        hits: apiResponseBody.drinks != null ? apiResponseBody.drinks : [],
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }
    
                return resolve(response);
            });
        });
    }

    /**
     * Get cocktails from the cocktaildb api by alcoholic type.
     * @param {string} alcoholic 
     * @returns reponse
     */
    async getCocktailsByAlcoholic(alcoholic) {
        return new Promise(function(resolve, reject) {
            let url = `${COCKTAILDB_URI}/filter.php?a=${alcoholic}`;
    
            let response = {}

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };
    
            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;
    
                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }
    
                // Set the response to 200 since there was no error.
                response.status = res.statusCode;
    
                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);

                    response = {
                        ...response,
                        hits: apiResponseBody.drinks != null ? apiResponseBody.drinks : [],
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }
    
                return resolve(response);
            });
        });
    }
    
    /**
     * Get cocktails from the cocktaildb api by category.
     * @param {string} category 
     * @returns reponse
     */
    async getCocktailsByCategory(category) {
        return new Promise(function(resolve, reject) {
            let url = `${COCKTAILDB_URI}/filter.php?c=${category}`;

            let response = {}
    
            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };
    
            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;
    
                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }
    
                // Set the response to 200 since there was no error.
                response.status = res.statusCode;
    
                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);

                    response = {
                        ...response,
                        hits: apiResponseBody.drinks != null ? apiResponseBody.drinks : [],
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }
    
                return resolve(response);
            });
        });
    }
    
    /**
     * Get cocktails from the cocktaildb api by glass type.
     * @param {string} glass 
     * @returns reponse
     */
    async getCocktailsByGlass(glass) {
        return new Promise(function(resolve, reject) {
            let url = `${COCKTAILDB_URI}/filter.php?g=${glass}`;
    
            let response = {}

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };
    
            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;
    
                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }
    
                // Set the response to 200 since there was no error.
                response.status = res.statusCode;
    
                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);
                    
                    response = {
                        ...response,
                        hits: apiResponseBody.drinks != null ? apiResponseBody.drinks : [],
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }
    
                return resolve(response);
            });
        });
    }

    /**
     * Get cocktail ingredient from the cocktaildb api by name.
     * @param {string} ingredientName 
     * @returns reponse
     */
    async getIngredientDetailsByName(ingredientName) {
        return new Promise(function(resolve, reject) {
            let url = `${COCKTAILDB_URI}/search.php?i=${ingredientName}`;

            let response = {}

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };

            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;

                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);
                    
                    response = {
                        ...response,
                        hits: apiResponseBody.ingredients != null ? apiResponseBody.ingredients : [],
                        total: apiResponseBody.ingredients != null ? apiResponseBody.ingredients.length : 0
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    /**
     * Get cocktail ingredient from the cocktaildb api by id.
     * @param {string} ingredientId 
     * @returns reponse
     */
    async getIngredientDetailsById(ingredientId) {
        return new Promise(function(resolve, reject){
            let url = `${COCKTAILDB_URI}/lookup.php?iid=${ingredientId}`;

            let response = {}

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };

            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;

                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);
                    
                    response = {
                        ...response,
                        hits: apiResponseBody.ingredients != null ? apiResponseBody.ingredients : [],
                        total: apiResponseBody.ingredients != null ? apiResponseBody.ingredients.length : 0
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    /**
     * Get cocktail from the cocktaildb api by id.
     * @param {string} id 
     * @returns reponse
     */
    async getCocktailById(id) {
        return new Promise(function(resolve, reject){
            let url = `${COCKTAILDB_URI}/lookup.php?i=${id}`;

            let response = {}

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };

            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;

                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);
                    
                    response = {
                        ...response,
                        hits: apiResponseBody.drinks != null ? apiResponseBody.drinks : [],
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0,
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    /**
     * Get a random cocktail from the cocktaildb api.
     * @returns reponse
     */
    async getRandomCocktail() {
        return new Promise(function(resolve, reject){
            let url = `${COCKTAILDB_URI}/random.php`;

            let response = {}

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };

            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;

                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);
                    
                    response = {
                        ...response,
                        hits: apiResponseBody.drinks != null ? apiResponseBody.drinks : [],
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0,
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    /**
     * Get filter options from the cocktaildb api by filter type.
     * @param {string} pageSize the size to return.
     * @param {string} pageIndex the page to return.
     * @param {string} filter 
     * @returns reponse
     */
    async getFilterListByFilter(pageSize, pageIndex, filter) {
        return new Promise(function(resolve, reject){
            let filterList = '';
            switch(filter) {
                case 'categories':
                    filterList = 'c'
                    break;
                case 'glasses':
                    filterList = 'g'
                    break;
                case 'ingredients':
                    filterList = 'i'
                    break;
                case 'alcoholic':
                    filterList = 'a'
                    break;
            }

            let url = `${COCKTAILDB_URI}/list.php?${filterList}=list`;

            let response = {}
    
            // Parse the page size and int
            let pageSizeInt = parseInt(pageSize);
            let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503
            if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
                response.status = 503;
                response.errMsg = 'Error parsing pageSize or pageIndex.';
                return resolve(response);
            }

            // Options used by request
            const options = {
                'method': 'GET',
                'url': url
            };
    
            // Get the drink response from cocktaildb
            request(options, function (error, res) { 
                // Set the response status code. If there was an error, set the code to 503
                response.status = res ? res.statusCode : 503;
    
                // Check if there was an error returning data from cocktaildb, log the error and resolve with the error.
                if (error) {
                    console.log(error);
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.hits = [];
                    return resolve(response)
                }
    
                // Set the response to 200 since there was no error.
                response.status = res.statusCode;
    
                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    apiResponseBody = JSON.parse(res.body);
                    
                    const responseStartIndex = pageSizeInt * pageIndexInt;
                    const responseStopIndex = responseStartIndex + pageSizeInt;

                    const paginatedResponse = apiResponseBody.drinks != null ? apiResponseBody.drinks.slice(responseStartIndex, responseStopIndex) : [];

                    response = {
                        ...response,
                        hits: paginatedResponse,
                        total: apiResponseBody.drinks != null ? apiResponseBody.drinks.length : 0,
                        pageIndex: pageIndexInt,
                        pageSize: pageSizeInt
                    }
                } catch {
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }
    
                return resolve(response);
            });
        });
    }
}

module.exports = CocktailAPIService;