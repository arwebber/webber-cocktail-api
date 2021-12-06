const createServer = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');

const app = createServer();

/** Get cocktail by name tests */
// Get cocktails with name 'maragarita'
test('GET /details/name with default pageSize', async () => {
    const cocktailName = 'margarita';
	await supertest(app)
		.get('/api/v1/cocktail/details/name/' + cocktailName)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We know there should be at least one margarita.
			expect(response.body.hits.length).toBeGreaterThan(1);
		})
})

// Get cocktails with name 'maragarita' with pageSize of 2
test('GET /details/name with set pageSize', async () => {
    const cocktailName = 'margarita';
    const pageSize = '2';
	await supertest(app)
		.get('/api/v1/cocktail/details/name/' + cocktailName + '?pageSize=' + pageSize)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We assgigned a pageSize of 2, expect 2 results.
			expect(response.body.hits.length).toEqual(2);
		})
})

/** Get cocktail by id tests */
// Get cocktail with id '11118'
test('GET /details/id for specific cocktail', async () => {
    const cocktailId = '11118';
	await supertest(app)
		.get('/api/v1/cocktail/details/id/' + cocktailId)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // The drinks array should be 1
			expect(response.body.hits.length).toEqual(1);

			// Expect the following fields to be equal
			expect(response.body.hits[0].idDrink).toBe('11118');
			expect(response.body.hits[0].strDrink).toBe('Blue Margarita');
			expect(response.body.hits[0].strAlcoholic).toBe('Alcoholic');
		})
})

/** Get cocktail by firstLetter tests */
test('GET /details/firstletter with default pageSize', async () => {
    const firstLetter = 'l';
	await supertest(app)
		.get('/api/v1/cocktail/details/firstletter/' + firstLetter)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We did not assgign a pageSize, expect 10 results as default.
			expect(response.body.hits.length).toEqual(10);
		})
})

test('GET /details/firstletter with pageSize of 2', async () => {
    const firstLetter = 'l';
    const pageSize = '2';
	await supertest(app)
		.get('/api/v1/cocktail/details/firstletter/' + firstLetter + '?pageSize=' + pageSize)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We assgigned a pageSize of 2, expect 2 results.
			expect(response.body.hits.length).toEqual(2);
		})
})

/** Get cocktails by ingredient */
// Get cocktails by a single ingredient with default page size
test('GET /details/ingredients with default pageSize', async () => {
    const ingredients = 'gin'
	await supertest(app)
		.get('/api/v1/cocktail/details/ingredients?ingredients=' + ingredients)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We did not assgign a pageSize, expect 10 results as default.
			expect(response.body.hits.length).toEqual(10);
		})
});

// Get cocktails by a single ingredient with page size of 2
test('GET /details/ingredients with pageSize of 2', async () => {
    const ingredients = 'gin';
	const pageSize = '2';
	await supertest(app)
		.get('/api/v1/cocktail/details/ingredients?ingredients=' + ingredients + '&pageSize=' + pageSize)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We did not assgign a pageSize, expect 10 results as default.
			expect(response.body.hits.length).toEqual(2);
		})
});

// Get cocktails by multiple ingredients
test('GET /details/ingredients with multiple ingredients', async () => {
    const ingredients = 'gin,anis,dry_vermouth';
	const pageSize = '1';
	await supertest(app)
		.get('/api/v1/cocktail/details/ingredients?ingredients=' + ingredients + '&pageSize=' + pageSize)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We know there is at least one response.
			expect(response.body.hits.length).toBeGreaterThanOrEqual(1);
		})
})

/** Get cocktails by categories */
// Get cocktails by a single category with default pageSize
test('GET /details/categories with default pageSize', async () => {
    const categories = 'cocktail'
	await supertest(app)
		.get('/api/v1/cocktail/details/categories?categories=' + categories)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We did not assgign a pageSize, expect 10 results as default.
			expect(response.body.hits.length).toEqual(10);
		})
});

// Get cocktails by a single category with pageSize of 2
test('GET /details/categories with pageSize of 2', async () => {
    const categories = 'cocktail';
	const pageSize = '2';
	await supertest(app)
		.get('/api/v1/cocktail/details/categories?categories=' + categories + '&pageSize=' + pageSize)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We did not assgign a pageSize, expect 10 results as default.
			expect(response.body.hits.length).toEqual(2);
		})
});

// Get cocktails by multiple categories with pageSize of 1 and pageIndex of 0
test('GET /details/categories with multiple categories', async () => {
    const categories = 'cocktail,ordinary drink';
	const pageSize = '1';
	const pageIndex = '0';
	await supertest(app)
		.get('/api/v1/cocktail/details/categories?categories=' + categories + '&pageSize=' + pageSize + '&pageIndex=' + pageIndex)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // The pageSize is 1 we expect only one result.
			expect(response.body.hits.length).toEqual(1);
		})
})

/** Get cocktails by ingredients and categories */
// Get cocktails by a ingredient and category with default page size
test('GET /details/ingredientsAndCategories with single ingredient and category with default pageSize', async () => {
    const ingredients = 'tequila';
	const categories = 'Ordinary Drink';
	await supertest(app)
		.get('/api/v1/cocktail/details/ingredientsAndCategories?ingredients=' + ingredients + '&categories=' + categories)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We know that there will be at least one response.
			expect(response.body.hits.length).toBeGreaterThanOrEqual(1);
		})
});

// Get cocktails by a single ingredient with page size of 2
test('GET /details/ingredientsAndCategories with only ingredients', async () => {
    const ingredients = 'tequila';
	await supertest(app)
		.get('/api/v1/cocktail/details/ingredientsAndCategories?ingredients=' + ingredients)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We know that there will be at least one response.
			expect(response.body.hits.length).toBe(0);

			// We expect the following error message.
			expect(response.body.msg).toBe('Must provide at least one category');
		})
});

// Get cocktails by a single ingredient with page size of 2
test('GET /details/ingredientsAndCategories with only categories', async () => {
	const categories = 'Ordinary Drink';
	await supertest(app)
		.get('/api/v1/cocktail/details/ingredientsAndCategories?categories=' + categories)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We know that there will be at least one response.
			expect(response.body.hits.length).toBe(0);

			// We expect the following error message.
			expect(response.body.msg).toBe('Must provide at least one ingredient');
		})
});

// Get cocktails by multiple ingredients
test('GET /details/ingredientsAndCategories with multiple ingredients or categories', async () => {
    const ingredients = 'gin,dry_vermouth';
	const categories = 'Ordinary Drink';
	await supertest(app)
		.get('/api/v1/cocktail/details/ingredientsAndCategories?ingredients=' + ingredients + '&categories=' + categories)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We know that there will be at least one response.
			expect(response.body.hits.length).toBeGreaterThanOrEqual(1);
		})
})

/** Get cocktails by glass */
// Get cocktails by glass with default pageSize
test('GET /details/glass with default pageSize', async () => {
    const glass = 'cocktail_glass';
	await supertest(app)
		.get('/api/v1/cocktail/details/glass/' + glass)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We did not assgign a pageSize, expect 10 results as default.
			expect(response.body.hits.length).toEqual(10);
		})
})

// Get cocktails by glass with pageSize of 2
test('GET /details/glass with pageSize of 2', async () => {
    const glass = 'cocktail_glass';
    const pageSize = '2';
	await supertest(app)
		.get('/api/v1/cocktail/details/glass/' + glass + '?pageSize=' + pageSize)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We assgigned a pageSize of 2, expect 2 results.
			expect(response.body.hits.length).toEqual(2);
		})
})

/** Ingredient details section */
// Get by ingredient details by name
test('GET /ingredient/details/name/', async () => {
    const ingredientName = 'whiskey';
	await supertest(app)
		.get('/api/v1/cocktail/ingredient/details/name/' + ingredientName)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We are querying a single ingredient, expect only one result.
			expect(response.body.hits.length).toEqual(1);

			// Expect the following fields to be equal.
			expect(response.body.hits[0].idIngredient).toBe('600');
			expect(response.body.hits[0].strIngredient).toBe('Whiskey');
			expect(response.body.hits[0].strType).toBe('Whisky');
		})
});

// Get by ingredient details by id
test('GET /ingredient/details/id/', async () => {
    const ingredientId = '552';
	await supertest(app)
	.get('/api/v1/cocktail/ingredient/details/id/' + ingredientId)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We are querying a single ingredient, expect only one result.
			expect(response.body.hits.length).toEqual(1);

			// Expect the following fields to be equal.
			expect(response.body.hits[0].idIngredient).toBe('552');
			expect(response.body.hits[0].strIngredient).toBe('Elderflower cordial');
			expect(response.body.hits[0].strType).toBe('Cordial');
		})
});

/** Random cocktail section */
// Test to get random cocktail back
test('GET /random', async () => {
	await supertest(app)
		.get('/api/v1/cocktail/random')
		.expect(200)
		.then((response) => {
			// Check the response type and length. We do not validate data as expected data is random.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We are only expecting a single result from the random endpoint.
			expect(response.body.hits.length).toEqual(1);
		})
})

/** Alcoholic section */
// Get by non_alcoholic drinks by type
test('GET /alcoholic', async () => {
    const alcoholic = 'non_alcoholic';
	await supertest(app)
		.get('/api/v1/cocktail/alcoholic/' + alcoholic)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We are querying a single ingredient, expect only one result.
			expect(response.body.hits.length).toEqual(10);
		})
});

/** Filter section */
// Get cocktail filters by filter categories
test('GET /filter categories', async () => {
    const filter = 'categories';
	await supertest(app)
		.get('/api/v1/cocktail/filter/' + filter)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We are querying a single ingredient, expect only one result.
			expect(response.body.hits.length).toBeGreaterThanOrEqual(1);
		})
});

// Get cocktail filters by filter glasses
test('GET /filter glasses', async () => {
    const filter = 'glasses';
	await supertest(app)
		.get('/api/v1/cocktail/filter/' + filter)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We are querying a single ingredient, expect only one result.
			expect(response.body.hits.length).toBeGreaterThanOrEqual(1);
		})
});

// Get cocktail filters by filter ingredients
test('GET /filter ingredients', async () => {
    const filter = 'ingredients';
	await supertest(app)
		.get('/api/v1/cocktail/filter/' + filter)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We are querying a single ingredient, expect only one result.
			expect(response.body.hits.length).toBeGreaterThanOrEqual(1);
		})
});

// Get cocktail filters by filter alcoholic
test('GET /filter alcoholic', async () => {
    const filter = 'alcoholic';
	await supertest(app)
		.get('/api/v1/cocktail/filter/' + filter)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.hits)).toBeTruthy();

            // We are querying a single ingredient, expect only one result.
			expect(response.body.hits.length).toBeGreaterThanOrEqual(1);
		})
});