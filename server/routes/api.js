var express = require('express');
var router = express.Router();
var session = require('express-session');
var config = require('../../config/config');
var user = require('../../config/db-config');
var jwt = require('jsonwebtoken');
var user = require('../../config/db-config');
var get_data = require('../../config/get-data');
var send_data = require('../../config/send-data');


var multer = require('multer');
var upload = multer();

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/assets/uploads/logos/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({ storage: storage }).single('logo');


var gallaryImgStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/assets/uploads/galleryImages/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

var uploadGalleryImages = multer({ storage: gallaryImgStorage }).array('gallery_images');


var bcrypt = require('bcrypt');
var saltRounds = 10;


var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var mysql = require('mysql'); //MYSQL DATABASE CONNECTIVITY

// console.log(config)

// var connection = mysql.createConnection({   // DATABASE CONNECTIVITY CREDENTIALS
//   host     : config.mysqlHost,
//   user     : config.mysqlUser,
//   password : config.mysqlPassword,
//   database : config.mysqlDb
// });


// connection.connect(function(error){
// 	if(error){
//     console.log(error);
// 		console.log('Error in creating database connection');
// 	}else{
// 		console.log('Connected');
// 	}
// });

// connection.query('USE pruchha',function(error){
// 	if(error){
//     console.log(error);
// 		console.log('database not found');
// 	}else{
// 		console.log('database found');
// 	}
// });



const { Client } = require('pg');
const connection = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'pruchha',
  password: '12345',
  port: 5432,
});
connection.connect();


// router.get('/',function(req, res){
//   res.send(req.user.user.fname)
//   // res.end('logged in user ' + req.user);
// });
//-------------------- REGISTERATION ------------------------------

router.post('/register', function(req, res, next) {console.log(req.body)

        var fname = req.body.fname;
        var lname = req.body.lname;
        var email = req.body.email;
        var password = req.body.password;

        req.checkBody('fname', 'First name is required').notEmpty();
        req.checkBody('lname', 'Last name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        // req.checkBody('email', 'Please enter valid email').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();

        var error = req.validationErrors();

        if(error){
          res.send(JSON.stringify(error));
        }else{
          user.registerUser(email,fname,lname, password, function(error, response){
            if(error){
              res.json({error: error});
            }else{
               user.loginUser(email, password, function(error, response){
                if(error){
                  res.json({error: error});
                }else{
                  req.session.email = email;
                  req.session.uid = response.uid;
                  req.session.save();
                  res.json({token: response.token, id: response.uid});
                }
              });
            }
          });
        }
      
});



//-------------------- LOG IN  ------------------------------

router.post('/login', function(req, res, next) {

            email = req.body.email;
            password = req.body.password;

        req.checkBody('email', 'Email is required').notEmpty();
        // req.checkBody('email', 'Please enter valid email').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();

        var error = req.validationErrors();

        if(error){
          res.send(JSON.stringify(error));
        }else{
            user.loginUser(email, password, function(error, response){
              if(error){
                console.log(error + ' error');
                res.json({error: error});
              }else{
                console.log(response)
                req.session.email = email;
                req.session.uid = response.uid;
                req.session.save();

                res.json({token: response.token, id: response.uid});

                console.log(response.uid);
              }
            });
        }

});

router.post('/publish_business_page', function(req, res, next) {

         if(req.user){
          var uid = req.user.uid; 
          var colorTheme = req.body.colorTheme; 

            send_data.publishBusinessPage(uid, colorTheme, function(error, response){
              if(error){
                console.log(error + ' error');
              }else{ console.log(response)
                res.json({response:response});
              }
            });
          }

});



//-------------------- SEND DATA TO DATABASE ------------------------------

router.post('/send_business_info', function(req, res, next) {
  if(req.user){

  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      res.end('error')
    }else{
      console.log(req.body);


      // res.json({response:'success'});
  

        var uid = req.user.uid; 
        var title = req.body.title; 
        var subtitle = req.body.subtitle; 
        var about = req.body.about; 
        var city = req.body.city; 
        var address = req.body.address; 
        if(req.body.url){
           var external_url = req.body.url; 
        }else{
           var external_url = null;
        }
        if(req.body.social_links){
           var social_links = req.body.social_links; 
        }else{
           var social_links = null;
        }
        if(req.file){
          if(req.file.path){
           var logo_path = './assets/uploads/logos/'+req.file.filename; 
          }
        }else{
             var logo_path = null;
          }
       
        if(req.body.template_no){
           var template_no = req.body.template_no; 
        }else{
           var template_no = 1;
        }
        if(req.body.template_theme_no){
           var template_theme_no = req.body.template_theme_no; 
        }else{
           var template_theme_no = 'blue';
        }

        var published_status;
          if(req.body.published_status){
          published_status = req.body.published_status; 
          }else{
          published_status = 0; 
          }

        if(req.body.date_published){
           var date_published = req.body.date_published; 
        }else{
           var date_published = null;
        }

        if(req.body.date_modified){
           var date_modified = req.body.date_modified; 
        }else{
           var date_modified = null;
        }


        var data = [
              uid, 
              title, 
              subtitle, 
              about, 
              city, 
              address, 
              external_url, 
              social_links, 
              logo_path, 
              template_no, 
              template_theme_no, 
              published_status, 
              date_published,
              date_modified
            ];


          query = "SELECT * FROM pr_business.pr_business_info WHERE uid = '"+uid+"'";  

            connection.query(query,function(error,result){
                if(error){
                    console.log(error);
                }else{
                    if(result.rows.length == 1){
                        send_data.updateBusinessInfo(data, function(error, response){
                          if(error){
                            console.log(error)
                          }else{//console.log(response)
                            res.json({response: response, id: uid});
                          }
                        });

                    }else if(result.rows.length == 0){
                        send_data.sendBusinessInfo(data, function(error, response){
                           if(error){
                            console.log(error)
                          }else{
                            res.json({response: response, id: uid});
                          }
                        });
                  }
              }
  
          });

         }
  })

  }
    
});

router.post('/upload-gallery-images', function(req, res, next){
  if(req.user){
        uploadGalleryImages(req, res, function (err) {
        if (err) {
          // console.log(err);
          // res.end('error');
        }else{
          console.log(req.file);
      console.log(req.files)
     }
    });
  }
});

router.post('/send-additional-info', function(req, res, next){
   if(req.user){

      var uid = req.user.uid; 
      var business_id = req.body.business_id; 
      var features_t = req.body.features_t; 
      var features_d = req.body.features_d; 
      var colorTheme = req.body.colorTheme; 

      var data = [
      business_id,
      features_t,
      features_d,
      colorTheme
      ];

      send_data.updateBusinessAdditionalInfo(business_id, data, function(error, response){
        if(error){
          console.log(error)
        }else{
          console.log(response)
          res.end(JSON.stringify(response));
        }
      });

          }

});


//-------------------- CHECK AUTHORIZATION STATUS ------------------------------


router.post('/check-business-published-status', function(req, res, next) {
            response = {};

            uid = req.body.userId;
            title = req.body.businessTitle;

          if(uid){
            user.authorizeBusiness(uid, title, function(error, response){
              if(error){
                console.log(error)
              }else{
                console.log(response)
                res.end(JSON.stringify(response));
              }
            });
          }
});


router.post('/check-user-auth-status', function(req, res, next) {console.log(req.user)

            if(!req.user){
              // res.status(401).json({response:'user not authenticated'});
              res.end(JSON.stringify({response:'user not authenticated'}));
            }else{
              if(req.user.uid != req.body.userId){
                // res.status(401).json({response:'user not authenticated'});
                res.end(JSON.stringify({response:'user not authenticated'}));
              }else{
                res.status(200).json({response:'user authenticated'});

              }

            }

});

router.get('/check-user-id', function(req, res, next) {

            if(!req.user){
               response = {
                response: 'user not authenticated'
                };

            }else{
            
            uid = req.user.uid;
                response = {
                  response: uid
                };
            }
            res.end(JSON.stringify(response));

});



//-------------------- FETCH DATA FROM DATABASE ------------------------------

router.get('/user',function(req,res){

  if(req.user){
    if(req.user.role == 'admin'){
        var response = "";
        connection.query('SELECT * FROM pr_business.pr_business_user_account', function(error,res){
          if(error){
              console.log(error + 'Error in query');
          }else{
              response = res.rows[0];
          res.end(JSON.stringify(response));
        }
         
      });
    }
    
  }else{
     res.status(401).json({response:'user not authenticated'});
  }

});


router.post('/get_uid_from_token', function(req, res, next){console.log(req.user)
    if(req.user){
            var uid = req.user.user.uid;
            var response = {
              uid : uid
            }
            console.log(response)
            res.end(JSON.stringify(response));
    }
});

router.post('/fetch_business_info', function(req, res, next) { console.log(req.user)
  var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  // console.log(ip)
        // if(req.user){
          // var uid = req.user.uid;

          // var business_id = null;

          
          if(req.user){
            var uid = req.user.uid;
          }else{
            var uid = req.body.uid;
          }
          console.log(uid)

            get_data.getBusinessInfo(uid, function(error, response){
              if(error){
                console.log(error + ' error');
              }else{
                console.log(response)
                 res.end(JSON.stringify(response));
              }
            });

        // }else{

          // var uid = req.user.uid;

          // var business_id = null;
          //   get_data.getBusinessInfo(uid, business_id, function(error, response){
          //     if(error){
          //       console.log(error + ' error');
          //     }else{
          //        res.end(JSON.stringify(response));
          //     }
          //   });


          // var response = {
          //   error : ' user Not authenticated'
          // };
          // res.end(JSON.stringify(response));

        // }
   
});

router.post('/fetch_additional_business_info', function(req, res, next) {
        // if(req.user){
        //   var uid = req.user.uid;

          var business_id = req.body.business_id;

            get_data.getBusinessAdditionalInfo(business_id, function(error, response){
              if(error){
                console.log(error + ' error');
              }else{
                 res.end(JSON.stringify(response));
              }
            });

        // }else{

          // var uid = req.user.uid;

          // var business_id = null;
          //   get_data.getBusinessInfo(uid, business_id, function(error, response){
          //     if(error){
          //       console.log(error + ' error');
          //     }else{
          //        res.end(JSON.stringify(response));
          //     }
          //   });


          // var response = {
          //   error : ' user Not authenticated'
          // };
          // res.end(JSON.stringify(response));

        // }
   
});

router.get('/fetch_business_stats', function(req, res, next) {

        if(req.user){
          var uid = req.user.uid;

          var business_id = null;

            get_data.getBusinessStats(uid, business_id, function(error, response){
              if(error){
                console.log(error + ' error');
              }else{
                 res.end(JSON.stringify(response));
              }
            });

        }else{
          var response = {
            error : ' user Not authenticated'
          };
          res.end(JSON.stringify(response));

        }

});

router.post('/fetch_visitor_info', function(req, res, next) {

        if(req.user){
          var uid = req.user.uid;

          var business_id = req.body.business_id;

            get_data.getVisitorsInfo(uid, business_id, function(error, response){
              if(error){
                console.log(error + ' error');
              }else{console.log(response)
                 res.end(JSON.stringify(response));
              }
            });

        }else{
          var response = {
            error : ' user Not authenticated'
          };
          res.end(JSON.stringify(response));

        }

});

router.get('/fetch_notifications', function(req, res, next) {

        if(req.user){
          var uid = req.user.uid;

            get_data.getRecentNotifications(uid, function(error, response){
              if(error){
                console.log(error + ' error');
              }else{
                 res.end(JSON.stringify(response));
              }
            });

        }else{
          var response = {
            error : ' user Not authenticated'
          };
          res.end(JSON.stringify(response));

        }

});

router.get('/fetch_clients_contacts', function(req, res, next) {

        if(req.user){
          var uid = req.user.uid;

            get_data.getRecentNotifications(uid, function(error, response){
              if(error){
                console.log(error + ' error');
              }else{
                 res.end(JSON.stringify(response));
              }
            });

        }else{
          var response = {
            error : ' user Not authenticated'
          };
          res.end(JSON.stringify(response));

        }

});


router.post('/update_page_views', function(req,res,next) {console.log(req.body.uid)
    var uid = req.body.uid;
    var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;

    send_data.updatePageViews(uid,ip, function(error, response){
      if(error){
        console.log(error)
      }else{
         res.end(JSON.stringify(response));
      }
    });


});


router.post('/client_contact_submit', function(req,res,next) {//console.log(req.ip)
    var uid = req.body.uid;
    var contact_name = req.body.contact_name;
    var contact_email = req.body.contact_email;
    var contact_details = req.body.contact_details;

    data=[
    uid,
    contact_name,
    contact_email,
    contact_details
    ]

    send_data.clientContactSubmit(data, function(error, response){
      if(error){
        console.log(error)
      }else{
         res.end(JSON.stringify(response));
      }
    });


});

module.exports = router;