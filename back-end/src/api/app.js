const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const root = require('../controllers/root');
const error = require('../global/middlewares/error');

const app = express();

app.use(function(_req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.use(cors());
    next();
 });

app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;
