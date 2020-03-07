'use strict';

const passport = require('passport');
const { AuthStrategy, serializeUser, deserializeUser } = require('../auth');

function configurePassport(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(AuthStrategy);
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
}

module.exports = configurePassport;