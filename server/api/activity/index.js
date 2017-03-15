'use strict';

var express = require('express');
var controller = require('./activity.controller');

var router = express.Router();

router.post('/', controller.createActivity);
router.get('/', controller.showActivities);
router.put('/:id', controller.editActivity);
router.get('/:id', controller.showActivity);
router.post('/:id', controller.addParticipants);
router.delete('/:id', controller.removeActivity);

module.exports = router;
