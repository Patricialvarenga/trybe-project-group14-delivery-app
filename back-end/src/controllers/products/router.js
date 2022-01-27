const express = require('express');
const list = require('./list');
const auth = require('../../global/middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/', auth.verifyToken, list);

module.exports = router;