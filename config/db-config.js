

var config = require('./config');
var mysql = require('mysql'); //MYSQL DATABASE CONNECTIVITY



const { Client } = require('pg');
const connection = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'pruchha',
  password: '12345',
  port: 5432,
});
connection.connect();



var bcrypt = require('bcrypt');
var saltRounds = 10;

var jwt = require('jsonwebtoken');

// var connection = mysql.createConnection({   // DATABASE CONNECTIVITY CREDENTIALS
//   host     : config.mysqlHost,
//   user     : config.mysqlUser,
//   password : config.mysqlPassword,
//   database : config.mysqlDb
// });


module.exports = {

  registerUser(email,fname,lname, password, callback) {


	   bcrypt.hash(password, saltRounds, function(err, hash) {

          query = "INSERT INTO pr_business.pr_business_user_account (fname, lname, email, password) VALUES ( '"+fname+"','"+lname+"','"+email+"','"+hash+"')";

              connection.query(query,function(err,res){
                  if(err){
             
                    if(err.code == 'ER_DUP_ENTRY'){
                      var error = {
                        error : 'Email is already registered'
                      }

                      callback(error,null);
                    }else{
                       callback(error,null);
                    }
                  }else{

                      connection.query('SELECT uid FROM pr_business.pr_business_user_account WHERE email = "'+email+'"', function(err,response){
                        console.log(err);
                        if(err){
                          callback(err,null);
                        }else{
                          var user_id = response.rows[0].uid;
                          var response = {
                            uid : user_id
                          }
                           callback(null,response);
                        }
                      });
 
                  }
              });
               
            });       
},

loginUser(email, password, callback){


        query = "SELECT * FROM pr_business.pr_business_user_account WHERE email = '"+email+"'";
           
            connection.query(query,function(err,res){
                if(err){
                    callback(err,null);
                }else{
                    if(res.rows.length == 1){

                      bcrypt.compare(password, res.rows[0].password, function(err, response) {console.log(response)
                        if(err){
                          var err = 'Password is incorrect';
                          callback(err,null);
                        }else{
                          if(response == false){
                            var err = 'Password is incorrect';
                            callback(err,null);
                          }else{
                            var response = {
                              token: jwt.sign({email:email,role:'admin',uid:res.rows[0].uid}, 'RESTFULAPIs'),
                              uid : res.rows[0].uid
                            };
                            callback(null,response);
                          }
                          
                        }
                            
                      });
            
                    }else if(res.rows.length == 0){

                            var err = 'Email not present';
                            callback(err,null);  
                    }
                }
                 
            });

},

  // findUser(data) {


  //   connection.query("select * from pr_business.pr_business_user where email = "+email, function(err,rows){ 
  //     if(err){
  //       return err;
  //     }else if(row[0]){
  //       return true;
  //     }
  //   });
  // },


  // authorizeUSer(param) {

  // },

  authorizeBusiness(uid, title, callback) {
       query = "SELECT * FROM pr_business.pr_business_info WHERE uid = "+uid;
              console.log(query)
              connection.query(query,function(error,res){
                if(error){
                    callback(error,null);

                  }else{
                      if(res.rows.length == 1){
                        if(res.rows[0]['pr_business_title'] == title){

                          if(res.rows[0]['pr_business_published_status'] == 0){
                            response = {  
                              success: 'user present',
                              status: 'not published'
                            }; 
                          }

                          if(res.rows[0]['pr_business_published_status'] == 1){
                            response = {  
                              success: 'user present',
                              status: 'published'
                            }; 
                        }
                        callback(null,response);
                        }else{
                          response = {  
                              error: 'wrong url',
                            }; 
                          callback(null,response);
                        }

                      }else{
                        response = {  
                          error : 'no user'
                        }; 
                        callback(null,response);
                      }
                  }

              });
  }
  ,


  findUserSocial(id, callback){
    query = "SELECT * FROM pr_business.pr_business_user_account WHERE auth_id = '"+id +"'";
        console.log(query)
        connection.query(query,function(error,res){
          if(error){
              callback(error,null);
            }else{
              if(res.rows.length == 0){
                 var response = {
                  response : 'no user',
                };
              }else{
                 var response = {
                  user : res.rows[0]
                };
              }
               
                callback(null,response);
            }

        });
  },

  createUserSocial(profile, callback){

    var id = profile.id;
    var fname = profile.name.givenName;
    var lname = profile.name.familyName;
    var gender = profile.gender;
    var provider = profile.provider;
    var email = profile.emails[0].value;


    query = "INSERT INTO pr_business.pr_business_user_account (fname, lname, gender, email, auth_provider, auth_id) VALUES ( '"+fname+"','"+lname+"','"+gender+"','"+email+"','"+provider+"','"+id+"')";
        // console.log(query);
        connection.query(query,function(error,res){
          if(error){
              callback(error,null);
            }else{
              var response = {
                response : 'user created'
              };
              callback(null,response);
            }

        });
  }


  // findUserSocial(id, callback){
  //   query = "SELECT * FROM pr_business_user_social_login WHERE id = '"+id +"'";
  //       console.log(query)
  //       connection.query(query,function(error,row,fields){
  //         if(error){
  //             callback(error,null);
  //           }else{
  //             if(row.length == 0){
  //                var response = {
  //                 response : 'no user',
  //               };
  //             }else{
  //                var response = {
  //                 user : row[0]
  //               };
  //             }
               
  //               callback(null,response);
  //           }

  //       });
  // },

  // createUserSocial(profile, callback){

  //   var id = profile.id;
  //   var fname = profile.name.givenName;
  //   var lname = profile.name.familyName;
  //   var gender = profile.gender;
  //   var provider = profile.provider;
  //   var email = profile.emails[0].value;


  //   query = "INSERT INTO pr_business_user_social_login (fname, lname, gender, email, auth_provider, id) VALUES ( '"+fname+"','"+lname+"','"+gender+"','"+email+"','"+provider+"','"+id+"')";
  //       // console.log(query);
  //       connection.query(query,function(error,row,fields){
  //         if(error){
  //             callback(error,null);
  //           }else{
  //             var response = {
  //               response : 'user created'
  //             };
  //             callback(null,response);
  //           }

  //       });
  // }


}


