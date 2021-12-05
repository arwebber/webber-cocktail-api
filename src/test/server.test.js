const createServer = require('../server');
const supertest = require('supertest');

const app = createServer()

// Get cocktails with name 'maragarita'
test('GET /details/name with default pageSize', async () => {
    const cocktailName = 'margarita';
	await supertest(app)
		.get('/api/v1/cocktail/details/name/' + cocktailName)
		.expect(200)
		.then((response) => {
			// Check the response type and length.
			expect(Array.isArray(response.body.body.drinks)).toBeTruthy();

            // We did not assgign a pageSize, expect 10 results as default.
			expect(response.body.body.drinks.length).toEqual(10);
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
			expect(Array.isArray(response.body.body.drinks)).toBeTruthy();

            // We assgigned a pageSize of 2, expect 2 results.
			expect(response.body.body.drinks.length).toEqual(2);
		})
})

// Test to get random cocktail back
test('GET /random', async () => {
	await supertest(app)
		.get('/api/v1/cocktail/random')
		.expect(200)
		.then((response) => {
			// Check the response type and length. We do not validate data as expected data is random.
			expect(Array.isArray(response.body.body.drinks)).toBeTruthy();

            // We are only expecting a single result from the random endpoint.
			expect(response.body.body.drinks.length).toEqual(1);
		})
})