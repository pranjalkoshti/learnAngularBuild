var express = require('express');
var router = express.Router();
var session = require('express-session');

var bcrypt = require('bcrypt');
const saltRounds = 10;
var passport = require('passport');

var mysql = require('mysql'); //MYSQL DATABASE CONNECTIVITY

var connection = mysql.createConnection({   // DATABASE CONNECTIVITY CREDENTIALS
  host     : 'localhost',
  user     : 'root',
  password : 'password'
});

connection.connect(function(error){
	if(error){
		console.log('Error in creating database connection');
	}else{
		console.log('Connected');
	}
});

connection.query('USE pruchha',function(error){
	if(error){
		console.log('database not found');
	}else{
		console.log('database found');
	}
});


// // Add headers
// router.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

router.get('/user',function(req,res){
  console.log(req.user);
  console.log(req.isAuthenticated());
  console.log(req.session.email)
	
	var response = "";
	connection.query('SELECT * FROM pr_business_user',function(error,row,fields){
        if(error){
            console.log(error + 'Error in query');
        }else{
            // console.log('no error in query');
            // console.log(row);
            response = row;
 		res.end(JSON.stringify(response));
        }
         
	});

});


router.post('/register', function(req, res, next) {
    // if(!req.body.email || !req.body.password){
    //     res.status("400");
    //     var data = "Invalid details!";
    //     res.end(JSON.stringify(data));
    // }else{

      // express -validators here
      

        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var password = req.body.password;

        req.checkBody('fname', 'First name is required').notEmpty();
        req.checkBody('lname', 'Last name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Please enter valid email').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();

        var error = req.validationErrors();

        if(error){
          console.log(error);
          res.end(JSON.stringify(error));

        }else{
           bcrypt.hash(password, saltRounds, function(err, hash) {

             query = "INSERT INTO pr_business_user (fname, lname, email, password) VALUES ( '"+fname+"','"+lname+"','"+email+"','"+hash+"')";
            // console.log(query);
              connection.query(query,function(error,row,fields){
                  if(error){
                       response = {  
                          response : 'error2'
                      }; 
                      console.log(error+'Error in query');
                  }else{
                     response = {  
                          response : 'success'
                        }; 
                      connection.query('SELECT uid FROM pr_business_user WHERE email = "'+email+'"', function(error,result,fields){
                        if(error){
                          console.log(error);
                        }else{
                          console.log(result[0].uid);
                          var user_id = result[0].uid;

                          req.session.userid = user_id;
                          req.session.email = email;

                           // req.login(user_id, function(){console.log('login')
                                
                           // });
                        }
                      });
                      res.end(JSON.stringify(response));  console.log(response)
                  }
                  
              });

        });
        

        }
       
    // }
});


router.post('/login', function(req, res, next) {
    if(req.body.email !== ""){
            email = req.body.email;
            password = req.body.password;

            query = "SELECT password FROM pr_business_user WHERE email = '"+email+"'";
            // console.log(query);
            connection.query(query,function(error,row,fields){
                if(error){
                     response = {  
                        error : 'error2'
                    }; 
                    console.log(error+'Error in query');
                }else{
                    if(row.length == 1){
                       if(row[0].password === password){
                              req.session.email = email;
                              req.session.save();
                              console.log('Session email' + req.session.email);

                            response = {  
                                admin : 'success',
                                password: row[0].password
                            }; 
                            // res.redirect('/business_info_form');
                       }else{
                             response = {  
                                admin : 'wrongPass'
                            }; 
                       }
                    }else if(row.length == 0){
                            response = {  
                                admin : 'notPresent'
                            };
                    }
                }
                res.end(JSON.stringify(response));  
            });

       }else{
         response = {  
           error:'error'
       };  
       res.end(JSON.stringify(response));
       }

});


router.get('/fetch_business_info', function(req, res, next) {console.log(req.session.email)
            response = {};
            // if(req.session.email){
                // var email = req.session.email;
                var email = '1';
                query = "SELECT * FROM pr_business_info WHERE pr_business_email = '"+email+"'";
                console.log(query);
                    connection.query(query,function(error,row,fields){
                        if(error){
                             response = {  
                                error : 'error2'
                            }; 
                            console.log(error+'Error in query');
                        }else{
                            if(row.length == 1){
                               response = row;
                            }
                        }
      
                res.end(JSON.stringify(response));
              });
            // }
    
});

router.post('/send_business_info', function(req, res, next) {
    if(req.session.email ){
        query = "SELECT uid FROM pr_business_user WHERE email = '"+req.session.email+"'";//console.log(query);
        conn.query(query,function(error,row,fields){//console.log(req.session.email)
             if(error){
                     response = {  
                        response : 'error2'
                    }; 
                    console.log(error+' xxxError in query');
                }else{
                       if(req.body.btitle != ""){
                              title = req.body.btitle;
                              type = req.body.btype;
                              description = req.body.bdescription;
                              url = req.body.burl;
                              email = req.session.email;
                              id = row[0].uid;

                            query1 = "SELECT id FROM pr_business_info WHERE pr_business_email = '"+req.session.email+"'";   console.log(query1);
                            conn.query(query1,function(error,row,fields){
                                if(error){
                                    console.log(error);
                                }else{
                                    if(row.length == 1){
                                        query2 = "UPDATE pr_business_info SET pr_business_title='"+title+"',pr_business_type='"+type+"',pr_business_description='"+description+"',pr_business_url='"+url+"',uid='"+id+"' WHERE pr_business_email='"+email+"'";
                                        console.log(query2);
                                        conn.query(query2,function(error,row,fields){
                                            if(error){
                                                 response = {  
                                                    response : 'error2'
                                                }; 
                                                console.log(error+' 111Error in query');
                                            }else{
                                                console.log(req.session.email +' no error in query');
                                                response = {  
                                                    response : '1'
                                                }; 
                                            }
                                        });
                                    }else{

                                        query2 = "INSERT INTO pr_business_info (pr_business_title, pr_business_type, pr_business_description, pr_business_url, pr_business_email, uid) VALUES ('"+title+"','"+type+"','"+description+"','"+url+"','"+email+"','"+id+"')";
                                        console.log(query2);
                                        conn.query(query2,function(error,row,fields){
                                            if(error){
                                                 response = {  
                                                    response : 'error2'
                                                }; 
                                                console.log(error+' 222Error in query');
                                            }else{
                                                console.log(req.session.email +' no error in query');
                                                response = {  
                                                    response : '0'
                                                }; 
                                            }
                                        });
                                    }
                                }
                    
                            });
                        }
                    
                    }
        });
        res.end(JSON.stringify(response));
    }else{
         response = {  
             response : 'user not loggesin'
        };
        res.end(JSON.stringify(response));
    }
       
    
});

// passport.serializeUser(function(user_id, done) {
//   done(null, user_id);
// });

// passport.deserializeUser(function(user_id, done) {
//     done(null, user_id);
// });

module.exports = router;