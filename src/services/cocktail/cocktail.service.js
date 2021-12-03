const request = require('request');
const dotenv = require('dotenv');

// Configure the env file
dotenv.config({ path: '.env' });
let COCKTAILDB_URI = process.env.COCKTAILDB_URI;

class CocktailService {

    // Search cocktail by name
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
                    response.body =  {};
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.body = 'No data returned';
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    // console.log('res body', res.body);
                    apiResponseBody = JSON.parse(res.body);
                    // console.log('parsed', apiResponseBody);
                    response.body = {
                        ...apiResponseBody,
                        total: apiResponseBody.drinks.length
                    }
                } catch {
                    response.body = {};
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    // List all cocktails by first letter
    async getCocktailsByFirstLetter(letter) {
        return new Promise(function(resolve, reject){
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
                    response.body =  {};
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.body = 'No data returned';
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    // console.log('res body', res.body);
                    apiResponseBody = JSON.parse(res.body);
                    // console.log('parsed', apiResponseBody);
                    response.body = {
                        ...apiResponseBody,
                        total: apiResponseBody.drinks.length
                    }
                } catch {
                    response.body = {};
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    // Search ingredient by name
    async getIngredientDetailsByName(ingredientName) {
        return new Promise(function(resolve, reject){
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
                    response.body =  {};
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.body = 'No data returned';
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    // console.log('res body', res.body);
                    apiResponseBody = JSON.parse(res.body);
                    // console.log('parsed', apiResponseBody);
                    response.body = {
                        ...apiResponseBody,
                        total: apiResponseBody.ingredients.length
                    }
                } catch {
                    response.body = {};
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    // Lookup full cocktail details by id
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
                    response.body =  {};
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.body = 'No data returned';
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    // console.log('res body', res.body);
                    apiResponseBody = JSON.parse(res.body);
                    // console.log('parsed', apiResponseBody);
                    response.body = {
                        ...apiResponseBody
                    }
                } catch {
                    response.body = {};
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    // Lookup ingredient by ID
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
                    response.body =  {};
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.body = 'No data returned';
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    // console.log('res body', res.body);
                    apiResponseBody = JSON.parse(res.body);
                    // console.log('parsed', apiResponseBody);
                    response.body = {
                        ...apiResponseBody
                    }
                } catch {
                    response.body = {};
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    // Lookup a random cocktail
    // www.thecocktaildb.com/api/json/v1/1/random.php
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
                    response.body =  {};
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.body = 'No data returned';
                    return resolve(response)
                }

                // Set the response to 200 since there was no error.
                response.status = res.statusCode;

                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    // console.log('res body', res.body);
                    apiResponseBody = JSON.parse(res.body);
                    // console.log('parsed', apiResponseBody);
                    response.body = {
                        ...apiResponseBody
                    }
                } catch {
                    response.body = {};
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }

                return resolve(response);
            });
        });
    }

    // Search by ingredient
    // www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin
    async getCocktailsByIngredientName(ingredient) {
        return new Promise(function(resolve, reject){
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
                    response.body =  {};
                    response.errMsg = error.toString();
                    return resolve(response);
                } else if (res.body === null || res.body.trim() === '') {
                    response.body = 'No data returned';
                    return resolve(response)
                }
    
                // Set the response to 200 since there was no error.
                response.status = res.statusCode;
    
                // Parse the response as JSON.
                let apiResponseBody = {};
                try {
                    // console.log('res body', res.body);
                    apiResponseBody = JSON.parse(res.body);
                    // console.log('parsed', apiResponseBody);
                    response.body = {
                        ...apiResponseBody,
                        total: apiResponseBody.drinks.length
                    }
                } catch {
                    response.body = {};
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }
    
                return resolve(response);
            });
        });
    }

    
    // Filter by alcoholic
    // www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic

    // Filter by Category
    // www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary_Drink

    // Filter by Glass
    // www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass

    // List the categories, glasses, ingredients or alcoholic filters
    // www.thecocktaildb.com/api/json/v1/1/list.php?c=list
}

module.exports = CocktailService;