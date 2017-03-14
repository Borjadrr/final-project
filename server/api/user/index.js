'use strict';

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/signup', controller.createUser);
router.post('/login', controller.logUser);
router.post('/logout', controller.logOutUser);
router.get('/loggedin', controller.authUser);

module.exports = router;
