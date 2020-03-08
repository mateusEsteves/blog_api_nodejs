'use strict';

module.exports = {
    configureSession: require('./session.startup'),
    configurePassport: require('./passport.startup'),
    configureRoutes: require('./routes.startup'),
    configureCors: require('./cors.startup')
}