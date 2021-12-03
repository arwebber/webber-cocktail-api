const express = require('express');
const dotenv = require('dotenv');
const registerApiRoutes = require('./routes/v1/')

// Configure the env file
dotenv.config({ path: '.env' });

// Startup
(async function main() {
	try {
		// Init express server
        const app = express();

        // Init routes
        registerApiRoutes(app, '/api/v1');
        
		// Start express server
		app.listen(process.env.NODE_PORT, callBackLog);
	} catch (err) {
		console.log(err.stack)
	}
})();

function callBackLog() {
    console.log('Server started on port ' + process.env.NODE_PORT);
}