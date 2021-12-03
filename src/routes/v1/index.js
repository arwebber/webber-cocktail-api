const Router = require('express');
const CocktailRoutes = require('./cocktail/cocktail.routes');

/**
 * Init component routes
 *
 * @param {Router} router
 * @param {string} prefix
 * @returns {void}
 */
function registerApiRoutes(router, prefix) {
    router.use(`${prefix}/cocktail`, new CocktailRoutes().router);
}

module.exports = registerApiRoutes;