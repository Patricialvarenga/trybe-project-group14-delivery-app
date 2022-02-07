const express = require('express');
const registerByAdm = require('./registerByAdm');
const validation = require('../../../global/middlewares/validation');
const auth = require('../../../global/middlewares/auth');

const router = express.Router({ mergeParams: true });

router.post('/', auth.verifyRoleAdm, validation.registerByAdm, registerByAdm);

module.exports = router;