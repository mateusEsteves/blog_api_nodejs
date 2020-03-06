'use strict';

const router = require('express').Router();
const { db } = require('../database');

router.get('/post', listPosts);
async function listPosts(req, res) {
    let responseData = db
        .get('posts')
        .filter(req.query)
        .value();

    res.send(responseData);
}

router.get('/post/:id', getPost);
async function getPost(req, res) {
    let responseData = db.get('posts')
        .filter(req.params)
        .value();

    if (responseData.length === 0)
        res.status(404).send();
    else
        res.status(200).send(responseData[0]);
}

router.delete('/post/:id', deletePost);
async function deletePost(req, res) {
    let hasPost = db
        .get('posts')
        .filter(req.params)
        .value()
        .length > 0;

    if (!hasPost)
        res.status(404).send();
    else {
        db.get('posts')
            .remove(req.params)
            .write();

        res.status(200).send();
    }
}

router.post('/post', createPost);
async function createPost(req, res) {
    let post = req.body;

    db.get('posts')
        .push(post)
        .write();

    res.status(200).send();
}

router.put('/post', updatePost);
async function updatePost(req, res) {
    db.get('posts')
        .find({ id: req.body.id })
        .assign(req.body)
        .write();

    res.status(200).send();
}

module.exports = router;