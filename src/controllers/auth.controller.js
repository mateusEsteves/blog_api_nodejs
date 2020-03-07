'use strict';

const router = require('express').Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local'), login);
function login(req, res) {
    let user = Object.assign({}, req.user);
    user.password = undefined;
    res.status(200).send(user);
}

router.post('logout', logout);
function logout(req, res) {
    req.logout();
    res.status(200).send();
}

module.exports = router;