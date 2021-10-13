const express = require('express');
const router = require('express-promise-router')();
const DirectorsController = require('../controllers/directors');
const auth = require('../middleware')

router.route('/')
    .post(auth, DirectorsController.add)
    .delete(auth, DirectorsController.delete)


router.route('/all')
    .post(auth, DirectorsController.all)


module.exports = router