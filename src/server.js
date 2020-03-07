'use strict';

const express = require('express');
const app = express();
const startup = require('./startup');

app.use(express.json());
startup.configureSession(app);
startup.configurePassport(app);
startup.configureRoutes(app);

app.listen(3200, () => console.log("Running on port 3200"));