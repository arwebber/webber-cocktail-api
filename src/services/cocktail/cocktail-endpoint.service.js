const dotenv = require('dotenv');
const { CocktailService, CocktailDBService } = require('../../services/');

// Configure the env file
dotenv.config({ path: '.env' });

const cocktailService = new CocktailService();
const cocktailDBService = new CocktailDBService();

class CocktailEndpointService {
    async getAllCocktailsByName(pageSize, pageIndex, cocktailName) {
        return new Promise(async function(resolve, reject) {
            let response = {}

            // Parse the page size and int.
            let pageSizeInt = parseInt(pageSize);
            let pageIndexInt = parseInt(pageIndex);

            // If a non int is passed in as the page size or index, send back a 503.
            if (isNaN(pageSizeInt) || isNaN(pageIndexInt)) {
                response.status = 503;
                response.body = {};
                response.errMsg = 'Error parsing pageSize or pageIndex.';
                return resolve(response);
            }

            // Cocktail DB API Response.
            const cocktailDBResponse = await cocktailService.getCocktailsByName(cocktailName);

            // User created cocktail reponse.
            const userDBResponse = await cocktailDBService.getCocktailsByName(cocktailName);

            // If there was an error with either service, response with 503 and include both responses in body.
            if (cocktailDBResponse.status != 200 || userDBResponse.status != 200) {
                response = {
                    status: 503,
                    body: {
                        cocktailDB: {
                            ...cocktailDBResponse
                        },
                        userDB: {
                            ...cocktailDBResponse
                        }
                    }
                }
            }

            // Combine the two responses.
            let combinedArray = [...cocktailDBResponse.body.drinks, ...userDBResponse.body.drinks];

            // Sort the array by date modified to ensure consistent paginated results.
            combinedArray.sort((a, b) => (a.dateModified > b.dateModified) ? 1 : -1)

            // Determine which drinks to return for paginated results.
            const responseStartIndex = pageSizeInt * pageIndexInt;
            const responseStopIndex = responseStartIndex + pageSizeInt;

            const paginatedResponseBody = combinedArray.slice(responseStartIndex, responseStopIndex);

            response = {
                status: 200,
                body: {
                    drinks: paginatedResponseBody,
                    total: cocktailDBResponse.body.total + userDBResponse.body.total,
                    pageIndex: pageIndexInt,
                    pageSize: pageSizeInt
                }
            }

            return resolve(response);
        });
    }
}

module.exports = CocktailEndpointService;