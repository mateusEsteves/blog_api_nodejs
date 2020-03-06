'use strict';

const { db } = require('../database');
const bcrypt = require('bcrypt');
const uuid = require('uuid').v4;
const router = require('express').Router();

router.post('/user', createUser);
async function createUser(req, res) {
    let user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    user.id = uuid();
    user.active = true;

    db.get('users')
        .push(user)
        .write();

    res.status(200).send();
}

router.put('/user', editUser);
async function editUser(req, res) {
    let user = db.get('users')
        .find({ id: req.body.id })
        .assign(user)
        .value();

    if (user.length === 0)
        res.status(404).send();
    else
        res.status(200).send();
}

router.get('/user/:id', getUser);
async function getUser(req, res) {
    let user = db.get('users')
        .filter(req.params)
        .value();

    if (user.length === 0)
        res.status(404).send();
    else
        res.status(200).send(user[0]);
}

module.exports = router;