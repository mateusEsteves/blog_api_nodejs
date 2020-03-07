'use strict';

const session = require('express-session');

function configureSession(app) {
    app.use(session({
        secret: 'a_very_secret_key_maybe_should_have_come_from_dotenv_file',
        name: 'cookie_session',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 5
        }
    }));
}

module.exports = configureSession;