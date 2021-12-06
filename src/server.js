const express = require("express")
const registerApiRoutes = require('./routes/v1/')
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

function createServer() {
    // Init express server
    const app = express();
    app.use(express.json());

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

    /**
     * Swagger doc options
     */
    const options = {
        definition: {
        openapi: "3.0.0",
        info: {
            title: "Cocktail DB Express API Wrapper with Swagger Documentation",
            version: "0.1.0",
            description:
                "The documentation for the Cocktail DB Wrapper API",
            license: {
            name: "MIT",
            url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
            name: "Andrew Webber",
            url: "https://github.com/arwebber/webber-cocktail-api",
            email: "webber.andrewr@gmail.com",
            },
        },
        servers: [
            {
            url: "https://webber-cocktail-api.herokuapp.com/",
            },
        ],
        },
        apis: ["src/routes/v1/cocktail/cocktail.routes.js"],
    };
    
    const specs = swaggerJsdoc(options);
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs)
    );

    // Init routes
    registerApiRoutes(app, '/api/v1');

	return app
}

module.exports = createServer