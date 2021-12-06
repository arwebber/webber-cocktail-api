const express = require("express")
const registerApiRoutes = require('./routes/v1/')

function createServer() {

    // Init express server
    const app = express();
    app.use(express.json());

    // Init routes
    registerApiRoutes(app, '/api/v1');

	return app
}

module.exports = createServer