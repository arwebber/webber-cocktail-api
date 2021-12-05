const { CocktailService, CocktailDBService, CocktailEndpointService } = require('../../services/');

class CocktailController {
	async getCocktailsByName(req, res, next) {
		try {
                  const cocktailService = new CocktailService();
                  const cocktailDBService = new CocktailDBService();
                  const cocktailEndpointService = new CocktailEndpointService();
                  const { cocktailName } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailEndpointService.getAllCocktailsByName(pageSize, pageIndex, cocktailName);

                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByFirstLetter(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { firstLetter } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByFirstLetter(pageSize, pageIndex, firstLetter);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getIngredientDetailsByName(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { ingredientName } = req.params;
                  const response = await cocktailService.getIngredientDetailsByName(ingredientName);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getIngredientDetailsById(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { ingredientId } = req.params;
                  const response = await cocktailService.getIngredientDetailsById(ingredientId);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailById(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const cocktailDBService = new CocktailDBService()
                  const { id } = req.params;
                  const response = await cocktailService.getCocktailById(id);

                  // User created cocktail reponse
                  const dbResponse = await cocktailDBService.getCocktailsById(id);
                  return res.json({response, dbResponse});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getRandomCocktail(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const response = await cocktailService.getRandomCocktail();
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByIngredientName(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { ingredient } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByIngredientName(pageSize, pageIndex, ingredient);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByIngredientNames(req, res, next) {
		try {
                  const cocktailService = new CocktailService();
                  const cocktailDBService = new CocktailDBService()

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';
                  let ingredients = req.query.ingredients
                  
                  if (ingredients === null || ingredients === '') {
                        return res.json({status: 200, body: 'fail'});
                  }

                  let ingredientsArray = ingredients.split(',');

                  let filteredDrinks;

                  let filteredDBDrinks;

                  for (let i = 0; i < ingredientsArray.length; i++) {
                        const singleIngredientResponse = await cocktailService.getCocktailsByIngredientName(100, 0, ingredientsArray[i]);
                        
                        if (undefined === filteredDrinks) {
                              // console.log(singleIngredientResponse);
                              filteredDrinks = singleIngredientResponse.body.drinks;
                        } else {
                              let loopFilteredDrinks = [...filteredDrinks]
                              filteredDrinks = [];
                              loopFilteredDrinks.forEach((ing) => {
                                    singleIngredientResponse.body.drinks.forEach((singleIng) => {
                                          if (ing.idDrink === singleIng.idDrink) {
                                                filteredDrinks.push(ing);
                                          }
                                    })
                              });
                        }
                  }

                  // user db
                  for (let i = 0; i < ingredientsArray.length; i++) {
                        const singleIngredientResponse = await cocktailDBService.getCocktailsByIngredientName(ingredientsArray[i]);
                        
                        if (undefined === filteredDBDrinks) {
                              filteredDBDrinks = singleIngredientResponse.body.drinks;
                        } else {
                              let loopFilteredDrinks = [...filteredDBDrinks]
                              filteredDBDrinks = [];
                              loopFilteredDrinks.forEach((ing) => {
                                    singleIngredientResponse.body.drinks.forEach((singleIng) => {
                                          if (ing.idDrink === singleIng.idDrink) {
                                                filteredDBDrinks.push(ing);
                                          }
                                    })
                              });
                        }
                  }
                  
                  return res.json({filteredDrinks, filteredDBDrinks});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByAlcoholic(req, res, next) {
		try {
                  const cocktailService = new CocktailService();
                  const cocktailDBService = new CocktailDBService();
                  const { alcoholic } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByAlcoholic(pageSize, pageIndex, alcoholic);

                  // user db reponse
                  const responseDB = await cocktailDBService.getCocktailsByAlcoholic(alcoholic);

                  return res.json({response, responseDB});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByCategory(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { category } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByCategory(pageSize, pageIndex, category);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getCocktailsByGlass(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { glass } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getCocktailsByGlass(pageSize, pageIndex, glass);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}

      async getFilterListByFilter(req, res, next) {
		try {
                  const cocktailService = new CocktailService()
                  const { filter } = req.params;

                  // Set the page size and index
                  let pageSize = req.query.pageSize ? req.query.pageSize : '10';
                  let pageIndex = req.query.pageIndex ? req.query.pageIndex : '0';

                  const response = await cocktailService.getFilterListByFilter(pageSize, pageIndex, filter);
                  return res.json({response});
            } 
            catch (err) {
                  return next(err);
            }
	}
}

module.exports = CocktailController