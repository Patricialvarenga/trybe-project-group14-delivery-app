const express = require('express');
const routerLogin = require('./users/login/router');
const routerRegister = require('./users/register/router');
const routeAdmin = require('./users/admin/router');
const routeSellers = require('./users/findAll/router');
const routeProducts = require('./products/router');
const routeSales = require('./sales/router');

const root = express.Router({ mergeParams: true });

root.use('/images', express.static('public'));
root.use('/login', routerLogin);
root.use('/register', routerRegister);
root.use('/products', routeProducts);
root.use('/sales', routeSales);
root.use('/sellers', routeSellers);
root.use('/admin', routeAdmin);

module.exports = root;