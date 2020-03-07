'use strict';

const router = require('express').Router();
const { db } = require('../database');
const isAuthenticated = require('../auth').isAuthenticated;
const uuid = require('uuid').v4;

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

router.delete('/post/:id', isAuthenticated, deletePost);
async function deletePost(req, res) {
    let post = db
        .get('posts')
        .filter(req.params)
        .value();

    if (post.length === 0) {
        res.status(404).send();
    } else if (post[0].authorId !== req.user.id) {
        res.status(401).send();
    }
    else {
        db.get('posts')
            .remove(req.params)
            .write();

        res.status(200).send();
    }
}

router.post('/post', isAuthenticated, createPost);
async function createPost(req, res) {
    let post = req.body;
    post.authorId = req.user.id;
    post.id = uuid();

    db.get('posts')
        .push(post)
        .write();

    res.status(200).send(post);
}

router.patch('/post', isAuthenticated, updatePost);
async function updatePost(req, res) {
    let post = db.get('posts')
        .find({ id: req.body.id })
        .value();

    if (post == null || post.authorId !== req.user.id)
        return res.status(401).send();

    db.get('posts')
        .find({ id: req.body.id })
        .assign(req.body)
        .write();

    res.status(200).send();
}

module.exports = router;