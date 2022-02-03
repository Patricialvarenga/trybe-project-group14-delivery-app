const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const root = require('../controllers/root');
const error = require('../global/middlewares/error');

const app = express();

const whitelist = ['http://localhost:3000', 'http://localhost:3001'];
  const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };
 
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(root);
app.use(error);

module.exports = app;
