'use strict';

const express = require('express');
const session = require('express-session');
const app = express();
const passport = require('passport');
const { AuthStrategy, serializeUser, deserializeUser } = require('./auth');

app.use(express.json());

app.use(session({
    secret: 'a_very_secret_key_maybe_should_have_come_from_dotenv_file',
    name: 'cookie_session',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 5
    }
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(AuthStrategy);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use('/', require('./controllers/posts.controller'));
app.use('/', require('./controllers/user.controller'));
app.use('/', require('./controllers/auth.controller'));


app.listen(3200, () => console.log("Running on port 3200"));