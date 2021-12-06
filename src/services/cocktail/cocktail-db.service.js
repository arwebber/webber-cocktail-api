const dotenv = require('dotenv');
const db = require('../../../db/database');

// Configure the env file
dotenv.config({ path: '.env' });

class CocktailDBService {
    async addCocktail(cocktail) {
        let response = {}
        try {
            // Set the cocktail key array and string list
            const cocktailKeys = Object.keys(cocktail);
            let cocktailKeyString = cocktailKeys.toString();
            let cocktailKeyValues = [];

            // Verify the request body contains the fields needed.
            if (!cocktail || cocktailKeys.length === 0) {
                response.status = 400;
                response.errMsg = 'Null values not allowed.'
                return response;
            } else if (!cocktail.strDrink || cocktail.strDrink === '') {
                response.status = 400;
                response.errMsg = 'Null value is not allowed for strDrink.'
                return response;
            } else if (cocktail.idDrink) {
                response.status = 400;
                response.errMsg = 'Value for idDrink is not allowed.'
                return response;
            }

            // Create the ?'s part of the insert statement dynamically
            // We know there is at least one field so we initialize the statement with a ? and set the index to 1
            let sqlInserts = '';
            for(let i = 0; i < cocktailKeys.length; i++) {
                sqlInserts += i === 0 ? '?' : ',?';
                cocktailKeyValues.push(cocktail[`${cocktailKeys[i]}`]);
            }

            // Insert statement
            const sqlQuery = `INSERT INTO COCKTAIL (idDrink,${cocktailKeyString}) VALUES (UUID(),${sqlInserts})`;

            // Execute insert
            const rows = await db.query(sqlQuery, cocktailKeyValues);
        
            response = {
                status: 200,
                hits: rows
            }
        } catch (error) {
            response.status = 503;
            response.errMsg = error.message;
        }

        return response;
    }

    async updateCocktail(cocktail) {
        let response = {}
        try {
            // Set the cocktail key array and string list
            const cocktailKeys = Object.keys(cocktail);

            // Verify the request body contains the fields needed.
            if (!cocktail || cocktailKeys.length === 0) {
                response.status = 400;
                response.errMsg = 'Null values not allowed.'
                return response;
            } else if (!cocktail.idDrink) {
                response.status = 400;
                response.errMsg = 'Value for idDrink cannot be null.'
                return response;
            }

            // Create the update statement dynamically
            let sqlUpdateValues = '';
            let cocktailKeyValues = [];

            for(let i = 0; i < cocktailKeys.length; i++) {
                if (cocktailKeys[i] != 'idDrink') {
                    sqlUpdateValues += i === cocktailKeys.length-1 ? `${cocktailKeys[i]}=? ` : `${cocktailKeys[i]}=?, `
                    cocktailKeyValues.push(cocktail[`${cocktailKeys[i]}`]);
                }
            }

            // Insert statement
            const sqlQuery = `UPDATE COCKTAIL SET ${sqlUpdateValues} WHERE idDrink='${cocktail.idDrink}'`;
            
            // Execute insert
            const rows = await db.query(sqlQuery, cocktailKeyValues);

            response = {
                status: 200,
                hits: rows
            }
        } catch (error) {
            response.status = 503;
            response.errMsg = error.message;
        }

        return response;
    }

    async deleteCocktail(cocktailId) {
        let response = {}
        try {
            // Verify the request body contains the fields needed.
            if (!cocktailId || cocktailId === '') {
                response.status = 400;
                response.errMsg = 'Cocktail ID cannot be null.'
                return response;
            }

            // Insert statement
            const sqlQuery = `DELETE FROM COCKTAIL WHERE idDrink=?`;
            
            // Execute insert
            const rows = await db.query(sqlQuery, [cocktailId]);
        
            response = {
                status: 200,
                hits: rows
            }
        } catch (error) {
            response.status = 503;
            response.errMsg = error.message;
        }

        return response;
    }

    async getCocktailsByName(cocktailName) {
        return new Promise(async function(resolve, reject) {
            let response = {}
            try {
                // Verify the request body contains the fields needed.
                if (!cocktailName) {
                    response.status = 400;
                    response.errMsg = 'Null values not allowed.'
                    return resolve(response);
                }

                // Select statement
                const sqlQuery = `SELECT * FROM COCKTAIL WHERE strDrink LIKE ? ORDER BY dateModified DESC`;

                // Execute select
                const rows = await db.query(sqlQuery, [`%${cocktailName}%`]);

                response = {
                    status: 200,
                    hits: rows,
                    total: rows.length
                };
            } catch (error) {
                response.status = 503;
                response.errMsg = error.message;
            }
            return resolve(response);
        });
    }

    async getCocktailsByFirstLetter(cocktailFirstName) {
        return new Promise(async function(resolve, reject) {
            let response = {}
            try {
                // Verify the request body contains the fields needed.
                if (!cocktailFirstName) {
                    response.status = 400;
                    response.errMsg = 'Null values not allowed.'
                    return resolve(response);
                }

                // Select statement
                const sqlQuery = `SELECT * FROM COCKTAIL WHERE strDrink LIKE ? ORDER BY dateModified DESC`;

                // Execute select
                const rows = await db.query(sqlQuery, [`${cocktailFirstName}%`]);
            
                response = {
                    status: 200,
                    hits: rows,
                    total: rows.length
                };
            } catch (error) {
                response.status = 503;
                response.errMsg = error.message;
            }
            return resolve(response);
        });
    }

    async getCocktailById(cocktailId) {
        return new Promise(async function(resolve, reject) { 
            let response = {}
            try {
                // Verify the request body contains the fields needed.
                if (!cocktailId) {
                    response.status = 400;
                    response.errMsg = 'Null values not allowed.'
                    resolve(response);
                }

                // Insert statement
                const sqlQuery = `SELECT * FROM COCKTAIL WHERE idDrink=?`;

                // Execute insert
                const rows = await db.query(sqlQuery, [cocktailId]);
            
                response = {
                    status: 200,
                    hits: rows,
                    total: rows.length
                };
            } catch (error) {
                response.status = 503;
                response.errMsg = error.message;
            }

            return resolve(response);
        })
    }

    async getCocktailsByIngredientName(ingredientName) {
        return new Promise(async function(resolve, reject) {
            let response = {}
            try {
                // Verify the request body contains the fields needed.
                if (!ingredientName || ingredientName === '') {
                    response.status = 400;
                    response.errMsg = 'Null values not allowed.'
                    return resolve(response);
                }

                // Select statement
                const sqlQuery = `SELECT strDrink, strDrinkThumb, idDrink 
                                    FROM COCKTAIL 
                                    WHERE ? in (strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strIngredient10,strIngredient11,strIngredient12,strIngredient13,strIngredient14,strIngredient15)
                                    ORDER BY dateModified DESC`;

                // Execute select
                const rows = await db.query(sqlQuery, [ingredientName]);
            
                response = {
                    status: 200,
                    hits: rows,
                    total: rows.length
                };
            } catch (error) {
                response.status = 503;
                response.errMsg = error.message;
            }
            return resolve(response);
        });
    }

    async getCocktailsByAlcoholic(alcoholic) {
        return new Promise(async function(resolve, reject) {
            let response = {}
            try {
                // Verify the request body contains the fields needed.
                if (!alcoholic || alcoholic === '') {
                    response.status = 400;
                    response.errMsg = 'Null values not allowed.'
                    return resolve(response);
                }

                // Select statement
                const sqlQuery = `SELECT strDrink, strDrinkThumb, idDrink FROM COCKTAIL WHERE strAlcoholic=? ORDER BY dateModified DESC`;

                // Execute select
                const rows = await db.query(sqlQuery, [alcoholic]);
            
                response = {
                    status: 200,
                    hits: rows,
                    total: rows.length
                };
            } catch (error) {
                response.status = 503;
                response.errMsg = error.message;
            }
            return resolve(response);
        });
    }

    async getCocktailsByCategory(category) {
        return new Promise(async function(resolve, reject) {
            let response = {}
            try {
                // Verify the request body contains the fields needed.
                if (!category || category === '') {
                    response.status = 400;
                    response.errMsg = 'Null values not allowed.'
                    return resolve(response);
                }

                // Select statement
                const sqlQuery = `SELECT strDrink, strDrinkThumb, idDrink FROM COCKTAIL WHERE strCategory=? ORDER BY dateModified DESC`;

                // Execute select
                const rows = await db.query(sqlQuery, [category]);
            
                response = {
                    status: 200,
                    hits: rows,
                    total: rows.length
                };
            } catch (error) {
                response.status = 503;
                response.errMsg = error.message;
            }
            return resolve(response);
        });
    }

    async getCocktailsByGlass(glass) {
        return new Promise(async function(resolve, reject) {
            let response = {}
            try {
                // Verify the request body contains the fields needed.
                if (!glass || glass === '') {
                    response.status = 400;
                    response.errMsg = 'Null values not allowed.'
                    return resolve(response);
                }

                // Select statement
                const sqlQuery = `SELECT strDrink, strDrinkThumb, idDrink FROM COCKTAIL WHERE strGlass=? ORDER BY dateModified DESC`;

                // Execute select
                const rows = await db.query(sqlQuery, [glass]);
            
                response = {
                    status: 200,
                    hits: rows,
                    total: rows.length
                };
            } catch (error) {
                response.status = 503;
                response.errMsg = error.message;
            }
            return resolve(response);
        });
    }

    async getRandomCocktail() {
        return new Promise(async function(resolve, reject) {
            let response = {}
            try {
                // Select statement
                const sqlQuery = `SELECT * FROM COCKTAIL ORDER BY RAND() LIMIT 1`;

                // Execute select
                const rows = await db.query(sqlQuery);

                response = {
                    status: 200,
                    hits: rows,
                    total: rows.length
                };
            } catch (error) {
                response.status = 503;
                response.errMsg = error.message;
            }
            return resolve(response);
        });
    }
}


module.exports = CocktailDBService;