const express = require('express');
const create = require('./create');
const validation = require('../../../global/middlewares/validation');
const auth = require('../../../global/middlewares/auth');

const router = express.Router({ mergeParams: true });

router.post('/', auth.verifyRoleAdm, validation.register, create);

module.exports = router;