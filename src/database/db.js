'use strict';

const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('./src/database/db.json');
const db = lowdb(adapter);

module.exports = db;