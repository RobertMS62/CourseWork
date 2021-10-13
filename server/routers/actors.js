const express = require('express');
const router = require('express-promise-router')();
const ActorController = require('../controllers/actors');
const auth = require('../middleware')

router.route('/')
    .post(auth, ActorController.add)
    .delete(auth, ActorController.delete)


router.route('/all')
    .post(auth, ActorController.all)


module.exports = router