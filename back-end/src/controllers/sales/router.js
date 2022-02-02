const express = require('express');
const create = require('./create');
const findById = require('./findById');
const auth = require('../../global/middlewares/auth');
const validation = require('../../global/middlewares/validation');

const router = express.Router({ mergeParams: true });

router.get('/:id', findById);
router.post('/', auth.verifyToken, validation.sale, create);

module.exports = router;