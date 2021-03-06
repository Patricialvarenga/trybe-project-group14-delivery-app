const express = require('express');
const create = require('./create');
const findById = require('./findById');
const findAll = require('./findAll');
const auth = require('../../global/middlewares/auth');
const validation = require('../../global/middlewares/validation');

const router = express.Router({ mergeParams: true });

router.get('/details/:id', auth.verifyToken, findById);
router.get('/', auth.verifyToken, findAll);
router.post('/', auth.verifyToken, validation.sale, create);

module.exports = router;