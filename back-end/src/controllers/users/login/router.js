const express = require('express');
const login = require('./login');
const validation = require('../../../global/middlewares/validation');

const router = express.Router({ mergeParams: true });

router.post('/', validation.login, login);

module.exports = router;