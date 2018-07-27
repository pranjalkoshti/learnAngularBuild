
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){

	passport.serializeUser(function(user_id, done) {
	  done(null, user_id);
	}),

	passport.deserializeUser(function(user_id, done) {
	    done(null, user_id);
	}),



            passport.use('local-login', new LocalStrategy(function(username, password, done) { // callback with email and password from our form
					console.log(username)
                   connection.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
               
              
              		});
            }));

}