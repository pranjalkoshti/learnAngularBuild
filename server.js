var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');


var MySQLStore = require('express-mysql-session')(session);


var bcrypt = require('bcrypt');
const saltRounds = 10;

var passport = require('passport');


//api file interacting with db
const api = require('./server/routes/api');


var app = express();



app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));


var options = {   // DATABASE CONNECTIVITY CREDENTIALS
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'pruchha'
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
  // cookie: { secure: true }
}));

app.use(passport.initialize());
app.use(passport.session());

var MySQLStore = require('express-mysql-session')(session);



// api location
app.use('/api',api);

app.get('*', function(req, res){
	res.sendFile(path.join(__dirname,'dist/index.html'));
});

const port = process.env.PORT || '8080';
app.set('port',port);

const server = http.createServer(app);

server.listen(port, function(){
	console.log('running on localhost:'+ port);
});