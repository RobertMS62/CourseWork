const express = require('express');
const router = require('express-promise-router')();
const CollectionsMovieController = require('../controllers/collectionsMovie');
const auth = require('../middleware')

router.route('/')
    .post(auth, CollectionsMovieController.add)
    .delete(auth, CollectionsMovieController.delete)


router.route('/all')
    .post(CollectionsMovieController.all)


module.exports = router