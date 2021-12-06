// const express = require('express');
const dotenv = require('dotenv');
// const registerApiRoutes = require('./routes/v1/')
const createServer = require('./server');

// Configure the env file
dotenv.config({ path: '.env' });

// Startup
(async function main() {
	try {
		// // Init express server
        // const app = express();

		// /**
		//  * Middleware
		//  */
		// app.use(express.json());
		// // app.use(express.urlencoded({ extended: false }));

        // // Init routes
        // registerApiRoutes(app, '/api/v1');
        
		// Create server
		const app = createServer();

		// Start express server
		app.listen(process.env.NODE_PORT, callBackLog);
	} catch (err) {
		console.log(err.stack)
	}
})();

function callBackLog() {
    console.log('Server started on port ' + process.env.NODE_PORT);
}