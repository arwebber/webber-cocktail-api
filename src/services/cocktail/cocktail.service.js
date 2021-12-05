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

            // Parse the page size and int
            // let pageSizeInt = parseInt(pageSize);
            // let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503
            // if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
            //     response.status = 503;
            //     response.body = {};
            //     response.errMsg = 'Error parsing pageSize or pageIndex.';
            //     return resolve(response);
            // }
            
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
                    apiResponseBody = JSON.parse(res.body);

                    // const responseStartIndex = pageSizeInt * pageIndexInt;
                    // const responseStopIndex = responseStartIndex + pageSizeInt;

                    // const paginatedResponse = apiResponseBody.drinks.slice(responseStartIndex, responseStopIndex);

                    response.body = {
                        drinks: apiResponseBody.drinks,
                        total: apiResponseBody.drinks.length,
                        // pageIndex: pageIndexInt,
                        // pageSize: pageSizeInt
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

            // Parse the page size and int
            // let pageSizeInt = parseInt(pageSize);
            // let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503
            // if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
            //     response.status = 503;
            //     response.body = {};
            //     response.errMsg = 'Error parsing pageSize or pageIndex.';
            //     return resolve(response);
            // }

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

                    // const responseStartIndex = pageSizeInt * pageIndexInt;
                    // const responseStopIndex = responseStartIndex + pageSizeInt;

                    // const paginatedResponse = apiResponseBody.drinks.slice(responseStartIndex, responseStopIndex);

                    response.body = {
                        drinks: apiResponseBody.drinks,
                        total: apiResponseBody.drinks.length,
                        // pageIndex: pageIndexInt,
                        // pageSize: pageSizeInt
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
    async getCocktailsByIngredientName(pageSize, pageIndex, ingredient) {
        return new Promise(function(resolve, reject){
            let url = `${COCKTAILDB_URI}/filter.php?i=${ingredient}`;
    
            let response = {}
    
            // Parse the page size and int
            let pageSizeInt = parseInt(pageSize);
            let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503
            if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
                response.status = 503;
                response.body = {};
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

                    const responseStartIndex = pageSizeInt * pageIndexInt;
                    const responseStopIndex = responseStartIndex + pageSizeInt;

                    const paginatedResponse = apiResponseBody.drinks.slice(responseStartIndex, responseStopIndex);

                    response.body = {
                        drinks: paginatedResponse,
                        total: apiResponseBody.drinks.length,
                        pageIndex: pageIndexInt,
                        pageSize: pageSizeInt
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
    async getCocktailsByAlcoholic(alcoholic) {
        return new Promise(function(resolve, reject){
            // TODO: validate input either alcoholic or non.
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
                    
                    // const responseStartIndex = pageSizeInt * pageIndexInt;
                    // const responseStopIndex = responseStartIndex + pageSizeInt;

                    // const paginatedResponse = apiResponseBody.drinks.slice(responseStartIndex, responseStopIndex);

                    response.body = {
                        drinks: apiResponseBody.drinks,
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

    // Filter by Category
    async getCocktailsByCategory(category) {
        return new Promise(function(resolve, reject){
            // TODO: validate input either alcoholic or non.
            let url = `${COCKTAILDB_URI}/filter.php?c=${category}`;
    
            console.log('cat', category);

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
                    apiResponseBody = JSON.parse(res.body);
                    
                    // const responseStartIndex = pageSizeInt * pageIndexInt;
                    // const responseStopIndex = responseStartIndex + pageSizeInt;

                    // const paginatedResponse = apiResponseBody.drinks.slice(responseStartIndex, responseStopIndex);

                    response.body = {
                        drinks: apiResponseBody.drinks,
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

    // Filter by Glass
    async getCocktailsByGlass(glass) {
        return new Promise(function(resolve, reject){
            // TODO: validate input either alcoholic or non.
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
                    
                    response.body = {
                        drinks: apiResponseBody.drinks,
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

    // List the categories, glasses, ingredients or alcoholic filters
    async getFilterListByFilter(pageSize, pageIndex, filter) {
        return new Promise(function(resolve, reject){
            // TODO: validate input either alcoholic or non.
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
                response.body = {};
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
                    
                    const responseStartIndex = pageSizeInt * pageIndexInt;
                    const responseStopIndex = responseStartIndex + pageSizeInt;

                    const paginatedResponse = apiResponseBody.drinks.slice(responseStartIndex, responseStopIndex);

                    response.body = {
                        drinks: paginatedResponse,
                        total: apiResponseBody.drinks.length,
                        pageIndex: pageIndexInt,
                        pageSize: pageSizeInt
                    }
                } catch {
                    response.body = {};
                    response.errMsg = 'Unable to parse cocktaildb response.'
                }
    
                return resolve(response);
            });
        });
    }
}

module.exports = CocktailService;