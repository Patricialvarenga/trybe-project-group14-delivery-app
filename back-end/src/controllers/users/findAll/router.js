const express = require('express');
const findAll = require('./findAll');
const auth = require('../../global/middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/', auth.verifyToken, findAll);

module.exports = router;