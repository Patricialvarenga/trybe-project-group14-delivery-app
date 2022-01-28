const express = require('express');
const create = require('./create');
const list = require('./list');
const findById = require('./findById');
const auth = require('../../global/middlewares/auth');
const validation = require('../../global/middlewares/validation');

const router = express.Router({ mergeParams: true });

router.get('/:id', findById);
router.get('/', auth.verifyToken, list);
router.post('/', validation.product, create);

module.exports = router;