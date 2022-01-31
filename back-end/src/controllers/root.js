const express = require('express');
const routerLogin = require('./users/login/router');
const routerRegister = require('./users/register/router');
const routeProducts = require('./products/router');
// const routeSales = require('./sales/router');
// const cors = require('cors');

const root = express.Router({ mergeParams: true });

root.use('/images', express.static('public'));

root.use('/login', routerLogin);
root.use('/register', routerRegister);
root.use('/products', routeProducts);
// root.use('/sales', routeSales);

module.exports = root;