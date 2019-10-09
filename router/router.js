const express   = require('express');
      router    = express.Router();

main            = require('../main');

const app = express;

app.get('/signIn', main.postCheck);
