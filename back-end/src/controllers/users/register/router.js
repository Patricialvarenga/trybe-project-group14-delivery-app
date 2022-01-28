const express = require('express');
const register = require('./register');
const validation = require('../../../global/middlewares/validation');

const router = express.Router({ mergeParams: true });

router.post('/', validation.register, register);

module.exports = router;