'use strict';

function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(401).send();
    } else {
        next();
    }
}

module.exports = {
    isAuthenticated
};