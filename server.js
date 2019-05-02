    const express   = require('express');
    jwtexpress      = require('express-jwt'),
    _               = require('lodash'),
    mysql           = require('mysql'),
    http            = require('http'),
    md5             = require('md5'),
    cors            = require('cors'),
    jwt             = require('jsonwebtoken'),
    router          = express.Router(),
    bodyParser      = require('body-parser');
    main            = require('./main');


    const app = express();
    const port = 8080;

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }));

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    // res.header('Access-Control-Allow-Credentials', true);
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

app.post('/signIn', main.signIn);

app.get('/resolve', main.getPatient);

app.get('/getData', main.getData);

http.createServer(app).listen(port, () => {
    console.log(`express listening on ${port}`);
});  
