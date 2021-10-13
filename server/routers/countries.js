const express = require('express');
const router = require('express-promise-router')();
const CountriesController = require('../controllers/countries');
const auth = require('../middleware')

router.route('/')
    .post(auth, CountriesController.add)
    .delete(auth, CountriesController.delete)


router.route('/all')
    .post(auth, CountriesController.all)


module.exports = router