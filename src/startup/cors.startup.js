'use strict';

const cors = require('cors');

const CORS_OPTIONS = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
};

function configureCors(app) {
    app.use(cors(CORS_OPTIONS));
}

module.exports = configureCors;