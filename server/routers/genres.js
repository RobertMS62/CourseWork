const express = require('express');
const router = require('express-promise-router')();
const GenresController = require('../controllers/genres');
const auth = require('../middleware')

router.route('/')
    .post(auth, GenresController.add)
    .delete(auth, GenresController.delete)


router.route('/all')
    .post(auth, GenresController.all)


module.exports = router