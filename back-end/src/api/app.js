const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const root = require('../controllers/root');
const error = require('../global/middlewares/error');

const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST']}))
app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;
