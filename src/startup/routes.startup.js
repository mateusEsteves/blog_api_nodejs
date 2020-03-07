'use strict';

function configureRoutes(app) {
    app.use('/', require('../controllers/posts.controller'));
    app.use('/', require('../controllers/auth.controller'));
}

module.exports = configureRoutes;