var express = require('express');
var path = require('path');
var http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var expressValidator = require('express-validator');
var config = require('./config/config');

var cookieSession = require('cookie-session');
var jwt = require('jsonwebtoken');

var user = require('./config/db-config');


var jsonwebtoken = require('jsonwebtoken');

var nodemailer = require('nodemailer');

var MySQLStore = require('express-mysql-session')(session);


var bcrypt = require('bcrypt');
const saltRounds = 10;

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
// var LocalStrategy = require('passport-local').Strategy;


var app = express();

//api file interacting with db
const api = require('./server/routes/api');

app.use(cookieSession({
  keys:[config.cookie_key]
}));

//app.use(logger('dev')); //study
app.use(expressValidator());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));


var options = {   // DATABASE CONNECTIVITY CREDENTIALS
  host     : config.mysqlHost,
  user     : config.mysqlUser,
  password : config.mysqlPassword,
  database : config.mysqlDb
};

var sessionStore = new MySQLStore(options);

app.use(session({
  secret: 'keyboard',
  resave: false,
  saveUninitialized: false,
  store: sessionStore
  // cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  user.findUserSocial(id,function(error,response){
    done(err, response.user);
  });
});


passport.use(new GoogleStrategy({
    clientID: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    // console.log(accessToken);
    // console.log(refreshToken);
    var id = profile.id;

    user.findUserSocial(id,function(error,response){
      if(error){
        console.log(error);
      }else{
        if(response.response == 'no user'){
          user.createUserSocial(profile, function(error,response){
            if(error){
              console.log(error);
            }else{
               user.findUserSocial(id,function(error,response1){
                  if(error){

                  }else{
                    return cb(null,response1);
                  }
               });
            }
          });
        }else{
          return cb(null,response);
        }
        // console.log(response);
      }
    });


    
  }
));


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Origin");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(function(req,res,next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] == 'JWT'){
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(error, decode){
      if(error){ req.user == undefined; }else{
        req.user = decode;
        next();
      }
    });
  }else{
    req.user == undefined;
    next();
  }
});


app.get('/auth/google',
  passport.authenticate('google', { scope: ['email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google'),
  function(req, res,next) {
    // Successful authentication, redirect home.
    console.log(req.user)
    // res.redirect('/api');
    var email = req.user.email;
    var auth_id = req.user.user.auth_id;
    var uid = req.user.user.uid;

    var token = jwt.sign({email:email,role:'admin',uid:uid, auth_id:auth_id}, 'RESTFULAPIs');
    res.redirect("/social_login_success/"+token);
  });

 app.get('/', function(req, res){
    res.render('index', { user: req.user });
  });

app.get('/send', function(req, res, next) {
  var transporter = nodemailer.createTransport({
   host: 'smtp.yahoo.com',
    port: 465,
    secure: true,
   auth: {
          user: 'jivanika4@yahoo.com',
          pass: '4389@jiv'
      }
  });

  const mailOptions = {
    from: `jivanika4@yahoo.com`,
    to: 'jiv4389@gmail.com',
    subject: `test email`,
    text: `test emai;`,
    replyTo: `jivanika4@yahoo.com`
  }

  transporter.sendMail(mailOptions, function(err, response) {
    if (err) {
      console.log(err);
    } else {
      console.log('here is the res: ', response)
    }
  })
});


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