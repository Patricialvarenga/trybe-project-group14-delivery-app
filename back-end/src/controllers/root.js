const express = require('express');
const routerLogin = require('./users/login/router');
const routerRegister = require('./users/register/router');
const routeProducts = require('./products/router');

const root = express.Router({ mergeParams: true });

root.use('/login', routerLogin);
root.use('/register', routerRegister);
root.use('/products', routeProducts);

module.exports = root;