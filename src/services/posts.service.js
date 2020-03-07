'use strict';

const { db } = require('../database');
const uuid = require('uuid').v4;

function getAll(filters = {}) {
    return db.get('posts')
        .filter(filters)
        .value();
}

function getById(id) {
    return db.get('posts')
        .find({ id })
        .value();
}

function isPostAuthoredBy(postId, authorId) {
    let post = db.get('posts')
        .find({ id: postId })
        .value();

    return post != null && post.authorId === authorId;
}

function deleteById(id) {
    db.get('posts')
        .remove({ id })
        .write();
}

function createPost(postData, authorId) {
    let newPost = Object.assign({}, postData);
    newPost.authorId = authorId;
    newPost.id = uuid();

    db.get('posts')
        .create(newPost)
        .write();

    return newPost;
}

function updatePost(postData) {
    let newPost = Object.assign({}, postData);
    newPost.authorId = undefined;

    db.get('posts')
        .find({ id: postData.id })
        .assign(newPost)
        .write();

    return postData;
}


module.exports = {
    getAll,
    getById,
    isPostAuthoredBy,
    deleteById,
    createPost,
    updatePost
};