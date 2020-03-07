'use strict';

const router = require('express').Router();
const { isAuthenticated } = require('../auth');
const { PostsService } = require('../services');

router.get('/post', (req, res) => {
    let responseData = PostsService.getAll(req.query);
    res.send(responseData);
});

router.get('/post/:id', (req, res) => {
    let responseData = PostsService.getById(req.params.id);

    if (responseData == null)
        res.status(404).send();
    else
        res.status(200).send(responseData);
});

router.delete('/post/:id', isAuthenticated, (req, res) => {
    if (!PostsService.isPostAuthoredBy(req.params.id, req.user.id)) {
        res.status(401).send();
    }
    else {
        PostsService.deleteById(req.params.id);
        res.status(200).send();
    }
});

router.post('/post', isAuthenticated, (req, res) => {
    let result = PostsService.createPost(req.body, req.user.id);
    res.status(200).send(result);
});

router.patch('/post', isAuthenticated, (req, res) => {
    if (!PostsService.isPostAuthoredBy(req.body.id, req.user.id))
        return res.status(401).send();

    let result = PostsService.updatePost(req.body);
    res.status(200).send(result);
});

module.exports = router;