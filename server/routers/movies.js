const express = require('express');
const router = require('express-promise-router')();
const MoviesController = require('../controllers/movies');
const auth = require('../middleware')

router.route('/')
    .post(auth, MoviesController.add)
    .delete(auth, MoviesController.delete)


router.route('/all')
    .post(MoviesController.all)

router.route('/director-or-actor')
    .post(MoviesController.getMoviesByDirectorOrActor)


module.exports = router