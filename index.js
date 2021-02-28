require('dotenv').config({ 'path': '.env' });
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  'extended': false
}));

app.use(session({
  'secret': 'chin1ma9y9y1q9udqni2d=a12e113v',
    'key': 'sid',
    'cookie': {
        'secure': false,
        'maxAge': 1800000
    },
    'rolling': true,
    'resave': true,
    'saveUninitialized': false
}));

const register = require('./routes/authentication/register');
const login = require('./routes/authentication/login');

app.use('/', login);
app.use('/register', register);

app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.engine('hbs', hbs({
    'extname': 'hbs'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});