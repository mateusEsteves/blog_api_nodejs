'use strict';

const { db } = require('../database');

function serializeUser(user, done) {
    done(null, user.id);
}

function deserializeUser(id, done) {
    let user = db.get('users')
        .filter({ id })
        .value();

    done(null, user[0]);
}

module.exports = {
    serializeUser,
    deserializeUser
}