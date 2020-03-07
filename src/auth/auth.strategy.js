'use strict';

const { db } = require('../database');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const INVALID_USERNAME_PASSWORD = 'Invalid username or password';

const authStrategy = new LocalStrategy((username, password, done) => {
    let user = db.get('users')
        .filter({ username })
        .value();

    if (user.length === 0)
        return done(null, false, { message: INVALID_USERNAME_PASSWORD });

    bcrypt.compare(password, user[0].password)
        .then(isPasswordValid => isPasswordValid ?
            done(null, user[0]) :
            done(null, false, { message: INVALID_USERNAME_PASSWORD }))
        .catch(error => done(error));
});

Object.freeze(authStrategy);

module.exports = authStrategy;