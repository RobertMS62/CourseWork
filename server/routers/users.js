const express = require('express');
const router = require('express-promise-router')();
const UserController = require('../controllers/users');
const auth = require('../middleware')


router.route('/register')
    .post(UserController.rergister)
router.route('/login')
    .post(UserController.login)
router.route('/profile')
    .post(auth, UserController.profile)


module.exports = router