'use strict';
var express = require('express');
var path = require('path');
var router = express.Router();



router.get('/:id', function (req, res) {
 const id = req.params.id
   res.sendfile(path.resolve(`./public/uploads/${id}`));
});

module.exports = router;
