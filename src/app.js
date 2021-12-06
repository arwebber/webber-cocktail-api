const dotenv = require('dotenv');
const createServer = require('./server');

// Configure the env file
dotenv.config({ path: '.env' });

// Set port from env file - default to 3000
const PORT = process.env.PORT || '3000';

// Startup application
(async function main() {
	try {
		// Create server
		const app = createServer();

		// Start express server
		app.listen(PORT, callBackLog);
	} catch (err) {
		console.log(err.stack)
	}
})();

function callBackLog() {
    console.log('Server started on port ' + PORT);
}