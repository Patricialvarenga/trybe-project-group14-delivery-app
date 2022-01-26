const express = require('express');
const bodyParser = require('body-parser');
const root = require('../controllers/root');
const error = require('../global/middlewares/error');

const app = express();

app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;
