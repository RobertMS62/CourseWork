const express = require('express');
const router = require('express-promise-router')();
const ScoresController = require('../controllers/scores');
const auth = require('../middleware')

router.route('/')
    .post(auth, ScoresController.add)
    .delete(auth, ScoresController.delete)


router.route('/all')
    .post(auth, ScoresController.all)


module.exports = router